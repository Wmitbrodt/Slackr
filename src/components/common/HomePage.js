import React, { Component } from 'react'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'
import { InputGroup, Button, PageHeader, FormGroup, FormControl, Navbar } from 'react-bootstrap'
import '../../style/css/style.css'

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
       <PageHeader> What's up Doc? Got a name??? </PageHeader>
          <form onSubmit={this.handleOnSubmit}>
            <FormGroup>
              <InputGroup value={this.state.input}>
               <FormControl onChange={this.handleOnChange} />
                <br/><br/>
               <Button className="btn-custom" type='submit'> Let's do this. </Button>
              </InputGroup>
            </FormGroup>
          </form>

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
