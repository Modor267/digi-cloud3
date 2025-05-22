import { CircularProgress, Modal } from '@mui/material';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

function IssueFormModal({ open, setOpen }) {
	const [submitted, setSubmitted] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);

		setTimeout(() => {
			setSubmitted(false);
			setOpen(false);
		}, 3000);
	};

	return (
		<Modal open={open}>
			<div className='container'>
				<div className='modal-top'>
					<h2 className='capitalize'>Other Issues</h2>
					<IoMdClose className='closeIcon' onClick={handleClose} />
				</div>
				<p className='my-2'>
					If you're experiencing an issue not listed above, feel free
					to describe it here. We're grateful for your feedback and
					will do our best to resolve it promptly.
				</p>
				<div className='modal-body'>
					<form
						onSubmit={handleSubmit}
						className='w-full flex flex-col gap-3'>
						<input
							placeholder='you@email.com'
							type='email'
							className='w-full border border-[#494949] py-2 px-3 rounded-md text-md'
							required
						/>
						<textarea
							placeholder='Describe your issue...'
							name=''
							rows={5}
							style={{ resize: 'none' }}
							required
							className='w-full border border-[#494949] py-2 px-3 rounded-md text-md'></textarea>

						<button
							type='submit'
							className='w-full py-1 !rounded-full !bg-black text-white !my-2'>
							{submitted ? (
								<>
									Submitting...{' '}
									<CircularProgress
										color='"white'
										size={20}
									/>
								</>
							) : (
								<>Submit</>
							)}
						</button>
					</form>
				</div>
			</div>
		</Modal>
	);
}

export default IssueFormModal;
