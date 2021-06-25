import { Link } from 'react-router-dom'
import React from 'react'
class Navigation extends React.Component{
	
	render(){
		return(
			<nav className = "navbar navbar-expand-md navbar-dark bg-dark sticky-top py-3">
					<div className = "container">
						<Link to = '/' className = "navbar-brand">React App!</Link>
						
						<button className = "navbar-toggler" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navbar-main">
							<span className = "navbar-toggler-icon"></span>
						</button>
						
						<div className = "collapse navbar-collapse" id = "navbar-main">
							<ul className = "navbar-nav">
								<li className = "nav-item">
									<Link to = '/' className = "nav-link">Home</Link>
								</li>
								
								<li className = "nav-item">
									<Link to = '/chat' className = "nav-link">Chat</Link>
								</li>
								{
								(this.props.loginInfo.loggedIn === 0) ? <li className = "nav-item">
								<Link to = '/login' className = "nav-link">Login</Link>
								</li> 
								:
								<li className = "nav-item dropdown">
									<Link to = '/account' className = "nav-link" >My Account
									</Link>
								</li>
								}
								
							</ul>
						</div>
					</div>
			</nav>
		)
	}
		
	
}

export default Navigation