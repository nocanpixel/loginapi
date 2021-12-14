import './App.css';
import loginService from './services/login';
import jwt from 'jwt-simple';
import { useUser } from './hooks/useUser';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import LoginRoute from './components/LoginRoute';
import NotFound from './components/NotFound';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { userData, setUserData } = useUser();

  const logOut = () => {
    typeof window!=="undefined" && window.localStorage.clear();
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
      <Route path="*" element={<NotFound/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<ProtectedRoute userData={userData} />} >
        <Route path="" element={ <Profile dummyFunction={dummyFunction} logOut={logOut} userData={userData} /> } />
      </Route>
      <Route path="/login" element={<LoginRoute userData={userData} />} >
        <Route path="" element={<Login
        logOut={logOut} 
        loginService={loginService} 
        userData={userData}
        dummyFunction={dummyFunction}
        setUserData={setUserData}
        />} />
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
