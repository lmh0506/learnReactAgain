import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import reducers from './reducers.js'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import Auth from './Auth'
import Dashboard from './Dashboard'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
));

class Test extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return <h1>{this.props.match.params.location}</h1>
  }
}

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          {/* 渲染匹配的第一个路由 */}
          <Route path='/login' exact component={Auth}></Route>
          <Route path='/dashboard' component={Dashboard}></Route>
          <Redirect to='/dashboard'></Redirect>
        </Switch>
        
        {/* <Redirect to='/'></Redirect> */}
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'));

registerServiceWorker();