import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaImages } from 'react-icons/fa6';

const ImageUpload = () => {
	const [file, setFile] = useState(null);
	const [profile, setProfile] = useState('http://localhost:3001/uploads/profile/default.jpg');
	const [background, setBackground] = useState('http://localhost:3001/uploads/background/default.jpg');

	const handleFileChange = e => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async (useAs: string) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await axios.post(`http://localhost:3001/upload-${useAs}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			if (response.data && response.data.imageUrl) {
				if (useAs === 'profile') {
					setProfile(response.data.imageUrl);
				} else {
					setBackground(response.data.imageUrl);
				}
			}

			console.log('Upload successful!');
		} catch (error) {
			console.error('Error uploading:', error);
		}
	};

	return (
		<StyledComponent>
			<h1>Profile</h1>
			<div className='images'>
				<img src={background} alt='' className='background' />
				<img src={profile} alt='' className='profile' />
			</div>
			<input type='file' onChange={handleFileChange} id='input' />
			<label htmlFor='input'>
				<FaImages></FaImages>{' '}
			</label>
			<div className='actions'>
				<Button onClick={() => handleUpload('profile')}>Use as Profile</Button>
				<Button onClick={() => handleUpload('background')}>Use as Background</Button>
			</div>
		</StyledComponent>
	);
};

const StyledComponent = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	h1 {
		margin-bottom: 20px;
		color: #333;
		font-size: 2.5rem;
	}

	.images {
		position: relative;
		height: 400px;
		overflow: hidden;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		margin-bottom: 20px;
		border-radius: 10px;
		width: 90%;

		.background {
			width: 100%;
			/* height: 100%; */
			margin-bottom: 20px;
		}

		.profile {
			width: 200px;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	label {
		margin: 20px 0;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		padding: 20px;
		cursor: pointer;

		* {
			vertical-align: middle;
			color: #007bff;
			font-size: 2rem;
		}
	}
	input {
		display: none;
		margin-bottom: 20px;
		&:focus ~ label,
		&:checked ~ label {
			border: 2px solid #007bff;
		}
	}
	.actions {
		display: flex;
		justify-content: center;
	}
`;

const Button = styled.button`
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin: 5px;
	font-size: 16px;

	&:hover {
		background-color: #0056b3;
	}
`;

export default ImageUpload;
