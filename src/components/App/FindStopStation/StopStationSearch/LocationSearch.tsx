import React, { useState } from 'react';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import { useGlobalContext } from 'globalState';
import { ILocation } from 'globalState/GlobalContext/types/ILocation';
import useLocationAPI from '../customHooks/useLocationAPI';

const LocationSearch = ({ label }: { label?: string }) => {
  const [query, setQuery] = useState<string>('');
  const [{ location }, stopStationDispatch] = useGlobalContext();
  const { loading, results } = useLocationAPI(query);

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSelect = (result: ILocation) => {
    stopStationDispatch({ type: 'UPDATE_LOCATION', payload: result });
  };

  const onClear = () => {
    stopStationDispatch({ type: 'UPDATE_LOCATION', payload: null });
    stopStationDispatch({ type: 'UPDATE_STOPS', payload: [] });
  };

  return (
    <div>
      {!label && (
        <>
          <p className="wmnds-h4">Enter a location</p>
          <p className="wmnds-m-b-xsm">A postcode, road name or place of interest</p>
        </>
      )}
      <AutoComplete
        name="LocationSearch"
        placeholder="Search"
        onUpdate={onUpdate}
        loading={loading}
        results={results}
        selectedItem={location}
        onSelectResult={onSelect}
        onClear={onClear}
        label={label}
      />
    </div>
  );
};

export default LocationSearch;
