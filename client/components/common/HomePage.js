import React, { Component } from 'react'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'
import { InputGroup, Button, PageHeader, FormGroup, FormControl, Row, Col } from 'react-bootstrap'


class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSumbit.bind(this)

  }

  handleOnChange(ev){
    this.setState({input: ev.target.value})
    console.log(ev.target.value)
  }

  handleOnSumbit(ev){
    ev.preventDefault()
    this.props.newUser(this.state.input)
    this.setState({ input: ''})
  }



  render(){
    return (
    <div id="home">
      <div className="container">
        <Row id="home-row">
          <Col md={8} mdPush={2} xs={12}>
             <h1 id="home-h1"> Slackr </h1>
           </Col>
        </Row>
        <Row id="home-row">
          <Col md={6} mdPush={4} xs={12}>
            <form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <InputGroup value={this.state.input}>
                 <FormControl onChange={this.handleOnChange} />
                  <br/><br/>
                 <Button className="btn-custom" type='submit'>Chat</Button>
                </InputGroup>
              </FormGroup>
            </form>
          </Col>
       </Row>
     </div>
    </div>

    )
  }
}

function mapStateToProps(state, ownProps){
  return { user: state.user }
}

function mapDispatchToProps(dispatch){
 return {
   newUser: (user) => {
    dispatch(userActions.newUser(user))
  }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
