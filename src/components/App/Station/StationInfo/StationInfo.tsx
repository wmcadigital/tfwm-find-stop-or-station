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
import Map from '../Map/Map';
import railZoneData from '../railZoneData.json';
import useFacilitiesAPI from './useFacilitiesAPI';
import TrainSearch from './TrainSearch/TrainSearch';

const StationParking = ({ parkingInfo }: { parkingInfo: any }) => {
  const { Parking } = parkingInfo.InterChange;
  if (Parking) {
    return (
      <div className="wmnds-facilities wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
        <h3 className="wmnds-facilities__title">{Parking[0].Name}</h3>
        <p className="wmnds-p-t-xsm">
          Owned by <strong>{Parking[0].Operator}</strong>
        </p>
        <ul className="wmnds-facilities__list">
          <li className="wmnds-facilities__list-item">
            <Icon iconName="facilities-taxi-rank" className="wmnds-facilities__icon" />
            Spaces: {Parking[0].Spaces}
          </li>
        </ul>
        {Parking[0].Operator === 'Network West Midlands' && (
          <>
            <div className="wmnds-inset-text wmnds-m-b-lg">
              Parking is available on a first come, first served basis
            </div>
            <p>
              West Midlands Combined Authority operates a considerate parking policy to ensure all
              sites are accessible and used in the most appropriate way.
            </p>
            <p className="wmnds-m-b-none">
              Find information on how{' '}
              <a
                href="https://www.tfwm.org.uk/plan-your-journey/ways-to-travel/park-and-ride/"
                target="_blank"
                rel="noreferrer"
              >
                Park and Ride
              </a>{' '}
              works.
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

const Facilities = ({ facilities }: { facilities: any }) => {
  const { StationFacilities, InterChange, ImpairedAccess } = facilities;
  return (
    <div className="wmnds-facilities wmnds-grid wmnds-grid--spacing-md-2-md wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Station facilities</h3>
        <ul className="wmnds-facilities__list">
          {StationFacilities.SeatedArea.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-seating" className="wmnds-facilities__icon" />
              Seated area
            </li>
          )}
          {StationFacilities.Toilets.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-toilets" className="wmnds-facilities__icon" />
              Toilets
            </li>
          )}
          {StationFacilities.BabyChange.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-baby-changing" className="wmnds-facilities__icon" />
              Baby changing
            </li>
          )}
          {StationFacilities.WiFi.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-wifi" className="wmnds-facilities__icon" />
              Wifi
            </li>
          )}
          {InterChange.CycleStorageAvailability && (
            <>
              <li className="wmnds-facilities__list-item">
                <Icon iconName="modes-isolated-cycle" className="wmnds-facilities__icon" />
                Cycle storage
              </li>
              <li className="wmnds-facilities__list-item">
                <Icon iconName="modes-isolated-cycle" className="wmnds-facilities__icon" />
                Cycle stands: NUM
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Accessibility</h3>
        <ul className="wmnds-facilities__list">
          {ImpairedAccess.StepFreeAccess.Coverage === 'Yes' && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-step-free-access" className="wmnds-facilities__icon" />
              Step-free access
            </li>
          )}
          {ImpairedAccess.RampForTrainAccess.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-ramp" className="wmnds-facilities__icon" />
              Ramp for train access
            </li>
          )}
          {ImpairedAccess.InductionLoop && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-induction-loop" className="wmnds-facilities__icon" />
              Induction loop
            </li>
          )}
          {ImpairedAccess.NationalKeyToilets.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-key-scheme" className="wmnds-facilities__icon" />
              National key toilets available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

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
              {results && (
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
