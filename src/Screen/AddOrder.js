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
    import UserManager from '../DataServer/UserManager'
    import { imgUrl } from '../DataServer/UrlConfig'
    import ShoppingOrderItem from '../ViewComponent/ShoppingOrderItem'
    // import FllowItem from '../ViewComponent/FollwItem'
    export default class AddOrder extends Component {


        async  componentDidMount() {
            // console.log(UserData.ifToken());
            // if (!UserData.ifToken()) {
            //     this.props.history.replace('/');
            // }
         

//序列化
            const json = this.props.match.params.goods;
            const good = JSON.parse(json);
            const goods=this.state.goods;
            goods.push(good);
            console.log(goods)
            this.setState({goods});
            console.log(this.state.goods)
        //   const id = this.props.match.params.ID;
        //   console.log(id)
        //   const count=this.props.match.params.count;
        //   console.log(count)
        //   const ids = JSON.parse(id);
        //   const counts=JSON.parse(count);
        //   this.setState({ids,count:counts})
//序列化
           

            ///////////////////////////////得到购买的id
           // let result = await OrderData.SeachProducs(this.state.ids);
            // if (this.state.count!=null) {
            //     //动态给result付数量
            //     for(let i=0;i<this.state.count.length;i++){
            //         result.data[i].count=this.state.count[i];
            //     }
            //  }
           
            /////////////////////////////////
            //得到count
           // const count=12//this.props.match.params.count
        //    console.log(result)
        //     if (!result.success) {
        //         Toast.fail(result.errorMessage);
        //         return;
        //     }
            //给列表赋值
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(this.state.goods)
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
                refreshing: false,
                goods:[],
            }
        }
    
        // //下拉刷新
        // onRefresh = async () => {
        //     try {
        //         this.setState({ refreshing: true });
        //         ////////////////////////////////////
        //         const result = await OrderData.SeachProducs(this.state.ids);
        //         //////////////////////////////////////////
        //         this.setState({ refreshing: false });
        //         if (result.success === false) {
        //             Toast.fail(result.errorMessage);
        //             if (result.errorCode === 10004) {
        //                 this.props.history.replace('/');
        //             }
        //             return;
        //         }
        //         this.setState((preState) => {
        //             return {
        //                 dataSource: preState.dataSource.cloneWithRows(result.data),
        //                 refreshing: false
        //             }
        //         })
        //     } catch (error) {
        //         Toast.fail(`${error}`);
        //         this.setState({ refreshing: false });
        //     }
        // }
        
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
            // pullToRefresh={
            //     // <PullToRefresh
            //     //     refreshing={this.state.refreshing}
            //     //     onRefresh={this.onRefresh}
            //     // />
            // }
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
                        //得到需要的数据
                        const  result=await UserManager.SearchShippingAddress();
                        const ShippingAddressID=result.data.ID;
                        const ProductInformations={}
                        //对商品下单
                        const rsult = await OrderData.AddOrderUrl(ShippingAddressID, ProductInformations);
                        if (!rsult.success) {
                            Toast.fail(rsult.errorMessage);
                            return;
                        }
                        //下单

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
