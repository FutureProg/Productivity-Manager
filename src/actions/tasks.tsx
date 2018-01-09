import {createAction} from 'redux-actions';

import {TaskObject,StepObject} from '../types';
import * as constants from '../constants';

export interface ADD_TASK {
	type: constants.ADD_TASK;
	payload: TaskObject;
}

export interface MARK_TASK_DONE {
	type: constants.MARK_TASK_DONE;
	payload:TaskObject;
}

export interface DELETE_TASK {
	type: constants.DELETE_TASK;
	payload: number;
}

export interface MOVE_TASK {
	type: constants.MOVE_TASK;
	payload: {
		index: number;
		topic_col: number;
		nIndex: number;		
		movingDown: boolean;
	}
}

export interface UPDATE_TASK{
	type: constants.UPDATE_TASK;
	payload: {
		index: number;
		newData: TaskObject;
	};
}

export interface MARK_STEP_AS_DONE{
	type: constants.MARK_STEP_AS_DONE;
	payload: {
		taskIndex: number;
		stepIndex: 	number;
	};
}

export const addTask = createAction(constants.ADD_TASK,
	(column: number, taskname: string,label:string="",steps:StepObject[] = [])=>({topic_col: column,text:taskname,done:false,label,steps})
);

export const updateTask = createAction(constants.UPDATE_TASK,(index:number,newData:TaskObject)=>({index,newData}));

export const markStepAsDone = createAction(constants.MARK_STEP_AS_DONE,(taskIndex:number,stepIndex:number)=>({taskIndex,stepIndex}));

export const markTaskAsDone = createAction(constants.MARK_TASK_DONE);

export const deleteTask = createAction(constants.DELETE_TASK,(index:number)=>index);

export const moveTask = createAction(constants.MOVE_TASK,(index:number,topic_col:number,nIndex:number,movingDown:boolean)=>({index,topic_col,nIndex,movingDown}));

export type TaskAction = MARK_STEP_AS_DONE | ADD_TASK | MARK_TASK_DONE | DELETE_TASK | MOVE_TASK | UPDATE_TASK;