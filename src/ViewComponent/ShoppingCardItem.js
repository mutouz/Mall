import React, { Component } from 'react'

import moment from 'moment';

import {
    imgUrl
} from '../DataServer/UrlConfig'

import { 
    WingBlank, 
    WhiteSpace ,
    Card,
    Grid,
    Checkbox,
    SwipeAction
} from 'antd-mobile';

export default class ShoppingCardItem extends Component {
    constructor(props) {
        super(props)
      
        //1.定义一个容器
        this.state = {
            checked:true
        }
    }
   render() {
    const CheckboxItem = Checkbox.CheckboxItem;
    //将图片用逗号连接的字符串转换为数组
    let imgFils="";
    let images="";
    if (this.props.Product.ProductThumbnail!=null) {
      imgFils=this.props.Product.ProductThumbnail.split(',')
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
       
       
            <WingBlank>
                <WhiteSpace/>
               
                 <CheckboxItem key={this.props.ID} onChange={()=>{
                     //动态构造是否被选中选中再外层动态改变数组
                    this.setState({checked:this.state. checked==true?false:true});
                    this.props.onChange(this.props.ID,this.state.checked,this.props.Count,this.props.Product.ID)}
                 } >
                 <div
                onClick={()=>{//点击显示商品详情
                    console.log(this.props.Product.ID);
                    this.props.onItemClick(this.props.Product.ID);
                }}
                >
                <Card>
                    <Card.Header
                        title={this.props.Product.ProductName}
                        thumb={imgUrl+this.props.Product.HeaderThumbnail}
                        extra={this.props.sign}
                        thumbStyle={{width:'40px',height:'40px'}}   
                    
                    />
                    <Card.Body>
                      
                        <Grid
                            data={images}
                            columnNum={3}
                            hasLine={false}
                            renderItem={(image)=>{
                                return (
                                        <div style={{
                                            width: '88px',
                                            height: '88px',
                                            background: `url(${image.icon}) center center /  86px 86px no-repeat` }}
                                        />
                                        )
                            }}
                        />
                    </Card.Body>
                    <span id='content'> 
                            
                        </span>
                    <Card.Footer
                content={`价格为:${this.props.Product.SalePrice}元`}
                extra={`下单数量:${this.props.Count}`}
            />
             </Card>
             </div>
             </CheckboxItem>
           
            
            </WingBlank>
        
    )
  }
}
