import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import NavBar from './components/NavBar';
import GraTable from './components/GraTable';
import ListaUzytkownika from './components/ListaUzytkownika';
import GraForm from './components/GraForm';
import Login from './components/Login';
import Gra from './components/Gra';

import FirmaTable from './components/FirmaTable';

import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthRoute, UnauthRoute, AdminRoute, AuthProvider } from './utils/Auth';
import fetchData from './utils/fetchData';
import GraTableAdmin from './components/GraTableAdmin';

const setToken = (token) => {
    localStorage.setItem('authToken', token);
}

const removeToken = () => {
    localStorage.removeItem('authToken');
}

const checkToken = () => {
	if(localStorage.authToken 
		&& localStorage.authToken !== "undefined" 
		&& localStorage.authToken !== undefined 
		&& localStorage.authToken !== null 
		&& localStorage.authToken !== "") 
	{
		const decodedAuthToken = getDecodedToken();
		if(decodedAuthToken.exp * 1000 < Date.now()) {
			window.location.href = '/login';
			return null;
		} else {
			return decodedAuthToken;
		}
	}

	return null;
}

const getDecodedToken = () => {
	return jwtDecode(localStorage.authToken);
}

function App() {
	const token = localStorage.authToken;
	const [authenticated, setAuthenticated] = useState(checkToken() !== null);
	const [decodedToken, setDecodedToken] = useState(authenticated && getDecodedToken());
	const [errors, setErrors] = useState({
		authError: null
	});

	const clearErrors = () => {
		setErrors({
			authError: null
		});
	}

	const authenticate = (loginData) => {
		const { login, haslo } = loginData;
		fetchData('POST', 'uzytkownik/login', (json) => {
			if(json.status === "error") {
				setErrors({
					authError: json.authError
				});
			} else {
				setToken(json.token);
				const decodedToken = getDecodedToken();
				setAuthenticated(true);
				setDecodedToken(decodedToken);
			}
		} , (err) => {

		}, {
			'Content-Type': 'application/json'
		}, JSON.stringify({
			login,
			haslo
		}));
	}
	
	const unauthenticate = () => {
		removeToken();
		setAuthenticated(false);
		setDecodedToken(null);
	}

	return (
		<AuthProvider value={{
			authenticated,
			authenticate,
			unauthenticate,
			token,
			decodedToken,
			errors,
			clearErrors
		}}>
			<Router>
				<CssBaseline />
				<NavBar/>
				<Switch>
					<Route exact path="/gry" component={GraTable} />
					<AuthRoute exact path="/uzytkownik/lista/:id_uzytkownik" component={ListaUzytkownika} />
					<UnauthRoute exact path="/login" component={Login} />
					<Route exact path="/gra/:id_gra" component={Gra} />

					<AdminRoute exact path="/admin/gra" 
					children={({ match }) => (
						<GraTableAdmin />
					)} />
					<AdminRoute exact path="/admin/firma" component={FirmaTable} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
