import { useGlobalContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import ModeSelect from 'components/shared/ModeSelect/ModeSelect';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
import LocationSearch from './LocationSearch';
import RadiusSearch from './RadiusSearch/RadiusSearch';
import useGetStopsAPI from '../customHooks/useGetStopsAPI';

const StopStationSearch = () => {
  const [{ selectedModes }, stopStationDispatch] = useGlobalContext();
  useGetStopsAPI();
  const handleSelect = (mode: Mode) => {
    let payload: Mode[] = [];
    if (selectedModes.includes(mode)) {
      payload = selectedModes.filter((m: Mode) => m !== mode);
    } else {
      payload = [...selectedModes, mode];
    }
    stopStationDispatch({ type: 'UPDATE_SELECTED_MODES', payload });
    if (!payload.length) {
      stopStationDispatch({ type: 'UPDATE_STOPS', payload: [] });
    }
  };

  const resetForm = () => {
    stopStationDispatch({ type: 'RESET_FORM' });
  };

  return (
    <div>
      <div className="wmnds-m-b-md wmnds-text-align-right">
        <Button text="Clear search" onClick={resetForm} btnClass="wmnds-btn--link" />
      </div>
      <ModeSelect
        selectedModes={selectedModes}
        handleSelect={handleSelect}
        classes="wmnds-grid--spacing-3-sm"
      />
      <LocationSearch />
      <RadiusSearch />
    </div>
  );
};

export default StopStationSearch;
