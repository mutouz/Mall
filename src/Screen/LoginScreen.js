import React, { Component } from 'react'
import {
    Button,
    View,
    ListView,
    WhiteSpace,
    NavBar,
    WingBlank,
    InputItem,
    Toast
} from 'antd-mobile'
//导入要用的

import UserManager from '../DataServer/UserManager'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Phone: '',
            Password: ''
        }
    }

    render() {
        return (
        <div>
            
            <NavBar
            mode="dark"
            >
            登录
           </NavBar>
           <WhiteSpace/>  
           <img
            alt=''
            src={require('../images/logo.png')}
            style={{width:'100%'}}
        />
        <WhiteSpace/>  
           <InputItem
            type="text"
            value={this.state.Phone}
            onChange={(Phone)=>{this.setState({Phone})}}
           >
               用户名 
           </InputItem>
           <InputItem
           type="password"
            value={this.state.Password}
            onChange={(Password)=>{this.setState({Password})}}
           >
             密码
           </InputItem>
           <WingBlank>  
               <WhiteSpace/>  
               <WhiteSpace/>           
                <Button
                type='primary'
                onClick={async()=>{                  
                 const rsult = await UserManager.login(this.state.Phone,this.state.Password);
                  if (!rsult.success) {
                    Toast.fail(rsult.errorMessage);
                        return;
                    }
                    //跳转后按箭头无法返回
                    this.props.history.replace('/TabBarDisplay');
                   //console.log(localStorage.access_token);
                }}
                >
                    登录
                </Button>
                <WhiteSpace/>     
                <Button
                type='primary'
                onClick={async()=>{
                    this.props.history.replace('/RegisterScreen');
                }
                }
                >
                    注册
                </Button>
            </WingBlank>

        </div>
        )
    }
}
