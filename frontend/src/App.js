import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import NavBar from './components/NavBar';
import GraTable from './components/GraTable';
import ListaUzytkownika from './components/ListaUzytkownika';
import GraForm from './components/GraForm';
import Login from './components/Login';

import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthRoute, UnauthRoute, AdminRoute, AuthProvider } from './utils/Auth';

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
			return false;
		} else {
			return true;
		}
	}

	return false;
}

const getDecodedToken = () => {
	return jwtDecode(localStorage.authToken);
}

function App() {
	const [authenticated, setAuthenticated] = useState(checkToken());
	const [decodedToken, setDecodedToken] = useState(getDecodedToken());
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
		fetch('http://localhost:3001/uzytkownik/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					login,
					haslo
				})
			})
			.then((response) => {
				return response.json();
			})
			.then((jsonData) => {
				if(jsonData.status === "error") {
					setErrors({
						authError: jsonData.authError
					});
				} else {
					setToken(jsonData.token);
					const decodedToken = getDecodedToken();
					setAuthenticated(true);
					setDecodedToken(decodedToken);
				}
			})
			.catch(err => {
				console.error(err);
			});
	}
	
	const unauthenticate = () => {
		removeToken();
		setAuthenticated(false);
		setDecodedToken(null);
	}
	
	// useEffect(() => {
	// 	if(checkToken()) {
	// 		const decodedAuthToken = getDecodedToken();
	// 		if(decodedAuthToken.exp * 1000 < Date.now()) {
	// 			unauthenticate();
	// 			setAuthenticated(false);
	// 			setDecodedToken(null);
	// 			window.location.href = '/login';
	// 		} else {
	// 			setAuthenticated(true);
	// 			setDecodedToken(decodedAuthToken);
	// 		}
	// 	}
	// }, [])

	return (
		<AuthProvider value={{
			authenticated,
			authenticate,
			unauthenticate,
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
					<AdminRoute exact path="/admin/gra" component={GraForm} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
