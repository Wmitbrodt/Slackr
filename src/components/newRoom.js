import React from 'react'
import { Button, FormGroup, FormControl, ControlLabel, ListGroupItem, ListGroup, Col } from 'react-bootstrap'

export default (props) => {
  return (
    <ListGroupItem>
      <form>
        <FormGroup>
          <ControlLabel> Create a new Room </ControlLabel>
          <FormControl onChange={props.handleOnChange} value={props.value}>
          </FormControl>
          <br/>
          <Button
            className="btn-main"
            bsStyle="primary"
            bsSize="small"
            type="submit"
            onClick={props.handleNewRoom}
            block> Create </Button>
        </FormGroup>
      </form>
    </ListGroupItem>
  )


}
