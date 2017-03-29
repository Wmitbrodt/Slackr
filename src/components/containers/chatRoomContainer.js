import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import { connect } from 'react-redux'


class ChatRoomContainer extends Component {
  constructor(props) {
    super()
  }

  render() {
    const rooms = this.props.rooms.map( (room) => {
      return (
        <ListGroupItem onClick={()=> { console.log('well, alright, alright')}}>
          {room.title}
        </ListGroupItem>
      )
    })
    return (
      <div >
        <Col xs={4} mdPull={1}>
          <ListGroup>
            {rooms}
          </ListGroup>
        </Col>
      </div>
    )

  }

}

function mapStateToProps(state, ownProps) {
  return { rooms: state.rooms }
}
export default connect(mapStateToProps)(ChatRoomContainer)
