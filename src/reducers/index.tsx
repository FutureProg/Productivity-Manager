import {combineReducers} from 'redux';

import {AddTopicModalAction, addTaskModalAction, TaskDetailModalAction, TopicDetailModalAction} from '../actions/modals';
import {TopicAction} from '../actions/topics';
import * as constants from '../constants';
import {StoreState,AddTopicModalState,TopicState, TaskState, AddTaskModalState, TaskDetailModalState, TaskObject, UserState, SystemState, TopicDetailModalState} from '../types';
import { TaskAction } from '../actions/tasks';
import { UserActions } from '../actions/user';
import { SystemActions } from '../actions/system';

export function system(state: SystemState, action: any): SystemState{
	if(!state){
		return {
			syncStatus: {
				error: false,
				needsSync: false,
				syncing: false
			}		
		}
	}
	switch(action.type){
		case constants.SYNC_PULL:
		return {
			...state,
			syncStatus:{
				...state.syncStatus,				
				lastSyncTime: action.payload.timestamp
			}
		}
		case constants.SYNC_SUCCESS:
		return {
			...state,
			syncStatus:{
				...state.syncStatus,
				error: false,
				needsSync: false,
				syncing: false,
				lastSyncTime: action.payload
			}
		}
		case constants.SYNC_FAILURE:
		return {
			...state,
			syncStatus:{
				...state.syncStatus,
				error: true,
				needsSync: true,
				syncing: false
			}
		}		
		case constants.REQUEST_SYNC:
		return {
			...state,
			syncStatus:{
				...state.syncStatus,
				syncing: true
			}
		}
		case constants.CHANGES_MADE:
		case constants.ADD_TASK:
		case constants.ADD_TOPIC:
		case constants.UPDATE_TASK:
		case constants.MOVE_TASK:
		case constants.MARK_STEP_AS_DONE:
		case constants.MARK_TASK_DONE:
		case constants.DELETE_TASK:
		case constants.DELETE_TOPIC:		
		return {
			...state,
			syncStatus:{
				...state.syncStatus,
				needsSync: true
			}
		}
		default: 		
		return state;
	}	
}

export function tasks(state: TaskState, action: TaskAction | SystemActions): TaskState{
	if(!state){
		return {
			tasks: []
		}
	}
	switch(action.type){
		case constants.ADD_TASK:
		return {
			tasks: [
				...state.tasks,
				action.payload
			]
		}
		case constants.SYNC_PULL:
		return {
			tasks: action.payload.tasks.tasks? [...action.payload.tasks.tasks]:[]
		}
		case constants.MARK_STEP_AS_DONE:
		const tIndex = action.payload.taskIndex;
		const sIndex = action.payload.stepIndex;		
		return {			
			tasks:[
				...state.tasks.slice(0,action.payload.taskIndex),
				{
					...state.tasks[tIndex],
					steps:[
						...state.tasks[tIndex].steps.slice(0,sIndex),
						{
							...state.tasks[tIndex].steps[sIndex],
							done: true
						},
						...state.tasks[tIndex].steps.slice(sIndex+1),
					]
				},
				...state.tasks.slice(action.payload.taskIndex+1),				
			]
		}
		case constants.UPDATE_TASK:
		return {
			tasks:[
				...state.tasks.slice(0,action.payload.index),
				{
					...state.tasks[action.payload.index],
					...action.payload.newData
				},
				...state.tasks.slice(action.payload.index+1)
			]
		}
		case constants.MARK_TASK_DONE:
		return {
			tasks: state.tasks.map((item)=>{
				if(item.text == action.payload.text && item.topic_col == action.payload.topic_col){
					return {
						...item,
						done: true
					};
				}
				return item;
			})
		}	
		case constants.DELETE_TASK:				
		return {
			tasks: [
				...state.tasks.slice(0,action.payload),
				...state.tasks.slice(action.payload+1)
			]			
		}
		case constants.MOVE_TASK:	
		if(action.payload.nIndex === action.payload.index) break;
		const {index, nIndex, topic_col,movingDown} = action.payload;				
		var movedTask = state.tasks[index] as TaskObject;
		movedTask.topic_col = topic_col;
		var nTaskList = [
			...state.tasks.slice(0,index),
			...state.tasks.slice(index+1)
		];				
		if(movingDown){
			nTaskList = [
				...nTaskList.slice(0,nIndex-1),
				movedTask,
				...nTaskList.slice(nIndex-1)
			]
		}else{
			nTaskList = [
				...nTaskList.slice(0,nIndex),
				movedTask,
				...nTaskList.slice(nIndex)
			]
		}							
		return {
			tasks: nTaskList
		}
	}
	return state;
}

export function topics(state: TopicState, action: TopicAction | SystemActions): TopicState{	
	if(!state){
		return {
			cards: []
		}
	}
	switch(action.type){
		case constants.ADD_TOPIC:
		return {
			cards: [
				...state.cards,
				{text: action.payload}
			]
		}	
		case constants.SYNC_PULL:
		return {
			cards: 	action.payload.topics.cards? [...action.payload.topics.cards]:[]
			
		}	
	}
	return state;
}

export function taskDetailModal(state: TaskDetailModalState, action: TaskDetailModalAction): TaskDetailModalState{
	if(!state){
		return {
			visible: false,
			taskIndex: -1
		}
	}		
	switch(action.type){
		case constants.OPEN_TASK_DETAIL_MODAL:
		console.log(action.payload);
		return {
			visible: true,
			taskIndex: action.payload
		}
		case constants.CLOSE_TASK_DETAIL_MODAL:
		return {
			visible: false,
			taskIndex: -1
		}
	}
	return state;
}

export function topicDetailModal(state: TopicDetailModalState, action: TopicDetailModalAction): TopicDetailModalState{
	if(!state){
		return {
			visible: false,
			topicIndex: -1
		}
	}
	switch(action.type){
		case constants.OPEN_TOPIC_DETAIL_MODAL:
		return {
			...state,
			visible: true,
			topicIndex: action.payload
		}
		case constants.CLOSE_TOPIC_DETAIL_MODAL:
		return {
			...state,
			visible: false,
			topicIndex: -1
		}
		default: 
		return state;
	}
}

export function addTaskModal(state: AddTaskModalState, action: addTaskModalAction): AddTaskModalState{
	if(!state){
		return {
			visible: false,
			currentColumn: -1
		}
	}	
	switch(action.type){
		case constants.OPEN_ADD_TASK_MODAL:
		return {
			...state,
			visible: true,
			currentColumn: action.payload			
		}
		case constants.CLOSE_ADD_TASK_MODAL:
		return {...state,visible: false}
	}
	return state;
}

export function addTopicModal(state: AddTopicModalState, action: AddTopicModalAction): AddTopicModalState{			
	if(!state){
		return {
			visible: false,			
		}
	}
	switch(action.type){
		case constants.OPEN_ADD_TOPIC_MODAL:		
		return {			
			...state,							
			visible: true		
		}
		case constants.CLOSE_ADD_TOPIC_MODAL:
		return {		
			...state,				
			visible: false			
		}
		case undefined:
		return {
			...state,
			visible: false
		}		
	}
	return state;
}

export function user(state: UserState, action:UserActions): UserState{
	if(!state){
		return {};
	}
	switch(action.type){
		case constants.SIGN_UP_SUCCESS:
		case constants.LOGIN_SUCCESS:
		return action.payload;		
	}
	return state;
}

export default combineReducers<StoreState>({
	topics,
	addTopicModal,
	tasks,
	addTaskModal,
	taskDetailModal,
	user,
	system
});

