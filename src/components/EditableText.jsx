// src/EditableText.js
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAdmin } from '../context/AdminContext';
import { CircularProgress } from '@mui/material';
// import { useAdmin } from './AdminContext';

const EditableText = ({
	docId,
	inputType = 'text',
	className,
	editMode = false,
	defaultValue,
}) => {
	const { isAdmin } = useAdmin();
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(true);

	const ref = doc(db, 'editableTexts', docId);

	useEffect(() => {
		const fetchData = async () => {
			const snap = await getDoc(ref);
			if (snap.exists() && snap.data().text) {
				setText(snap.data().text);
			} else {
				// Initialize if not exists
				await setDoc(ref, { text: defaultValue });
				setText(defaultValue);
			}
			setLoading(false);
		};

		fetchData();
	}, [docId]);

	const handleChange = async (e) => {
		const newText = e.target.value;
		setText(newText);
		await setDoc(ref, { text: newText });
	};

	if (loading) return <CircularProgress />;

	if (isAdmin && editMode) {
		return (
			<>
				{inputType === 'textarea' ? (
					<textarea
						type='text'
						rows={4}
						placeholder='Enter paragraph text...'
						className={className}
						value={text}
						onChange={handleChange}
						style={{ resize: 'none' }}
					/>
				) : (
					<input
						value={text}
						onChange={handleChange}
						style={{ fontSize: '1.2rem' }}
						className={className}
					/>
				)}
			</>
		);
	}

	return text;
};

export default EditableText;
