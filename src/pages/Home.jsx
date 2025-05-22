import { FaAngleRight } from 'react-icons/fa6';
import heroill from '../assets/hero-illustration.avif';
import { Grid } from '@mui/material';
import Service from '../components/Service';
import { services } from '../data/services';
import WalletConnectionModal from '../components/WalletConnectionModal';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditableText from '../components/EditableText';
import { useAdmin } from '../context/AdminContext';
import IssueFormModal from '../components/IssueFormModal';

function HomePage() {
	const [walletOpen, setWalletOpen] = useState(false);
	const [issueFormOpen, setIssueFormOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const { isAdmin } = useAdmin();

	return (
		<>
			<div className='w-full'>
				<section className='hero w-full h-auto md:min-h-lvh flex items-center justify-center'>
					<div className='max-w-[1280px] mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-5 xl:px-0 py-16 md:py-0'>
						<div className='relative flex-1 w-full flex flex-col items-start justify-center text-start gap-5 '>
							{isAdmin && (
								<>
									{isAdmin && editMode ? (
										<button
											onClick={() => setEditMode(false)}
											className='absolute bottom-0 right-0 !p-2 !bg-black'>
											Done Editting
										</button>
									) : (
										<FaEdit
											size={30}
											onClick={() => setEditMode(true)}
											className='absolute top-0 right-5 cursor-pointer'
										/>
									)}
								</>
							)}

							{isAdmin && editMode ? (
								<EditableText
									docId='homeHeroHeader'
									className='w-full border border-[#494949] py-2 px-3 rounded-md text-xl'
									editMode={true}
								/>
							) : (
								<h1 className='!text-6xl font-[600]'>
									<EditableText
										docId='homeHeroHeader'
										editMode={false}
										defaultValue={
											'Blockchain Rectification'
										}
									/>
								</h1>
							)}
							{isAdmin && editMode ? (
								<EditableText
									docId='homeHeroParagraph'
									inputType='textarea'
									className='w-full border border-[#494949] py-2 px-3 rounded-md text-sm'
									editMode={true}
								/>
							) : (
								<p className='text-lg'>
									<EditableText
										docId='homeHeroParagraph'
										editMode={false}
										defaultValue={
											'HypurrFi provides decentralized, non-custodial lending pool smart contracts where anyone can supply liquidity to earn yield.'
										}
									/>
								</p>
							)}
							<button
								className=''
								onClick={() => setWalletOpen(!walletOpen)}>
								Connect <FaAngleRight />
							</button>
						</div>
						<div className='flex-1 flex items-center justify-center'>
							<img
								src={heroill}
								alt='hero illustration'
								className='w-full object-contain object-center'
							/>
						</div>
					</div>
				</section>

				<section className='max-w-[1280px] w-full mx-auto flex p-5 xl:px-0 py-20 '>
					<Grid container spacing={2} className='w-full'>
						{services.map((service, index) => (
							<Grid
								size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
								key={index}
								onClick={() => setWalletOpen(!walletOpen)}>
								<Service {...service} />
							</Grid>
						))}
						<Grid
							size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
							onClick={() => setIssueFormOpen(!walletOpen)}>
							<Service
								title={'Other Issues'}
								description={
									"If you can't find the issue you are experiencing click here."
								}
								img={`${
									import.meta.env.BASE_URL
								}services/chatimg.svg`}
							/>
						</Grid>
					</Grid>
				</section>
			</div>
			<WalletConnectionModal open={walletOpen} setOpen={setWalletOpen} />
			<IssueFormModal open={issueFormOpen} setOpen={setIssueFormOpen} />
		</>
	);
}

export default HomePage;
