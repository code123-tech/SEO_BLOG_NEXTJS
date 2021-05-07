import fetch from "isomorphic-fetch";
import Cookies from 'js-cookie';
//@signup 
//@param user Info
//@return- signup success Message.
export const signup = user =>{
    return fetch(`${process.env.API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(user)
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err));
}
//@signin
//@param request and response object
//@return- token
export const signin = user =>{
    return fetch(`${process.env.API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(user)
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err));
}
//@signout
//@param request and response object
//@return- signout success Message.
export const signout = next=>{
    removeCookieData("token");
    removeLocalData("user");
    next();

    return fetch(`${process.env.API}/signout`,{
        method:"GET"
    }).then(res=>{   
        console.log("");
    }).catch(err=>console.log(err));
}
//Function for Cookies

//@function: set cookie
//@param: key,value
export const setCookieData = (key,value) =>{
    //to check if we are on client side
    if(process.browser){
        Cookies.set(key,value,{expires:1});
    }
}
//@function: remove cookie
//@param: key
export const removeCookieData = (key) =>{
    //to check if we are on client side
    if(process.browser){
        Cookies.remove(key);
    }
}

//@function: get cookie
//@param: key 
//@return cookie data
export const getCookieData = key =>{
    if(process.browser){
        return Cookies.get(key);
    }
}
//Function for localStorage
//@function: set localStorage
//@param: key,value
export const setLocalData = (key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value));
    }
}
//Function for localStorage
//@function: remove localStorage
//@param: key
export const removeLocalData = (key)=>{
    if(process.browser){
        localStorage.removeItem(key);
    }
}
//Function for authenticate
//@param: data, next
export const authenticate = (data,next)=>{
    setCookieData('token',data.token);
    setLocalData('user',data.user);
    next();
}
//Authenticate user by checking as a cookie data
export const isAuth = ()=>{
    if(process.browser){
        const cookie = getCookieData('token');
        if(cookie){
            if(localStorage.getItem("user")){
                return JSON.parse(localStorage.getItem("user"));
            }else{
                return false;
            }
        }
    }
}
//to reset Password
export const resetPassword = (data)=>{
    return fetch(`${process.env.API}/recover/password`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err));
}
//Token Check
// export const TokenCheck = (token)=>{
//     return fetch(`${process.env.API}/check/token`,{
//         method:"POST",
//         headers:{
//             Accept:"application/json",
//             'Content-Type':"application/json"
//         },
//         body:JSON.stringify(token)
//     }).then(res=>{
//         return res.json();
//     }).catch(err=>console.log(err));
// }
//Update User Password
export const UpdatePassword = (data)=>{
    return fetch(`${process.env.API}/update/password`,{
        method:"PATCH",
        headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then((result)=>result.json())
    .catch(err=>console.log(err));
}