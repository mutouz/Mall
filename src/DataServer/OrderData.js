import React, { Component } from 'react'
import {
    AddOrderUrl
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
    async SeachProductUrl(ID) {
        try {
            
            const model={ID};
            console.log(model);
            const res = await axios.post(SeachProductUrl,model);
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
}
export default new OrderData();