import Layout from './../components/pageLayout/Layout';
import SignupComponent from './../components/auth/SignupComponent';
import Headline from './../components/pageLayout/Headline';

const signup = ()=>{
    return (
        <Layout>
            <Headline content="User Signup" />
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <SignupComponent/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default signup;