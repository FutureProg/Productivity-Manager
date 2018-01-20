export interface StoreState {	
	addTopicModal: AddTopicModalState;
	topics: TopicState;

	tasks: TaskState;
	addTaskModal: AddTaskModalState;

	taskDetailModal: TaskDetailModalState;

	user: UserState;
}

export interface UserState {
	_id?: string;
	fname?: string;
	lname?: string;
	email?: string;

}

export interface TaskDetailModalState {
	visible:boolean;
	taskIndex: number;
}

export interface AddTopicModalState {
	visible: boolean;
}

export interface AddTaskModalState{
	visible: boolean;
	currentColumn: number;
}

export interface TopicState {
	cards: TopicObject[];
}
export interface TopicObject{
	_id?: string;
	text: string;
}

export interface TaskState {
	tasks: TaskObject[];
}

export interface TaskObject{
	_id?: string;
	text: string;
	topic_col: number;
	done: boolean;
	label: string;

	steps: StepObject[];
}

export interface StepObject{
	text: string;
	done: boolean;
}