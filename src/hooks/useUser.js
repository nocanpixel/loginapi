import { useEffect, useState } from "react";
import loginService from '../services/user';

export const useUser =()=> {
    const [userData, setUserData] = useState(null);


    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
        if(loggedUserJSON){
          const userData = JSON.parse(loggedUserJSON);
          setUserData(userData);
          loginService.setToken(userData.x_token);
        }
      },[]);

      return {
          userData,
          setUserData
      }
}