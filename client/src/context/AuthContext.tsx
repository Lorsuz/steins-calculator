import React from 'react';

type AuthContextType = {
	apiUrl: string;
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
};
const MeuContexto: React.Context<AuthContextType> = React.createContext({} as AuthContextType);

export default MeuContexto;
