import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DocumentTitle from 'react-document-title';

import {
  Route,
} from 'react-router-dom'

 import ShopingCardHome from './Screen/ShopingCardHome';
 import ShoppingCardItem from './ViewComponent/ShoppingCardItem';
class App extends Component {
  render() {
    return (
      
        <div >
          <Route exact path={'/'} component={ShopingCardHome} />
          <Route path={'/ShoppingCardItem'} component={ShoppingCardItem} />
        </div>
     
    );
  }
}

export default App;
