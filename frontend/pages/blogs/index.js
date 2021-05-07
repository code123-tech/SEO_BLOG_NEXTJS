import React,{useState,useEffect} from "react";
import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
import BlogCard from './../../components/Blog/blogCard';
import CatTagList from './../../components/Blog/catTagList';
import {useRouter } from 'next/router';
import { Button } from 'reactstrap';

const BlogsHome = ({blogList=[],categoryList=[],tagList=[],size=0})=>{
    const router = useRouter();
    const [skip,updateSkip] = useState(size);
    const [loadedBlogs,UpdateLoadedBlogs] = useState([]);
    const [disable,updateDisable] = useState(false);

    useEffect(()=>{
    },[skip]);

    const onLoadClick = async (event)=>{
        event.preventDefault();
        const skipFactor = {skip:skip};
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body:JSON.stringify(skipFactor)
        };
        const res = await fetch(`${process.env.API}/blogs-With-C-And-T`,settings);
        const data = await res.json();
        if(!data.error){
            if(data.blogs.length !== 0){
                UpdateLoadedBlogs(data.blogs);
                updateSkip((prev)=>{prev+data.size});
            }
            else{
                alert("No More Blogs are Present. Thank You.");
                updateDisable(true);
            }
        }
    }
    const Head = ()=>{
        return (
            <head>
                <title>{process.env.Title}</title>
                <meta name="description" content={process.env.Description}/>
                <meta name="keywords" content={process.env.KeyWords}/>
                <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`}/>
                <meta property="og:title" content="Proogramming and Web Development Tutorials, Blogs | BLOGMART" />
                <meta property="og:description" content={process.env.Description} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content = {`${process.env.DOMAIN}${router.pathname}`}/>
                <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
                <meta property="og:image" content={`${process.env.DOMAIN}/logo2.png`}/>
                <meta property="og:image:secure_url" content={`${process.env.DOMAIN}/logo2.png`} />
                <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
            </head>
        )
    }
    return (
        <>
            <Head />
            <Layout>
                <main>
                    <Headline content = "Learn Programming By Blogs And Tutorials on BLOGMART" />
                    <div className="container-fluid row">
                        <div className="col-md-2">
                            {categoryList && (
                                    <>
                                        <h5 className="text-center">All Categories</h5> <hr/>
                                        <CatTagList list={categoryList} number={1}/>
                                    </>
                                )}
                            {tagList &&
                                (<><h5 className="text-center">All Tags</h5><hr/><CatTagList list={tagList} number={0}/></>)
                            }
                        </div>
                        <div className="col-md-10">
                            <center>
                            {
                                blogList.length === 0?
                                (<h2 className="text-center">No Blogs are present in Database.</h2>)
                                :(
                                    <BlogCard blogList={blogList}/>
                                )   
                            }</center>
                            <center>
                                {loadedBlogs.length !== 0 && <BlogCard blogList={loadedBlogs} />}
                            </center>
                            <center>
                                <Button 
                                disabled={disable}
                                className="mt-2 mb-3" outline color="primary" onClick={onLoadClick}>Load More</Button>
                            </center>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        }
    };
    const res = await fetch(`${process.env.API}/blogs-With-C-And-T`,settings);
    const data = await res.json();
    return {
    props: {
        blogList:data.blogs,
        categoryList:data.categories,
        tagList:data.tags,
        size:data.size
    },
  }
}

export default BlogsHome;