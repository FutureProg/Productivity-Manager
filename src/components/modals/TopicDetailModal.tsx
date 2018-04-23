import * as React from 'react';
import {connect} from 'react-redux';

import {closeTopicDetailModal} from '../../actions/modals';
import {deleteTopic,markTopicDone} from '../../actions/topics';
import {StoreState, TopicObject, TopicDetailModalState} from '../../types';

interface Props extends TopicDetailModalState{
	topic: TopicObject;
	close: typeof closeTopicDetailModal;
	deleteTopic: typeof deleteTopic;
	markTopicDone: typeof markTopicDone;
}

interface State{
	delDialogVisible:boolean;
}

class TopicDetailModal extends React.Component<Props,State>{

	componentWillMount(){
		this.setState({
			delDialogVisible: false
		});
	}

	render(){
		const markDone = ()=>{
			this.props.markTopicDone(this.props.topicIndex);
		}
		const del = ()=>{
			this.props.deleteTopic(this.props.topicIndex);					
			this.setState({
				delDialogVisible: false
			});			
			this.props.close();
		}
		const delDialogStyle = {
			display: this.state.delDialogVisible? 'block' : 'none',
			textAlign: 'center'
		};
		const openDelDialog = ()=> {
			this.setState({
				delDialogVisible: true
			});
		};
		const closeDelDialog = ()=> {
			this.setState({
				delDialogVisible: false
			});
		};
		return (
			<div className="modal" style={{display:this.props.visible? 'block':'none'}}>
				<h2>Topic Details</h2>
				<h3>{this.props.topic.text}</h3>
				<div style={{float:'left',marginTop:'10px'}}>
					<button onClick={this.props.close} className="neutral">Close</button>
				</div>
				<div style={{float:'right',marginTop:'10px'}}>
					<button onClick={openDelDialog} className="danger">Delete</button>
					<button onClick={markDone} className="confirm">Mark As Done</button>
				</div>
				<div style={delDialogStyle} className="modal" id="delete-modal">
					<h2>Delete this Topic?</h2>
					<p>All tasks for this topic will also be deleted. This cannot be undone!</p>
					<div style={{position: 'relative',marginTop:'10px', textAlign:'center'}}>
						<button onClick={closeDelDialog} className="neutral">Don't delete it</button>						
						<button onClick={del} className="danger">Delete the Task</button>
					</div>
				</div>
			</div>
		)
	}

}

const mstp = (state:StoreState) =>({
	...state.topicDetailModal,
	topic: state.topicDetailModal.topicIndex >= 0? state.topics.cards[state.topicDetailModal.topicIndex]:{}
});

const fstp = {
	close: closeTopicDetailModal,
	deleteTopic,
	markTopicDone
};

export default connect(mstp,fstp)(TopicDetailModal);