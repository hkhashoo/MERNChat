//This is our react application

import React from 'react'
import {Link} from 'react-router-dom'
class Chat extends React.Component{
	
	constructor(props, context){
		super(props, context)
		
		this.state = {
			chatBox : '',
			chatForm : ''
		}
		
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	handleKeyPress(evt){
		if(evt.key === 'Enter')
		{
			this.handleClick();
			evt.target.focus();
		}
	}
	
	handleChange(evt){
		this.setState({chatForm : evt.target.value});
		
	}
	
	handleClick(evt){
		this.setState((prevState)=>{
			let name = this.props.userName
			return(
			{chatForm : '', chatBox : prevState.chatBox + '\n' + name + ' : '+ prevState.chatForm}
			) 
			})
	}
	
	render(){
		
		return(
		<section className = "p-4">
			<div className = "container">
			<div className = "row g-3">
				<div className = "h2 text-warning col-md-5 mt-3">Global Chat</div>
				<div className = "container" id = "chat_component_main_container">
					<div className = "row">
						<div className = "col-md-12">
							<div className = "container bg-body rounded shadow overflow-scroll chatBox">
								<pre>
								{this.state.chatBox}
								</pre>
							</div>
						</div>
					</div>
					
					
					{(this.props.loggedIn === 0)?
					<div className = "row mt-3">
						<div className = "col-12">
							<i className = "bi bi-shield-lock-fill h2 "></i>
							<span className = "ms-3">You need to be <Link to = '/login' className = "text-danger">logged </Link>in to chat!</span>
						</div>
					</div>
						:
					
					<div className = "row mt-3 align-items-center justify-contents-between gy-2">
						<div className = "col-md-2 text-dark">
						<i className = "bi bi-person-circle h2"></i>
						<span className = " ms-3">{this.props.userName}</span>
						
						</div>
						<div className = "col-8 ">
							<input className = "form-control" type = "text" onKeyDown = {this.handleKeyPress} onChange = {this.handleChange} value = {this.state.chatForm}></input>
						</div>
						
						<div className = "col-2">
							<button type = "button" className = "btn btn-md btn-outline-success" onClick = {this.handleClick}>Send</button>
						</div>
					</div>
					}
					
				</div>
			</div>
			</div>
		</section>
		)
	}
	
}

export default Chat