import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HomePage from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.css';
import { AdminProvider } from './context/AdminContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AdminProvider>
			<RouterProvider router={router} />
		</AdminProvider>
	</React.StrictMode>
);
