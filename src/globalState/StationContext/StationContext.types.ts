export type State = {
  stationPoint: any;
  stationId: string;
  stationDepartures: any;
  selectedLine?: any;
  selectedRoute?: any;
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
      type: 'UPDATE_STATION_DEPARTURES';
      payload: any[];
    };

export type Context = [State, React.Dispatch<StateAction>];
