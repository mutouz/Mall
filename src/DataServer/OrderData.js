import React, { Component } from 'react'
import {
    AddOrderUrl,
    SeachProducsUrl
} from './UrlConfig'
import axios from 'axios';
class OrderData {
    //下单
    async AddOrderUrl(ShippingAddressID, ProductInformations) {
        try {
            const orderInformation= {ShippingAddressID,ProductInformations}
            console.log(orderInformation)
            const res = await axios.post(AddOrderUrl,
                orderInformation
            );
            const result = res.data;
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
                    'token':'b716f3a82315979570f90472bd80eb2d',//token,
                    'uid':212//uid
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