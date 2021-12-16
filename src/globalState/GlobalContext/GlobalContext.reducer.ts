import * as TGlobal from './GlobalContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TGlobal.State = {
    selectedModes: [],
    location: null,
    stops: [],
    searchRadius: 0.5,
    disruptions: null,
    disruptionsState: {
      isLoading: true,
      errorInfo: null,
    },
  };

  return state;
})();

export const reducer = (state = initialState, action: TGlobal.StateAction): TGlobal.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODES':
      return { ...state, selectedModes: action.payload };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'UPDATE_STOPS':
      return { ...state, stops: action.payload, selectedStopId: null };
    case 'UPDATE_SEARCH_RADIUS':
      return { ...state, searchRadius: action.payload };
    case 'UPDATE_SELECTED_STOP':
      return { ...state, selectedStopId: action.payload };
    case 'UPDATE_DISRUPTIONS':
      return { ...state, disruptions: action.payload };
    case 'UPDATE_DISRUPTIONS_STATE':
      return { ...state, disruptionsState: action.payload };
    case 'RESET_FORM':
      return initialState;
    // Default should return initial state if error
    default:
      return initialState;
  }
};
