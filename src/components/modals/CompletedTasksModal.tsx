import * as React from 'react';
import {connect} from 'react-redux';

import './modals.css';
class CompletedTasksModal extends React.Component{

	render(){
		return (
			<div id="completed-tasks" className="modal">

			</div>
		)
	}	

}

export default connect()(CompletedTasksModal);