import * as constants from '../constants';
import { createAction } from 'redux-actions';
export interface ADD_TOPIC {
	type: constants.ADD_TOPIC;
	payload: string;
}
export interface DELETE_TOPIC {
	type: constants.DELETE_TOPIC;
}

export const addTopic = createAction(constants.ADD_TOPIC,(text:string)=>text);

export type TopicAction = ADD_TOPIC | DELETE_TOPIC;
