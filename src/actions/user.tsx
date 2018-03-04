import {createAction} from 'redux-actions';
import {Dispatch} from 'redux';
import * as Cookies from 'es-cookie';
import 'whatwg-fetch';

import * as constants from '../constants';
import { UserState, StoreState } from '../types/index';

export interface REQUEST_LOGIN{
	type: constants.LOGIN;
	payload: {
		email: string;
		pass: string;		
	}
}
export interface LOGIN_SUCCESS{
	type: constants.LOGIN_SUCCESS;
	payload: UserState;
}
export interface LOGIN_FAILURE{
	type: constants.LOGIN_FAILURE;
	payload: string;
}

let requestingLogin = createAction(constants.LOGIN, (email: string, pass: string)=>({email,pass}));
export let loginSuccess = createAction(constants.LOGIN_SUCCESS, (user:UserState)=>user);
export let loginFailure = createAction(constants.LOGIN_FAILURE, (msg:string)=>msg);

export let requestLogin = (dispatch: Dispatch<StoreState>)=>(email:string, pass:string)=>{	
	dispatch(requestingLogin(email,pass));
	fetch('https://159.203.63.171:3000/login',{
		method: "POST",
		body: JSON.stringify({
			email,
			pass
		}),
		headers: {
			'Content-Type': "application/json",
			'Access-Control-Allow-Origin':"*"
		},
		credentials: 'same-origin'
	}).then((response: Response) =>{
		if(response.status === 200){
			return response.json();
		}else{
			return response.text();
		}
	})
	.then((json:JSON)=>{
		let usr = 	json as UserState;
		Cookies.set("user_id",usr._id!);			
		dispatch(loginSuccess(usr));
	})
	.catch((error:Error)=>{
		console.log(error);
		dispatch(loginFailure(error.message));
	})
}

export interface SIGN_UP_REQUEST {
	type: constants.SIGN_UP;
	payload: {
		fname: string;
		lname: string;
		email: string;
		pass: string;		
	}
}
export interface SIGN_UP_SUCCESS {
	type: constants.SIGN_UP_SUCCESS;
	payload: UserState;
}
export interface SIGN_UP_FAILURE {
	type: constants.SIGN_UP_FAILURE;
	payload: string;
}



export let requestSignup = (dispatch:Dispatch<StoreState>) => (fname: string, lname: string,email:string,pass:string)=>{
	dispatch(requestingSignup());
	fetch('https://159.203.63.171:3000/user',{
		method: "POST",
		body: JSON.stringify({fname,lname,email,pass}),
		headers: {
			'Content-Type': "application/json",
			'Access-Control-Allow-Origin':"*"
		},
		credentials: 'same-origin'
	}).then((response: Response) =>{
		if(response.status === 200){
			return response.json();
		}else{
			return response.text();
		}
	})
	.then((json:JSON)=>{
		let usr = 	json as UserState;
		Cookies.set("user_id",usr._id!);			
		dispatch(signupSuccess(usr));
	})
	.catch((error:Error)=>{
		console.log(error);
		dispatch(signupFailure(error.message));
	})
};
export let requestingSignup = createAction(constants.SIGN_UP);
export let signupFailure = createAction(constants.SIGN_UP_FAILURE,(msg:string)=>msg);
export let signupSuccess = createAction(constants.SIGN_UP_SUCCESS,(user:UserState)=>user);

export type UserActions = SIGN_UP_FAILURE | SIGN_UP_REQUEST | SIGN_UP_SUCCESS | LOGIN_FAILURE | LOGIN_SUCCESS | REQUEST_LOGIN;