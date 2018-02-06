import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import { StoreState, SystemState, TopicState, TaskState } from '../types/index';
import { requestSync, grabSync } from '../actions/system';

interface Props{
	requestSync: (system: SystemState, topics: TopicState, tasks: TaskState)=>any;
	grabSync: any;
	appState: StoreState;
}

class SystemManager extends React.Component<Props,any>{

	private syncTimer: number;

	componentDidMount(){
		//var as = this.props.appState;
		this.syncTimer = window.setInterval(()=>{
			var syncStatus = this.props.appState.system.syncStatus;
			var appState = this.props.appState;
			if(syncStatus.needsSync && !syncStatus.syncing){
				this.props.requestSync(appState.system,appState.topics,appState.tasks);
			}
		},2500);
		this.props.grabSync();
	}

	componentWillUnmount(){
		window.clearInterval(this.syncTimer);
	}

	render(){
		return null;
	}

}

const mdtp = (dispatch:Dispatch<StoreState>)=>({
	requestSync: requestSync(dispatch),
	grabSync: grabSync(dispatch)
})

const mstp = (state: StoreState)=>({
	appState: state
})

export default connect(mstp,mdtp)(SystemManager);