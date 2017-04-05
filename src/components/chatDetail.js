import React from 'react'
import { Col, Alert, Panel, Image, Glyphicon } from 'react-bootstrap'

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

      <div className="media">
        <div className="media-body">
          <h4 className="media-heading"><Glyphicon glyph="user" /> {props.user}</h4>
          {props.message}
          {imageView || ''}
        </div>
    </div>

  )
}
