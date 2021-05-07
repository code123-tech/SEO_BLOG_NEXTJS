import React,{useState,useEffect} from "react";
import { signin, isAuth, authenticate } from './../../actions/authentication';
import  Link  from 'next/link';
import Showform from './Form';
import { useRouter } from 'next/router'
import Loading from './../utilityComponents/loading';
import Error from './../utilityComponents/error';
import Success from './../utilityComponents/success';

const SigninComponent = ()=>{
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
        signin(user).then(data=>{
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
                if(data.token){
                    setStates({
                        ...states,
                        error:"",
                        loading:false,
                        message:"Signin SuccessFully Done.",
                    });
                    try {
                        authenticate(data,()=>{
                            //for admin
                            if(isAuth()&&isAuth().role === 1){
                                router.push(`/admin`)
                            }else{
                                router.push(`/user`)
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }  
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
            <Loading loading = {loading} />
            <Error error={error} />
            <Success message={message} />
            <Showform isSignin={true} handleSubmit={handleSubmit} ref={formreset}/>
            <Link href="/signup">
                <a>Don't have a Account?</a>
            </Link><br/>
            <Link href="/reset_password" className="mt-2 mb-2">
                <a>Forgot Password?</a>
            </Link>
        </>
    )
}

export default SigninComponent;