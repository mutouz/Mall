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
    PullToRefresh,
    Icon,
    Carousel, 
} from 'antd-mobile'
import ProductDetailsItem from '../ViewComponent/ProductDetailsItem'
import SearchProductManager from '../DataServer/SearchProductManager'
export default class GoodsDetailsScreen extends Component {
  async componentWillMount(){
    const result=await SearchProductManager.SearchProductMessage(this.props.match.params.ID)
    console.log(result)
    if(!result.success){
      Toast.fail(result.errorMessage);
      return;
    }
    //给列表赋值
    // this.setState((preState)=>{
    //   return{
    //     dataSource: preState.dataSource.cloneWithRows(result.data)
    //   }
    // })
  }
//   constructor(props) {
//     super(props)
//     //付初始值
//     const dataSource = new ListView.DataSource({
//         rowHasChanged: (row1, row2) => row1 !== row2,
//     })
//     //1.定义一个容器
//     this.state = {
//         dataSource,
//         refreshing:false,
//     }
// }
//下拉刷新
onRefresh =async()=>{
  try {
      this.setState({refreshing:true});
      const result=await SearchProductManager.SearchProductMessage(this.props.match.params.ID);
      this.setState({refreshing:false});
      if(result.success===false){
          Toast.fail(result.errorMessage);
          if(result.errorCode===10004){
              this.props.history.replace('/');
          }
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
  render() {
    return (
      <div>
      <NavBar
        mode="dark"
        //icon={<Icon type="left" />}
        leftContent={[
          <span
              key={1}
              onClick={()=>{
                  this.props.history.goBack();
              }}
          >
              后退
          </span>
      ]}
      >
      </NavBar>           
                
        <ProductDetailsItem
                    
        />             
      </div>
    )
  }
}