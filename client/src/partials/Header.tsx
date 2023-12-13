import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
	background-color: #004080; /* Cor de fundo azul do IFPB */
	color: #ffffff; /* Cor do texto branco */
	padding: 10px 20px;

	nav {
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: space-around;

			li {
				a {
					text-decoration: none;
					color: #ffffff; /* Cor do texto branco */

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
			<li>
					<Link to='/'>Home</Link>
				</li><li>
					<Link to='/form/login'>Login</Link>
				</li>
				<li>
					<Link to='/form/register'>Register</Link>
				</li>
			</ul>
		</nav>
	</StyledHeader>
);

export default Header;
