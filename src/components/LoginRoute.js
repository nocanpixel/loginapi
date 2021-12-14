import {Navigate, Outlet} from "react-router-dom"

export default function LoginRoute({userData}){
    return userData ? <Navigate to="/profile" />  : <Outlet />
}