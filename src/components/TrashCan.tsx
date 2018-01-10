import * as React from 'react';
import {connect} from 'react-redux';
import {DropTargetMonitor, DropTargetConnector,DropTarget} from 'react-dnd';
import * as classnames from 'classnames';

import {StickieTypes} from '../types/DragTypes';
import {markTaskAsDone,markStepAsDone} from '../actions/tasks';

const TrashcanImage = require('../images/Trash.svg');

class TrashCan extends React.Component<any,{dropped: boolean}>{

	componentWillMount(){
		this.setState({
			dropped: false
		});
	}

	componentWillUpdate(nextProps: any, nextState: any){
		if(!this.state.dropped && nextState.dropped){
			window.setTimeout(()=>{
				this.setState({
					dropped: false
				});
			},500)
		}
	}

	render(){
		const cnames = classnames({
			'hover':this.props.isOver,
			eat: this.state.dropped
		})
		return this.props.connectDropTarget(
			<div id="trashcan" className={cnames}>				
				<img src={TrashcanImage}/>		
				<div className="hint">Done</div>		
			</div>
		)
	}
	
}

const target = {
	canDrop: (props: any, monitor: DropTargetMonitor) =>{
		return true;
	},
	hover: (props: any, monitor: DropTargetMonitor, compontent: React.Component)=>{

	},
	drop: (props: any, monitor: DropTargetMonitor, component: React.Component) =>{
		component.setState({
			dropped: true
		});
		console.log(monitor.getItemType());
		if(monitor.getItemType() == StickieTypes.TASK){
			props.markTaskAsDone(monitor.getItem());
		}
		else if(monitor.getItemType() == StickieTypes.STEP){
			const tIndex = (monitor.getItem() as any).taskIndex;
			const sIndex = (monitor.getItem() as any).index;
			props.markStepAsDone(tIndex,sIndex);
		}
		return {moved:true};
	}
}

const collector = (connect: DropTargetConnector,monitor: DropTargetMonitor) =>({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	itemType: monitor.getItemType(),
	canDrop: monitor.canDrop()
})

const fstp = ({
	markTaskAsDone,
	markStepAsDone
});

export default connect(null,fstp)(DropTarget([StickieTypes.STEP,StickieTypes.TASK],target,collector)(TrashCan));