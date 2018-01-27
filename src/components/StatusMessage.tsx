import * as React from 'react';
import {connect} from 'react-redux';
import { StoreState,SyncStatus } from '../types/index';

interface Props{
	syncStatus: SyncStatus
}

class StatusMessage extends React.Component<Props,any>{

	constructor(props:Props){
		super(props);
	}

	render(){
		var msg = "";
		if(this.props.syncStatus.needsSync){
			msg = "Changes made";
		}else{
			msg = "Up to date";					
		}
		if(this.props.syncStatus.error){
			msg = "An error occured while syncing <br/> (click for more information)";
		}
		if(this.props.syncStatus.syncing){
			msg = "Sync in progress...";
		}
		return (
			<div id="status-message">
				{msg}
			</div>
		)
	}

}

const mstp = (state:StoreState)=>({
	syncStatus: state.system.syncStatus
})

export default connect(mstp)(StatusMessage);