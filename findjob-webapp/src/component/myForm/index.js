import React, { Component } from 'react';

// 高阶组件
export default function MyForm(Comp) {
  return class WrapperComp extends Component{
    constructor(props) {
      super(props)
      this.state = {}
    }

    handleChange = (key, val) => {
      console.log(this.state)
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}