import * as TStop from './StopContext.types';
// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TStop.State = {
    stopPointData: null,
    stopAtcoCode: '',
    stopDepartures: null,
    stopLines: null,
    stopDisruptions: null,
    stopTimetables: null,
  };

  return state;
})();

export const reducer = (state = initialState, action: TStop.StateAction): TStop.State => {
  switch (action.type) {
    case 'UPDATE_ATCOCODE':
      return { ...state, stopAtcoCode: action.payload };
    case 'UPDATE_STOP_POINT':
      return { ...state, stopPointData: action.payload };
    case 'UPDATE_STOP_DEPARTURES':
      return { ...state, stopDepartures: action.payload };
    case 'UPDATE_STOP_LINES':
      return { ...state, stopLines: action.payload };
    case 'UPDATE_SELECTED_LINE':
      return { ...state, selectedLine: action.payload };
    case 'UPDATE_STOP_TIMETABLES':
      return { ...state, stopTimetables: action.payload };
    case 'UPDATE_DISRUPTIONS':
      return { ...state, stopDisruptions: action.payload };
    case 'UPDATE_SELECTED_ROUTE':
      return { ...state, selectedRoute: action.payload };
    // Default should return initial state if error
    default:
      return initialState;
  }
};
