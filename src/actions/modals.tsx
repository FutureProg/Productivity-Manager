import {createAction} from 'redux-actions';

import * as constants from '../constants';

export interface OPEN_ADD_TOPIC_MODAL{
	type: constants.OPEN_ADD_TOPIC_MODAL;
}
export interface CLOSE_ADD_TOPIC_MODAL{
	type: constants.CLOSE_ADD_TOPIC_MODAL;
}

export let openAddTopicModal = createAction(constants.OPEN_ADD_TOPIC_MODAL);
export let closeAddTopicModal = createAction(constants.CLOSE_ADD_TOPIC_MODAL);

export type AddTopicModalAction = OPEN_ADD_TOPIC_MODAL | CLOSE_ADD_TOPIC_MODAL;

export interface OPEN_ADD_TASK_MODAL{
	type: constants.OPEN_ADD_TASK_MODAL;	
	payload: number;
}
export interface CLOSE_ADD_TASK_MODAL{
	type: constants.CLOSE_ADD_TASK_MODAL;
}

export let openAddTaskModal = createAction(constants.OPEN_ADD_TASK_MODAL);
export let closeAddTaskModal = createAction(constants.CLOSE_ADD_TASK_MODAL);
export type addTaskModalAction = OPEN_ADD_TASK_MODAL | CLOSE_ADD_TASK_MODAL;

export interface OPEN_TASK_DETAIL_MODAL{
	type: constants.OPEN_TASK_DETAIL_MODAL;
	payload: number; //index of the task being edited
}
export interface CLOSE_TASK_DETAIL_MODAL{
	type: constants.CLOSE_TASK_DETAIL_MODAL;
}

export let closeTaskDetailModal = createAction(constants.CLOSE_TASK_DETAIL_MODAL);
export let openTaskDetailModal = createAction(constants.OPEN_TASK_DETAIL_MODAL,(index:number)=>index);
export type TaskDetailModalAction = OPEN_TASK_DETAIL_MODAL | CLOSE_TASK_DETAIL_MODAL;