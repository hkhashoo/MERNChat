import React from 'react'
import fetch from 'node-fetch'
import {Link} from 'react-router-dom'

class Login extends React.Component{
	
	constructor(props, context){
		super(props, context);
		this.state = {
			uname : "",
			pword : "", 
			message : "",
			messageStyle : ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleChange(evt){
		
		this.setState({message : ''});
		
		if(evt.target.type === "email")
			this.setState({
				uname : evt.target.value
			})
			
		else
			this.setState({
				pword : evt.target.value
			})
	}
	
	handleFormSubmit(evt){
		
		//Do pre-post checks----
		
		if(this.state.uname === "" || this.state.pword === ""){
			this.setState({message : 'Please enter the required information', messageStyle : "mt-3 text-center text-danger"})
			
			return;
		}
		
		fetch('http://192.168.29.156:1000/login', {
		  method: 'POST',
		  mode : 'cors',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(this.state),
		})
		.then(response => response.json())
		.then(result => {
			if(result.login === 0)
			this.setState({message : 'Invalid Credentials', messageStyle : 'mt-3 text-center text-danger'})
		
			else if(result.login === 1)
			{
				this.setState({message : 'Login Successfull. Redirecting...', messageStyle : 'mt-3 text-center text-success'})
				
				setTimeout(
				()=>{
					this.props.setLogin(result.login, result.name, this.state.uname)
				}
				,500
				)
			}
		})
		.catch(error => {
		  console.error(error);
		});
	}
	
	render(){
		return(
			<section className = "p-4">
				<div className = "container">
					<div className = "row align-items-center justify-contents-between">
						<div id = "left-side" className = "col-md-6">
							<div id = "form">
								<div className = "h2 mb-3">
									Login
								</div>
									<input type = "email" className = "form-control mb-3" placeholder = "Email" onChange = {this.handleChange} value = {this.state.uname}></input> 
									
									<input type = "password" className = "form-control mb-3" placeholder = "Password" onChange = {this.handleChange} value = {this.state.pword}></input>
									
									<button type = "button" className = "btn btn-md btn-outline-success" onClick = {this.handleFormSubmit}>Login</button>
							</div >
							
							<div className = {this.state.messageStyle}>{this.state.message}</div>
							
							<div id = "more-tools" className = "mt-3 p-2">
								<p>New Here? 
									<Link to = "/register" className = "link-success ms-2">Register</Link>
								</p>
								
							</div>
						</div>
						
						<div className = "col-md-6 text-center" id = "text">
							<i className = "bi bi-shield-fill-check h1"></i>
							<p className = "lead">Your information is safe.</p>
							<hr/>
							<p className = "mt-3">No need to worry, all your information is kept in safe, encoded format and is not sold to third party websites. No backdoors! </p>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Login