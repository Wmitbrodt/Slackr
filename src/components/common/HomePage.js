import React, { Component } from 'react'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'
import { InputGroup, Button, PageHeader, FormGroup, FormControl } from 'react-bootstrap'


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
      <div className='container'>
       <PageHeader> What's up Doc? Got a name??? </PageHeader>
          <form onSubmit={this.handleOnSubmit}>
            <FormGroup>
              <InputGroup value={this.state.input}>
               <FormControl onChange={this.handleOnChange} />
                <br/><br/>
               <Button bsStyle="danger" type='submit'> Go! </Button>
              </InputGroup>
            </FormGroup>
          </form>
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
