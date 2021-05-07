const UserProfile = ({userInfo})=>{
    const handleClick = (event)=>{
        event.preventDefault();
        console.log(event);
    }
    return (
        <>
            <div className="col py-3 px-lg-5 bg-light">
                    <img 
                        src="/logo1.png" 
                        alt="Avatar"
                        style={{borderRadius:"50%",border:"2px solid black",width:"10rem"}}
                    />
            </div> 
            <div className="col py-3 px-lg-5 bg-light">
                {userInfo.username?<h3><u>username</u>:{userInfo.username}</h3>:null}
                {userInfo.name?<h3><u>Name</u>:{userInfo.name}</h3>:null}
                {userInfo.email?<h3><u>Email</u>: {userInfo.email}</h3>:null}
                <h3><u>About User</u>: {userInfo.About}</h3>
                <button onClick={handleClick} className="btn btn-outline-primary">Update Info</button>
            </div>  
        </>
    )
}
export default UserProfile;