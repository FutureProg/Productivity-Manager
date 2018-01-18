import * as React from 'react';

import './welcome.css';

class WelcomeScreen extends React.Component{

	render(){
		return (
			<div id="welcome-page">
				<div className="container">
					<h1>Stick2It</h1>
					<button className="neutral">Login</button><br/>
					<button className="neutral">Sign up</button>
				</div>
			</div>
		)
	}

}

export default WelcomeScreen;