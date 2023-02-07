import { createContext, Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";

import { vars } from "../config";

type AuthenticationContextType = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
};

const defaultContext: AuthenticationContextType = {
    token: '',
    setToken: () => undefined,
};

export const AuthenticationContext = createContext(defaultContext);

export const AuthenticationProvider: FC<any> = ({ children }) => {
    const [ token, setToken ] = useState('');

    const value = useMemo(
        () => ({
            token,
            setToken,
        }),
        [ token ],
    );

    return <AuthenticationContext.Provider value={value}> {children} </AuthenticationContext.Provider>
}
