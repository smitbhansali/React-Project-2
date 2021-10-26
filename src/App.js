import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize = 6;
  state = {
    progress: 0
  }
  setprogress=(prog)=>{
    this.setState({progress: prog})
  }
  state = {
    mode : 'light'
  }
  togglemode = ()=>{
    if (this.state.mode==='light')
    {
      this.setState({mode : 'dark'})
      document.body.style.backgroundColor = "#1b1818";
    }
    else if (this.state.mode==='dark')
    {
      this.setState({mode : 'light'})
      document.body.style.backgroundColor = "white";
    }
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar togglemode={this.togglemode} mode={this.state.mode}/>
          <LoadingBar
            loaderSpeed={1000}
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/"><News mode={this.state.mode} setprogress={this.setprogress} key="home" pagesize={this.pagesize} country="us" category="general" /></Route>
            <Route exact path="/business"><News mode={this.state.mode} setprogress={this.setprogress} key="business" pagesize={this.pagesize} country="us" category="business" /></Route>
            <Route exact path="/entertainment"><News mode={this.state.mode} setprogress={this.setprogress} key="entertainment" pagesize={this.pagesize} country="us" category="entertainment" /></Route>
            <Route exact path="/general"><News mode={this.state.mode} setprogress={this.setprogress} key="general" pagesize={this.pagesize} country="us" category="general" /></Route>
            <Route exact path="/health"><News mode={this.state.mode} setprogress={this.setprogress} key="health" pagesize={this.pagesize} country="us" category="health" /></Route>
            <Route exact path="/science"><News mode={this.state.mode} setprogress={this.setprogress} key="science" pagesize={this.pagesize} country="us" category="science" /></Route>
            <Route exact path="/sports"><News mode={this.state.mode} setprogress={this.setprogress} key="sports" pagesize={this.pagesize} country="us" category="sports" /></Route>
            <Route exact path="/technology"><News mode={this.state.mode} setprogress={this.setprogress} key="technology" pagesize={this.pagesize} country="us" category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}