import  { createContext, useState, ReactNode } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (param: boolean) => void;
}

const defaultValues: IAuthContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultValues);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(defaultValues.isLoggedIn);

  const contextValues: IAuthContext = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};