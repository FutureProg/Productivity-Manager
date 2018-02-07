import * as React from 'react';
import {connect,Dispatch} from 'react-redux';

import './welcome.css';
import { requestSignup, requestLogin } from '../actions/user';
import { StoreState } from '../types/index';

interface State {
	loginError?: string;	
	signUpError?: string;
}

class WelcomeScreen extends React.Component<any,State>{

	private login_email: HTMLInputElement;
	private login_pass: HTMLInputElement;

	private su_fname: HTMLInputElement;
	private su_lname: HTMLInputElement;
	private su_email: HTMLInputElement;
	private su_pass: HTMLInputElement;
	private su_pass2: HTMLInputElement;

	constructor(props:any){
		super(props);
		this.login = this.login.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	componentWillMount(){
		this.setState({
			loginError: undefined,
			signUpError: undefined
		});
	}

	login(){
		console.log(this.login_email.validity);					
		if(this.login_email.validity.typeMismatch || this.login_email.value.length === 0){						
			this.setState({
				loginError: "Invalid email address"
			});		
			return;	
		}else{
			this.setState({
				loginError:undefined
			})
		}
		this.props.login(this.login_email.value,this.login_pass.value);		
	}

	signUp(){
		if(this.su_email.validity.typeMismatch || this.su_email.value.length === 0){
			this.setState({
				signUpError: "Invalid email address"
			});
			return;
		}else{
			this.setState({
				signUpError: undefined
			});			
		}
		if(this.su_pass.value !== this.su_pass2.value){
			this.setState({
				signUpError: "Passwords do not match"
			});
			return;
		}else{
			this.setState({
				signUpError: undefined
			});			
		}	
		var vals = {
			fname: this.su_fname.value,
			lname: this.su_lname.value,
			email: this.su_email.value,
			pass: this.su_pass.value
		}
		this.props.signUp(vals.fname,vals.lname,vals.email,vals.pass)
	}

	render(){
		const renderLogin = (
			<div style={{textAlign:'left',paddingLeft:'20px',borderRight:'1px solid #ccc'}}>
				<h2>Login</h2>
				<div className="error-label">{this.state.loginError}</div>
				<label>email</label><br/><input ref={(t:any)=>{this.login_email = t}} type="email" /><br/>		
				<label>password</label><br/><input ref={(t:any)=>{this.login_pass=t}} type="password"/><br/>
				<button className="neutral" onClick={this.login}>Login</button>
			</div>
		);
		const renderSignup = (
			<div style={{textAlign:'left',paddingLeft: '20px'}}>
				<h2>Sign up</h2>
				<div className="error-label">{this.state.signUpError}</div>
					<div style={{display:'grid',gridTemplateColumns:"1fr 1fr",gridGap:"10px"}}>
						<label>First Name</label>
						<label>Last Name</label>
						<input ref={(t:any)=>{this.su_fname = t}} type="text"/>
						<input ref={(t:any)=>{this.su_lname = t}} type="text"/>
					</div>				
				<label>email</label><br/><input type="email" ref={(t:any)=>{this.su_email=t}} style={{width:"300px"}} /><br/>		
				<label>password</label><br/><input ref={(t:any)=>{this.su_pass = t}} type="password"/><br/>
				<label>confirm password</label><br/><input ref={(t:any)=>{this.su_pass2 = t}} type="password"/><br/>
				<button className="neutral" onClick={this.signUp}>Join us</button>
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

let fstp = (dispatch: Dispatch<StoreState>) =>({
	signUp: dispatch(requestSignup),
	login: dispatch(requestLogin)
})

export default connect(null,fstp)(WelcomeScreen);