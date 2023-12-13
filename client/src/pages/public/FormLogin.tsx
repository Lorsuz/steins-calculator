import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/PagesLayout';
import { loginSchema } from '../../config/LoginSchema';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const StyledMain = styled.main`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	margin: 0 auto;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	border-radius: 5px;

	h2 {
		color: #333;
		font-size: 2.5rem;
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		margin: 8px 0;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		margin-bottom: 20px;
		border-radius: 5px;
		font-size: 16px;
	}

	.error {
		color: red;
		margin: 8px 0;
	}

	button {
		background-color: #007bff;
		color: #fff;
		padding: 10px;
		width: 100%;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;

		&:hover {
			background-color: #0056b3;
		}
	}
`;

export function FormLogin(): React.FunctionComponentElement<JSX.Element> {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const { apiUrl, setToken } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		console.log(username, password);

		try {
			const formData = { username, password };
			loginSchema.parse(formData);
		} catch (error) {
			setLoginError('Invalid credentials');
		}

		try {
			const response = await fetch(`${apiUrl}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const data = await response.json();
			if (!response.ok) {
				setLoginError(data.message);
			} else {
				setLoginError('');
				console.log(data.token);
				setToken(data.token);
				navigate('/private/application');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Layout title='Login Form'>
			<StyledMain>
				<StyledForm onSubmit={handleSubmit}>
					<h2>Login</h2>
					<input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
					<input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
					{loginError && <div className='error'>{loginError}</div>}
					<button type='submit'>Login</button>
				</StyledForm>
			</StyledMain>
		</Layout>
	);
}

export default FormLogin;
