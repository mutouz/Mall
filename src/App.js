import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DocumentTitle from 'react-document-title';

import {
  Route,
} from 'react-router-dom'

 import ShopingCardHome from './Screen/ShopingCardHome';
 import AddShoppingAddress from './Screen/AddShoppingAddress';
 import LoginScreen from './Screen/LoginScreen';
 import RegisterScreen from './Screen/RegisterScreen';
 import UpdateCustomerScreen from './Screen/UpdateCustomerScreen';
 import UpdateShoppingAddressScreen from './Screen/UpdateShoppingAddressScreen';
 import GetUserScreen from './Screen/GetUserScreen';
 import TabBarDisplay from './Screen/TabBarDisplay';//模板页


 import ShoppingCardItem from './ViewComponent/ShoppingCardItem';
 import ShoppingOrderItem from './ViewComponent/ShoppingOrderItem';//购买详情
 import AddOrder from './Screen/AddOrder';//下单信息
 import GoodsDetailsScreen from './Screen/GoodsDetailsScreen';//商品详情
 import SearchProductScreen from './Screen/SearchProductScreen';//查询商品
 import OrderHomeScreen from './Screen/OrderHomeScreen';//订单详情
 import OrderItem from './ViewComponent/OrderItem';//订单详情Card
 

class App extends Component {
  render() {

    return (
        <div >
          <Route exact path={'/'} component={TabBarDisplay} />
          <Route path={'/LoginScreen'} component={LoginScreen}/>
          <Route path={'/RegisterScreen'} component={RegisterScreen}/>
          <Route path={'/UpdateCustomerScreen'} component={UpdateCustomerScreen}/>
          <Route path={'/UpdateShoppingAddressScreen'} component={UpdateShoppingAddressScreen}/>
          <Route path={'/GetUserScreen'} component={GetUserScreen}/>
          <Route path={'/TabBarDisplay'} component={TabBarDisplay}/>
          <Route path={'/OrderHomeScreen'} component={OrderHomeScreen}/>
          <Route path={'/OrderItem'} component={OrderItem}/>
         
          
          <Route path={'/ShopingCardHome'} component={ShopingCardHome}/>
          <Route path={'/GoodsDetailsScreen/:ID'} component={GoodsDetailsScreen} />
          <Route path={'/SearchProductScreen'} component={SearchProductScreen} />
          <Route path={'/ShoppingCardItem'} component={ShoppingCardItem} />
          <Route path={'/AddShoppingAddress'} component={ShoppingCardItem} />
          <Route path={'/AddOrder/:goods'} component={AddOrder} />
          <Route path={'/ShoppingOrderItem'} component={ShoppingOrderItem} />
        </div>
    );
  }
}

export default App;
