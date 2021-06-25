import React from 'react'
import fetch from 'node-fetch'
import {Link} from 'react-router-dom'

const serverURL = 'http://192.168.29.156:1000/register'

class Register extends React.Component{
	
	constructor(props, context){
		super(props, context);
		
		this.state = {
			'name' : '',
			'mail' : '',
			'pword' : '',
			're_pword' : '',
			serverMessage : '',
			alertStyle : 'mt-3 text-center'
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(evt){
		this.setState({serverMessage : ''})
		let newObj = {}
		newObj[evt.target.id] = evt.target.value;
		this.setState(newObj);
	}
	
	handleSubmit(evt){
		
		//Do pre-submit checks
		
		if(this.state['pword'] === '' || this.state['name'] === '' || this.state['name'] === '' || this.state['mail'] === '') {
			this.setState({
				serverMessage : "All fields are necessary",
				alertStyle : "mt-3 text-center text-danger"
			})
			
			return;
		}
		
		
		else{
			
			if(this.state['name'].length > 20){
				this.setState({
					serverMessage : 'Name too long!',
					alertStyle : 'mt-3 text-center text-warning'
				})
			}
			
			else if(this.state['pword'] === this.state['re_pword']) { // Password check-----------
				
				if(this.state['pword'].length < 8){ //Password Length Check---------
					this.setState({
						serverMessage : 'Password should be more than 8 characters',
						alertStyle : 'mt-3 text-center text-warning'
					})
					
					return;
				} 
				
				let re = /\S+@\S+\.\S+/; //Email Check------------
				if(re.test(this.state['mail'])){
					
					//Push to server----------------------
					let rawReq = JSON.parse(JSON.stringify(this.state)); //DeepCopy
					delete rawReq.serverMessage;
					delete rawReq.alertStyle;

					fetch(serverURL, 
						{
							headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
							},
							method: "POST",
							body: JSON.stringify(rawReq)
						}
					)
					.then(response => response.json())
					.then(result => {
					  this.setState({
						  serverMessage : result.message, 
						  alertStyle : Register.getStyle(result.type)
					  })
					})
					.catch(error => {
					  console.error(error);
					});
					
					
				}
				
				else{
					
					this.setState({
						serverMessage: 'Incorrect Email.',
						alertStyle : 'mt-3 text-center text-danger'
					})
					
				}
							
			}
			
			else{
				
				this.setState({
					serverMessage : 'Passwords do not match.',
					alertStyle : 'mt-3 text-center text-danger'
				})
			}
				
		}
		
		
		
	}
	
	static getStyle(code){
		if(code === 'Success') return 'mt-3 text-center text-success'
		
		if(code === 'Error') return 'mt-3 text-center text-danger'
		
		if(code === 'Alert') return 'mt-3 text-center text-warning'
	}
	
	render(){
		return(
		<section className = "p-4">
			<div className = "container">
				<div className = "row align-items-center justify-contents-between gy-4">
					<div className = "col-md-6">
						<div id = "main_form">
							<div className = "h2"> Register </div>
							<div id = "form-text" className = "mt-3">
								<input type = "text" className = "form-control mb-3" id = "name" placeholder = "Name" onChange = {this.handleChange} value = {this.state['name']}></input>
								<input type = "email" className = "form-control mb-3" id = "mail" placeholder = "Email Id" onChange = {this.handleChange} value = {this.state['mail']}></input>
								<input type = "password" className = "form-control mb-3" id = "pword" placeholder = "Password" onChange = {this.handleChange} value = {this.state['pword']}></input>
								<input type = "password" className = "form-control mb-3" id = "re_pword" placeholder = "Re-enter password" onChange = {this.handleChange} value = {this.state['re_pword']}></input>
							</div>
							
							<div id = "form-message" className = {this.state.alertStyle}>
								<div className = "h-5">
								{this.state.serverMessage}
								</div>
							</div>
							
							<div id = "form-btn" className = "mt-4">
								<button type = "button" className = "btn btn-md btn-outline-success" onClick = {this.handleSubmit} >Register</button>
								
								<Link to = '/login' className = "btn btn-md btn-outline-secondary ms-2">Return to Login</Link>
							</div>
						</div>
					</div>
					
					<div className = "col-md-6 text-center" id = "text">
							<i className = "bi bi-emoji-laughing h1"></i>
							<p className = "lead">No Hassle Experience.</p>
							<hr/>
							<p className = "mt-3">We always want our customer experience to be positive. Thats why we want you to register easily. </p>
					</div>
				</div>
			</div>
		</section>
		)
	}
	
}

export default Register