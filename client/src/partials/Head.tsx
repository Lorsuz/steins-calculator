import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
	title?: string;
};

const Head: React.FunctionComponent<Props> = ({ title = 'Stens;Calculator' }: Props) => (
	<Helmet>
		<title>{title}</title>
	</Helmet>
);

export default Head;
