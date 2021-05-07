import React,{useEffect,useState} from "react";
import Success from '../utilityComponents/success';
import Error from '../utilityComponents/error';
import ShowList from './showlist';
import { categoryCreation, DeleteCategory, getCategories } from '../../actions/category';
import { getCookieData } from "../../actions/authentication";
import CategoryForm from './showForm';

const CategoryTag = ()=>{
    const [values,setValues] = useState({
        error:"",
        message:"",
        categories:[],
        reload:false
    });
    const {error,message,categories,reload} = values;
    const token = getCookieData("token");
    const formreset = React.useRef();

    useEffect(()=>{
        getListOfCategories();
    },[reload]);

    //GEt list of categories
    const getListOfCategories = ()=>{
        getCategories().then(data=>{
            if(!data){
                setValues({...values,error:"🚧 Connection Error, Please Check Your Connection.",message:""})
            }else if(data.error){
                setValues({...values,error:data.error,message:""});
            }else if(data.message){
                setValues({...values,error:"",message:"",categories:[]});
            }else{
                setValues({...values,error:"",message:"",categories:data});
            }
        })
    }
    //delete Category
    const deleteCategory = (slug)=>{
        DeleteCategory(slug,token).then(data=>{
            if(!data){
                setValues({...values,error:"🚧 Connection Error, Please Check Your Connection.",message:""});
            }else{
                if(data && data.error){
                    setValues({...values,error:data.error,message:""})
                }else{
                    setValues({...values,message:data.message,error:"",reload:!reload});
                }
            }
        })
    }

    //create category
    const createCategory = (name)=>{
        categoryCreation({name},token).then(data=>{
            if(!data){
                setValues({...values,error:"🚧 Connection Error, Please Check Your Connection.",message:""});
            }else{
                if(data && data.error){
                    setValues({...values,error:data.error,message:""})
                }else if(data.message){
                    setValues({...values,message:data.message,error:""});
                }else{
                    formreset.current.resetForm();
                    setValues({...values,message:"Category is created Successfully",reload:!reload})
                }  
            }
        })
    }
    const mouseMoveHandler = (e)=>{
        setValues({...values,error:"",message:""});
    }

    return (
        <>
            <Success message = {message} />
            <Error error={error} />
            <div onMouseMove={mouseMoveHandler}>
                <CategoryForm tag={false} createCategory = {createCategory} ref={formreset}/>
                {categories.length!==0 ? <ShowList tag={false} categories = {categories} deleteCategory={deleteCategory}/>:""}
            </div>
        </>
    )
}  

export default CategoryTag;