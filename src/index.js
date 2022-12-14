import 'normalize.css';
import './index.css';

// import appIcon from '../public/appLogo/appLogo192.png';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';

import store from './store/index';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<div className='content'>
				<App />
			</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
