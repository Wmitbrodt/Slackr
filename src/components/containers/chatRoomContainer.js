import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'


class ChatRoomContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Col xs={4} mdPull={1}
          <ListGroup>
            <ListGroupItem>events</ListGroupItem>
            <ListGroupItem>friday_lunches</ListGroupItem>
            <ListGroupItem>general</ListGroupItem>
          </ListGroup>
        </Col>
      </div>
    )
  }
}

export default ChatRoomContainer
