//This is our react application

import React from 'react'

class Chat extends React.Component{
	
	constructor(props, context){
		super(props, context)
		
		this.state = {}
		
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(){
		
	}
	
	handleClick(){
		
	}
	
	render(){
		
		return(
		<section className = "p-4">
			<div className = "container">
			<div className = "row g-3">
				<div className = "h2 text-warning col-md-5 mt-3">Global Chat</div>
				<div className = "" id = "chat_component_main_container">
				</div>
			</div>
			</div>
		</section>
		)
	}
	
}

export default Chat