import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as messageActions from '../../actions/messagesActions'
import { bindActionCreators } from 'redux'
import ChatLog from '../chatLog'
import { Button, Glyphicon, FormGroup, FormControl, InputGroup, PageHeader, Col, } from 'react-bootstrap'

class ChatContainer extends Component {
  constructor(props) {

     super()
     this.state = {
       input : '',
       messages: props.messages
     }
     this.handleOnChange = this.handleOnChange.bind(this)
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
   }

  componentDidMount(){
     socket.on('chat message', (message) => {
      this.props.newMessage({user: 'Will', message: message})
      console.log('received message', message)
    })
  }

  handleOnChange(ev) {
   this.setState({ input: ev.target.value})
  }

  handleOnSubmit(ev) {
    ev.preventDefault()
    // this.props.newMessage(this.state.input)
    this.setState({ input: '' })
    socket.emit('chat message', this.state.input)
  }

  render() {
    const center = {
      textAlign: 'center'
    }

    return (
      <div>
        <PageHeader>
          Hello World and welcome
        </PageHeader>
        <ChatLog messages={this.props.messages} />
        <form>
          <FormGroup>
            <InputGroup>
              <FormControl onChange={this.handleOnChange} value={this.state.input}/>
              <InputGroup.Addon onClick={ () => { console.log('book em')}}>
                <Glyphicon gylph="pencil" />
              </InputGroup.Addon>
              <InputGroup.Button>
                <Button bsStyle="success" type="submit" onClick={this.handleOnSubmit}> Go. </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <h3>

        </h3>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { messages: state.activeRoom.messages, room: state.activeRoom }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage: messageActions.newMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
