import { Outlet, Navigate } from 'react-router-dom';

import { useContext } from 'react';

import AuthContext from '../context/AuthContext';
function PrivateRoutes(): React.FunctionComponentElement<JSX.Element> {
	const { token } = useContext(AuthContext);
	return token ? <Outlet /> : <Navigate to='/form/login' />;
}
export default PrivateRoutes;
