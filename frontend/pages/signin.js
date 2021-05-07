import Layout from './../components/pageLayout/Layout';
import SigninComponent from './../components/auth/SigninComponent';
import Headline from './../components/pageLayout/Headline';

const signin = ()=>{
    return (
        <>
        <Layout>
            <Headline content="User Signin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <SigninComponent />
                    </div>
                </div>
            </div>
        </Layout>
      </>
    )
}
export default signin;