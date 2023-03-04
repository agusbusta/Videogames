//<------------------IMPORTACIONES------------------->

import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import GameCreator from './components/GameCreator/GameCreator';
import axios from 'axios';
axios.defaults.baseURL = 'https://videogames-production-37dd.up.railway.app/';

//<------------------------------------------------------>

//<-----------------COMPONENTE APP-------------->

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/home' component={Home} />
				<Route path='/create' component={GameCreator} />
				<Route path='/detail/:id' component={Detail} />
			</Switch>
		</div>
	);
}

export default App;

//<------------------------------------------------------>