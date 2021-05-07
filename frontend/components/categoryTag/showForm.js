import {Form, FormGroup, Label, Input,Button } from 'reactstrap';
import React,{useState,useImperativeHandle} from "react";

const CategoryForm = React.forwardRef((props,ref)=>{
    const [name,setName] = useState("");

    useImperativeHandle(ref, () => ({
        resetForm: resetForm
    }));

    const resetForm = ()=>{
        setName("");
    };

    const handleSubmitForm = (e)=>{
        e.preventDefault();
        props.createCategory(name);
    }

    const handleChange = e=>{
        setName(e.target.value);
    }
    return (
        <Form onSubmit={handleSubmitForm}>
            <FormGroup>
                <Label for="name">Enter {!props.tag?" Category ":" Tag "} Name</Label>
                <Input
                    value={name}
                    type="text"
                    value={name}
                    placeholder={props.tag?"Enter Tag Name":"Enter Category Name"}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <Button color="primary">Add {props.tag?"Tag":"Category"}</Button>{' '}
    </Form>
    )
})
export default CategoryForm;