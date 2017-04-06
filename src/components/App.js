import React from 'react'
import ChatContainer from './containers/ChatContainer'
import HomePage from './common/HomePage'
import { connect } from 'react-redux'
import '../style/css/style.css'




class App extends React.Component {
  constructor(props){
    super(props)
    this.currentUser = this.currentUser.bind(this)

  }


  currentUser(){
   return !!this.props.user
  }
  render() {
    return (
      <div>
        {this.currentUser() ? <ChatContainer /> : <HomePage />}
      </div>
    )
  }
}


function mapStateToProps(state){
 return { user: state.user }
}

export default connect(mapStateToProps)(App)
