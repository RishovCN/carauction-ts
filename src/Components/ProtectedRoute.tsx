//react imports


import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
	const token = sessionStorage.getItem('token');
	if (token) {
		return true;
	} else {
		return false;
	}
};

const ProtectedRoute = () => {
	const auth = useAuth();

	return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
