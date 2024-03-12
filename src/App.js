
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/navbar';
import News from  './components/news';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=5;
  state={
    progress:0
  }

setProgress = (progress) => {
  this.setState({progress:progress})
 
}
  render() {
    return (
      <div>
       <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
       
      />
       <Switch>
          <Route exact  path="/generel" >  <News  setProgress={this.setProgress}    keys="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact  path="/business"> <News  setProgress={this.setProgress}  keys="business" pageSize={this.pageSize} country="in" category="business"/></Route>
          <Route exact  path="/entertainment"> <News  setProgress={this.setProgress}   keys="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/></Route>
          <Route exact  path="/health"> <News  setProgress={this.setProgress}  keys="health" pageSize={this.pageSize} country="in" category="health"/></Route>
          <Route exact  path="/science"> <News  setProgress={this.setProgress}  keys="science" pageSize={this.pageSize} country="in" category="science"/></Route>
          <Route exact  path="/sports"> <News  setProgress={this.setProgress}  keys="sports" pageSize={this.pageSize} country="in" category="sports"/></Route>
          <Route exact  path="/general"> <News  setProgress={this.setProgress}   keys="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact  path="/technology"> <News  setProgress={this.setProgress}   keys="technology"pageSize={this.pageSize} country="in" category="technology"/></Route>
          </Switch>
    </Router>
      </div>
    )
  }
}