import React, { Component } from 'react'
import Result, {Modal, Button, View, ListView, WhiteSpace, NavBar, WingBlank, InputItem, Toast, SearchBar, PullToRefresh, Icon, Carousel, Card, List, Stepper, } from 'antd-mobile'
import ProductDetailsItem from '../ViewComponent/ProductDetailsItem'
import SearchProductManager from '../DataServer/SearchProductManager'
// import SearchProductManager from '../DataServer/SearchProductManager'
import ShoppingCardData from '../DataServer/ShoppingCardData'
import UserManager from '../DataServer/UserManager'
export default class GoodsDetailsScreen extends Component {
  async componentWillMount(){
    const result=await SearchProductManager.SearchProductMessage(this.props.match.params.ID)

  
    let imgFils="";
    if (result.data.ProductThumbnail!=null&&result.data.ProductThumbnail!="") {
        console.log(result.data.ProductThumbnail)
      imgFils=result.data.ProductThumbnail.split(',')
      console.log(imgFils)
    }
    if(!result.success){
      Toast.fail(result.errorMessage);
      return;
    }

    this.setState({
        goodsDetail:result.data
    
    })
        setTimeout(() => {
          this.setState({
            dataImg:imgFils,
          });
        }, 100);

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
       goodsDetail:{},
       dataImg: [1,2,3],
       imgHeight: 176,
    }
  }
  render() {
    return (
      <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => {this.props.history.goBack()}}
        rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
      ]}
      >
      商品信息
      </NavBar>                         
        

        <WingBlank>
        <WhiteSpace/>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.dataImg.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
                   
        <WhiteSpace/>
      
      </WingBlank>


        <Card>
        <Card.Header
            title={this.state.goodsDetail.ProductName}
            extra={this.state.goodsDetail.Price}                     
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
                    //未登陆提示登录
                    if (!UserManager.ifToken()) {
                        //Toast.fail('请登录');
                        //this.props.history.replace('/LoginScreen');
                        Modal.alert('请先登录','登录',[   
                            { text: '不登录', onPress: () => console.log('cancel') },{
                            text:'确认',
                            onPress:()=>{ this.props.history.replace('/LoginScreen')}
                        }])
                        return;
                    }
                    //货品加入购物车调取加入购物车方法
                    const result=await ShoppingCardData.AddCard(this.state.goodsDetail.ID,this.state.val) ;
                     console.log(result);
                     if(result.success==true){
                        this.props.history.push('/ShopingCardHome')
                     }
                    // const shangpin = {
                    //         good:this.state.goodsDetail,
                    //         count:this.state.val
                    // };

                    // const json = JSON.stringify(shangpin);

                   // this.props.history.push('/ShopingCardHome/'+json)
                }}
            >
                加入购物车
            </Button>
            <Button 
                type="primary" 
                inline size="25px" 
                style={{ marginRight: '4px',marginTop:'240px' }}
                onClick={async()=>{
                    if (!UserManager.ifToken()) {
                        //Toast.fail('请登录');
                        //this.props.history.replace('/LoginScreen');
                       
                        Modal.alert('请先登录','登录',[   
                            { text: '不登录', onPress: () => console.log('cancel') },{
                            text:'确认',
                            onPress:()=>{ this.props.history.replace('/LoginScreen')}
                        }])
                        return;
                    }
                    const goods = [
                        {
                            good:this.state.goodsDetail.ID,
                            count:this.state.val
                        }
                    ];

                    const json = JSON.stringify(goods);


                    this.props.history.push('/AddOrder/'+json);
                }}
            >
                立即购买
            </Button>
      </div>
    )
  }
}