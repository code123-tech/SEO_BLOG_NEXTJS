import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
import UserProfile from './../../components/UserProfile/Profile';

const ProfilePage = ({data})=>{

    const Headers  = (data)=>{
        if(!data){
            return (<Headline content="Please Check Your Connection." />)
        }   
        else if(data.error){
            return (<Headline content={data.error}/>)
        }else{
            return (<Headline content={data.message} />)
        }
    }
    return (
        <Layout> 
            {!data || (data && (data.error || data.message))?Headers(data):
                <>
                    <Headline content="Hello User" />
                    <div className="container px-lg-5">
                        <div className="row row-col-4">
                            <UserProfile userInfo={data.foundUser} />
                        </div>
                    </div>
                </>
            }
         </Layout>
    )
}
export async function getServerSideProps(context){
    const {query} = context;
    const cookie = context.req ? context.req.headers.cookie:null;
    const res = await fetch(`${process.env.API}/user/profile/${query.username}`,{
        headers:{
            cookie
        }
    });
    const data = await res.json();
    return {
        props:{
            data
        }
    }
}
export default ProfilePage;