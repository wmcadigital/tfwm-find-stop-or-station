import { useReducer, createContext, useContext } from 'react';
import * as TTimetable from './TimetableContext.types';
import { initialState, reducer } from './TimetableContext.reducer';

const TimetableContext = createContext<Partial<TTimetable.Context>>([]);

// eslint-disable-next-line react/prop-types
export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up reducer using reducer logic and initialState by default
  const [timetableState, timetableDispatch] = useReducer(reducer, initialState);
  return (
    <TimetableContext.Provider value={[timetableState, timetableDispatch]}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetableContext = () => useContext(TimetableContext) as TTimetable.Context;
