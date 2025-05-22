import { Outlet } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

function App() {
	return (
		<main className='app flex flex-col items-center'>
			<ScrollToTop />
			<TopBar />
			<Outlet />
			<Footer />
		</main>
	);
}

export default App;
