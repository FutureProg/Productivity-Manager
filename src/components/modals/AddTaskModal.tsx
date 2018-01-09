import * as React from 'react';
import {connect} from 'react-redux';

import {StoreState, AddTaskModalState} from '../../types';

import './modals.css';
import {closeAddTaskModal} from '../../actions/modals';
import {addTask} from '../../actions/tasks';

interface Props extends AddTaskModalState{
	close: any,
	addTask: any
}

class AddTaskModal extends React.Component<Props,{}>{

	private textinput? : HTMLInputElement;

	constructor(props:Props){
		super(props);
		this.confirm = this.confirm.bind(this);
	}

	componentWillReceiveProps(prevProps:Props,nextProps:Props){
		if(nextProps.visible && !prevProps.visible){
			this.textinput!.focus();
		}
	}

	private confirm(){
		this.props.addTask(this.props.currentColumn,this.textinput!.value);
		this.textinput!.value = "";
		this.props.close();
	}

	render(){
		const style = {
			display: this.props.visible? "block" : "none"
		}
		const onEnter = (evt:any)=>{
			if(evt.key === 'Enter') this.confirm();			
		}

		return (
			<div className="modal" style={style}>
				<h2>Enter Task Details</h2>
				<input onKeyDown={onEnter} ref={(text:HTMLInputElement)=>this.textinput = text} autoFocus type="text" style={{width:"80%"}}/><br/>
				<div style={{float:'right',marginTop:'10px'}}>
					<button onClick={this.props.close} className="neutral">Cancel</button>
					<button onClick={this.confirm} className="confirm">Add Task</button>
				</div>
			</div>
		)
	}

}

const mstp = (state:StoreState) =>({
	...state.addTaskModal	
});

const fstp = {
	close: closeAddTaskModal,
	addTask: addTask
}

export default connect(mstp,fstp)(AddTaskModal);