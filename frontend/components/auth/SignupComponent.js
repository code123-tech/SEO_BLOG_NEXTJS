import React,{useState,useEffect} from "react";
import { useRouter } from 'next/router'
import { signup, isAuth } from './../../actions/authentication';
import  Link  from 'next/link';
import Showform from './Form';
import Loading from './../utilityComponents/loading';
import Success from './../utilityComponents/success';
import Error from './../utilityComponents/error';


const SignupComponent = ()=>{
    const router = useRouter();
    const [states,setStates] = useState({
        error:"",
        loading:false,
        message:"",
    })
    
    const formreset = React.useRef();

    const {error,loading,message} = states;

    useEffect(() => {
        isAuth()&&router.push(`/`);
    }, []);

    const handleSubmit = (user)=>{
        setStates({...states,loading:true,error:false});
        signup(user).then(data=>{
            if(!data || data.error){
                if(!data){
                    setStates({...states,error:"🚧 Connection Error, Please Check Your Connection.",loading:false});
                }else{
                    setStates({...states,error:data.error,loading:false});
                    setTimeout(() => {
                        setStates({...states,error:""});
                    }, 2000);
                }
            }else{
                if(data.message.includes("success")){
                    setStates({
                        ...states,
                        error:"",
                        loading:false,
                        message:data.message,
                    });
                    formreset.current.resetForm();
                    // console.log(formreset)
                    setTimeout(() => {
                        setStates({message:""});
                    }, 4000);
                }else{
                    setStates({...states,message:data.message});
                    setTimeout(() => {
                        setStates({...states,message:""});
                    }, 2000);
                }
            }
        })
    }
    return (
        <>  
            <Loading loading={loading} />
            <Error error={error} />
            <Success message={message} />
            <Showform isSignin={false} handleSubmit={handleSubmit} ref={formreset}/>
            <Link href="/signin">
                <a>Already have a Account?</a>
            </Link><br/>
            <Link href="/reset_password" className="mt-2 mb-2">
                <a>Forgot Password?</a>
            </Link>
        </>
    )
}

export default SignupComponent;