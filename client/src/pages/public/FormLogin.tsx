import React, { useState, useContext } from 'react';
import Layout from '../../layouts/PagesLayout';
import { loginSchema } from '../../config/LoginSchema';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export function FormLogin(): React.FunctionComponentElement<JSX.Element> {
	const [username, setUsername] = useState('ariel');
	const [password, setPassword] = useState('12345678');
	const [loginError, setLoginError] = useState('');
	const { apiUrl, token, setToken } = useContext(AuthContext);
	console.log(token);
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
			<main>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
					<input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
					{loginError && <div className='error'>{loginError}</div>}
					<button type='submit'>Login</button>
				</form>
			</main>
		</Layout>
	);
}

export default FormLogin;
