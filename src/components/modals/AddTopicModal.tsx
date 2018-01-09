import * as React from 'react';
import {connect} from 'react-redux';

import { StoreState } from '../../types/index';

import './modals.css';
import { closeAddTopicModal } from '../../actions/modals';
import { addTopic } from '../../actions/topics';


interface Props{
	visible: boolean,
	close: any,
	addTopic: any
}

class AddTopicModal extends React.Component<Props,{}>{
	private textinput? : HTMLInputElement;

	constructor(props:Props){
		super(props);
		this.confirm = this.confirm.bind(this);
	}

	private confirm(){
		this.props.addTopic(this.textinput!.value);
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
				<h2>Enter Topic Name</h2>
				<input onKeyDown={onEnter} ref={(text:HTMLInputElement)=>this.textinput = text} type="text" style={{width:"80%"}}/><br/>
				<div style={{float:'right',marginTop:'10px'}}>
					<button onClick={this.props.close} className="neutral">Cancel</button>
					<button onClick={this.confirm} className="confirm">Add Topic</button>
				</div>
			</div>
		)
	}
}

const mstp = (state:StoreState) =>({
	visible: state.addTopicModal.visible
})

const fstp = {
	close: closeAddTopicModal,
	addTopic: addTopic
}

export default connect(mstp,fstp)(AddTopicModal);