import Layout from '../../components/pageLayout/Layout';
import Private from '../../components/auth/Private';
import Headline from '../../components/pageLayout/Headline';


const UserIndex = ()=>{
    return (
        <Layout>
            <Private>
                <Headline content = "User Dashboard" />
            </Private>
        </Layout>
    )
}

export default UserIndex;