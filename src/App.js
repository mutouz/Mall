import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DocumentTitle from 'react-document-title';

import {
  Route,
} from 'react-router-dom'

 import ShopingCardHome from './Screen/ShopingCardHome';
 import AddShoppingAddress from './Screen/AddShoppingAddress';
 import OrderHome from './Screen/OrderHome';//下单详情
 import ShoppingCardItem from './ViewComponent/ShoppingCardItem';
 import ShoppingOrderItem from './ViewComponent/ShoppingOrderItem';//购买详情
 import AddOrder from './Screen/AddOrder';//下单信息

class App extends Component {
  render() {

    return (
      
        <div >
          <Route exact path={'/'} component={AddOrder} />
          <Route path={'/ShoppingCardItem'} component={ShoppingCardItem} />
          <Route path={'/AddShoppingAddress'} component={ShoppingCardItem} />
          <Route path={'/OrderHome'} component={OrderHome} />
          <Route path={'/AddOrder'} component={AddOrder} />
          <Route path={'/ShoppingOrderItem'} component={ShoppingOrderItem} />
          
        </div>
     
    );
  }
}

export default App;
