import {
  getSearchParam,
  setSearchParam,
  setRailParams,
  delSearchParam,
  getAllSearchParams,
} from 'globalState/helpers/URLSearchParams';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
import * as TTimetable from './TimetableContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TTimetable.State = {
    selectedService: null,
    selectedMode: (getSearchParam('mode') as Mode) || null,
    busQuery: getSearchParam('q') || '',
    trainQuery: {
      from: getSearchParam('qf') || '',
      to: getSearchParam('qt') || '',
    },
    stations: {
      from: { id: getSearchParam('from') || null },
      to: { id: getSearchParam('to') || null },
    },
  };

  return state;
})();

export const reducer = (state = initialState, action: TTimetable.StateAction): TTimetable.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODE':
      setSearchParam('mode', action.payload);
      return { ...state, selectedMode: action.payload };
    case 'UPDATE_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    case 'UPDATE_BUS_QUERY':
      setSearchParam('q', action.payload);
      return { ...state, busQuery: action.payload };
    case 'UPDATE_RAIL_QUERY':
      setRailParams('qf', action.payload.from);
      setRailParams('qt', action.payload.to);
      return { ...state, trainQuery: action.payload };
    case 'UPDATE_RAIL_STATIONS':
      setRailParams('from', action.payload.from?.id || '');
      setRailParams('to', action.payload.to?.id || '');
      return { ...state, stations: action.payload };
    case 'CLEAR_SEARCH':
      getAllSearchParams().forEach((param) => {
        delSearchParam(param.name);
      });
      return initialState;
    // Default should return initial state if error
    default:
      return initialState;
  }
};
