import Link  from 'next/link';
const CatTagList = ({list,number,buttonRepresent = 0})=>{
    const ListRepresent = ()=>{
        return (
            <ul>
                {list.map((tag,index)=>(
                    <li key={index}>
                        <Link href={`/${number === 0?"tags":"categories"}/${tag.slug}`}>
                            <a>{tag.name + ","}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
    const ButtonForm = ()=>{
        return(
            <>
                {list.map((tag,index)=>(
                    <Link key={index} href={`/${number === 0?"tags":"categories"}/${tag.slug}`}>
                        <a className="btn btn-outline-primary mr-1">{tag.name}</a>
                    </Link>
                ))} 
            </>
        )
    }
    return (
        <>
            {buttonRepresent === 0?<ListRepresent />:<ButtonForm />}
        </>
    )
}
export default CatTagList;