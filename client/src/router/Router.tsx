import React from 'react';
import { Route, Routes /* , Navigate */ } from 'react-router-dom';

import HomePage from '../pages/public/HomePage';
import FormRegister from '../pages/public/FormRegister';
import FormLogin from '../pages/public/FormLogin';
import Application from '../pages/private/Application';
import Profile from '../pages/private/Profile';
import PrivateRoutes from '../layouts/PrivateRoutes';

const Router: React.FunctionComponent = () => (
	<Routes>
		<Route path='/' element={<HomePage />} />
		<Route path='/form'>
			<Route path='login' element={<FormLogin />} />
			<Route path='register' element={<FormRegister />} />
		</Route>
		<Route path='/private' element={<PrivateRoutes />}>
			<Route path='application' element={<Application />} />
			<Route path='profile' element={<Profile />} />
		</Route>
		{/* <Route index element={<Navigate to='/form-login' />} /> */}
	</Routes>
);

export default Router;
