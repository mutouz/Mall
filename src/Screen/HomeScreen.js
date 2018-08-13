import React, { Component } from 'react'

import {
    Toast, SearchBar, Button, WhiteSpace, WingBlank, NavBar, Icon, Carousel, Grid, Text, ListView, Card
} from 'antd-mobile';


import BaoKaunScreen from './BaoKaunScreen';
import TemaiScreen from './TemaiScreen';

import SearchProductManager from '../DataServer/SearchProductManager';

const data1 = Array.from(new Array(8)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));





export default class HomeScreen extends Component {
    state = {
        data: [],
        imgHeight: 176,
        resultCommodityType: [],
       
    }
    async componentDidMount() {
        const resultImg = await SearchProductManager.SearchFirstScreenImages();
        console.log(resultImg)
        const resultCommodityType = await SearchProductManager.GetCommodityType();
        console.log(resultCommodityType)
        this.state.resultCommodityType = resultCommodityType.data.map((e) => {
            const t = {
                icon: `https://fenleigongge.oss-cn-beijing.aliyuncs.com/${e.Img}.png`,
                text: e.Name,
            }
            return t;
        })
        setTimeout(() => {
            this.setState({
                data:resultImg.data,

            });
        }, 100);
       
    }
   //查询商品信息的方法
   onSearchProduct=async()=>{
   this.props.history.push("/SearchProductScreen/ ");
}
//(查询框)点击取消时触发
onCancel=async()=>{
   
    this.props.history.push('/SearchProductScreen/ ');
    return;
}
    // tt(){
    //     const arr1 = [
    //         {
    //             'xxx':13,
    //         },
    //         {
    //             'yyy':14
    //         }
    //     ]


    //     const arr2 = arr1.map((e,i)=>{
    //         const t = {
    //             xingming:e.name,
    //             nianling:e.age
    //         }
    //         return t;
    //     });

    //     // for(let i=0;i<arr1.length;i++){
    //     //     const e = arr1[i];

    //         // const t = {
    //         //     xingming:e.name,
    //         //     nianling:e.age
    //         // }

    //     //     arr2.push(t);
    //     // }


    //     // const arr2 = [
    //     //     {
    //     //         xingming:'xxx',
    //     //         nianling:13,
    //     //     },
    //     //     {
    //     //         xingming:'xxx',
    //     //         nianling:13,
    //     //     },
    //     // ]
    // }




    render() {
        return (
            <div>
                {/* 导航栏 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >土特产商城</NavBar>
                {/* 搜索 */}
                <WhiteSpace />
                <SearchBar placeholder="搜索好东西" maxLength={8}   onFocus={this.onSearchProduct}//查询出商品信息并显示在页面上
            onCancel={this.onCancel}/>
                <WhiteSpace />
                {/* 走马灯 */}
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(imgdata => (
                        <a
                            key={imgdata.ProductID}

                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img

                                
                                src={`https://lunbotu2.oss-cn-beijing.aliyuncs.com/${imgdata.img}.jpeg`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });

                                }}
                                onClick={() => {
                                    this.props.history.push('/GoodsDetailsScreen/'+imgdata.ProductID);
                                 
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                {/* 宫格 */}
                <Grid
                    data={this.state.resultCommodityType}
                    hasLine={false}
                    onClick={(item, index) => {
                        console.log(this.state.resultCommodityType[index].text)
                        this.props.history.push('/SearchProductScreen/'+this.state.resultCommodityType[index].text);
                    }}
                />
                <WhiteSpace />
                <TemaiScreen
                {...this.props}
                />
                <WhiteSpace />
                <BaoKaunScreen 
                {...this.props}
                />


            </div>
        )
    }
}
