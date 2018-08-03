import React, { Component } from 'react'
import {
    WhiteSpace, WingBlank, Card
} from 'antd-mobile';
import SearchProductManager from '../DataServer/SearchProductManager';
import './xx.css'


export default class TemaiScreen extends Component {
    state = {
        items:[],
    }
    async componentDidMount() {
        const result = await SearchProductManager.SearchDetonationModel();
        console.log(result)
        this.setState({
            items:result.data,
        })
    }
    render() {
        console.log(this.state.items);
        const cards = [];

        for(let i=0;i<this.state.items.length;i++){
            const item = this.state.items[i];

            const card = (
                <Card
                 onClick={()=>{
                    console.log(item.Product.ID)
                    const ID=item.Product.ID
                    this.props.history.push('/GoodsDetailsScreen/'+ID);
                  
                 }}
                    key={i}
                >
                    <Card.Header
                        thumb={item.Product.HeaderThumbnail}
                        extra={<span>{item.Product.ProductName}<p>￥ {item.Product.SalePrice}</p></span>}
                    />
                </Card>
            )

            cards.push(card);
        }


        return (
            <div>
                <p>今日特卖</p>
                {cards}
            </div>
        )
    }
}
