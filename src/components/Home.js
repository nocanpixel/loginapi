import { Link } from "react-router-dom";
export default function Home(){
    return(
        <div className="App">
        <header className="App-header">
        <h1>Home</h1>
        <nav>
            <Link to="/login">Login</Link> | {" "}
            <Link to="/signup">Register</Link>
        </nav>
        </header>
        </div>
    )
}