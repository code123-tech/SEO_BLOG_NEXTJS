import React,{useEffect,useState} from "react";
import Success from '../utilityComponents/success';
import Error from '../utilityComponents/error';
import ShowList from './showlist';
import { getTags,DeleteTag,tagCreation} from '../../actions/tag';
import { getCookieData } from "../../actions/authentication";
import CategoryForm from './showForm';

const Tag = ()=>{
    const [values,setValues] = useState({
        error:"",
        message:"",
        tags:[],
        reload:false
    });
    const {error,message,tags,reload} = values;
    const token = getCookieData("token");
    const formreset = React.useRef();

    useEffect(()=>{
        getListOfTags();
    },[reload]);

    //GEt list of categories
    const getListOfTags = ()=>{
        getTags().then(data=>{
            if(!data){
                setValues({...values,error:"🚧 Connection Error, Please Check Your Connection.",message:""})
            }else if(data.error){
                setValues({...values,error:data.error,message:""});
            }else if(data.message){
                setValues({...values,error:"",message:"",tags:[]});
            }else{
                setValues({...values,error:"",message:"",tags:data});
            }
        })
    }
    //delete Category
    const deleteTag = (slug)=>{
        DeleteTag(slug,token).then(data=>{
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
    const createTag = (name)=>{
        tagCreation({name},token).then(data=>{
            if(!data){
                setValues({...values,error:"🚧 Connection Error, Please Check Your Connection.",message:""});
            }else{
                if(data && data.error){
                    setValues({...values,error:data.error,message:""})
                }else if(data.message){
                    setValues({...values,message:data.message,error:""});
                }else{
                    formreset.current.resetForm();
                    setValues({...values,message:"Tag is created Successfully",reload:!reload})
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
                <CategoryForm tag={true} createCategory = {createTag} ref={formreset}/>
                {tags.length!==0 ? <ShowList tag={true} categories = {tags} deleteCategory={deleteTag}/>:""}
            </div>
        </>
    )
}  

export default Tag;