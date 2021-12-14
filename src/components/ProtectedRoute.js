import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({userData}){
    return userData ? <Outlet /> : <Navigate to="/login" />
}