//设置购买商品接收数量收货地址id
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
        Stepper,
        List,
        PullToRefresh
    } from 'antd-mobile'
    //导入要用的
    import OrderData from '../DataServer/OrderData'

    import { imgUrl } from '../DataServer/UrlConfig'
    import ShoppingOrderItem from '../ViewComponent/ShoppingOrderItem'
    // import FllowItem from '../ViewComponent/FollwItem'
    export default class AddOrder extends Component {


        async  componentWillMount() {
            // console.log(UserData.ifToken());
            // if (!UserData.ifToken()) {
            //     this.props.history.replace('/');
            // }
            //1.将传过来的参数变成数值
            // const shoppingAddressRest=
            // const shoppingAddress=
          //  const count

//序列化
        //   const json = this.props.match.params.ids;

        //   const ids = JSON.paser(json);

//序列化
            let count=[12,14,56]

            ///////////////////////////////得到购买的id
            let result = await OrderData.SeachProducs([100,101,102]);
          
            //动态给result付数量
            for(let i=0;i<count.length;i++){
                result.data[i].count=count[i];
            }
            /////////////////////////////////
            //得到count
           // const count=12//this.props.match.params.count
           console.log(result)
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
               
                shoppingAddress:'',
                dataSource,
               // val:1,
                refreshing: false,
                ids: []
            }
        }
    
        //下拉刷新
        onRefresh = async () => {
            try {
                this.setState({ refreshing: true });
                ////////////////////////////////////
                const result = await OrderData.SeachProducs([44,45]);
                //////////////////////////////////////////
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
            return (
               
            <div>
                <NavBar
                    mode="dark"
                >
                    确认下单
           </NavBar>
                <WhiteSpace />
                <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}
            pullToRefresh={
                <PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }
            renderRow={(prouct) => {
                console.log(prouct)
                return (
                    <ShoppingOrderItem
                    {...prouct}
                    onChange={this.onChange}
                    />
                )
            }}
          />
              
                <Button
                    type="primary"
                    onClick={async () => {
                        
                        const rsult = await OrderData.AddOrderUrl(this.state.ShippingAddressID, this.state.ProductInformations);
                        if (!rsult.success) {
                            Toast.fail(rsult.errorMessage);
                            return;
                        }
                        //跳转后按箭头无法返回
                        //this.props.history.replace('/TabBarDisplay');
                        //console.log(localStorage.access_token);
                    }}
                >
                    下单
                </Button>
                <WhiteSpace />
            </div>
        )
    }
}
