import * as React from 'react';
import {connect} from 'react-redux';

import * as ModalActions from '../actions/modals';
import { AddButton } from './AddButton';
import { StoreState, TaskObject } from '../types/index';
import {TopicStickie,TaskStickie,StepStickie} from './Stickies';

interface Props{
	openAddTopicModal:any;
	openAddTaskModal: any;
	topics: string[];
	index: number;	
	tasks: TaskObject[];
}

class TopicColumn extends React.Component<Props,{}>{

	render(){
		const empty = this.props.topics == null || this.props.topics[this.props.index] == null;
		var render = null;
		if(empty){
			render = <AddButton onClick={this.props.openAddTopicModal}/>;
		}else{
			const taskWithIndex = this.props.tasks.map((item,index)=>({...item,arrayIndex:index}));
			const taskStickies = taskWithIndex
				.filter((task,index)=>task.topic_col == this.props.index && !task.done? {...task,arrayIndex:index}: null)
				.map((item,index,array)=>{					
						var last = false;
						if(index+1 == array.length) last = true;
						var item2 = {...item,lastStickie:last,tasksInTopic:array.length}
						if(item.steps && item.steps.length > 0){
							const taskIndex = index;
							const indexedSteps = item.steps.map((item,index)=>({...item,index}));
							const taskHeight = (255 + 60 * item.steps.filter((value)=>!value.done).length);
							return (
								<div key={1+index} style={{position:'relative',height: taskHeight + "px"}}>
									<TaskStickie key={1+index} {...item2}/>									
									{			 
										indexedSteps.filter((value)=>!value.done).map((item,index,array)=>
											<StepStickie zIndex={array.length-index} 
												taskIndex={taskIndex} 
												text={item.text} 
												done={item.done} 
												filteredIndex={index}
												index={item.index} key={index} />
										)
									}
								</div>
							)
						}
						return <TaskStickie key={1 + index} {...item2} />
					}
				);
			const add_task = ()=>{
				this.props.openAddTaskModal(this.props.index);
			}
			render = [				
				<TopicStickie key={0} text={this.props.topics[this.props.index]}/>,
				taskStickies,
				<AddButton key={1+taskStickies.length} onClick={add_task}/>
			]
		}		
		return (
			<div className="topic-column">
				{render}
			</div>
		)
	}

}

const fstp = {
	openAddTopicModal: ModalActions.openAddTopicModal,
	openAddTaskModal: ModalActions.openAddTaskModal
}

const mstp = (state:StoreState)=>({
	topics: state.topics.cards,
	tasks: state.tasks.tasks
})

export default connect(mstp,fstp)(TopicColumn);