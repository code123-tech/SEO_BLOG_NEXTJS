import React,{useState} from "react";
import { Spinner} from 'reactstrap';
import { Alert } from 'reactstrap';

const Loading = ({loading})=>{

    return (
        <>
            {
                loading ? (
                    <Alert color="info">
                        <Spinner color="primary" />{" "}Loading...
                    </Alert>
                ):
                ""
            }
        </>
    )
}
export default Loading;