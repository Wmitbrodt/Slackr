import React from 'react'
import { Col, Alert, Panel, Image, Glyphicon } from 'react-bootstrap'
import Moment from 'moment';


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
          <h4 className="media-heading"><img src="https://maxcdn.icons8.com/Color/PNG/24/Mobile/slack-24.png" title="Slack" width="32"/><span id="slack-span"> {props.user} </span></h4>
          <div className="media-padding">
            {props.message}
            {imageView || ''}
          </div>
        </div>
        
    </div>

  )
}
