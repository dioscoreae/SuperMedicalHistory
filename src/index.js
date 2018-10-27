import React from 'react'
import { render } from 'react-dom'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import App from './App'
//import reducer from './reducers'
import './index.css'
import './semantic/dist/semantic.min.css';


import AppStart from './AppStart';
import configureStore from "./redux/configureStore";

const store = configureStore();
//const store = createStore(reducer)

render(
  <Provider store={store}>
    <AppStart/>
  </Provider>,
  document.getElementById('root')
)
