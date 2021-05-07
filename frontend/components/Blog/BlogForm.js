import React,{ useState,useImperativeHandle} from 'react';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(()=> import("react-quill"),{ssr:false});
import { modules, formats} from './../utilityComponents/EditorModules';
import "../../node_modules/react-quill/dist/quill.snow.css";
import { Form, FormGroup, Label, Input,Button } from 'reactstrap';

const BlogForm = React.forwardRef((props,ref)=>{
    const [formBody,setFormBody] = useState({
        title:"",
        body:""
    });

    useImperativeHandle(ref, () => ({
        title:formBody.title,
        body:formBody.body
    }));

    return (
        <Form>
            <FormGroup>
                <Label>Title</Label>
                <Input
                    value={formBody.title}
                    type="text"
                    name="title"
                    placeholder="write a title here..."
                    onChange={(e)=>setFormBody({...formBody,"title":e.target.value})}
                    required
                />
            </FormGroup>
            <FormGroup>
                <ReactQuill
                    theme="snow"
                    onChange={(value)=>{setFormBody({...formBody,"body":value})}}
                    value={formBody.body}
                    modules={modules}
                    formats = {formats}
                    placeholder="Write Something cool."
                />
            </FormGroup>
        </Form>
    )
})

export default BlogForm;