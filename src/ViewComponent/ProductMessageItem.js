import React, { Component } from 'react'

import moment from 'moment';

import {
    ProductByCommodityTypeNameUrl
} from '../DataServer/UrlConfig'

import { 
    WingBlank, 
    WhiteSpace ,
    Card,
    SwipeAction
} from 'antd-mobile';

export default class ProductMessageItem extends Component {
  render() {

    return (
        <div>
            <WingBlank>
                <WhiteSpace/>
                <div
                onClick={()=>{
                    console.log(this.props.ID);
                    this.props.onItemClick(this.props.ID);
                }}
                >
                    <Card.Header
                        title={this.props.ProductName}
                        thumb={ProductByCommodityTypeNameUrl+this.props.HeaderThumbnail}
                        extra={this.props.sign}
                        thumbStyle={{width:'100px',height:'100px'}}                       
                    />
             </div>
                
            </WingBlank>
        </div>
    )
  }
}
