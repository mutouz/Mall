
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
       
        //将图片用逗号连接的字符串转换为数组
        const imgFils = this.props.ProductThumbnail.split(',')
        console.log(imgFils);
        //images将图片全部遍历存储
        const images = imgFils.map((image) => {
            console.log(imgUrl + image)
            return {
                icon: imgUrl + image
            }
        })
        return (
            <div>
            <WhiteSpace />
            <Card.Header
                title={"收货地址"}
                extra={this.props.ShopingArea}
            />
            <Card>
                <Card.Header
                    // title={this.props.ID}
                    thumb={this.props.ProductThumbnail}
                    extra={`数量:${this.props.count}`}
                />
                <Card.Body>
                    <div>{this.props.ProductName}</div>
                </Card.Body>
                <Card.Footer content={<div>总价</div>} extra={`￥:${this.props.Price*this.props.count}元`} />
            </Card>
            <WhiteSpace />
            <WhiteSpace />
       </div>
    )
    }
}
