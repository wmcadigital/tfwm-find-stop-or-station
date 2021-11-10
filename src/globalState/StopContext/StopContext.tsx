import { useReducer, createContext, useContext } from 'react';
import * as TStop from './StopContext.types';
import { initialState, reducer } from './StopContext.reducer';

const StopContext = createContext<Partial<TStop.Context>>([]);

// eslint-disable-next-line react/prop-types
export const StopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);
  return <StopContext.Provider value={[formState, formDispatch]}>{children}</StopContext.Provider>;
};

export const useStopContext = () => useContext(StopContext) as TStop.Context;
