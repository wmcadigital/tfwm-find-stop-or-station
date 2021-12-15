import { useState } from 'react';
// Components
import { useStationContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import Loader from 'components/shared/Loader/Loader';
import Sidebar from 'components/App/Sidebar/Sidebar';
import NIcon from 'components/shared/Icon/NIcon';
import s from '../Stop.module.scss';
import TrainDepartures from '../TrainDepartures/TrainDepartures';
import Facilities from './Facilities';
import StationParking from './StationParking';
import Map from '../Map/Map';
import railZoneData from '../railZoneData.json';
import useFacilitiesAPI from './useFacilitiesAPI';
import TrainSearch from './TrainSearch/TrainSearch';

const StationInfo = () => {
  const [showMap, setShowMap] = useState(false);
  const [{ stationPoint, stationId }] = useStationContext();
  const station = stationPoint.data[0];
  const zoneInfo = railZoneData.find((railZone: any) => railZone.crsCode === stationId);
  const { results, loading } = useFacilitiesAPI(
    `https://journeyplanner.networkwestmidlands.com/API/WebApi/GetNearestStations/${station.lat.toFixed(
      5
    )}/${station.lon.toFixed(5)}`
  );

  return (
    <div>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
            <div className="wmnds-col-md-2-3 wmnds-m-b-md">
              <h2>
                {station.name}{' '}
                <Icon className={`${s.modeIcon} ${s.train}`} iconName="modes-isolated-rail" />
              </h2>
              {zoneInfo && (
                <h3 className="wmnds-m-t-none">
                  {!zoneInfo.railZone ? (
                    'Out of county'
                  ) : (
                    <>
                      {zoneInfo.railZone === 6 ? (
                        <NIcon str="nTrain zone 5" />
                      ) : (
                        `Rail zone ${zoneInfo.railZone}`
                      )}
                    </>
                  )}
                </h3>
              )}
            </div>
            <div className="wmnds-col-1 wmnds-col-md-auto wmnds-m-b-lg">
              <Button
                btnClass="wmnds-btn--secondary wmnds-col-1"
                text={showMap ? 'Hide map' : 'View map'}
                iconRight="general-location-pin"
                onClick={() => setShowMap(!showMap)}
              />
            </div>
          </div>
        </div>
      </div>
      {showMap && <Map />}
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <TrainDepartures />
          <TrainSearch />
          {loading ? (
            <Loader />
          ) : (
            <>
              {results?.length > 0 && (
                <>
                  <Facilities facilities={results[0].Key} />
                  <StationParking parkingInfo={results[0].Key} />
                </>
              )}
            </>
          )}
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <Sidebar latitude={station.lat} longitude={station.lon} id={`SB_${stationId}`} />
        </div>
      </div>
    </div>
  );
};

export default StationInfo;
