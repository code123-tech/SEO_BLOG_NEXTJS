import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
import {useRouter} from 'next/router';
import moment from 'moment';
import RelatedBlogs from './../../components/Blog/RelatedBlogs';
import CatTagList from './../../components/Blog/catTagList';
import Disqus from "disqus-react";

const PostSingleBlog = ({blogData,relatedBlogs})=>{
    const router = useRouter();
    const photoUrl = `${process.env.API}/blog/photo/${router.query.slug}`;
    const disqusshortName = "BLOGMART";
    const disqusConfig = {
        url:`${process.env.DOMAIN}/blogs/${router.query.slug}`,
        identifier:blogData[0]._id,
        title:blogData[0].title
    }
    const Head = () => {
        return (
            <head>
                <title>{blogData[0].title ? blogData[0].title + " | BLOGMART":process.env.Title}</title>
                <meta name="description" content={blogData[0].description?blogData[0].description:process.env.Description}/>
                <meta name="keywords" content={process.env.KeyWords} />
                <link rel="canonical" href={`${process.env.DOMAIN}/blogs/${router.query.slug}`}/>
                <meta property="og:title" content="Proogramming and Web Development Tutorials, Blogs | BLOGMART" />
                <meta property="og:description" content={process.env.Description} />
                <meta property="og:type" content="blog"/>
                <meta property="og:url" content = {`${process.env.API}/blogs/${router.query.slug}`}/>
                <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
                <meta property="og:image" content={photoUrl}/>
                <meta property="og:image:secure_url" content={photoUrl} />
                <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
            </head>
        )
    }
    return (
        <>
            {blogData.error?"":<Head />}
            {
                blogData.error? 
                <Headline content = {blogData.error}/>:
                <Layout>
                    <main>
                        <Headline content = {blogData[0].title} />
                        <div className="container-fluid row">
                            <div className="col-md-3">
                                <center>
                                    <img 
                                        src = {photoUrl}
                                        alt="blog Image"
                                        style={{width:"300px",height:"300px"}}
                                    />
                                    <address>
                                        <time>🕐 | {moment(blogData[0].updatedAt).fromNow()}</time><br/>
                                        👦 | Written By :-  {blogData[0].postBy ? blogData[0].postBy.name:"Author"}
                                    </address>
                                    <hr/>
                                </center>
                                {
                                    blogData[0].tags.length === 0
                                    ?null:<><center><p>Tags</p></center>
                                <CatTagList 
                                    list={blogData[0].tags} number={0} buttonRepresent={1}/>
                                    <hr/>
                                </>
                                }
                                {
                                    blogData[0].categories.length === 0?null:
                                    <><center><p>Categories</p></center>
                                    <CatTagList 
                                        list={blogData[0].categories} number={1} buttonRepresent={1}/>
                                    <hr/>
                                    </>
                                }
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:blogData[0].body
                                }}
                            className="col-md-9"
                            >    
                            </div>
                        </div>
                        <hr/>
                    </main>
                    <div className="container-fluid" style={{marginTop:"100px"}}>
                        {relatedBlogs.length === 0 ? null : 
                            <RelatedBlogs relatedBlogs={relatedBlogs} />}
                    </div>
                    <div className="container-fluid" style={{marginTop:"100px"}}>
                        <Disqus.DiscussionEmbed 
                            shortname={disqusshortName}
                            config={disqusConfig}
                        />
                    </div>

                </Layout>
            }
        </>
    )
}

export async function getServerSideProps({query}){
    const res = await fetch(`${process.env.API}/blog/${query.slug}`);
    const data = await res.json();
    return {
        props:{
            blogData:data.data,
            relatedBlogs:data.relatedData
        }
    }
}

export default PostSingleBlog;