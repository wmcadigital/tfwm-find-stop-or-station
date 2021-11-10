import { useReducer, createContext, useContext } from 'react';
import * as TStopStation from './StopStationContext.types';
import { initialState, reducer } from './StopStationContext.reducer';

const StopStationContext = createContext<Partial<TStopStation.Context>>([]);

// eslint-disable-next-line react/prop-types
export const StopStationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);
  return (
    <StopStationContext.Provider value={[formState, formDispatch]}>
      {children}
    </StopStationContext.Provider>
  );
};

export const useStopStationContext = () => useContext(StopStationContext) as TStopStation.Context;
