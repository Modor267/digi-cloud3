import fullLogoImg from '../assets/walletconnectlogo.png';
import logoImg from '../assets/walletconnectlogoonly.png';


export const FullLogo = () => {
	return (
		<img
			src={fullLogoImg}
			alt='wallet connect'
			className='h-[20px] w-auto'
		/>
	);
};

export const Logo = () => {
    return (
        <img
            src={logoImg}
            alt='wallet connect'
            className='h-[20px] w-auto'
        />
    );
}