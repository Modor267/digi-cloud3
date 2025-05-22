import { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export const useAdmin = () => useContext(AdminContext);
export const AdminProvider = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const adminkey = localStorage.getItem('adminKeyCode');
		if (adminkey && adminkey === ADMIN_KEY) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, []);

	return (
		<AdminContext.Provider
			value={{ isAdmin, toggleAdmin: () => setIsAdmin((p) => !p) }}>
			{children}
		</AdminContext.Provider>
	);
};
