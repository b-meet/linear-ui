import React from 'react';
import {Navigate, Outlet} from 'react-router';
import {storageServices} from '../utility/storageServices';
import {STORAGE_SERVICES} from '../type';
import {ROUTES} from './routes';

const ProtectedRoute: React.FC = () => {
	const authToken = storageServices.get(STORAGE_SERVICES.LOCAL, 'authToken');

	return authToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;
