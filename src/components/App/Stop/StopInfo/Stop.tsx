import { useState } from 'react';
import { useStopContext } from 'globalState';

// Components
import Icon from 'components/shared/Icon/Icon';
import Loader from 'components/shared/Loader/Loader';
import Sidebar from 'components/App/Sidebar/Sidebar';
import s from '../Stop.module.scss';
import AllStopDepartures from '../AllStopDepartures/AllStopDepartures';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import StopInfoHeader from './StopInfoHeader';
import Map from '../Map/Map';

import useStopAPI from '../customHooks/useStopAPI';

const Stop = ({ isTram }: { isTram: boolean }) => {
  const [showMap, setShowMap] = useState(false);
  const [{ stopPointData, selectedLine, stopDepartures, stopAtcoCode }] = useStopContext();
  const { stopPoint } = stopPointData;
  const { departures } = stopDepartures;
  const serviceInfo = useStopAPI(
    isTram
      ? `/Metro/v2/stop/${stopAtcoCode}`
      : `/bus/v1/service/${stopPoint.lines.map((line: any) => line.id).join(',')}`,
    'UPDATE_STOP_LINES'
  );

  return (
    <div>
      {departures && (
        <>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            <div className="wmnds-col-md-2-3">
              <StopInfoHeader showMap={showMap} mapToggle={() => setShowMap(!showMap)}>
                {stopPoint.locality}, {stopPoint.commonName} ({stopPoint.indicator}){' '}
                <Icon
                  className={`${s.modeIcon} ${isTram ? s.metro : s.bus}`}
                  iconName={`modes-isolated-${isTram ? 'metro' : 'bus'}`}
                />
              </StopInfoHeader>
            </div>
          </div>
          {showMap && <Map />}
          <ServiceSelect isTram={isTram} />
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            <div className="wmnds-col-1 wmnds-col-md-2-3">
              {serviceInfo.loading ? (
                <Loader text="Getting service information" />
              ) : (
                <>
                  {!selectedLine && stopPointData.stopPoint.lines.length > 1 ? (
                    <AllStopDepartures />
                  ) : (
                    <>{serviceInfo ? <ServiceInfo isTram={isTram} /> : 'Error'}</>
                  )}
                </>
              )}
            </div>
            <div className="wmnds-col-1 wmnds-col-md-1-3">
              <Sidebar
                latitude={stopPoint.latitude}
                longitude={stopPoint.longitude}
                id={`SB_${stopAtcoCode}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stop;
