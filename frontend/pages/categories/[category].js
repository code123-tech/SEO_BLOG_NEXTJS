import {useRouter} from 'next/router';
import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';

const CategoryBlog = ()=>{
    const router = useRouter();
    return (
        <Layout>
            <Headline content="Programming Blogs And Tutorials" />
            <h1>Hello from {router.query.category}</h1>
        </Layout>
    )
}
export default CategoryBlog;