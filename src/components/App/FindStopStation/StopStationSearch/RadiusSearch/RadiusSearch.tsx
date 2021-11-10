import React, { useState, useEffect } from 'react';
import { useStopStationContext } from 'globalState';
import Icon from 'components/shared/Icon/Icon';
import Message from 'components/shared/Message/Message';
import s from './RadiusSearch.module.scss';

const RadiusSearch = () => {
  const [{ searchRadius }, stopStationDispatch] = useStopStationContext();
  const [error, setError] = useState<string | null>();

  const { minRadius, maxRadius } = { minRadius: 0.1, maxRadius: 30 };
  const getIncrement = (minus?: boolean) => {
    let increment = 1;
    if (searchRadius < 1 || (minus && searchRadius === 1)) {
      increment = 0.1;
    }
    return minus
      ? Number((searchRadius - increment).toFixed(1))
      : Number((searchRadius + increment).toFixed(1));
  };

  const handleMinus = () => {
    stopStationDispatch({
      type: 'UPDATE_SEARCH_RADIUS',
      payload: getIncrement(true),
    });
  };
  const handleAdd = () => {
    stopStationDispatch({
      type: 'UPDATE_SEARCH_RADIUS',
      payload: getIncrement(),
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopStationDispatch({
      type: 'UPDATE_SEARCH_RADIUS',
      payload: Number(Number(e.target.value).toFixed(1)),
    });
  };

  useEffect(() => {
    if (searchRadius > maxRadius || searchRadius < 0) {
      setError('Please enter a number between 1 and 30');
    } else {
      setError(null);
    }
  }, [searchRadius, maxRadius]);

  return (
    <div>
      <p className="wmnds-h4 wmnds-m-b-md">Enter search radius (miles)</p>
      <div className={`wmnds-grid wmnds-grid--spacing-3-lg ${s.container}`}>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.minus}`}
            onClick={handleMinus}
            disabled={searchRadius <= minRadius}
            title="Decrease search radius"
          >
            <Icon iconName="general-minimise" />
          </button>
        </div>
        <div className="wmnds-col-auto">
          <input
            className={`wmnds-fe-input ${s.searchInput}`}
            type="number"
            name="searchRadius"
            value={searchRadius}
            onChange={handleChange}
          />
        </div>
        <div className="wmmds-col-auto">
          <button
            type="button"
            className={`${s.valueControl} ${s.add}`}
            onClick={handleAdd}
            disabled={searchRadius >= maxRadius}
            title="Increase search radius"
          >
            <Icon iconName="general-expand" />
          </button>
        </div>
      </div>
      {error && <Message type="error" title="Invalid search radius" message={error} />}
    </div>
  );
};

export default RadiusSearch;
