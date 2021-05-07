import fetch  from 'isomorphic-fetch';

//@getCategories list 
//@return- list of all categories present in database
export const getCategories = ()=>{
    return fetch(`${process.env.API}/get-categories`,{
        method:"GET"
    }).then(res=>res.json())
    .catch(err=>console.log("Error in fetching all categories"));
}
//@getSingleCategory
//@return- detail of single category present in database
export const getSingleCategory = (slug)=>{
    return fetch(`${process.env.API}/category/${slug}`,{
        method:"GET"
    }).then(res=>res.json())
    .catch(err=>console.log("Error in fetching single category"));
}
//@create categeory 
//@return- success message if category is created
export const categoryCreation = (name,token)=>{
    return fetch(`${process.env.API}/create-category`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
        body:JSON.stringify(name)
    }).then(res=>res.json())
    .catch(err=>console.log("Error in creating category"));
}

//@delete categeory 
//@return- success message if category is deleted
export const DeleteCategory = (slug,token)=>{
    return fetch(`${process.env.API}/category/${slug}`,{
        method:"DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
    }).then(res=>res.json())
    .catch(err=>console.log("Error in Deleting category"));
}