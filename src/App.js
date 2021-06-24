import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './customcss/styles.css'
import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Navigation from './Components/Navbar/navbar.js'
import Home from './Components/Home/home.js'
import Chat from './Components/Chat/chat.js'
import Login from './Components/Login/login.js'
import Register from './Components/Register/register.js'
import Account from './Components/Account/account.js'
class App extends React.Component {
  
  constructor(props, context){
	  super(props, context);
	  
	  this.state = {
		  loggedIn : 0, 
		  userName : '',
		  userId : ''
	  }
	  
	  this.setLoggedInState = this.setLoggedInState.bind(this)
  }
  
  setLoggedInState(loggedIn, userName, userId){
	this.setState({loggedIn : loggedIn, userName : userName, userId : userId})
  }
  
  render(){
		return (
		<div>
			<Router>
				<div id = "navbar">
					<Navigation loginInfo = {this.state}/>
				</div>
				
				<div id = "content">
					<Route exact path = "/">
						<Home/>
					</Route>
					
					<Route exact path = "/chat">
						<Chat/>
					</Route>
					
					<Route exact path = '/login'>
					{ this.state.loggedIn ? <Redirect to = '/'/> : <Login setLogin = {this.setLoggedInState}/> }
					</Route>
					
					<Route exact path = '/register'>
						<Register/>
					</Route>
					
					<Route exact path = '/account'>
						<Account setLog = {this.setLoggedInState} userdata = {this.state}/>
					</Route>
				</div>
			</Router>
		</div>
	  )  
  }
  
}

export default App;
