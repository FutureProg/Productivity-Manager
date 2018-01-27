import {createAction} from 'redux-actions';
import * as constants from '../constants';
import { StoreState, TopicState } from '../types/index';
import { Dispatch } from 'react-redux';
import * as Cookies from 'es-cookie';

import 'whatwg-fetch';

export interface CHANGES_MADE {
	type: constants.CHANGES_MADE;
}

export interface REQUEST_SYNC {
	type: constants.REQUEST_SYNC;
}

export interface SYNC_FAILURE {
	type: constants.SYNC_FAILURE;
	payload: string;
}

export interface SYNC_SUCCESS{
	type: constants.SYNC_SUCCESS;	
}

export let notifyChangesMade = createAction(constants.CHANGES_MADE);
let syncFailure = createAction(constants.SYNC_FAILURE,(msg:string)=>(msg));
let syncSuccess = createAction(constants.SYNC_SUCCESS);
export let requestSync = (dispatch:Dispatch<StoreState>) =>(topics: TopicState)=>{	
	fetch('http://159.203.63.171:3000/topics?user_id='+Cookies.get("user_id"),{
		method: "POST",	
		body: JSON.stringify(topics),
		headers:{
			'Content-Type':"application/json"			
		},
		credentials: 'same-origin'		
	})
	.then((response:Response)=>{
		return response.json();
	})
	.then((json:JSON)=>{
		dispatch(syncSuccess());
	})
	.catch((error:Error)=>{
		console.log(error);
		dispatch(syncFailure(error.message));
	})
}

export type SyncActions = SYNC_SUCCESS | SYNC_FAILURE | REQUEST_SYNC | CHANGES_MADE;

export type SystemActions = SyncActions;