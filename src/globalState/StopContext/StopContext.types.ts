export type State = {
  stopPointData: any;
  stopAtcoCode: string;
  stopDepartures: any;
  selectedLine?: any;
  selectedRoute?: any;
  stopLines: any;
  stopDisruptions: any;
  stopTimetables: any;
};

export type StateAction =
  | {
      type: 'UPDATE_ATCOCODE';
      payload: string;
    }
  | {
      type: 'UPDATE_STOP_POINT';
      payload: any;
    }
  | {
      type: 'UPDATE_STOP_LINES';
      payload: any;
    }
  | {
      type: 'UPDATE_STOP_TIMETABLES';
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
      type: 'UPDATE_DISRUPTIONS';
      payload: any;
    }
  | {
      type: 'UPDATE_STOP_DEPARTURES';
      payload: any[];
    };

export type Context = [State, React.Dispatch<StateAction>];
