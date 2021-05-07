import Layout from './../../components/pageLayout/Layout';
import Headline from './../../components/pageLayout/Headline';
import {Form, FormGroup, Label, Input,Button } from 'reactstrap';
import { useState } from 'react';
import { resetPassword } from './../../actions/authentication';
import Error from '../../components/utilityComponents/error';
import Loading from './../../components/utilityComponents/loading';
import Success from './../../components/utilityComponents/success';

const ResetPassword = ()=>{
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        setLoading(true);
        const data = {username,email};
        resetPassword(data).then(data=>{
            if(!data){
                    setError("Server Error. Please Try Again.");
                }else{
                    if(data.error){
                        setError(data.error);
                    }else if(data.message){
                        setMessage(data.message);
                        setEmail("");setUsername("");
                    }
                }
            setLoading(false);
        });
    }
    const handleChange  = name=>event=>{
        setLoading(false);
        setMessage("");
        setError("");
        if(name === "email"){
            setEmail(event.target.value)
        }else{
            setUsername(event.target.value);
        }
    }
    return(
    <>
        <Layout>
            <Headline content="Reset Your Password" />
            <div className="container-fluid offset-md-3 col-md-6">
                <Loading loading={loading} />
                <Error error={error} />
                <Success message={message} />
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="usernname">Your username</Label>
                        <Input
                            value={username}
                            type="text"
                            name="username"
                            placeholder="Your username"
                            onChange={handleChange("username")}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Email">Your Email</Label>
                        <Input
                            value={email}
                            type="email"
                            name="email"
                            placeholder="Enter Your Valid Email"
                            onChange={handleChange("email")}
                            required
                        />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        </Layout>
    </>
    )
}
export default ResetPassword;