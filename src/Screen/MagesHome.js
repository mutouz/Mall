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
import MagesData from '../DataServer/MagesData'
import UserData from '../DataServer/UserData'
import FollowData from '../DataServer/FollowData'

export default class MagesHome extends Component {
    async  componentWillMount() {
        console.log(UserData.ifToken());
        if (!UserData.ifToken()) {
            this.props.history.replace('/');
        }
       // const result = await MagesData.getFollow();
        if (!result.success) {
            Toast.fail(result.errorMessage);
            return;
        }
        //给列表赋值
        this.setState((preState) => {
            return {
                dataSource: preState.dataSource.cloneWithRows(result.data)
            }
        })
    }
    constructor(props) {
        super(props)
        //付初始值
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        //1.定义一个容器
        this.state = {
            dataSource
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={[
                        <span
                            key={1}
                            onClick={
                                () => {
                                    this.props.history.replace('');
                                }
                            }
                        >后退</span>
                    ]}
                    rightContent={[
                        <span
                            key={1}
                            onClick={
                                () => {
                                    this.props.history.push("/CreateComment", { messageId: this.props.history.location.state.messageId });

                                }
                            }
                        >发消息</span>
                    ]}
                >
                    首页
           </NavBar>
                <ListView
                    useBodyScroll={true}
                    dataSource={this.state.dataSource}//得到数据
                    renderRow={(todo) => {
                        console.log(todo)
                        return (
                            {/* <FollwItem
                               
                               
                                
                            /> */}
                        )
                    }}
                />
            </div>
        )
    }
}
