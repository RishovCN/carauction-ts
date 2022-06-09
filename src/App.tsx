//react library imports
import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';

//Css imports
import './App.css';

//pages and component Imports
import Header from './Components/Header';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Collections from './Pages/Collections';
import ProtectedRoutes from './Components/ProtectedRoute';
import SubmitVehical from './Pages/SubmitVehical';
import Footer from './Components/Footer';
import Search from './Pages/Search';

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/submitVehical" element={<ProtectedRoutes />}>
						<Route path="/submitVehical" element={<SubmitVehical />} />
					</Route>
					<Route path="/" element={<SignIn />} />
					<Route path="/signUp" element={<SignUp />} />
					<Route path="/collections" element={<Collections />} />
					<Route path="/search" element={<Search />} />
				</Routes>
				<Footer/>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
