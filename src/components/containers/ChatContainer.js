import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as messageActions from '../../actions/messagesActions'
import * as roomActions from '../../actions/roomActions'
import { bindActionCreators } from 'redux'
import ChatLog from '../chatLog'
import FileUploader from '../fileUpload'
import { Image, Glyphicon, InputGroup, PageHeader, Col, Button, FormGroup, FormControl, Navbar, Header, Row } from 'react-bootstrap'


class ChatContainer extends Component {
  constructor(props) {
    super(props)

     this.state = {
       input : '',
       imagePreviewUrl: '',
       messages: props.messages,
       connected: false
     }

     this.handleOnChange = this.handleOnChange.bind(this)
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
     this._handleMessageEvent = this._handleMessageEvent.bind(this)
     this._handleFileUpload = this._handleFileUpload.bind(this)
     this._init = this._init.bind(this)
   }


  componentWillMount() {
    this._init()
  }

  componentDidMount(){
    console.log('did mount')
    this._handleFileUpload()
    this._handleMessageEvent()
  }

  handleOnChange(ev) {
    this.setState({ input: ev.target.value})
  }

  handleOnSubmit(ev) {

    ev.preventDefault()
    socket.emit('chat message', {message: this.state.input, room: this.props.room.title, user: this.props.user})
    this.setState({ input: '' })
  }

  _handleMessageEvent(){
    socket.on('chat message', (inboundMessage) => {
       this.props.createMessage({room: this.props.room, newMessage: {user: JSON.parse(inboundMessage).user, message: JSON.parse(inboundMessage).message}})
       console.log('received message', inboundMessage)
     })
  }

  _handleFileUpload(){
    socket.on('file_upload_success', (data) => {
      console.log('file upload action was emitted', data.file)
      this.props.createMessage({room: this.props.room, newMessage: { user: data.user, image: data.file}})
    })
  }

  _init(){
    if(!(this.state.connected)){
      this.props.fetchRoom()
      socket.emit('subscribe', {room: this.props.room.title})
        this.setState({connected: true})
    }
  }


  render() {

  return (

    <div className='react-nav'>

      <Row className="navbar-fixed-top">
        <Col xs={10} Col xsPush={2}>

          <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Willr</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullRight>
        <FormGroup>
          <FormControl type="text" placeholder="Search" />
        </FormGroup>
        {' '}

      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
        </Col>
      </Row>


   <div className='container main-bottom'>
         <ChatLog messages={this.props.messages} image={''}/>
         <Row>
           <Col md={6} Col mdPush={1}>
         <form>
           <FormGroup>
             <InputGroup>
             <FormControl onChange={this.handleOnChange} value={this.state.input}/>
             <InputGroup.Addon >
               <Glyphicon glyph="pencil" />
               </InputGroup.Addon>
             <InputGroup.Button>
               <Button bsStyle="success" type="submit" onClick={this.handleOnSubmit}> Go! </Button>
             </InputGroup.Button>
           </InputGroup>
         </FormGroup>
         </form>
         <FileUploader />
       </Col>
     </Row>




  </div>



</div>



    )

  }

}

function mapStateToProps(state, ownProps) {
  return { messages: state.activeRoom.messages, room: state.activeRoom, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMessage: messageActions.saveMessage, fetchRoom: roomActions.fetchRoomData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
