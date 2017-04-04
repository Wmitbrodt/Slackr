import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Col, Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as roomActions from '../../actions/roomActions'
import * as messageActions from '../../actions/messagesActions'
import { bindActionCreators } from 'redux'
import NewRoom from '../newRoom'

class RoomsContainer extends Component {
  constructor(props){
    super()
    this.state = {
      input: '',
      connected: false
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleNewRoom = this.handleNewRoom.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.fetchRooms = this.fetchRooms.bind(this)
  }

  componentDidMount(){
    this.fetchRooms()
  }

  handleOnClick(room){
    socket.emit("unsubscribe")
    socket.emit("subscribe", { room: room.title})
    this.props.joinRoom(room)
  }

  handleNewRoom(ev) {
    ev.preventDefault()
    this.props.newRoom(this.state.input)
    this.setState({input: ''})
  }

  handleOnChange(ev) {
    this.setState({input: ev.target.value})
  }

  fetchRooms(){
    if (!this.state.connected) {
      this.props.fetchRoomList()
      this.state.connected = true
    }
  }

  render() {
    const rooms = this.props.rooms.map((room) => {
      return (
        <ListGroupItem key={room.title} onClick={this.handleOnClick.bind(null, room)}>
          {room.title}
        </ListGroupItem>
      )
    })

    return (
      <div>
        <Col md={2} Col sm={5} mdPull={2}>
          <ListGroup className="span-to-bottom">
            {/* <br/> */}
            <Row>
              <Col mdPush={1} >
                 <h5 id="left-col-header">codecore <Glyphicon glyph="chevron-down" /></h5>

                 <h5 id="left-col-header">{this.props.user}</h5>
                 <h5 id="left-col-header">All Threads</h5>
               </Col>
            </Row>
            <Row>
              <Col mdPush={1} >
                <h5 id="left-col-header">CHANNELS (7)</h5>
              </Col>
            </Row>
            {rooms}
            <Row>
              <Col mdPush={1} >
                <h5 id="left-col-header">DIRECT MESSAGES</h5>
                <p id="p-left-col">willrbot</p>
                <p id="p-left-col">will (you)</p>
                <p id="p-left-col">aldo</p>
                <p id="p-left-col">roger</p>
                <p id="p-left-col">mitchell</p>
              </Col>
            </Row>
            
            <NewRoom id="left-background" handleOnChange={this.handleOnChange} handleNewRoom={this.handleNewRoom} value={this.state.input}/>

          </ListGroup>
        </Col>
      </div>
    )

  }

}

function mapStateToProps(state, ownProps) {
 return { rooms: state.rooms, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom: roomActions.fetchRoomData, newRoom: roomActions.newRoom, fetchRoomList: roomActions.fetchRoomList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
