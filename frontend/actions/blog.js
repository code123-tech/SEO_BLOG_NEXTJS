//@Get create Blog 
import fetch  from 'isomorphic-fetch';
//@param blog data, token for verification
//@return Success//failure message.
export const createBlog = (formdata,token)=>{
    return fetch(`${process.env.API}/create-blog`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`  
        },
        body:formdata
    }).then(res=>res.json())
    .catch(err=>console.log("Error in Creating Blog"));
}