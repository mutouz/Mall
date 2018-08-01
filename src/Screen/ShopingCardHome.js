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
import { imgUrl } from '../DataServer/UrlConfig'
import ShoppingCardItem from '../ViewComponent/ShoppingCardItem'
// import FllowItem from '../ViewComponent/FollwItem'
export default class ShopingCardHome extends Component {
    async  componentWillMount() {
        console.log(UserManager.ifToken());
        if (!UserManager.ifToken()) {
            //Toast.fail('请登录');
            //this.props.history.replace('/LoginScreen');

            return;
        }
        const result = await ShoppingCardData.SeachCard();
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
            refreshing: false,
            ids:[]
        }
    }
    //下拉刷新
    onRefresh = async () => {
        try {
            this.setState({ refreshing: true });
            const result = await ShoppingCardData.SeachCard();
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
     //单选框回调
     onChange = (id,bol) => {
      let ids=this.state.ids;
      if (bol==false) {
        let leng=ids.indexOf(id)  
        ids.splice(leng,1) 
      }
      else{
        ids.push(id);
      }
      this.setState({ids});
      console.log(this.state.ids);
      }
       //删除购物车
    onDel = async () => {
        try {
            Toast.loading('操作中', 0);
            const result = await ShoppingCardData.DeleteCard( this.state.ids);
           
            console.log(result)
            if (result.success == false) {
                Toast.fail(result.errorMessage);
               
                console.log(this.state.result)
                return;
            }
            const result1 = await ShoppingCardData.SeachCard();
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result1.data),
                    refreshing: false
                }
            },()=>{
                Toast.hide(); 
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({ refreshing: false });
        }


    }
      //清空购物车
      onDels = async () => {
        try {
            Toast.loading('操作中', 0);
            const result = await ShoppingCardData.DeleteCards( );
           
            console.log(result)
            if (result.success == false) {
                Toast.fail(result.errorMessage);
               
                console.log(this.state.result)
                return;
            }
            const result1 = await ShoppingCardData.SeachCard();
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result1.data),
                    refreshing: false
                }
            },()=>{
                Toast.hide(); 
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
                    mode="dark"
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
                    购物车
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
            renderRow={(card) => {
                console.log(card)
                return (
                    <ShoppingCardItem
                    {...card}
                    onChange={this.onChange}
                    />
                )
            }}
          />
           <WhiteSpace/>
           <WingBlank>
           <Button
                type={'primary'}
                onClick={this.onDel}
            >
                删除购物车
            </Button>
            <WhiteSpace/>
            <Button
                type={'primary'}
                onClick={this.onDels}
            >
                清空购物车
            </Button>
            <WhiteSpace/>
            <Button
                type={'primary'}
                onClick={async()=>{
                    
                    // const result = await userData.register(this.state.email,this.state.password);
                    // console.log(result);
                    // if(result.success === false){
                    //     Toast.fail(result.errorMessage);
                    //     return;
                    // }
                    // this.props.history.replace('/InformationScreen');
                    
                }}
            >
                下单
            </Button>
            </WingBlank>
            </div>
        )
    }
}
