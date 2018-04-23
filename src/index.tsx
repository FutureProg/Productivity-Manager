import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {StoreState} from './types/';
import  reducers from './reducers/';

const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = process.env.NODE_ENV !== 'production' ? windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;


const store = createStore<StoreState>(reducers,{  
  addTopicModal: {
    visible: false
  },
  topics:{
    cards: []
  },
  tasks:{
    tasks: []
  },
  addTaskModal:{
    currentColumn: -1,
    visible: false
  },
  topicDetailModal:{
    visible: false,
    topicIndex: -1
  },
  taskDetailModal:{
    visible: false,
    taskIndex: -1
  },
  user:{        
  },
  system:{
    syncStatus:{
      needsSync: false,
      error: false,
      syncing: false
    }
  }
},composeEnhancers(applyMiddleware(thunk)));

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render( 
  <Provider store={store}> 
    <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
