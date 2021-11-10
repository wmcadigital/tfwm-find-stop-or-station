import { useReducer, createContext, useContext } from 'react';
import * as TStation from './StationContext.types';
import { initialState, reducer } from './StationContext.reducer';

const StationContext = createContext<Partial<TStation.Context>>([]);

// eslint-disable-next-line react/prop-types
export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);
  return (
    <StationContext.Provider value={[formState, formDispatch]}>{children}</StationContext.Provider>
  );
};

export const useStationContext = () => useContext(StationContext) as TStation.Context;
