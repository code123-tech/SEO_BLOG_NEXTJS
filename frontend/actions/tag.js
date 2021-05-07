import fetch  from 'isomorphic-fetch';

//@getTags list 
//@return- list of all tags present in database
export const getTags = ()=>{
    return fetch(`${process.env.API}/get-tags`,{
        method:"GET"
    }).then(res=>res.json())
    .catch(err=>console.log("Error in fetching all tags"));
}
//@getSingleTag
//@return- detail of single tag present in database
export const getSingleTag = (slug)=>{
    return fetch(`${process.env.API}/tag/${slug}`,{
        method:"GET"
    }).then(res=>res.json())
    .catch(err=>console.log("Error in fetching single tag"));
}
//@create tag 
//@return- success message if tag is created
export const tagCreation = (name,token)=>{
    return fetch(`${process.env.API}/create-tag`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
        body:JSON.stringify(name)
    }).then(res=>res.json())
    .catch(err=>console.log("Error in creating tag"));
}

//@delete tag 
//@return- success message if tag is deleted
export const DeleteTag = (slug,token)=>{
    return fetch(`${process.env.API}/tag/${slug}`,{
        method:"DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
    }).then(res=>res.json())
    .catch(err=>console.log("Error in Deleting tag"));
}