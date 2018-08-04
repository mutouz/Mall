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
    PullToRefresh,
} from 'antd-mobile'

import SearchProductManager from '../DataServer/SearchProductManager'
import ProductMessageItem from '../ViewComponent/ProductMessageItem'
export default class SearchProductScreen extends Component {
    async componentWillMount(){
       
        const result=await SearchProductManager.SearchProductByCTName();
        console.log(result);
        if(!result.success){
            Toast.fail(result.errorMessage);
            return;
        }
        //给列表赋值
        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result.data)
            }
        })
        console.log(this.props.match.params.Name)
        if (this.props.match.params.Name!=null) {
            console.log(this.props.match.params.Name)
            this.setState({
                isSearchData:true,
            })
            Toast.loading('查询中，请稍后',0);
            const result = await SearchProductManager.SearchProductByCTName (this.props.match.params.Name);
            console.log(result.data)
            Toast.hide();
            if (result.success==false) {
                Toast.fail(result.errorMessage,1)
                return;
            }
             //给列表赋值
             this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result.data)
                }
            })
    
        }
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
            Name:'',
            isSearchData:false,
            refreshing:false,
        }
    }
    //下拉刷新
    onRefresh =async()=>{
        try {
            this.setState({refreshing:true});
            const result=await SearchProductManager.SearchProductByCTName();
            this.setState({refreshing:false});
            if(result.success===false){
                Toast.fail(result.errorMessage);
                return;
            }
            this.setState((preState)=>{
                return{
                    dataSource:preState.dataSource.cloneWithRows(result.data),
                    refreshing:false
                }
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({refreshing:false});
        }
    }
    //查询商品信息的方法
    onSearchProduct=async()=>{
        this.setState({
            isSearchData:true,
        })
        Toast.loading('查询中，请稍后',0);
        const result = await SearchProductManager.SearchProductByCTName (this.state.Name);
        Toast.hide();
        if (result.success==false) {
            Toast.fail(result.errorMessage,1)
            return;
        }
         //给列表赋值
         this.setState((preState) => {
            return {
                dataSource: preState.dataSource.cloneWithRows(result.data)
            }
        })

    }
    //(查询框)点击取消时触发
    onCancel=async()=>{
        this.setState({
            Name:'',
            isSearchData:false
        })
        const result = await SearchProductManager.SearchProductByCTName();
        if(result.success === false){
            Toast.fail(result.errorMessage);
            return;
        }
        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result.data)
            }   
        })
    }
  render() {
    return (
      <div>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => { this.props.history.goBack() }}
           
          >
            有家土特产
          </NavBar>
          <SearchBar
            value={this.state.Name}
            focus={true}
            placeholder="请输入你想找的好东西"
            onSubmit={this.onSearchProduct}//查询出商品信息并显示在页面上
            onCancel={this.onCancel}
            onChange={(Name)=>{this.setState({Name})}}
          />
          <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}//得到数据
            pullToRefresh={//刷新方法
                <PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            }
            renderRow={(product) => {
                console.log(product)
                return (
                    <ProductMessageItem
                    {...product}
                    onItemClick={(ID)=>{
                        this.props.history.push('/GoodsDetailsScreen/'+ID);
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