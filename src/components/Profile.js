import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile({logOut,userData}){
    const navigate = useNavigate();
    useEffect(()=>{
        if(userData === null){
            navigate('/login');
        }
    })
    return(
        <div className="App">
        <header className="App-header">
        {userData !== null && !userData.error &&(
            <>
            <h1>User profile</h1>
            <h1>Welcome {userData.email}</h1>
            <button onClick={() => logOut()}>Log out</button>
            </>
        )}
        </header>
        </div>
    )
}