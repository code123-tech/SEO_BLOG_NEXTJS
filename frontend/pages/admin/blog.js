import React from 'react';
import Layout from '../../components/pageLayout/Layout';
import Admin from '../../components/auth/Admin';
import CreateBlog from './../../components/Blog/blog';
import Headline from './../../components/pageLayout/Headline';

const Blog = ()=>{
    return(
        <Layout>
            <Admin>
                <Headline content = "Create a Blog" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <CreateBlog />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog;