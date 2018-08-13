
import React, { Component } from 'react'

import moment from 'moment';

import {
    imgUrl
} from '../DataServer/UrlConfig'

import {
    WingBlank,
    WhiteSpace,
    Card,
    Grid,
   
    SwipeAction
} from 'antd-mobile';

export default class ShoppingCardItem extends Component {
    constructor(props) {
        super(props)

        //1.定义一个容器
        this.state = {
            checked: true
        }
    }
    render() {
        console.log(this.props[0]);
       
        let imgFils="";
        let images="";
        if (this.props.good.data.ProductThumbnail!=null&&!this.props.good.data.ProductThumbnail) {
          imgFils=this.props.good.data.ProductThumbnail.split(',')
            console.log(imgFils);
            //images将图片全部遍历存储
             images=imgFils.map((image)=>{
                console.log(imgUrl+image)
                return{
                    icon:imgUrl+image
                }
               
            })
        }
        return (
            <div>
            <WhiteSpace />
            <Card.Header
                title={"收货地址"}
                extra={this.props.good.data.ShopingArea}
            />
            <Card>
                <Card.Header
                    // title={this.props.ID}
                    thumb={this.props.good.data.ProductThumbnail}
                    extra={`数量:${this.props.count}`}
                />
                <Card.Body>
                    <div>{this.props.good.data.ProductName}</div>
                </Card.Body>
                <Card.Footer content={<div>总价</div>} extra={`￥:${this.props.good.Price*this.props.count}元`} />
            </Card>
            <WhiteSpace />
            <WhiteSpace />
       </div>
    )
    }
}
