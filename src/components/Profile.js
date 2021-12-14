import { useEffect } from "react"

export default function Profile({logOut,userData,dummyFunction}){
    useEffect(()=>{
        if(userData){
            dummyFunction(userData.x_token)
        }
    },[])
    return(
        <div className="App">
        <header className="App-header">
        {userData !== null &&(
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