import React, { Component } from 'react'
import {
  Carousel, 
  WingBlank,
  Card,
  WhiteSpace,
  List,
  Button } from 'antd-mobile';
import moment from 'moment';
import {
  SeachProductUrl
} from '../DataServer/UrlConfig'
const Item = List.Item;
const Brief = Item.Brief;
export default class ProductDetailsItem extends Component {
  state = {
    data: [1,2,3],
    imgHeight: 176,
  }
  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <div>     
      <WingBlank>
        <WhiteSpace/>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={''}
                alt={this.props.state.data}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
                   
        <WhiteSpace/>
      
      </WingBlank>
      </div>
    );
  }
}
