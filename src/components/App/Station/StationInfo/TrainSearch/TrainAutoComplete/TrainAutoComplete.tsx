import { useEffect } from 'react';
// Import context
import { useStationContext } from 'globalState';
// Import components
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import useTrainServiceAPI from './customHooks/useTrainServiceAPI';

const TrainAutoComplete = ({ name }: { name: 'from' | 'to' }) => {
  const [{ trainQuery, stations }, timetableDispatch] = useStationContext();
  const { loading, results } = useTrainServiceAPI(trainQuery[name]);

  // set query state on input change
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    timetableDispatch({
      type: 'UPDATE_RAIL_QUERY',
      payload: { ...trainQuery, [name]: e.target.value },
    });
  };

  const onSelect = (result: any) => {
    timetableDispatch({
      type: 'UPDATE_RAIL_STATIONS',
      payload: { ...stations, [name]: result },
    });
  };

  const onClear = () => {
    timetableDispatch({
      type: 'UPDATE_RAIL_STATIONS',
      payload: { ...stations, [name]: null },
    });
  };

  useEffect(() => {
    if (results.length && stations[name]?.id && !stations[name]?.name) {
      const selectedItem = results.find((stn) => stn.id === stations[name]!.id);
      if (selectedItem) {
        timetableDispatch({
          type: 'UPDATE_RAIL_STATIONS',
          payload: { ...stations, [name]: selectedItem },
        });
      }
    }
  }, [stations, results, timetableDispatch, name]);

  return (
    <AutoComplete
      id={`trainSearch${name}`}
      name="trainSearch"
      loading={loading}
      placeholder="Search"
      onUpdate={(e) => onUpdate(e)}
      results={results}
      initialQuery={trainQuery[name] || ''}
      selectedItem={stations[name]?.name ? stations[name] : null}
      onSelectResult={onSelect}
      onClear={onClear}
    />
  );
};

const TrainAutoCompleteFields = () => {
  return (
    <div>
      <div className="wmnds-m-b-sm">
        <label className="wmnds-h4" htmlFor="trainSearchFrom">
          From
        </label>
      </div>
      <TrainAutoComplete name="from" />
      <div className="wmnds-m-t-md wmnds-m-b-sm">
        <label className="wmnds-h4" htmlFor="trainSearchTo">
          To
        </label>
      </div>
      <TrainAutoComplete name="to" />
    </div>
  );
};

export default TrainAutoCompleteFields;
