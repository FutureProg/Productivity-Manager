import * as React from 'react';
import * as HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {connect} from 'react-redux';
import * as ModalActions from './actions/modals';

import TopicColumn from './components/TopicColumn';
import AddTopicModal from './components/modals/AddTopicModal';
import AddTaskModal from './components/modals/AddTaskModal';
import TrashCan from './components/TrashCan';

import './App.css';
import { StoreState, TopicObject } from './types/index';
import CustomDragLayer from './components/CustomDragLayer';
import TaskDetailModal from './components/modals/TaskDetailModal';

// const logo = require('./logo.svg');

interface AppProps{  
    openAddTopicModal: any;
    topics: TopicObject[];
}

class App extends React.Component<AppProps,{}> {
  render() {
    const cols = ()=>{
      var re = [];
      for(var i = 0; i <= this.props.topics.length;i++)
        re.push(<TopicColumn key={i} index={i}/>)
      return re;
    }
    return (
      <div className="App">              
        <div id="column-container"
          style={{gridTemplateColumns:`240px repeat(${this.props.topics.length+1}, 260px)`}}>
          <div style={{gridColumn:1,gridRow:1}}>
            <h1>Topic</h1>
            <h1 style={{marginTop:'250px'}}>Tasks</h1>  
          </div>
          {cols()}
        </div>
        <AddTopicModal/>
        <AddTaskModal/>
        <TrashCan/>
        <CustomDragLayer/>
        <TaskDetailModal/>
      </div>
    );
  }
}

const fstp = {
  openAddTopicModal: ModalActions.openAddTopicModal
}

const mstp = (state:StoreState)=>({
	topics: state.topics.cards
})

export default DragDropContext(HTML5Backend)(connect(mstp,fstp)(App));
