import React from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/PagesLayout';

// Estilos para a página
const HomePageContainer = styled.main`
	padding: 20px;
	* {
		text-align: center;
	}

	h1 {
		color: #333;
		font-size: 3em;
		margin-bottom: 50px;
	}

	p {
		color: #555;
		font-size: 2em;
		margin-bottom: 20px;
	}

	section {
		padding: 20px;
		margin-top: 20px;
		border-radius: 8px;
		width: 80%;

		h2 {
			font-size: 2em;
			margin-bottom: 10px;
		}
		p{
		font-size: 1.5em;

		}
	}
`;

const HomePage: React.FunctionComponent = () => (
	<Layout title='Página Inicial'>
		<HomePageContainer>
			<h1>Bem-vindo ao IFPB</h1>
			<p>Conheça mais sobre nossa escola e explore nossa calculadora especial.</p>

			<section>
				<h2>Calculadora IFPB</h2>
				<p>
					Bem-vindo à calculadora do IFPB! Esta calculadora incrível foi desenvolvida pelos talentosos estudantes do
					IFPB para ajudar em seus cálculos diários. Experimente agora mesmo e simplifique sua vida acadêmica.
				</p>
			</section>

			<p>Descubra mais sobre o Instituto Federal da Paraíba e seus estudantes inovadores.</p>
		</HomePageContainer>
	</Layout>
);

export default HomePage;
