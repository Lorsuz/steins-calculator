import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	background-color: #232323;
	padding: 20px;
	text-align: center;
	bottom: 0;
	width: 100%;
	span{
		font-size: 1.3rem;
		color: #fff; 

}
`;

const Footer = (): React.FunctionComponentElement<JSX.Element> => (
	<StyledFooter>
		<span>I'm here to stay (Footer)</span>
	</StyledFooter>
);

export default Footer;
