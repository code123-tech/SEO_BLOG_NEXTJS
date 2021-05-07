import React,{useState,useEffect} from "react";

const ShowCategoriesTags = ({categories,tpyeOfList,handelCheckedCategoryAndTag})=>{

    const [checkedCat,setCheckedCat] = useState([]);
    const [checkedTag,setCheckedTag] = useState([]);

    useEffect(()=>{
        if(tpyeOfList === 0){
            handelCheckedCategoryAndTag(checkedCat,0);
        }
        else{
            handelCheckedCategoryAndTag(checkedTag,1);
        }
    },[checkedCat,checkedTag]);

    const handleCatToggle = (t)=>{
        const clickedCat = checkedCat.indexOf(t);
        const all = [...checkedCat];
        if(clickedCat === -1){
            all.push(t);
        }else{
            all.splice(clickedCat, 1);
        }
        setCheckedCat(all);
    }
    const handleTagToggle = (t)=>{
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];
        if(clickedTag === -1){
            all.push(t);
        }else{
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
    }
    const handleToggle = (t,tpyeOfList) => e =>{
        if(tpyeOfList === 0){
            handleCatToggle(t);
        }else{
            handleTagToggle(t);
        }
    }   
    return(
        <>
        <h5>Add {" "}{ tpyeOfList === 0 ? "Categories":"Tags"}</h5><hr />
        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>
            {categories && (
                categories.map((c,i)=>(
                    <li key = {i} className="list-unstyled">
                        <input type="checkbox" onChange={handleToggle(c._id,tpyeOfList)} className="mr-2" />
                        <label className="form-check-label">{c.name}</label>
                    </li>
                ))
            )}
        </ul>
        </>
    )
}
export default ShowCategoriesTags;