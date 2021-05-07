import { Spinner, Form, FormGroup, Label, Input,Button } from 'reactstrap';
import React,{useState,useImperativeHandle} from "react";

const Showform = React.forwardRef((props,ref)=>{
    const [formValues,setFormValues] = useState({
        name:"",
        username:"",
        password:"",
        email:"",
        showPassword:false
    });

    const {isSignin,handleSubmit} = props;
    const {name,username,email,password,showPassword} = formValues;
    
    useImperativeHandle(ref, () => ({
        resetForm: resetForm
      }));

    const resetForm = ()=>{
        setFormValues({name:"",password:"",username:"",email:"",showPassword:false});
    };

    const handleSubmitForm = (e)=>{
        e.preventDefault();
        if(isSignin){
            handleSubmit({username,password});
        }
        else{
            handleSubmit({name,username,email,password});   
        }
    }

    const handleChange = name=>e=>{
        setFormValues({...formValues,error:"",[name]:e.target.value});
    }
    return (
        <Form onSubmit={handleSubmitForm}>
            {isSignin?"":(
                 <FormGroup>
                <Label for="name">Your name</Label>
                <Input
                    value={name}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    onChange={handleChange("name")}
                    required
                />
            </FormGroup>
            )}
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
            {
                isSignin?"":(
                <FormGroup>
                    <Label for="Email">Your Email</Label>
                    <Input
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={handleChange("email")}
                        required
                    />
                </FormGroup>
                )
            }
            <FormGroup>
                <Label for="password">Your Password</Label>
                <Input
                    value={password}
                    type={!showPassword?"password":"text"}
                    name="password"
                    placeholder="Your Password"
                    onChange={handleChange("password")}
                    required
                />
            </FormGroup>
            <FormGroup check inline>
                <Label check>
                <Input type="checkbox" onClick={()=>{setFormValues({...formValues,showPassword:!showPassword})}}/> Show Password
                </Label>
            </FormGroup>
            <Button color="primary">{isSignin?"Signin":"Signup"}</Button>{' '}
    </Form>
    )
})
export default Showform;