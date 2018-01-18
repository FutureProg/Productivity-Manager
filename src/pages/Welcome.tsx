import * as React from 'react';

import './welcome.css';

class WelcomeScreen extends React.Component{

	render(){
		const renderLogin = (
			<div style={{textAlign:'left',paddingLeft:'20px',borderRight:'1px solid #ccc'}}>
				<h2>Login</h2>
				<label>email</label><br/><input type="text" /><br/>		
				<label>password</label><br/><input type="password"/><br/>
				<button className="neutral">Login</button>
			</div>
		);
		const renderSignup = (
			<div style={{textAlign:'left',paddingLeft: '20px'}}>
				<h2>Sign up</h2>
					<div style={{display:'grid',gridTemplateColumns:"1fr 1fr",gridGap:"10px"}}>
						<label>First Name</label>
						<label>Last Name</label>
						<input type="text"/>
						<input type="text"/>
					</div>
				<label>email</label><br/><input type="email" style={{width:"300px"}} /><br/>		
				<label>password</label><br/><input type="password"/><br/>
				<label>confirm password</label><br/><input type="password"/><br/>
				<button className="neutral">Join us</button>
			</div>
		)

		return (
			<div id="welcome-page">
				<div className="container">
					<h1>Stick2It</h1>
					<div id="option-area">
						{renderLogin}
						{renderSignup}
					</div>
				</div>
			</div>
		)
	}

}

export default WelcomeScreen;