import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/PagesLayout';
import { registerSchema } from '../../config/registerSchema';
import AuthContext from '../../context/AuthContext';

const Main = styled.main`
	

`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	margin: 0 auto;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	border-radius: 5px;

	h2 {
		color: #333;
		font-size: 2.5rem;
		margin-bottom: 50px;
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

const FormRegister: React.FunctionComponentElement<JSX.Element> = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [registerError, setRegisterError] = useState('');
	const { apiUrl } = useContext(AuthContext);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		console.log(username, password);

		try {
			const formData = { username, email, password };
			registerSchema.parse(formData);
		} catch (error) {
			setRegisterError('Invalid credentials');
		}

		try {
			const response = await fetch(`${apiUrl}/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password })
			});
			const data = await response.json();

			if (!response.ok) {
				setRegisterError(data.message);
			} else {
				setRegisterError(data.message);
				console.log(data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Layout title='Register Form'>
			<Main>
				<StyledForm onSubmit={handleSubmit}>
					<h2>Register</h2>
					<input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
					<input type='email' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
					<input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
					{registerError && <div className='error'>{registerError}</div>}
					<button type='submit'>Register</button>
				</StyledForm>
			</Main>
		</Layout>
	);
};

export default FormRegister;
