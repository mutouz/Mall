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
           <InputItem
            type="text"
            value={this.state.Phone}
            onChange={(Phone)=>{this.setState({Phone})}}
           >
               邮箱 
           </InputItem>
           <InputItem
           type="Password"
            value={this.state.Password}
            onChange={(Password)=>{this.setState({Password})}}
           >
             密码
           </InputItem>
           <WingBlank>  
               <WhiteSpace/>           
                <Button
                onClick={async()=>{                  
                 const rsult = await UserData.login(this.state.Phone,this.state.Password);
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
