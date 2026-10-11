import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import Spinner from "../shared/Spinner";

export default function PrivateRoute() {
    const { isAuthenticated, isAuthReady } = useAuth();

    if (!isAuthReady) return <Spinner />;
    if (!isAuthenticated) return <Navigate to='/login' replace />;

    return <Outlet/>;
}