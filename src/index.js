import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(
   reducers, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
registerServiceWorker();
