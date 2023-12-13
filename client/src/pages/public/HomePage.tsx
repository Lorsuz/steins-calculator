import React from 'react';
import styled from 'styled-components';
import Layout from '../../layouts/PagesLayout';

// Cores do IFPB
const ifpbColors = {
	primary: '#004080', // Azul
	secondary: '#FFD100', // Amarelo
	tertiary: '#FFFFFF' // Branco
};

// Estilos para a página
const HomePageContainer = styled.div`
	background-color: ${ifpbColors.primary};
	color: ${ifpbColors.tertiary};
	padding: 20px;

	h1 {
		font-size: 2em;
	}

	p {
		font-size: 1.2em;
	}

	section {
		background-color: ${ifpbColors.secondary};
		padding: 20px;
		margin-top: 20px;
		border-radius: 8px;

		h2 {
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
          Bem-vindo à calculadora do IFPB! Esta calculadora incrível foi desenvolvida pelos talentosos estudantes do IFPB para ajudar em seus cálculos diários. 
          Experimente agora mesmo e simplifique sua vida acadêmica.
        </p>
        {/* Adicione aqui o componente da calculadora ou as informações que deseja exibir */}
      </section>

      <p>Descubra mais sobre o Instituto Federal da Paraíba e seus estudantes inovadores.</p>
      {/* Adicione mais seções conforme necessário */}
    </HomePageContainer>
  </Layout>
);

export default HomePage;
