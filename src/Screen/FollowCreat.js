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
    SearchBar
} from 'antd-mobile'
//导入要用的
//this.props.match.params.id
import FollowData from '../DataServer/FollowData'
import UserData from '../DataServer/UserData'
import FollowItem from '../ViewComponent/FollowItem'
export default class FollowCreat extends Component {
    async  componentWillMount() {
        console.log(UserData.ifToken());
        if (!UserData.ifToken()) {
            this.props.history.replace('/');
        }
        const result = await FollowData.getFollow();
        console.log(result);
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
    onOverFollow=async (id)=>{
      
            Toast.loading('操作中',0);
            const result = await FollowData.unFollowUser(id);
            
            if(result.success === false){
                Toast.hide();
                Toast.fail(result.errorMessage);
                return;
            }
    
            const result1 = await FollowData.getFollow();
            if(result1.success === false){
                Toast.hide();
                Toast.fail(result1.errorMessage);
                return;
            }
    
            this.setState((preState)=>{
                return{
                    dataSource:preState.dataSource.cloneWithRows(result1.data)
                }   
            },()=>{
                Toast.hide(); 
            })
       
         
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

                >
                    朋友圈
           </NavBar>
           
           <SearchBar
                value={this.state.value}
                placeholder="Search"
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={() => console.log('onCancel')}
                showCancelButton
                onChange={this.onChange}
      />
         <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}//得到数据
            renderRow={(todo) => {
                console.log(todo)
                return (
                    <FollowItem
                    {...todo}
                    overFollow={this.onOverFollow}
                    onItemClick={(id)=>{
                        this.props.history.push('/CommentHome');
                    }
                    }
                    />
                )
            }}
            />
            </div>
        )
    }
}
