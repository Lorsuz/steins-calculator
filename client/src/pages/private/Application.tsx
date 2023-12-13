import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.main`
	text-align: center;
	margin: 50px;
`;

const Title = styled.h1`
	color: #333;
	font-size: 5em;
	margin-bottom: 50px;
`;

const Paragraph = styled.p`
	color: #555;
	font-size: 2em;
	margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
	color: #007bff;
	text-decoration: none;
	font-weight: bold;
	font-size: 1.5rem;

	&:hover {
		text-decoration: underline;
	}
`;

function Application(): React.FunctionComponentElement<JSX.Element> {
	return (
		<Container>
			<Title>Application</Title>
			<Paragraph>This is a private route.</Paragraph>
			<StyledLink to='../profile'>Click here to access the profile</StyledLink>
		</Container>
	);
}

export default Application;
