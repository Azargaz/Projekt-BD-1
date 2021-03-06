import React, { useState } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import history from "./utils/history";

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';

import StronaGlowna from './components/StronaGlowna';
import NavBar from './components/NavBar';
import Gry from './components/Gry';
import ListaUzytkownika from './components/ListaUzytkownika';
import Login from './components/Login';
import Rejestracja from './components/Rejestracja';
import Gra from './components/Gra';

import GraAdmin from './components/admin/GraAdmin';
import FirmaAdmin from './components/admin/FirmaAdmin';
import GatunekAdmin from './components/admin/GatunekAdmin';
import PlatformaAdmin from './components/admin/PlatformaAdmin';
import SeriaGierAdmin from './components/admin/SeriaGierAdmin';

import jwtDecode from 'jwt-decode';
import { AuthRoute, UnauthRoute, AdminRoute, AuthProvider } from './utils/Auth';
import fetchData from './utils/fetchData';
import WyszukaneGry from './components/WyszukaneGry';
import NajlepszeGry from './components/NajlepszeGry';
import RecenzjeAdmin from './components/admin/RecenzjeAdmin';
import UzytkownikAdmin from './components/admin/UzytkownikAdmin';

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

	const [darkmode, setDarkmode] = useState(localStorage.darkmode && localStorage.darkmode === 'true' ? true : false);

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
				history.push("#/uzytkownik/lista/" + decodedToken.id_uzytkownik)
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

	const handleDarkmodeChange = () => {
		setDarkmode(!darkmode);
		localStorage.darkmode = !darkmode;
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
			<ThemeProvider theme={theme(darkmode)}>
				<Router>
					<CssBaseline />
					<NavBar darkmode={darkmode} handleDarkmodeChange={handleDarkmodeChange} />
					<Switch>
						<Route exact path="/" component={StronaGlowna} />

						<Route exact path="/gry" component={Gry} />
						<Route exact path="/gra/:id_gra" component={Gra} />
						<Route exact path="/gry/szukaj/:tytul" component={WyszukaneGry} />
						<Route exact path="/gry/top/:top" component={NajlepszeGry} />
						
						<AuthRoute exact path="/uzytkownik/lista/:id_uzytkownik" component={ListaUzytkownika} />

						<UnauthRoute exact path="/login" component={Login} />
						<UnauthRoute exact path="/rejestruj" component={Rejestracja} />

						<AdminRoute exact path="/admin/gra" component={GraAdmin} />
						<AdminRoute exact path="/admin/firma" component={FirmaAdmin} />
						<AdminRoute exact path="/admin/gatunek" component={GatunekAdmin} />
						<AdminRoute exact path="/admin/platforma" component={PlatformaAdmin} />
						<AdminRoute exact path="/admin/seria_gier" component={SeriaGierAdmin} />
						<AdminRoute exact path="/admin/recenzja" component={RecenzjeAdmin} />
						<AdminRoute exact path="/admin/uzytkownik" component={UzytkownikAdmin} />
					</Switch>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
