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

import UserData from '../DataServer/UserData'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
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
           <InputItem
            type="text"
            value={this.state.email}
            onChange={(email)=>{this.setState({email})}}
           >
               邮箱 
           </InputItem>
           <InputItem
           type="password"
            value={this.state.password}
            onChange={(password)=>{this.setState({password})}}
           >
             密码
           </InputItem>
           <WingBlank>  
               <WhiteSpace/>           
                <Button
                onClick={async()=>{                  
                 const rsult = await UserData.login(this.state.email,this.state.password);
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
                onClick={async()=>{
                    this.props.history.replace('/Register');
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
