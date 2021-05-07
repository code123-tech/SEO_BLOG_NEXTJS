import React,{useState} from "react";
import { Alert } from 'reactstrap';

const Success = ({message})=>{
    return (
        <>
            {
            message?<Alert color="success">
                        {message}
                    </Alert>:""
            }
        </>
    )
}
export default Success;