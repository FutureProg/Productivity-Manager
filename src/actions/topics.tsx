import * as constants from '../constants';
import { createAction } from 'redux-actions';
export interface ADD_TOPIC {
	type: constants.ADD_TOPIC;
	payload: string;
}
export interface DELETE_TOPIC {
	type: constants.DELETE_TOPIC;
	payload: number;
}

export interface MARK_TOPIC_DONE{
	type: constants.MARK_TOPIC_DONE;
	payload: number;
}

export const addTopic = createAction(constants.ADD_TOPIC,(text:string)=>text);
export const deleteTopic = createAction(constants.DELETE_TOPIC,(index:number)=>index);

export const markTopicDone = createAction(constants.MARK_TOPIC_DONE,(index:number)=>index);

export type TopicAction = ADD_TOPIC | DELETE_TOPIC | MARK_TOPIC_DONE;
