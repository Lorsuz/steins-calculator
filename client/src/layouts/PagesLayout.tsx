import React from 'react';

import Head from '../partials/Head';

type Props = {
	children?: React.ReactNode;
	title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title }: Props) => (
	<>
		<Head title={title} />
		{children}
	</>
);

export default Layout;
