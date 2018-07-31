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
    Stepper,//计步器引用
    List,
    PullToRefresh
} from 'antd-mobile'
//导入要用的
import ShoppingCardData from '../DataServer/ShoppingCardData'
import { imgUrl } from '../DataServer/UrlConfig'
import ShoppingCardItem from '../ViewComponent/ShoppingCardItem'
// import FllowItem from '../ViewComponent/FollwItem'
export default class OrderHome extends Component {
    async  componentWillMount() {
        // console.log(UserData.ifToken());
        // if (!UserData.ifToken()) {
        //     this.props.history.replace('/');
        // }
        const result = await ShoppingCardData.SeachCard();
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
            dataSource,
            val:1,//记录计步器的值
            refreshing: false,
            ids: []
        }
    }

    //下拉刷新
    onRefresh = async () => {
        try {
            this.setState({ refreshing: true });
            const result = await ShoppingCardData.SeachCard();
            this.setState({ refreshing: false });
            if (result.success === false) {
                Toast.fail(result.errorMessage);
                if (result.errorCode === 10004) {
                    this.props.history.replace('/');
                }
                return;
            }
            this.setState((preState) => {
                return {
                    dataSource: preState.dataSource.cloneWithRows(result.data),
                    refreshing: false
                }
            })
        } catch (error) {
            Toast.fail(`${error}`);
            this.setState({ refreshing: false });
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
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            后退
                        </span>
                    ]}
                >
                    确认订单
           </NavBar>
                <ListView
                    useBodyScroll={true}
                    dataSource={this.state.dataSource}
                    pullToRefresh={
                        <PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    renderRow={(card) => {
                        console.log(card)
                        return (
                            <ShoppingCardItem
                                {...card}
                                onChange={this.onChange}
                            />
                        )
                    }}
                />
                <WhiteSpace />
                <WingBlank>
                
                    <List.Item
                        wrap//计步器代码
                        extra={
                            <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber={true}
                                max={10}
                                min={1}
                                step
                                value={this.state.val}
                                onChange={(step)=>{this.setState({val:step}); console.log(this.state.val)}}
                            />}
                    >
                        Show number value
                 </List.Item>
                </WingBlank>
            </div>
        )
    }
}
