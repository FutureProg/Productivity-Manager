import * as React from 'react';

import './atoms.css';
import { StepObject } from '../../types/index';

interface Props{

	step: StepObject;
	index: number;

	onChangeDelegate: (index:number,text:string,done:boolean)=>void
}

class StepInputField extends React.Component<Props,any>{

	private text: HTMLInputElement;
	private done: HTMLInputElement;

	componentDidMount(){
		if(this.props.step){
			this.text.value = this.props.step.text;
			this.done.checked = this.props.step.done;
		}
	}	

	render(){
		const onChange = ()=>{
			this.props.onChangeDelegate(this.props.index,this.text.value,this.done.checked)
		}
		
		return (
			<div className="step-input-field">
				<input onChange={onChange} value={this.props.step.text} ref={(txt:any)=>{this.text = txt}} placeholder="Step Details..." type="text"/>
				<input onChange={onChange} checked={this.props.step.done} ref={(d:any)=>{this.done = d}} type="checkbox"/><label></label>
			</div>
		);
	}

}

export default StepInputField;