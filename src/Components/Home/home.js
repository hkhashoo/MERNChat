import logo from './showcase.svg'
function Home(){
	
	return(
		<section className = "p-4">
			<div className = "container">
				<div className = "d-sm-flex align-items-center justify-contents-between">
					<div className ="fltext">
						<h1>Welcome to <span className = "text-warning">React App</span></h1>
						<p className = "lead">
							Hey there! Welcome on my journey to learn react integrated with bootstrap. Feel free to look around and mess with things.
						</p>
						
						<p> This project is mainly me trying to build a react chat application. Nothing too fancy, just some easy stuff and then building upon it as I go.
						</p>
					</div>
					
					<div className = "flImg">
						<img src = {logo} className = "img-fluid " alt = "Contains paint tool kit"></img>
					</div>
				</div>
			</div>
		</section>
	)
	
}

export default Home