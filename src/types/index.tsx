export interface StoreState {	
	addTopicModal: AddTopicModalState;
	topics: TopicState;

	tasks: TaskState;
	addTaskModal: AddTaskModalState;

	taskDetailModal: TaskDetailModalState;
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
	_id?: number;
	text: string;
}

export interface TaskState {
	tasks: TaskObject[];
}

export interface TaskObject{
	_id?: number;
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