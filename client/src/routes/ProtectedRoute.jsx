import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext.jsx";

const ProtectedRoute = ({children, roles}) => {
    const {isAuthenticated, user, loading} = useContext(AuthContext);

    if (loading) return <div className="loader"></div>;
    if (!isAuthenticated || !user) return <Navigate to="/auth/login" replace />;
    if (roles && !roles.includes(user.role.role)) return <h1 className="text-xl">403 Forbidden</h1>;

    return children;
};

export default ProtectedRoute;
