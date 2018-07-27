import React, { Component } from 'react'
import {
    AddCardUrl,
    DeleteCardUrl,
    SeachCardUrl,
    AddOrderUrl
} from './UrlConfig'
class ShoppingCardData {
    ///text

   ///加入购物车
    async AddCard(ProductID,Count) {
        try {
            const token=localStorage.access_token;
            const uid=localStorage.uid;
            const Card = { ProductID,Count };
            const relust = await fetch(AddCardUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':token,
                    'uid':uid
                },
                body: JSON.stringify(Card)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //删除购物车
    async DeleteCard( Del) {
        try {
           // const user = { access_token:localStorage.access_token, userId };
           // const user = { access_token:'f22b200fc2995f068b0e17a99315bbd6', userId };
          const CardDel={Del}
           const relust = await fetch(DeleteCardUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':token,
                    'uid':uid
                },
                body: JSON.stringify(CardDel)
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //查询购物车
    async SeachCard( ) {
        try {
           // const user = { access_token:localStorage.access_token, userId };
          //  const user = { access_token:'f22b200fc2995f068b0e17a99315bbd6', userId };
            const relust = await fetch(SeachCardUrl, {
                method: 'Get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':token,
                    'uid':uid
                },
              
            });
            const res = await relust.json();
            console.log(res);
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
   
}
export default new ShoppingCard();