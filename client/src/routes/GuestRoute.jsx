import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

const GuestRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext)

    if(loading) return <div className="loader"></div>

    return isAuthenticated ? <Navigate to="/admin" replace /> : <Outlet/>
}

export default GuestRoute