import * as React from 'react';
import {connect} from 'react-redux';

import StepInputField from '../atoms/StepInputField';
import {closeTaskDetailModal} from '../../actions/modals';
import {deleteTask,updateTask} from '../../actions/tasks';
import { StoreState, TaskDetailModalState, TaskObject, StepObject } from '../../types/index';


interface Props extends TaskDetailModalState{
	close: typeof closeTaskDetailModal;
	updateTask: typeof updateTask;

	task:TaskObject;
	deleteTask: any;
}

interface State{
	delDialogVisible:boolean;
	steps: StepObject[];	
}

class TaskDetailModal extends React.Component<Props,State>{	

	private label:HTMLInputElement;

	constructor(props:Props){
		super(props);
		this.deleteTask = this.deleteTask.bind(this);
		this.close = this.close.bind(this);
		this.updateData = this.updateData.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.addStep = this.addStep.bind(this);
	}

	componentWillMount(){
		this.setState({
			delDialogVisible: false,
			steps: []	
		})
	}

	componentWillReceiveProps(nextProps:Props){
		if(nextProps.visible && !this.props.visible){			
			this.label.value = nextProps.task.label;	
			this.setState({
				steps:[
					...nextProps.task.steps
				]
			})		
		}
		if(!nextProps.visible){
			this.label.value = "";
			this.setState({
				steps: []
			});
		}
	}

	deleteTask(){		
		this.props.deleteTask(this.props.taskIndex);
		this.close();
	}

	close(){
		this.setState({
			delDialogVisible:false
		});
		this.props.close();
	}	

	updateData(){
		const nTask = this.props.task as TaskObject;
		nTask.label = this.label.value;		
		nTask.steps = this.state.steps.filter((value)=>{
			return value.text && value.text.length > 0
		});
		console.log(nTask.steps);
		this.props.updateTask(this.props.taskIndex,nTask);	
		this.props.close();			
	}

	addStep(){
		this.setState({
			steps: [
				...this.state.steps,
				{
					text: "",
					done:false
				}
			]
		})
	}

	updateStep(index: number,text: string, done: boolean){		
		this.setState({
			steps: [
				...this.state.steps.slice(0,index),
				{
					text,
					done
				},
				...this.state.steps.slice(index+1)
			]
		})
	}

	render(){						
		const openDelDialog = ()=>{
			this.setState({
				delDialogVisible: true
			});
		}
		const closeDelDialog = ()=>{
			this.setState({
				delDialogVisible: false
			});
		}
		const delDialogStyle = {
			display: this.state.delDialogVisible? 'block' : 'none',
			textAlign: 'center'
		}

		return (
			<div className="modal" style={{display: this.props.visible? 'block':'none'}}>
				<h2>Task Details</h2>
				<div>
					<h3>{this.props.task.text}</h3>
					<label>Label:</label><input style={{marginLeft:'10px'}} ref={(label:any)=>this.label=label} type="text"/>
					<h4>Steps:</h4>
					<div style={{marginBottom:'10px',paddingLeft:'25px'}}>
						{								
							this.state.steps.map((step,index)=>{
								return <StepInputField key={index} index={index} step={step} onChangeDelegate={this.updateStep}/>
							})
						}
						
						<button className="neutral" onClick={this.addStep}>Add Step</button>
					</div>
				</div>
				{/*BUTTONS*/}
				<div style={{float:'left',marginTop:'10px'}}>
					<button onClick={this.close} className="neutral">Close</button>
				</div>
				<div style={{float:'right',marginTop:'10px'}}>					
					<button onClick={openDelDialog} className="danger">Delete</button>
					<button onClick={this.updateData} className="neutral">Save Changes</button>
				</div>
				<div style={delDialogStyle} className="modal" id="delete-modal">
					<h2>Delete this task?</h2>
					<p>This cannot be undone!</p>
					<div style={{position: 'relative',marginTop:'10px', textAlign:'center'}}>
						<button onClick={closeDelDialog} className="neutral">Don't delete it</button>						
						<button onClick={this.deleteTask} className="danger">Delete the Task</button>
					</div>
				</div>
			</div>
		)
	}

}

const mstp = (state:StoreState) =>({
	...state.taskDetailModal,
	task: state.taskDetailModal.taskIndex >= 0? state.tasks.tasks[state.taskDetailModal.taskIndex]:{}
})

const fstp = {
	close: closeTaskDetailModal,
	deleteTask,
	updateTask
}

export default connect(mstp,fstp)(TaskDetailModal);