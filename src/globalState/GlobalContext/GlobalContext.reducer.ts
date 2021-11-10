import * as TGlobal from './GlobalContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TGlobal.State = {};

  return state;
})();

export const reducer = (state = initialState, action: TGlobal.StateAction): TGlobal.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODE':
      return { ...state };
    // Default should return initial state if error
    default:
      return initialState;
  }
};
