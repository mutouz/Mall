
import {
    loginUrl,
    registerUrl,
    GetOneCustomerUrl,
    UpdateCustomerUrl,
    AddShippingAddressUrl,
    DeleteShippingAddressUrl,
    UpdateShippingUrl,
    SearchShippingAddressUrl
} from './UrlConfig';

import axios from 'axios';

class UserManager {
    async register(Phone, Password) {
        try {
            const user = { Phone, Password }
            const relust = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
           
            if (res.success===true) {
                localStorage.token = res.data.Token;
                localStorage.uid = res.data.ID;
            }
            console.log(res);
            return res;

        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    async login(Phone, Password) {
        try {
            const user = { Phone, Password }
            const relust = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const res = await relust.json();
            console.log(res)
            if (res.success===true) {
                localStorage.token = res.data.Token;
                localStorage.uid=res.data.ID;
                console.log(res.data.ID)
            }
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    //取消denglu
    tokenOut() {
        localStorage.token = "";
        localStorage.uid = "";
    }
    //判断是否登陆
    ifToken() {
        if (localStorage.token == "") {
            return false;
        }
        return true;
    }
    //得到个人信息
    async getUser(userId){
        try {
            const res=await fetch(GetOneCustomerUrl,{
              
                method:'Get',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                }
            })
            const result=await res.json();
            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async SearchShippingAddress(){
        try {
            const res=await fetch(SearchShippingAddressUrl,{
              
                method:'Get',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                }
            })
           
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

    async updateUser(userInfo){
        try {
            const token = localStorage.Token;
            const formData = new FormData();
           
            if (userInfo.Nickname) {
                formData.append('Nickname',userInfo.Nickname);
            }
            if (userInfo.image[0].length==0) {
                console.log(userInfo.image[0].file)
                formData.append('Avatar',userInfo.image[0].file);
            }
            console.log(userInfo.image[0].file)
            const res = await axios({
                url:UpdateCustomerUrl,
                method:'POST',
                data:formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                }
            })
            return res.data;

        } catch (error) {
            return {
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
    //pickerValue       Recipient, Phone,Province,City,District,Address
    async addShoppingAddress(Address,pickerValue,Recipient, Phone) {
        try {
            console.log(pickerValue)
            
            const Province=pickerValue[0];
            const City=pickerValue[1];
            const District=pickerValue[2];
            console.log(City)
            const shoppingAddress = {Recipient, Phone,Province,City,District,Address }
            console.log(localStorage.uid);
            const relust = await fetch(AddShippingAddressUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                },
                body: JSON.stringify(shoppingAddress)
            });
            const res = await relust.json();
           
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    async deleteShoppingAddress(uid) {
        try {
            const shoppingAddress = {token:localStorage.token,uid }
            const relust = await fetch(DeleteShippingAddressUrl, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                },
                body: JSON.stringify(shoppingAddress)
            });
            const res = await relust.json();
            if (res.data.success) {
                localStorage.token = res.data.Token;
                localStorage.uid=res.data.ID;
            }
            return res;
        } catch (error) {
            return {
                success: false,
                errorMessage: '网络错误'
            }
        }
    }
    

    async updateShoppingAddress(ID,Address,pickerValue,Recipient, Phone){
        try {
           console.log(pickerValue)
            const Province=pickerValue[0];
            const City=pickerValue[1];
            const District=pickerValue[2];
            const update={
                ID,
                Address,
                Province,
                City,
                District,
                Recipient,
                Phone,
                
            }
            console.log(update)
            console.log(localStorage.uid);
            const res=await fetch(UpdateShippingUrl+'/'+ID,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'token':localStorage.token,
                    'uid':localStorage.uid
                },
                
                body:JSON.stringify(update)
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
export default new UserManager();