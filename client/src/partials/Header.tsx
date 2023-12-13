import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
	background-color: #343a40;
	color: #ffffff;
	padding: 15px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: space-between;	
			width: 100%;
			padding: 0 50px;
			div{
				display: flex;
			}
			li {
				margin-right: 15px;
				
				&:last-child {
					margin-right: 0;
				}

				a {
					text-decoration: none;
					color: #ffffff;
					font-weight: bold;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
`;

const Header: React.FunctionComponent = () => (
	<StyledHeader>
		<nav>
			<ul>
				<div>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<a href='../../public/index.html'>Calculadora</a>
					</li>
				</div>
				<div>
					<li>
						<Link to='/form/login'>Login</Link>
					</li>
					<li>
						<Link to='/form/register'>Register</Link>
					</li>
				</div>
			</ul>
		</nav>
	</StyledHeader>
);

export default Header;
