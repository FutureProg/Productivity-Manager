import * as React from 'react';
import * as HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import * as ModalActions from './actions/modals';
import * as Cookies from 'es-cookie';

import WelcomeScreen from './pages/Welcome';
import TopicColumn from './components/TopicColumn';
import AddTopicModal from './components/modals/AddTopicModal';
import AddTaskModal from './components/modals/AddTaskModal';
import TrashCan from './components/TrashCan';
import StatusMessage from './components/StatusMessage';

import './App.css';
import { StoreState, TopicObject, UserState } from './types/index';
import CustomDragLayer from './components/CustomDragLayer';
import TaskDetailModal from './components/modals/TaskDetailModal';
import TopicDetailModal from './components/modals/TopicDetailModal';
import SystemManager from './components/SystemManager';

// const logo = require('./logo.svg');

interface AppProps{  
    openAddTopicModal: any;
    user: UserState;
    topics: TopicObject[];
}

class App extends React.Component<AppProps,{}> {
  render() {
    const cols = ()=> {
      var re = [];            
      for(var i = 0; i <= this.props.topics.length;i++) {                
        if(this.props.topics[i] == null || !this.props.topics[i].done) {          
          re.push(<TopicColumn key={i} index={i}/>);
        }
      }        
      return re;
    };
    const loggedInContent = (
      <div 
        id="column-container"
        style={{gridTemplateColumns:`240px repeat(${this.props.topics.length+1}, 260px)`}}
      >
          <div style={{gridColumn:1,gridRow:1}}>
            <h1>Topic</h1>
            <h1 style={{marginTop:'250px'}}>Tasks</h1>  
          </div>
          {cols()}
      </div>
    );
    return (
      <div className="App">              
        {
          Cookies.get("user_id") ? loggedInContent : <WelcomeScreen/>
        }
        <AddTopicModal/>
        <AddTaskModal/>
      {Cookies.get("user_id") ? 
      <React.Fragment>
        <TrashCan/>
        <SystemManager/>    
        <StatusMessage/>
        <TaskDetailModal/>
        <TopicDetailModal/>
      </React.Fragment>
      : null}
        <CustomDragLayer/>        
      </div>
    );
  }
}

const fstp = {
  openAddTopicModal: ModalActions.openAddTopicModal
}

const mstp = (state:StoreState)=>({
  topics: state.topics.cards,
  user: state.user
})

export default DragDropContext(HTML5Backend)(connect(mstp,fstp)(App));
