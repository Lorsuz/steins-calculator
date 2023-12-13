import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	text-align: center;
	padding: 50px 20px;
	background-color: #004080; /* Cor de fundo azul do IFPB */
	color: #ffffff; /* Cor do texto branco */

	hr {
		border: 1px solid #ffffff; /* Cor da linha branca */
		margin-bottom: 20px;
	}
`;

const Footer = (): React.FunctionComponentElement<JSX.Element> => (
	<StyledFooter>
		<hr />
		<span>I'm here to stay (Footer)</span>
	</StyledFooter>
);

export default Footer;
