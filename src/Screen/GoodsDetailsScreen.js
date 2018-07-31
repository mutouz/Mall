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
    Card,
    List,
    Stepper,//计步器引用

} from 'antd-mobile'
import ProductDetailsItem from '../ViewComponent/ProductDetailsItem'
import SearchProductManager from '../DataServer/SearchProductManager'
export default class GoodsDetailsScreen extends Component {
  async componentWillMount(){
    const result=await SearchProductManager.SearchProductMessage(this.props.match.params.ID)
   
  
    console.log(result.data)
    if(!result.success){
      Toast.fail(result.errorMessage);
      return;
    }
    const dat=result.data;
    this.setState({
        data:dat
    
    })
    console.log( this.state.data)
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
constructor(props) {
    super(props)
  
    this.state = {
       data:{},
       val:1,//记录计步器的值
       ids:[],
    }
  }
  render() {
    return (
      <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {this.props.history.goBack()}}
        rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
      ]}
      >
      </NavBar>                         
        <ProductDetailsItem                    
        />        
        <Card>
        <Card.Header
            title={this.state.data.ProductName}
            extra={this.state.data.Price}                     
        />
        </Card>
        <WhiteSpace/>
        <List.Item
            wrap//计步器代码
            extra={
                <Stepper
                    style={{ width: '100%', minWidth: '100px' }}
                    showNumber={true}
                    max={10}
                    min={1}
                    step
                    value={this.state.val}
                    onChange={(step)=>{this.setState({val:step}); console.log(this.state.val)}}
                />}
        >
            数量
        </List.Item>
        <WhiteSpace/>        
            <Button 
                type="primary" 
                inline size="25px" 
                style={{ marginRight: '4px',marginTop:'240px' }}
                onClick={async()=>{
                    const ids = this.state.ids;
                    const count=this.state.val;
                    console.log(count)
                    const ids_json = JSON.stringify(ids);
                    //console.log(ids_json)
                    const count_json = JSON.stringify(count);
                    this.props.history.push('/xxx/'+ids_json/count_json);
                }}
            >
                加入购物车
            </Button>
            <Button 
                type="primary" 
                inline size="25px" 
                style={{ marginRight: '4px',marginTop:'240px' }}
                onClick={async()=>{
                    //let number=this.state.val
                    const ids = this.state.ids;
                    const count=this.state.val;
                    console.log(count)
                    const ids_json = JSON.stringify(ids);
                    //console.log(ids_json)
                    const count_json = JSON.stringify(count);
                    this.props.history.push('/xxx/'+ids_json/count_json);
                }}
            >
                立即购买
            </Button>
      </div>
    )
  }
}