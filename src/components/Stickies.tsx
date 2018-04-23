import * as React from 'react';
import {connect} from 'react-redux';
import {DragSource,DragSourceConnector, DragSourceMonitor} from 'react-dnd';

import * as DragTypes from '../types/DragTypes';
const TopicStickieImage = require('../images/TopicStickie.svg');
const StepStickieImage = require('../images/StepStickie.svg');

import {TaskStickie as TS} from './TaskStickie';
import { StepObject } from '../types/index';
import { openTopicDetailModal } from '../actions/modals';
import { getEmptyImage } from 'react-dnd-html5-backend';
import * as classNames from 'classnames';

const MoreIcon = require('../images/more.svg');

interface TopicProps{
	text: string; 
	index:number;
	openTopicDetailModal: typeof openTopicDetailModal;
}

class _TopicStickie extends React.Component<TopicProps,any>{

	render(){
		const openModal = ()=> {
			this.props.openTopicDetailModal(this.props.index);
		}
		return (
			<div onClick={openModal} style={{backgroundImage:`url(${TopicStickieImage})`}} className="stickie topic">
				<span className="text">{this.props.text}</span>				
				<img src={MoreIcon} className="more"/>
			</div>
		)
	}

}

export let TopicStickie = connect(null,{openTopicDetailModal})(_TopicStickie);

interface StepProps extends StepObject {
	index: number;
	filteredIndex:number;
	zIndex: number;
	taskIndex: number;
	connectDragSource?: any;
	connectDragPreview?:any;
	isDragging:boolean;
}

class _StepStickie extends React.Component<StepProps,any>{

	constructor(props:StepProps){
		super(props);
		this.props.connectDragPreview(getEmptyImage());
	}
	
	render(){
		const _style = {
			backgroundImage:`url(${StepStickieImage})`,
			top: (50 + 50*this.props.filteredIndex) + "px",
			zIndex: this.props.zIndex
		}
		const _cname = classNames("stickie-step",{
			drag:this.props.isDragging
		})
		return this.props.connectDragSource(
			<div className={_cname} style={_style}>								
				{this.props.text}
			</div>
		)
	}
}

const collectStepStickie = (connect: DragSourceConnector, monitor: DragSourceMonitor)=>({
	connectDragSource:connect.dragSource(),	
	connectDragPreview:connect.dragPreview(),
	isDragging: monitor.isDragging()
})

const dragSourceStep = {
	beginDrag(props:any){
		return {index: props.index,taskIndex: props.taskIndex, text:props.text}
	}
}

export let StepStickie = DragSource(DragTypes.StickieTypes.STEP,dragSourceStep,collectStepStickie)(_StepStickie);

export let TaskStickie = TS;