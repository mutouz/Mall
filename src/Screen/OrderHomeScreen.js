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
    SearchBar,
    PullToRefresh
} from 'antd-mobile'
//导入要用的
import UserManager from '../DataServer/UserManager'

import ShoppingCardData from '../DataServer/ShoppingCardData'
import OrderData from '../DataServer/OrderData'

import { imgUrl } from '../DataServer/UrlConfig'
import OrderItem from '../ViewComponent/OrderItem'
// import FllowItem from '../ViewComponent/FollwItem'
export default class OrderHomeScreen extends Component {
    async  componentWillMount() {
        console.log(UserManager.ifToken());
        if (!UserManager.ifToken()) {
            //Toast.fail('请登录');
            //this.props.history.replace('/LoginScreen');

            return;
        }
        const result = await OrderData.SearchOrder();
        console.log(result)
        if (!result.success) {
            Toast.fail(result.errorMessage);
            return;
        }
        console.log(result)
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
            refreshing: false,
            ids:[]
        }
    }
    //下拉刷新
    onRefresh = async () => {
        try {
            this.setState({ refreshing: true });
            const result = await OrderData.SearchOrder();
            this.setState({ refreshing: false });
            if (result.success === false) {
                Toast.fail(result.errorMessage);
                if (result.errorCode === 10004) {
                    this.props.history.replace('/');
                }
                return;
            }
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result.data),
                    refreshing: false
                }
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({ refreshing: false });
        }
    }
    
    render() {
        //未登陆点击登陆
    if (!UserManager.ifToken()) {
        //this.props.history.replace('/LoginScreen');
        return(
            <div   onClick={()=>{
                this.props.history.replace('/LoginScreen')
            }}>
                点击登陆
            </div>    
        )
    }

        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={[
                        <span
                            key={1}
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            后退
                        </span>
                    ]}
                >
                    订单信息
           </NavBar>
           <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}
            pullToRefresh={
                <PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }
            renderRow={(order) => {
                console.log(order)
                return (
                    <OrderItem
                    {...order}
                    onChange={this.onChange}
                    />
                )
            }}
          />
           <WhiteSpace/>
           <WingBlank>
          
            </WingBlank>
            </div>
        )
    }
}
