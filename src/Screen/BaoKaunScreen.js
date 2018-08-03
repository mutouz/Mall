import React, { Component } from 'react'
import {
    WhiteSpace, WingBlank, Card
} from 'antd-mobile';
import SearchProductManager from '../DataServer/SearchProductManager';
import './xx.css'


export default class BaoKaunScreen extends Component {
    state = {
        items:[],
    }
    async componentDidMount() {
        const result = await SearchProductManager.SearchSpecialSale();
        console.log(result)
        this.setState({
            items:result.data,
        })
    }
    render() {

        const cards = [];


        for(let i=0;i<this.state.items.length;i++){
            const item = this.state.items[i];

            const card = (
                <div 
                    key={i}
                    onClick={()=>{
                       console.log(item.Product.ID)
                       const ID=item.Product.ID
                       this.props.history.push('/GoodsDetailsScreen/'+ID);
                     
                    }}
                >
                <Card>
                    <Card.Header
                        thumb={item.Product.HeaderThumbnail}
                        extra={<span>{item.Product.ProductName}<p>￥ {item.Product.SalePrice}</p></span>}
                    /> 
                </Card>

            </div>
            )

            cards.push(card);
        }


        return (
            <div>
                <p>热销爆款</p>
                {cards}
            </div>
        )
    }
}
