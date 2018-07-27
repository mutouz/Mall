import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Icon,
    ImagePicker,
    Modal
} from 'antd-mobile';

import{imgUrl} from '../DataServer/UrlConfig';
import userManager from '../DataServer/UserManager';

export default class UpdateCustomerScreen extends Component {
    async componentDidMount(){
    const result=await userManager.getUser();
    console.log(result);
    if(result.success===false){
        Toast.fail(result.errorMessage,1);
        return;
    }
    this.setState({Nickname:result.data.Nickname})
    
}
    constructor(props) {
      super(props)
    
      this.state = {
         Nickname:'',
         files:[]
      }
    }
    


  render() {
    return (
      <div>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => {this.props.history.goBack()}}
        >修改用户信息</NavBar>
        <WhiteSpace/>
        <ImagePicker
            files={this.state.files}
            onChange={(files)=>{this.setState({files})}}
            selectable={this.state.files.length<=1}
        />
        <List>
            <InputItem
                type={'text'}
                value={this.state.Nickname}
                onChange={(Nickname)=>{this.setState({Nickname})}}
                placeholder={'请输入昵称'}
            >
                昵称
            </InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={async()=>{

                    Toast.loading('内容上传中...',0);
                    const userinfo = {
                        Nickname:this.state.Nickname
                    }
                    if(this.state.files.length !== 0){
                        userinfo.image = this.state.files;
                        console.log( userinfo.image)
                    } 
                    const result = await userManager.updateUser(userinfo);
                    console.log(result)

                    Toast.hide();
                    if(result.success === false){
                        Toast.fail(result.errorMessage);
                        return;
                    }
                    Modal.alert('修改成功','点击确认返回',[{
                        text:'确认',
                        onPress:()=>{this.props.history.goBack()}
                    }])
                    
                }}
            >
                提交修改
            </Button>
        </WingBlank>
      </div>
    )
  }
}
