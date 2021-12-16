/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useStopContext, useGlobalContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';
import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from '../../ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = ({ isTram }: { isTram?: boolean }) => {
  const [{ selectedLine, stopDepartures }] = useStopContext();
  const [{ disruptions, disruptionsState }] = useGlobalContext();

  const [lineDepartures, setLineDepartures] = useState<any>([]);
  const hasTramDisruption =
    isTram && disruptions?.filter((disruption: any) => disruption.mode === 'tram').length > 0;
  useEffect(() => {
    if (!isTram) {
      setLineDepartures(
        stopDepartures.departures
          .filter((dep: any) => dep.line?.id === selectedLine?.id)
          .slice(0, 5)
      );
    }
  }, [selectedLine, stopDepartures.departures, isTram]);

  return (
    <>
      {selectedLine?.routes && (
        <>
          <ServiceDepartures
            departures={isTram ? stopDepartures.departures.slice(0, 5) : lineDepartures}
            isTram={isTram}
          />
          {disruptionsState.isLoading ? (
            <div className="wmnds-p-lg">
              <Loader text="Checking for disruptions" size="small" />
            </div>
          ) : (
            <>
              {disruptionsState.errorInfo ? (
                <Message
                  type="error"
                  title={disruptionsState.errorInfo.title}
                  message={disruptionsState.errorInfo.message}
                />
              ) : (
                <>
                  {(hasTramDisruption || selectedLine?.hasDisruptions) && (
                    <ServiceDisruptions mode={isTram ? 'metro' : 'bus'} />
                  )}
                </>
              )}
            </>
          )}
          <ServiceTimetable />
        </>
      )}
    </>
  );
};

export default ServiceInfo;
