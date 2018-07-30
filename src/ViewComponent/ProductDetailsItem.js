import { Carousel, WingBlank,Card,WhiteSpace,List,Button } from 'antd-mobile';
import React, { Component } from 'react'
const Item = List.Item;
const Brief = Item.Brief;
export default class ProductDetailsItem extends Component {
  state = {
    data: [],
    imgHeight: 176,
  }
  async componentDidMount() {
    // simulate img loading
    // const resultImg=await SowingMapManager.sowingMap();
    // setTimeout(() => {
    //   this.setState({
    //     data:[resultImg.data[0],resultImg.data[1],resultImg.data[2]],
        
    //   });
    // }, 100);
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
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
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
        <Card>
        <Card.Header
            title={this.props.ProductName}
            extra={this.props.Price}                     
        />
        </Card>
        <WhiteSpace/>
        <List>       
        <Item arrow="horizontal" onClick={() => {}}>领劵</Item>
        <Item arrow="horizontal" onClick={() => {}}>服务 7天无理由,运费险,公益宝贝</Item>
      </List>
      <WhiteSpace/>
      <List>
        <Item arrow="horizontal" onClick={() => {}}>规格 选取 尺码,颜色分类</Item>
        <Item arrow="horizontal" onClick={() => {}}>参数</Item>
      </List>
      <Button type="primary"
        style={{marginTop:'180px',width:'100px',flexDirection: 'row'}}
      >加入购物车</Button>
      <WhiteSpace/>
      <Button type="primary"
        style={{marginTop:'0px',width:'100px'}}
      >立即购买</Button>
      </WingBlank>
      </div>
    );
  }
}
