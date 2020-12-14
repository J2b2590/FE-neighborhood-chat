import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'

import actionCable from 'actioncable'

let store = createStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') 
export const ActionCableContext = createContext()

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ActionCableContext.Provider value={CableApp.cable}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ActionCableContext.Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
