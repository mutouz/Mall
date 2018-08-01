import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Icon
} from 'antd-mobile';


import userManager from '../DataServer/UserManager';



export default class RegisterScreen extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
         Phone:'',
         Password:''
      }
    }
    

  render() {
    return (
      <div>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => {this.props.history.goBack()}}
        >注册</NavBar>
        <WhiteSpace/>
        <List>
            <InputItem
                type={'text'}
                value={this.state.Phone}
                onChange={(Phone)=>{this.setState({Phone})}}
                placeholder={'请输入注册用户名'}
            >
                用户名
            </InputItem>
            <InputItem
                type={'text'}
                value={this.state.Password}
                onChange={(Password)=>{this.setState({Password})}}
                placeholder={'请输入注册密码'}
            >
                密码
            </InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={async()=>{
                    const result=await userManager.register(this.state.Phone,this.state.Password);
                    console.log(result);
                    if(result.success === false){
                        Toast.fail(result.errorMessage);
                        return;
                    }
                    //注册完成跳转到首页
                    this.props.history.push('/TabBarDisplay');
                    
                }}
            >
                提交注册
            </Button>
        </WingBlank>
      </div>
    )
  }
}
