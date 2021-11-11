/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';
import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = ({ isTram }: { isTram?: boolean }) => {
  const [{ selectedLine, stopDepartures, stopDisruptions, stopDisruptionsState }] =
    useStopContext();
  const [lineDepartures, setLineDepartures] = useState<any>([]);

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
          {stopDisruptionsState.isLoading ? (
            <div className="wmnds-p-lg">
              <Loader text="Checking for disruptions" size="small" />
            </div>
          ) : (
            <>
              {stopDisruptionsState.errorInfo ? (
                <Message
                  type="error"
                  title={stopDisruptionsState.errorInfo.title}
                  message={stopDisruptionsState.errorInfo.message}
                />
              ) : (
                <>
                  {selectedLine?.hasDisruptions ||
                    (isTram &&
                      stopDisruptions?.filter((disruption: any) => disruption.mode === 'tram') && (
                        <ServiceDisruptions mode={isTram ? 'metro' : 'bus'} />
                      ))}
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
