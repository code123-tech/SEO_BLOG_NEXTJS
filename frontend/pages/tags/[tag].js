import {useRouter} from 'next/router';
import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
const TagBlog = ()=>{
    const router = useRouter();
    return (
        <Layout>
            <Headline content="Programming Blogs And Tutorials" />
            <h1>Hello from {router.query.tag}</h1>
        </Layout>
    )
}
export default TagBlog;