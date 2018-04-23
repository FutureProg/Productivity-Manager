import * as React from 'react';
import {connect} from 'react-redux';

import {StoreState, TopicObject} from '../../types';

interface Props{
	topic: TopicObject;
}

class TopicDetailModal extends React.Component<Props,{}>{

	render(){
		return (
			<div className="modal">
				<h2>Topic Details</h2>
				<div style={{float:'left',marginTop:'10px'}}>
					<button className="neutral">Close</button>
				</div>
				<div style={{float:'right',marginTop:'10px'}}>
					<button className="danger">Delete</button>
					<button className="confirm">Mark As Done</button>
				</div>
			</div>
		)
	}

}

const mstp = (state:StoreState) =>({
	
});