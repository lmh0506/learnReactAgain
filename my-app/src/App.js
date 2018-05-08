import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'
import {addGun, removeGun, removeGunSync} from './stores'


// const mapStatetoProps = (state) => {
//   return {num: state}
// }

// const actionsCreaters = {addGun, removeGun, removeGunSync}
// App = connect(mapStatetoProps, actionsCreaters)(App)
@connect(
  // 你要state什么属性放到props里
  state=>({num: state.counter}),
  // 你要什么方法，放到props里，自动dispathc
  {addGun, removeGun, removeGunSync}
)
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {num, addGun, removeGun, removeGunSync} = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={addGun}
        >+</button>
        <button onClick={removeGun}
        >-</button>
        <button onClick={removeGunSync}>==</button>
        <p>{num}</p>
      </div>
    );
  }
}


export default App;
