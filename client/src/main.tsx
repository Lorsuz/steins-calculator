import React from 'react';

import ReactDOM from 'react-dom/client';
// import './assets/styles/index.scss';
import App from './App.tsx';
// import Context from './context/AuthContext.tsx';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* <Context.Provider value={Context}> */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
		{/* </Context.Provider> */}
	</React.StrictMode>
);
