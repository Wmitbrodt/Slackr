import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Col, Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as roomActions from '../../actions/roomActions'
import * as messageActions from '../../actions/messagesActions'
import { bindActionCreators } from 'redux'
import NewRoom from '../newRoom'
import FontAwesome from 'react-fontawesome'

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
    const {activeRoom} = this.props
    const rooms = this.props.rooms.map((room) => {
      const isSelected = (room._id == activeRoom.id) ? "selected-channel" : ""
      return (
        <ListGroupItem className={isSelected} key={room.title} onClick={this.handleOnClick.bind(null, room)}>
          <FontAwesome name='hashtag' /> {room.title}
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
                 <h4 id="left-col-header">codecore <FontAwesome name='angle-down' /><FontAwesome name='bell-o' /></h4>

                 <h5 id="left-col-header"><FontAwesome name='circle' /> {this.props.user}</h5>
                 <h5 id="left-col-header"><FontAwesome name='commenting-o' /> All Threads</h5>
               </Col>
            </Row>
            <Row>
              <Col mdPush={1} >
                <h5 id="left-col-header">CHANNELS (7) <FontAwesome name='plus-circle' /></h5>
              </Col>
            </Row>
            {rooms}
            <br/>
            <Row>
              <Col mdPush={1} >
                <h5 id="left-col-header">DIRECT MESSAGES <FontAwesome name='plus-circle' /></h5>
                <p id="p-left-col"><FontAwesome name='heart' /> willrbot</p>
                <p id="p-left-col"><FontAwesome name='circle' /> will (you)</p>
                <p id="p-left-col"><FontAwesome name='circle-o' /> aldo</p>
                <p id="p-left-col"><FontAwesome name='circle' /> roger</p>
                <p id="p-left-col"><FontAwesome name='circle' /> billy</p>
              </Col>
            </Row>

            <NewRoom id="left-background-bottom" handleOnChange={this.handleOnChange} handleNewRoom={this.handleNewRoom} value={this.state.input}/>
          </ListGroup>
        </Col>
      </div>
    )

  }

}

function mapStateToProps(state, ownProps) {
 return { rooms: state.rooms, user: state.user, activeRoom: state.activeRoom}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom: roomActions.fetchRoomData, newRoom: roomActions.newRoom, fetchRoomList: roomActions.fetchRoomList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
