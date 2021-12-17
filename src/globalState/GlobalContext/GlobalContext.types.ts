import { ILocation } from './types/ILocation';
import { IStop } from './types/IStop';

export type Mode = 'bus' | 'rail' | 'metro';

export type State = {
  selectedModes: Mode[];
  location: ILocation | null;
  stops: IStop[];
  searchRadius: number;
  selectedStopId?: string | null;
  disruptions: any;
  disruptionsState: any;
};

export type StateAction =
  | {
      type: 'UPDATE_SELECTED_MODES';
      payload: Mode[];
    }
  | {
      type: 'UPDATE_LOCATION';
      payload: ILocation | null;
    }
  | {
      type: 'UPDATE_STOPS';
      payload: IStop[];
    }
  | {
      type: 'RESET_FORM';
    }
  | {
      type: 'UPDATE_SEARCH_RADIUS';
      payload: number;
    }
  | {
      type: 'UPDATE_DISRUPTIONS';
      payload: any;
    }
  | {
      type: 'UPDATE_DISRUPTIONS_STATE';
      payload: any;
    }
  | {
      type: 'UPDATE_SELECTED_STOP';
      payload: string | null;
    };

export type Context = [State, React.Dispatch<StateAction>];
