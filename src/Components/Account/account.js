import React from 'react'
import {Redirect} from 'react-router-dom'
class Account extends React.Component{
	
	constructor(props, context){
			super(props, context)
			this.logout = this.logout.bind(this)
		}
	
	logout(){
			this.props.setLog(0, '', '')
		}
	
	render(){
		
		return(
		
			
			<section className = "p-4">
			{
				(this.props.userdata.loggedIn)?
				<div className = "container">
					<div className = "card p-4 border-secondary bg-dark text-light">
						<h3 className = "card-title">My Account</h3>
						<hr className = "bg-dark"></hr>
					<div className ="card-body">
						<div className = "lead mt-3">
						Name :
						</div>
						<div id = "name">{this.props.userdata.userName}</div>
						
						
						<div className = "lead mt-3">
						Email : 
						</div>
						
						<div id = "mail">{this.props.userdata.userId}</div>
						
						<button type = "button" className = "btn btn-md btn-outline-light mt-3" onClick = {this.logout}>Logout</button>
						</div>
					</div>
				</div>
				:
				<Redirect to = '/login'></Redirect>
			}
			</section>	
			
		)
	}
}

export default Account