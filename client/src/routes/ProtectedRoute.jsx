import {useContext, useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext.jsx";

const ProtectedRoute = ({children, roles}) => {
    const {user, loading, checkUser} = useContext(AuthContext);

    const location = useLocation();

    useEffect(() => {
        const run = async () => {
            await checkUser()
        };
        run()
    }, [location.pathname]);

    if (loading) return <div className="loader"></div>;
    if (!user) return <Navigate to="/auth/login"/>;
    if (roles && !roles.includes(user.role.role)) return <h1>403 Akses Ditolak</h1>;

    return children;
};

export default ProtectedRoute;
