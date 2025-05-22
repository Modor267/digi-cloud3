import useScrollPosition from '../hooks/useScrollPosition';
import { FullLogo } from './Logo';

function TopBar() {
	const scrollPosition = useScrollPosition();

	return (
		<section
			className={`top-bar w-[95%] sm:w-full max-w-[1280px] mx-auto  h-[56px] fixed top-0 z-50 flex justify-between items-center p-5 xl:p-0 transition-all ease-in-out duration-75
			${scrollPosition > 50 && 'rounded-full !px-3 top-2'}
            ${
				scrollPosition > 100
					? 'bg-white/70 shadow-md backdrop-blur-sm'
					: 'bg-transparent'
			}
		`}>
			<FullLogo />
		</section>
	);
}

export default TopBar;
