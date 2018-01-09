import * as React from 'react';
import {DragLayer, DragLayerMonitor} from 'react-dnd';
import { StickieTypes } from '../types/DragTypes';

const TaskStickieImage = require('../images/TaskStickie.svg');
const StepStickieImage = require('../images/StepStickie.svg');

function getItemStyles(props:any) {
	const { currentOffset } = props;
	if (!currentOffset) {
	  return {
		display: 'none'
	  };
	}
  
	const { x, y } = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;
	return {
	  transform: transform,
	  WebkitTransform: transform
	};
  }
  

class CustomDragLayer extends React.Component<any,{}>{

	renderItem(type:string,item:any){		
		switch(type){			
			case StickieTypes.TASK:
			return (
				<div style={{backgroundImage:`url(${TaskStickieImage})`}} className="stickie task drag">
					<span className="text">{item.text}</span>				
				</div>	
			)		
			case StickieTypes.STEP:
			return (
				<div style={{backgroundImage:`url(${StepStickieImage})`}} className="stickie-step drag">
					<span className="text">{item.text}</span>				
				</div>	
			)	
		}
		return null;
	}

	render(){		
		return (
			<div id="drag-layer">
				<div style={getItemStyles(this.props)}>
					{this.renderItem(this.props.itemType,this.props.item)}
				</div>
			</div>
		)
	}

}

const collect = (monitor: DragLayerMonitor) =>({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	isDragging: monitor.isDragging(),
	currentOffset: monitor.getSourceClientOffset(),	
})

export default DragLayer(collect)(CustomDragLayer);