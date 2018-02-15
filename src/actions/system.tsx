import {createAction} from 'redux-actions';
import * as constants from '../constants';
import { StoreState, TopicState, TaskState, SystemState } from '../types/index';
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
	payload: number;	
}

export interface SYNC_PULL{
	type: constants.SYNC_PULL;
	payload: {
		_id:string,
		topics: TopicState,
		tasks: TaskState,
		user_id:string,
		timestamp:number
	}
}


export let notifyChangesMade = createAction(constants.CHANGES_MADE);
let sync = createAction(constants.REQUEST_SYNC);
let syncFailure = createAction(constants.SYNC_FAILURE,(msg:string)=>(msg));
let syncSuccess = createAction(constants.SYNC_SUCCESS, (timestamp:number)=>(timestamp));
let syncPull = createAction(constants.SYNC_PULL,(payload:any)=>(payload));

export let grabSync = (dispatch:Dispatch<StoreState>) =>()=>{
	fetch("http://159.203.63.171:3000/sync/"+Cookies.get("user_id"),{
		method: "GET",
		credentials: 'same-origin'
	})
	.then((response: Response)=>{
		return response.json();
	})
	.then((response:JSON)=>{
		dispatch(syncPull(response));
	});
}

export let sendSync = (dispatch:Dispatch<StoreState>) =>(system: SystemState, topics: TopicState, tasks: TaskState)=>{
	fetch("http://159.203.63.171:3000/sync",{
		method: "POST",
		headers: {
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
			user_id: Cookies.get("user_id"),
			data:{
				topics,
				tasks
			}
		}),
		credentials: 'same-origin'
	})
	.then((response:Response)=>{
		return response.json();
	})
	.then((response:JSON)=>{		
		dispatch(syncSuccess(response['timestamp']));
	})
	.catch((error:Error)=>{
		console.log(error);
		dispatch(syncFailure(error.message));
	})
}

export let requestSync = (dispatch:Dispatch<StoreState>) =>(system: SystemState, topics: TopicState, tasks: TaskState)=>{
	dispatch(sync());
	fetch('http://159.203.63.171:3000/lastUpdateTime/'+Cookies.get("user_id"),{
		method: "GET",					
		credentials: 'same-origin'		
	})
	.then((response:Response)=>{
		return response.json();
	})
	.then((json:JSON)=>{
		var time = json["timestamp"];
		var lastTime = system.syncStatus.lastSyncTime;
		if((lastTime && time > lastTime) || !lastTime){ // out of sync, grab
			grabSync(dispatch)();
		}else{ // out of sync, send
			sendSync(dispatch)(system,topics,tasks);
		}	
	})
	.catch((error:Error)=>{
		console.log(error);
		dispatch(syncFailure(error.message));
	})
}

export type SyncActions = SYNC_PULL| SYNC_SUCCESS | SYNC_FAILURE | REQUEST_SYNC | CHANGES_MADE;

export type SystemActions = SyncActions;