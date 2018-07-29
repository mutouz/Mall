import React, { Component } from 'react'
import {
    GetCommodityTypeUrl,
    SeachProductUrl,
    ProductByCommodityTypeNameUrl,
    ProductByCommodityTypeUrl,
} from './UrlConfig'
class SearchProductManager{
    //通过商品类别名称查询商品
    async SearchProductByCTName(Name){
        try {
            const product={
                Name
            }
            const res=await fetch(ProductByCommodityTypeNameUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product)
            });
            const result=await res.json();
            console.log(result)
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //通过点击商品类别来查询商品（传过来一个id值）
    async SearchProductByCT(CommodityTypeID){
        try {
            const getProduct={
                CommodityTypeID
            }
            const res=await fetch (ProductByCommodityTypeUrl,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(getProduct)
            });
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //查询商品的详细信息
    async SearchProductMessage(id){
        try {
            const res=await fetch(SeachProductUrl+"/"+id,{
                mtehod:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },

            });
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //查询商品类别
    async GetCommodityType(){
        try {
            const res=await fetch(GetCommodityTypeUrl,{
                mtehod:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify()
            });
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
}
export default new SearchProductManager();