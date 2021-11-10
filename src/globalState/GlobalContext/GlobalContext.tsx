import { useReducer, createContext, useContext } from 'react';
import * as TGlobal from './GlobalContext.types';
import { initialState, reducer } from './GlobalContext.reducer';

const GlobalContext = createContext<Partial<TGlobal.Context>>([]);

// eslint-disable-next-line react/prop-types
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={[formState, formDispatch]}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext) as TGlobal.Context;
