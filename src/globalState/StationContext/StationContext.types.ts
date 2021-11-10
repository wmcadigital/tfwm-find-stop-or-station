import { IStation } from 'globalState/StationContext/types/IStation';

export type State = {
  stationPoint: any;
  stationId: string;
  stationDepartures: any;
  selectedLine?: any;
  selectedRoute?: any;
  trainQuery: {
    from: string;
    to: string;
  };
  stations: {
    from: Partial<IStation> | null;
    to: Partial<IStation> | null;
  };
};

export type StateAction =
  | {
      type: 'UPDATE_STATION_ID';
      payload: string;
    }
  | {
      type: 'UPDATE_STATION_POINT';
      payload: any;
    }
  | {
      type: 'UPDATE_SELECTED_LINE';
      payload: any;
    }
  | {
      type: 'UPDATE_SELECTED_ROUTE';
      payload: any;
    }
  | {
      type: 'UPDATE_RAIL_QUERY';
      payload: {
        from: string;
        to: string;
      };
    }
  | {
      type: 'UPDATE_RAIL_STATIONS';
      payload: {
        from: Partial<IStation> | null;
        to: Partial<IStation> | null;
      };
    }
  | {
      type: 'UPDATE_STATION_DEPARTURES';
      payload: any[];
    };

export type Context = [State, React.Dispatch<StateAction>];
