import React,{ useState,useEffect} from 'react';
import { createBlog } from "../../actions/blog";
import { getCookieData } from '../../actions/authentication';
import { withRouter } from 'next/router';
import Success from './../utilityComponents/success';
import Error from './../utilityComponents/error';
import Loading from './../utilityComponents/loading';
import BlogForm from './BlogForm';
import { getCategories } from './../../actions/category';
import { getTags } from './../../actions/tag';
import { Button, Input} from 'reactstrap';
import ShowCategoriesTags from './ShowCategory';

const CreateBlog = ({router})=>{
    const blogForm = React.useRef();
    const [globalValues,setGlobalValues] = useState({
        formdata:"",
        showBtn:true,
        message:"",
        loading:false,
        error:"",
    });
    
    const [categories,setCategories] = useState([]);
    const [tags,setTags] = useState([]);

    const token = getCookieData("token");
    const {formdata,message,error,loading} = globalValues;

    useEffect(()=>{
        setGlobalValues({...globalValues,formdata:new FormData()});
        initCategories();
        initTags();
    },[router]);

    const initCategories = ()=>{
        getCategories().then((data)=>{
            if(!data || (data && (data.error || data.message))){
                setGlobalValues({...globalValues,error:"No Category is present."});
            }else{
                setCategories(data);
            }
        }).catch(err=>console.log("Error in Fetching Categories"));
    }
    const initTags = ()=>{
        getTags().then((data)=>{
            if(!data || (data && (data.error || data.message))){
                setGlobalValues({...globalValues,error:"No Tag is present."});
            }else{
                setTags(data);
            }
        }).catch(err=>console.log("Error in Fetching Tags"));
    }
    //For handling change in body content.
    const handleBlogData = (e)=>{
        e.preventDefault();
        if(blogForm && blogForm.current){
            formdata.set('title',blogForm.current.title);
            formdata.set('body', blogForm.current.body);
            handleSubmit();
        }
    } 
    // function is called from ShowCategoriesTags component as any category or tag is added. 
    const handelCheckedCategoryAndTag = (arr,typeOfList)=>{
        if(formdata  && typeOfList===0){
            formdata.set("categories",arr);
        }else if(formdata){
            formdata.set("tags",arr);
        }
    }
    //Submit and create Blog in Database.
    const handleSubmit  = () =>{
        setGlobalValues({...globalValues,loading:true});
        createBlog(formdata,token).then((data)=>{
            if(!data)
                setGlobalValues({...globalValues,message:"",loading:false,error:"Some Error Occured"});
            else if(data && data.message){
                setGlobalValues({...globalValues,error:"",loading:false,message:data.message});
            }else if(data && data.error){
                setGlobalValues({...globalValues,loading:false,message:"",error:data.error});
            }else{
                setGlobalValues({formdata:new FormData(),loading:false,message:"SuccessFully Published.",error:""}); 
            }
        }).catch(err=>console.log(err));
    }
    
    const mouseMoveHandler = (e)=>{
        if(error || message || loading){
            setTimeout(() => {
                setGlobalValues({...globalValues,error:"",message:"",loading:""});
            }, 5000);
        }
    }
    return (
        <div className="container-fluid">
            <Success message={message} />
            <Error error={error} />
            <Loading loading={loading} />
            <Button color="primary" onClick={handleBlogData}>Publish Blog</Button>
            <div onMouseMove={mouseMoveHandler} className="row">
                <div className="col-md-8">
                    <BlogForm handleBlogData={handleBlogData} ref={blogForm}/>
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>Feature a Image for Blog</h5><hr/>
                        <small className="text-muted">Max Size: 1mb </small>
                        <Input 
                            className = "btn btn-outline-info"
                            type="file" 
                            accept="image/*"
                            onChange={(e)=>{
                                formdata.set("photo",e.target.files[0]);
                            }}    
                        />
                    </div>
                    <div>
                        <ShowCategoriesTags categories={categories} tpyeOfList = {0} handelCheckedCategoryAndTag={handelCheckedCategoryAndTag}/>
                    </div>
                    <div>
                        <ShowCategoriesTags categories={tags} tpyeOfList={1} handelCheckedCategoryAndTag={handelCheckedCategoryAndTag}/>
                    </div>
                </div>
            </div>
        </div>
   )   
}

export default withRouter(CreateBlog);