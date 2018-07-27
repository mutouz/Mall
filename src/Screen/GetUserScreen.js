import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Flex,
    ImagePicker,
    Icon
} from 'antd-mobile';


import{imgUrl} from '../DataServer/UrlConfig';
import userManager from '../DataServer/UserManager';

export default class MyInfoScreen extends Component {

    async componentDidMount(){
        // console.log(userManager.ifToken());
        // if (!UserData.ifToken()) {
        //     this.props.history.replace('/');
        // }
    const result=await userManager.getUser();
    console.log(result);
    if(result.success===false){
        Toast.fail(result.errorMessage,1);
        return;
    }
    this.setState({Nickname:result.data.Nickname,Avatar:result.data.Avatar})
     console.log(imgUrl+this.state.Avatar)
}
//   async componentDidMount(){

//     const result = await userManager.getUser();

//     if(result.success === false){
//         Toast.fail(result.errorMessage,1);
//         return;
//     }

//     this.setState({customer:result.data});
//   }




  constructor(props) {
    super(props)
  
    this.state = {
        Nickname:'',
        Avatar:''
    }
  }
    

  render() {

    return (
      <div>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => { this.props.history.goBack() }}
                >个人信息</NavBar>
        {/* <Flex
          justify={'center'}
          style={{backgroundColor:'#ffffff'}}
        >
          <img
            alt={''}
            src={imgUrl+this.state.customer.AvatarImg}
            style={{width:'100px',height:'100px',margin:'5px'}}
          /> 
        </Flex> */}
        
        <List>
        <ImagePicker
                  
                  files={[{url:imgUrl+this.state.Avatar}]}
                  onChange={(Avatar)=>{this.setState({Avatar})}}
                  selectable={this.state.Avatar.length <= 1}
                  />
            <InputItem
                type={'text'}
                editable={false}
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
            type='primary'
                onClick={async()=>{
                    this.props.history.push('/UpdateCustomerScreen',this.state.Nickname,this.state.Avatar);
                }}
            >
              修改个人资料
            </Button>
            <WhiteSpace/>
            <Button
            type='primary'
                onClick={async()=>{
                    this.props.history.push('/AddShoppingAddress');
                }}
            >
                设置收货地址
            </Button>
            <WhiteSpace/>
            <WhiteSpace/>
            <Button
                type={'warning'}
                onClick={async()=>{
                      userManager.tokenOut();
                      this.props.history.replace('/');
                      
                }}
            >
                退出登录
            </Button>
        </WingBlank>
      </div>
    )
  }
}
