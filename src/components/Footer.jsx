import { SiWalletconnect } from 'react-icons/si';

function Footer() {
	const year = new Date().getFullYear();
	return (
		<section className='w-full bg-[#f9f9f9] pt-32 pb-10'>
			<div className='max-w-[1280px] w-full mx-auto px-5 xl:px-0 text-center border-t border-[#b1b1c2] flex gap-1 justify-center items-center'>
				<SiWalletconnect color='#2c346d' />
				<p className='text-sm'>
					&copy; {year} DappsConnector — Built with WalletConnect
				</p>
			</div>
		</section>
	);
}

export default Footer;
