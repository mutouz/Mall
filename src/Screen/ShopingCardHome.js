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
    Icon,
    PullToRefresh
} from 'antd-mobile'
//导入要用的
import UserManager from '../DataServer/UserManager'
import SearchProductManager from '../DataServer/SearchProductManager'
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
            ids:[],
            goods:[]//为了向下单业传递数据
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
     onChange = async (id,bol,count,pid) => {
      let ids=this.state.ids;
      let goods=this.state.goods;
      
      if (bol==false) {
        let leng=ids.indexOf(id)  
        ids.splice(leng,1) 
        ////////////////删除goods
        let del;
        for (let i = 0; i < goods.length; i++) {
           if (pid==goods[i].good.pid) {
           
           del=i
           }
            
        }
        goods.splice(del,1) 
        ///////
      }
      else{
      //  const result=await SearchProductManager.SearchProductMessage(pid);
        ids.push(pid);
      
        const good={
            pid,
          //  good:result,
            count
        }
        goods.push(good);
      }
      this.setState({ids});
      this.setState({goods});
      console.log(this.state.goods)
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
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    rightContent={[

                        <Icon key="1" type="ellipsis" />,
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
                    onItemClick={(id)=>{this,this.props.history.push('/GoodsDetailsScreen/'+id)}}
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
                    // const goods = [
                    //     {
                    //         good:this.state.goodsDetail,
                    //         count:this.state.val
                    //     }
                    // ];

                     const json = JSON.stringify(this.state.goods);


                    this.props.history.push('/AddOrder/'+json);
                }}
            >
                下单
            </Button>
            </WingBlank>
            </div>
        )
    }
}
