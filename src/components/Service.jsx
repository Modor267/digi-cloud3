import { Card, CardContent, Typography } from '@mui/material';

function Service({ img, title, description }) {
	return (
		<Card className='!rounded-3xl w-full !border border-[#efeff5] md:min-h-[250px] flex items-center cursor-pointer hover:!bg-[#484c6f0e]'>
			<CardContent className='w-full flex flex-col gap-2 items-start'>
				{' '}
				<img src={img} alt='wallet service' className='h-10 w-auto' />
				<hr className='w-full border-[#b1b1c2] my-1' />
				<h2 className='text-xl font-bold'>{title}</h2>
				<Typography className='text-wrap' variant='body2'>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Service;
