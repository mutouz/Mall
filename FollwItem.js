import React, { Component } from 'react'

import moment from 'moment';



import { 
    WingBlank, 
    WhiteSpace ,
    Card,
    SwipeAction
} from 'antd-mobile';

export default class FollwItem extends Component {
  render() {

    return (
        <SwipeAction
            autoClose={true}
            right={[
                {
                    text:'取消关注',
                    style:{
                        backgroundColor:'red',
                    },
                    onPress:()=>{
                        if(this.props.toggleFinish){
                            this.props.toggleFinish(this.props.id);//回掉再前台直接调后台的方法
                        }
                    }
                },
                {
                    text:'删除',
                    style:{
                        backgroundColor:'red'
                    },
                    onPress:()=>{
                        if(this.props.del){
                            this.props.del(this.props.id);
                        }
                    }
                },
               {
                text:'修改',
                    style:{
                        backgroundColor:'blue'
                    },
                    onPress:()=>{
                        //跳转到update页面修改信息
                       this.props.update(this.props.id);
                        //this.props.history.push('/UpdateTodo',{a:1});
                    }  
               }
            ]}

        >
            <WingBlank>
                <WhiteSpace/>
                <Card>
                    <Card.Header
                        title={this.props.title}
                        extra={this.props.isFinish?'已完成':'未完成'}
                    />
                    <Card.Body>
                        <span>
                        {this.props.content}
                        </span>
                    </Card.Body>
                    <Card.Footer
                        content={moment(this.props.createdAt).format('YYYY-MM-DD HH:mm')}
                    />
                </Card>
            </WingBlank>
        </SwipeAction>
    )
  }
}
