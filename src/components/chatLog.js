import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import ChatDetail from './chatDetail'
import RoomsContainer from './containers/roomsContainer'

export default (props) => {
  const messages = props.messages.map ( (message) => {

    return ( <ChatDetail user={message.user} message={message.content} image={message.image || ''}/> ) })

  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <RoomsContainer />
          <br/><br/><br/><br/><br/>
             <Col md={8} Col mdPull={2} xs={8}>
                {messages}
              </Col>
         </Row>
      </Grid>
    </div>
  )
}
