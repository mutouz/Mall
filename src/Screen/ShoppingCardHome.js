import React, { Component } from 'react'
import {
  Button,
  View,
  ListView,
  WhiteSpace,
  NavBar,
  WingBlank,
  InputItem,
  Toast,
  SearchBar
} from 'antd-mobile'

import ShoppingCardData from '../DataServer/ShoppingCardData'
import FollowItem from '../ViewComponent/FollowItem'
export default class ShoppingCardHome extends Component {
  async  componentWillMount() {
    console.log(UserData.ifToken());
    if (!UserData.ifToken()) {
        this.props.history.replace('/');
    }
    const result = await ShoppingCardData.SeachCard();
    console.log(result);
    if (!result.success) {
        Toast.fail(result.errorMessage);
        return;
    }
    //给列表赋值
    this.setState((preState) => {
        return {
            dataSource: preState.dataSource.cloneWithRows(result.data)
        }
    })

}
constructor(props) {
    super(props)
    //付初始值
    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    })
    //1.定义一个容器
    this.state = {
        dataSource,
        nickname:'',
        isSearchData:false,
    }
}
  render() {
    return (
      <div>
          <NavBar
                    mode="dark"                
                >
                    购物车
           </NavBar>
           
           
         <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}//得到数据
            renderRow={(todo) => {
                console.log(todo)
                return (
                    <FollowItem
                    {...todo}
                    overFollow={this.onOverFollow}
                    onItemClick={(id)=>{
                        this.props.history.push('/FollowCreat/'+id);
                    }
                    }
                    />
                )
            }}
            />
      </div>
    )
  }
}
