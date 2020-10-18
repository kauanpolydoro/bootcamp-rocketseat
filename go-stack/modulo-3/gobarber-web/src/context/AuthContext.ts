import { createContext } from 'react';

interface IAuthContext {
  name: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
