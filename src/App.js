import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DocumentTitle from 'react-document-title';

import {
  Route,
} from 'react-router-dom'


import FollowItem from './ViewComponent/FollowItem';
import FollowHome from './Screen/FollowHome';
 import FollowCreat from './Screen/FollowCreat';
 import Login from './Screen/Login';
 
class App extends Component {
  render() {
    return (
      
        <div >
          <Route exact path={'/'} component={FollowHome} />

          <Route path={'/FollowHome'} component={FollowHome} />
          <Route path={'/FollowItem'} component={FollowItem} />
          <Route path={'/FollowCreat/:id'} component={FollowCreat} />
          <Route path={'/Login'} component={Login} />
        </div>
     
    );
  }
}

export default App;
