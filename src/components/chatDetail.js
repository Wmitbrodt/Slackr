import React from 'react'
import { Col, Alert, Panel, Image } from 'react-bootstrap'

export default (props) => {
  let imageView;

  if(props.image) {
    imageView = (
      <div>
        <Col xs={6} md={4}>
          <img className="image-rounded" src={props.image}  />
        </Col>
      </div>
    )
  }
   return (
    <div>
      <h5>{props.user}</h5>
        {props.message}
        {imageView || ''}
    </div>
  )
}
