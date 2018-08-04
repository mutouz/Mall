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
    Picker,
    Icon
} from 'antd-mobile'
//导入要用的
// import MagesData from '../DataServer/MagesData'
// import UserData from '../DataServer/UserData'
// import FollowData from '../DataServer/FollowData'
import OrderData from '../DataServer/OrderData';
import UserManager from '../DataServer/UserManager';
import { district, provinceLite } from 'antd-mobile-demo-data';
const CustomChildren = props => (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: '#fff', paddingLeft: 15 ,fontSize:17}}
    >
      <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
        <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
      </div>
    </div>
  );
export default class AddShoppingAddress extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       Address:'',
       Recipient:'',
       Phone:'',
       pickerValue:[]//省市县的id值
    }
  }
    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false,
      };
      onClick = () => {
        setTimeout(() => {
          this.setState({
            data: provinceLite,
          });
        }, 120);
      };
    render() {
        return (
            <div>
              <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >设置收货地址</NavBar>
                <WhiteSpace/>

              <InputItem
            type="text"
            value={this.state.Recipient}
            onChange={(Recipient)=>{this.setState({Recipient})}}
           >
               姓名
           </InputItem>
               <WhiteSpace/>
               <InputItem
            type="text"
            value={this.state.Phone}
            onChange={(Phone)=>{this.setState({Phone})}}
           >
               电话
           </InputItem>
               <WhiteSpace/>
             <Picker
          title="选择地区"
          extra="请选择(可选)"
          data={district}
          value={this.state.pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
          onOk={v => this.setState({ pickerValue: v })}
        >
          <CustomChildren>收货地址</CustomChildren>
          
        </Picker>
        <WhiteSpace/>
        <InputItem
            type="text"
            value={this.state.Address}
            onChange={(Address)=>{this.setState({Address})}}
           >
               详细地址
           </InputItem>

            <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={async()=>{
                    const result=await UserManager.addShoppingAddress(this.state.Address,this.state.pickerValue,this.state.Recipient,this.state.Phone);
                    console.log(result);
                    if(result.success === false){
                        Toast.fail(result.errorMessage);
                        return;
                    }
                    //添加完成跳转到首页
                    this.props.history.push('/GetUserScreen');
                    
                }}
            >
                确定收货地址
            </Button>
        </WingBlank>
           </div>
             
        )
    }
}
