import React, { Component } from 'react'
import {
    AddOrderUrl,
    SeachProducsUrl,
    SearchOrderUrl
} from './UrlConfig'
import axios from 'axios';
class OrderData {
    //查询订单
    async SearchOrder(){
        try {
            const res = await fetch(SearchOrderUrl, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':localStorage.token,//token,
                    'uid':localStorage.uid//uid
                },
               
            });
            const result = res.json();
          
            if (result.success === true) {
                localStorage.access_token = result.data.token;
            }
            return result;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //下单
    async AddOrderUrl(ShippingAddressID, ProductInformations) {
        try {
            const orderInformation= {ShippingAddressID,ProductInformations}
            console.log(orderInformation)
            
         
            const res = await fetch(AddOrderUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':localStorage.access_token,//token,
                    'uid':localStorage.uid//uid
                },
                body: JSON.stringify(orderInformation)
            });
            const result = res.json();
          
            if (result.success === true) {
                localStorage.access_token = result.data.access_token;
            }
            return result;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //商品购买列表
    async SeachProducs(ids) {
        try {
           //需要有uid
            const CardDel={Del:ids}
           
            // const res = await axios.post(SeachProducsUrl,CardDel);
            const res = await fetch(SeachProducsUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':localStorage.token,//token,
                    'uid':localStorage.uid//uid
                },
                body: JSON.stringify(CardDel)
            });
            const result = res.json();
            
            console.log(result);
            return result;
        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
}
export default new OrderData();