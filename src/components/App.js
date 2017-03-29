import React from 'react'
import ChatContainer from './containers/ChatContainer'
import HomePage from './common/HomePage'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      user: ''
    }

    this.updateUser = this.updateUser.bind(this)
  }

  updateUser(user){
    this.setState({ user })
    localStorage.setItem('user', this.state.input)
  }

  currentUser(){
   if (localStorage.getItem('user') == null){
    return false
   }
    return true
  }
  render() {
    return (
      <div>
        {this.currentUser() ? <ChatContainer /> : <HomePage newUser={this.updateUser}/>}
      </div>
    )
  }
}
