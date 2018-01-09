import * as React from 'react';
import { DragSourceConnector, DragSourceMonitor, DragSource, DropTargetMonitor, DropTarget, DropTargetConnector } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import {connect} from 'react-redux';

import {TaskObject} from '../types';
import {StickieTypes} from '../types/DragTypes';
import {openTaskDetailModal} from '../actions/modals';
import {moveTask} from '../actions/tasks';
import { findDOMNode } from 'react-dom';
import * as classNames from 'classnames';

const TaskStickieImage = require('../images/TaskStickie.svg');
const LabelImage = require('../images/Label.svg');
const MoreIcon = require('../images/more.svg');

class Label extends React.Component<{text:string},any>{

	render(){
		return (
			<div className="stickie-label" style={{backgroundImage:`url(${LabelImage})`}}>
				{this.props.text}				
			</div>
		)
	}

}

interface TaskProps extends TaskObject{
	lastStickie: boolean;
	tasksInTopic: number;
	connectDragSource?: any;
	connectDropTarget?: any;
	isDragging?: boolean;
	connectDragPreview?: any;
	openDetailModal?: any;

	moveTask?: any;
	arrayIndex:number;
	dragItem?: any;

	isOver?: boolean;
	clientOffset?:any;

	draggedItemType?:string;
	//targetMonitor?: DropTargetMonitor
}

class _TaskStickie extends React.Component<TaskProps,{before:boolean;after:boolean;}>{

	constructor(props: any){
		super(props);
		/*this.props.connectDragPreview(
			<div style={{backgroundImage:`url(${TaskStickieImage})`}} className="stickie task">
				<span className="text">{this.props.text + "fjdkaslfa;"}</span>				
			</div>	
		);*/				
		this.props.connectDragPreview(getEmptyImage());	
	}	

	componentWillMount(){
		this.setState({
			before: false,
			after:false
		});
	}
	public static checkHoverItem(props:any):{before:boolean;after:boolean}{		
		const hoverItem = props.dragItem;
		var before = false, after = false;
		if(hoverItem){
			const dragIndex = (props.dragItem as any).arrayIndex;
			const hoverIndex = props.arrayIndex;
			//const hoverColumn = this.props.topic_col;		
			if(dragIndex === hoverIndex){
				return {before:false,after:false};
			}			

			const hoverBoundingRect = findDOMNode(props.component).getBoundingClientRect();
			const hoverMiddleY = hoverBoundingRect.top + (255 / 2);

			const clientOffset = props.clientOffset!;			
			if(clientOffset == null){
				return {before:false,after:false};
			}
			const hoverClientY = clientOffset.y;// - hoverBoundingRect.top			
			const inRange = Math.abs(hoverClientY - hoverMiddleY) < 255; 
			// Dragging downwards
			if (/*dragIndex < hoverIndex && */hoverClientY < hoverMiddleY && inRange) {
				before = true;			
				after = false;				
			}

			// Dragging upwards
			if (/*dragIndex > hoverIndex && */hoverClientY > hoverMiddleY && inRange) {
				after = true;		
				before = false;				
			}
		}
		return {before,after};
	}

	render(){						
		const _style = {
			backgroundImage:`url(${TaskStickieImage})`,
			opacity: this.props.isDragging?0: 1,
			zIndex: this.props.steps.length + 1		
		}
		const _cnames = classNames("stickie task",{
			over: this.props.dragItem && !this.props.isDragging && this.props.draggedItemType === StickieTypes.TASK,
			before: this.state.before && this.props.isOver,
			after: this.state.after && this.props.isOver
		});
		const dragSource = this.props.connectDragSource(
			<div style={_style} className={_cnames} onClick={()=>this.props.openDetailModal(this.props.arrayIndex)}>
				{this.props.label? <Label text={this.props.label}/>:null}
				<img src={MoreIcon} className="more"/>
				<span className="text">{this.props.text}</span>				
			</div>			
		,{dropEffect: 'move'})
		return this.props.connectDropTarget(dragSource);
	}
}
const taskStickieSource = {
	beginDrag: (props:any)=>{		
		return {text:props.text,topic_col:props.topic_col,arrayIndex: props.arrayIndex};
	}
}
const taskStickieTarget = {
	hover: (props:any, monitor: DropTargetMonitor, component: _TaskStickie)=>{
		if(!monitor.isOver({shallow:true}))return;
		const n = _TaskStickie.checkHoverItem({
			...props,
			component,
			dragItem:monitor.getItem(),
			clientOffset: monitor.getClientOffset()
		});				
		component.setState({
			before: n.before,
			after: n.after
		});
	},

	drop: (props:any, monitor: DropTargetMonitor, component: _TaskStickie)=>{
		if(monitor.didDrop() || !monitor.isOver({shallow:true}))return;
		const n = _TaskStickie.checkHoverItem({
			...props,
			component,
			dragItem:monitor.getItem(),
			clientOffset: monitor.getClientOffset()
		});
		const item = monitor.getItem() as any;
				
		var nIndex = props.arrayIndex + (n.before? 0 : n.after && !props.last? 1 : 0);		
		props.moveTask(item.arrayIndex,props.topic_col,nIndex,props.arrayIndex > item.arrayIndex);
	}
}

const collectTaskStickie = (connect: DragSourceConnector, monitor: DragSourceMonitor)=>({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),	
})
const collectTaskStickieTarget = (connect: DropTargetConnector, monitor: DropTargetMonitor)=>({
	connectDropTarget: connect.dropTarget(),
	dragItem: monitor.getItem(),
	targetMonitor: monitor,
	draggedItemType: monitor.getItemType(),
	clientOffset: monitor.getSourceClientOffset(),
	isOver: monitor.isOver({shallow: true })
})

const taskFSTP = ({
	openDetailModal:openTaskDetailModal,
	moveTask:moveTask
})

export let TaskStickie = connect(null,taskFSTP)(DragSource(StickieTypes.TASK,taskStickieSource,collectTaskStickie)(
	DropTarget(StickieTypes.TASK,taskStickieTarget,collectTaskStickieTarget)(
		_TaskStickie
	)
));