import React from 'react';
import Layout from '../../components/pageLayout/Layout';
import Admin from '../../components/auth/Admin';
import CategoryTag from '../../components/categoryTag/category';
import Tag from './../../components/categoryTag/tag';
import Headline from './../../components/pageLayout/Headline';

const Category = ()=>{
    return(
        <Layout>
            <Admin>
                <Headline content="Manage Categories and Tags" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <CategoryTag />
                        </div>
                        <div className="col-md-6">
                            <Tag />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Category;