import React, { Component } from 'react'
import {
    AddCardUrl,
    DeleteCardUrl,
    SeachCardUrl,
    DeleteCardsUrl,
    AddOrderUrl
} from './UrlConfig'
class ShoppingCardData {
    ///text

   ///加入购物车
    async AddCard(ProductID,Count) {
        try {
            const token=localStorage.token;
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
            const token=localStorage.token;
            const uid=localStorage.uid;
           // const user = { token:localStorage.token, userId };
           // const user = { token:'f22b200fc2995f068b0e17a99315bbd6', userId };
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
      //批量删除购物车
      async DeleteCards( ) {
        try {
           // const user = { token:localStorage.token, userId };
           // const user = { token:'f22b200fc2995f068b0e17a99315bbd6', userId };
           const token=localStorage.token;
            const uid=localStorage.uid;
           const relust = await fetch(DeleteCardsUrl, {
                method: 'POST',
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
    //查询购物车
    async SeachCard( ) {
        try {
            const token=localStorage.token;
            const uid=localStorage.uid;
           // const user = { token:localStorage.token, userId };
          //  const user = { token:'f22b200fc2995f068b0e17a99315bbd6', userId };
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
export default new ShoppingCardData();