import './App.css';
import loginService from './services/login';
import jwt from 'jwt-simple';
import { useUser } from './hooks/useUser';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const { userData, setUserData } = useUser();

  const logOut = () => {
    const userLogout = window.localStorage.clear();
    setUserData(null);
  }

  const dummyFunction = (x_token) => {
      let payload = {}
      payload = jwt.decode(x_token, 'Nocan');
      const timer = (payload.expiredAt * 1000)-Date.now();
      setTimeout(()=>{
        logOut();
      },timer)
  }



  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile logOut={logOut} userData={userData} />}/>
      <Route path="/login" element={<Login
      logOut={logOut} 
      loginService={loginService} 
      userData={userData}
      dummyFunction={dummyFunction}
      setUserData={setUserData}
       />} />
    </Routes>
    </Router>
  );
}

export default App;
