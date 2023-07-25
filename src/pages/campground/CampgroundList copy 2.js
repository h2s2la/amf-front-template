import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Search from './components/Search';
import Result from './components/Result';

const Campgrounds = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' component={Search} />
				<Route path='/result' component={Result} />
			</Routes>
		</Router>
	);
};

export default Campgrounds;
