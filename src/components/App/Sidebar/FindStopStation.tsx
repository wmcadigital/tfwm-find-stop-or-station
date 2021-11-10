import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon/Icon';
import LocationSearch from 'components/App/FindStopStation/StopStationSearch/LocationSearch';

const FindStopStation = () => {
  return (
    <div className="wmnds-content-card wmnds-m-b-lg">
      <div className="wmnds-p-md">
        <h2>Find a stop or station</h2>
        <div className="wmnds-m-b-md">
          <LocationSearch label="Enter a postcode, road name or place of interest" />
        </div>
        <Link to="/" className="wmnds-btn wmnds-col-1 wmnds-btn--align-left">
          Search
          <Icon
            iconName="general-chevron-right"
            className="wmnds-btn__icon wmnds-btn__icon--right"
          />
        </Link>
      </div>
    </div>
  );
};

export default FindStopStation;
