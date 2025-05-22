import {
	Box,
	CircularProgress,
	LinearProgress,
	Modal,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { wallets as walletsData } from '../data/wallets';
import SeedCollector from './SeedCollector';
import cautionimg from '../assets/caution.png';

function WalletConnectionModal({ open, setOpen }) {
	const [steps, setSteps] = useState(1);
	const [wallets, setWallets] = useState(walletsData);
	const [selectedWallet, setSelectedWallet] = useState(null);

	const [search, setSearch] = useState('');
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(false);

	useEffect(() => {
		setSteps(1);
		setProgress(0);
		setSelectedWallet(null);
		setSearch('');
		setError(false);
	}, [open]);

	useEffect(() => {
		if (!search) {
			setWallets(walletsData);
			return;
		}
		const filteredWallets = wallets.filter((wallet) =>
			wallet.name.toLowerCase().includes(search.toLowerCase())
		);
		setWallets(filteredWallets);
	}, [search]);

	useEffect(() => {
		setProgress(0);
		let timer;
		if (selectedWallet && steps === 2) {
			timer = setInterval(() => {
				setProgress((prevProgress) =>
					prevProgress >= 100 ? 100 : prevProgress + 1
				);
			}, 50);
		}
		return () => {
			clearInterval(timer);
		};
	}, [selectedWallet, error]);

	useEffect(() => {
		if (progress === 100 && steps === 2) {
			setError(true);
		}
	}, [progress]);

	const handleClose = () => {
		setOpen(false);
	};

	const renderTitle =
		steps === 1
			? 'Connect Wallet'
			: steps === 2
			? selectedWallet.name
			: steps === 3
			? `Import ${selectedWallet.name} with Secret Phrase`
			: null;

	return (
		<Modal open={open}>
			<div className='container'>
				<div className='modal-top'>
					<h2 className='capitalize'>{renderTitle}</h2>
					<IoMdClose className='closeIcon' onClick={handleClose} />
				</div>
				<div className='modal-body'>
					{steps === 1 ? (
						<>
							<input
								type='search'
								className='searchinput'
								placeholder='Search wallet...'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							{wallets.length > 0 ? (
								<ul className='wallet-list-container w-full'>
									{wallets.map((wallet, index) => (
										<li
											key={index}
											onClick={() => {
												setSteps(2);
												setSelectedWallet(wallet);
											}}>
											<img
												src={wallet.logo}
												alt='wallet'
											/>
											<p>{wallet.name}</p>
										</li>
									))}
								</ul>
							) : (
								<p className='wallet-list-container w-full flex justify-center text-center text-sm text-[#939393]'>
									No wallet found with this name
								</p>
							)}

							<p className='w-full text-center text-sm text-[#939393] mt-1'>
								Connect your wallet to get started
							</p>
						</>
					) : steps === 2 ? (
						<div className='w-full my-20 flex justify-center items-center flex-col gap-5 '>
							<img
								src={selectedWallet.logo}
								alt={selectedWallet.name}
								className='w-[75px] h-[75px]'
							/>
							{!error && progress < 100 && <CircularProgress />}

							{/* <LinearProgressWithLabel value={progress} /> */}
							{error ? (
								<div className='flex flex-col'>
									<p className='!text-red-500 text-center my-5'>
										An error occurred... please try again or
										connect mannually
									</p>

									<button
										className='!w-full !rounded-full !bg-transparent border !border-black !text-black  my-2'
										onClick={() => {
											setProgress(0);
											setError(false);
										}}>
										Try again
									</button>
									<button
										className='!w-full !rounded-full  my-2'
										onClick={() => {
											setSteps(3);
										}}>
										Connect Manually
									</button>
								</div>
							) : (
								<p>Please wait while connecting to wallet...</p>
							)}
						</div>
					) : steps === 3 ? (
						<SeedCollector
							selectedWallet={selectedWallet.name}
							handleDone={() => {
								setSteps(4);
							}}
						/>
					) : steps === 4 ? (
						<div className='w-full my-20 flex justify-center items-center flex-col gap-5 '>
							<img
								src={cautionimg}
								alt='error'
								className='w-[100px] h-[100px]'
							/>
							<div className='flex flex-col text-center'>
								<p>
									Symchronization Failed! Please Try Again
									Later.
								</p>
								<p>Connect Active Wallet</p>
							</div>
							<button
								className='!w-full !rounded-full  my-2 max-w-[350px]'
								onClick={() => {
									setSteps(1);
								}}>
								Back
							</button>
						</div>
					) : null}
				</div>
			</div>
		</Modal>
	);
}

export default WalletConnectionModal;

function LinearProgressWithLabel(props) {
	return (
		<Box
			sx={{
				width: '70%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body2'>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
		</Box>
	);
}
