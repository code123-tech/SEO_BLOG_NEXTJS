import React from 'react';

const ShowList = ({categories,deleteCategory,tag})=>{
    const [clickCount,setClickCount] = React.useState(0);
    const [singleClickTime,setTimer] = React.useState("");
    let word = tag?"tag!":"category!";


    const handleClick = (slug)=>{
        setClickCount(clickCount+1);
        // console.log(clickCount)
        if(clickCount === 0){
            let timer = setTimeout(() => {
                setClickCount(0);
            }, 300);
            setTimeout(() => {
                setTimer(timer);
            }, 300);
        }else if(clickCount === 1){
            clearTimeout(singleClickTime);
            setClickCount(0);
            deleteConfirm(slug);
        }
    }

   const deleteConfirm = (slug)=>{
       if(window.confirm(`Please confirm to delete this` + word)){
            deleteCategory(slug);
        }
    }

    return (
        <>
        <h2 className="text-center">List of Present {tag?"Tags":"Categories"}</h2><hr/>
            {categories.map((category,index)=>{
                    return (
                        <button 
                            onClick = {()=>handleClick(category.slug)}
                            title= {tag? "Double Click to remvoe tag":"Double Click to remvoe Category"}
                            key={index}
                            className="btn btn-outline-primary mr-1 ml-1 mt-3"
                        >
                            {category.name}
                        </button>
                    )
                })}
        </>
    )
}
export default ShowList;