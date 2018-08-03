import React, { Component } from 'react'
import { 
    Button,
    WingBlank, 
    WhiteSpace,
    NavBar ,
    TabBar 
  } from 'antd-mobile';
  
  import GetUserScreen from './GetUserScreen';
  import HomeScreen from './HomeScreen';
  import ShopingCardHome from './ShopingCardHome';
  import OrderHomeScreen from './OrderHomeScreen';
  

export default class TabBarDisplay extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         selected:'HomeScreen'
      }
    }
    componentWillMount(){//页面加载时执行
        if(localStorage.selected){//localStorage在浏览器中的一个缓存操作方法
          this.setState({
            selected:localStorage.selected
          })
        }
      }
    
  render() {
    return (
     <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item
            title="商城"//图标下的标签
            key="HomeScreen"//唯一标识
           // badge={'new'}//图标上角
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selected === 'HomeScreen'}//是否被选中bool类型
          
            onPress={() => {//点击用户登记
              this.setState({
                selected: 'HomeScreen',
              });
              localStorage.selected = 'HomeScreen'
            }}
            >
            {/* 显示页面 */}
            <HomeScreen {...this.props}/>
            </TabBar.Item>
             <TabBar.Item
            // badge={'new'}
            title="购物车"
            key="ShopingCardHome"//唯一标识
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
               />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
             />
            }
            selected={this.state.selected === 'ShopingCardHome'}
          
            onPress={() => {//点击用户登记
              this.setState({
                selected: 'ShopingCardHome',
              });
              localStorage.selected = 'ShopingCardHome'
            }}
            >
            {/* 显示页面 */}
            <ShopingCardHome {...this.props}/>
            </TabBar.Item>
            <TabBar.Item
           // badge={'new'}
            title="订单详情"
            key="Select"//唯一标识
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selected === 'OrderHomeScreen'}//判断是否被选中
          
            onPress={() => {//点击用信息查询
              this.setState({
                selected: 'OrderHomeScreen',
              });
              localStorage.selected = 'OrderHomeScreen'
            }}
            >
            {/* 显示页面 */}
            <OrderHomeScreen {...this.props}/>
            </TabBar.Item>
            <TabBar.Item
           // badge={'new'}
            title="个人信息"
            key="Select"//唯一标识
            icon={<div style={{//图片默认状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={<div style={{//选中图片改变状态
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selected === 'GetUserScreen'}//判断是否被选中
          
            onPress={() => {//点击用信息查询
              this.setState({
                selected: 'GetUserScreen',
              });
              localStorage.selected = 'GetUserScreen'
            }}
            >
            {/* 显示页面 */}
            <GetUserScreen {...this.props}/>
            </TabBar.Item>
           
        </TabBar>
     </div>
    )
  }
}