import {useState,useEffect} from "react";
import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
import { withRouter } from 'next/router';
import { FormGroup, Form, Input, Button,Label} from 'reactstrap';
import { UpdatePassword} from "../../actions/authentication";
import Loading from './../../components/utilityComponents/loading';
import Error from './../../components/utilityComponents/error';
import Success from './../../components/utilityComponents/success';

const ResetTokenLink = ({router})=>{
    const [values,setValues] = useState({
        password:"",
        message:'',
        loading:false,
        error:""
    });
    const {password,message,loading,error} = values;

    const handleSubmit = (event)=>{
        setValues({...values,loading:true});
        event.preventDefault();
        const data = {
            password:password,
            resetToken:router.query.token
        }
        UpdatePassword(data).then(data=>{
            if(!data) {
                setValues({...values,error:"Some Error occured. Please Check Your Connection."});
            }
            else if(data && data.error) {
                setValues({...values,error:data.error});
            }else{
                setValues({...values,password:"",message:data.message});
            }
        })
    }
    const handleChange = (event)=>{
        setValues({...values,password:event.target.value,error:"",message:"",loading:false});
    }
    return (
        <Layout>
            <Headline content="Change Your Password!" />
            <div className="container-fluid col-md-6">
                <Loading loading={loading} />
                <Error error={error} />
                <Success message={message} />
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                    <Label for="password">Your New Password</Label>
                        <Input
                            value={password}
                            type="password"
                            name="password"
                            placeholder="Your New Password"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <Button color="primary">Change Password</Button>
                </Form>
            </div>
        </Layout>
    )
}

export default withRouter(ResetTokenLink);