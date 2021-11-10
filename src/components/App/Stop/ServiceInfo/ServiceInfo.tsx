import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = ({ isTram }: { isTram?: boolean }) => {
  const [{ selectedLine, stopDepartures, stopDisruptions }] = useStopContext();
  const [lineDepartures, setLineDepartures] = useState<any>([]);

  useEffect(() => {
    if (!isTram) {
      setLineDepartures(
        stopDepartures.departures.filter((dep: any) => dep.line.id === selectedLine.id).slice(0, 5)
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
          {selectedLine?.hasDisruptions ||
            (stopDisruptions?.filter((disruption: any) => disruption.mode === 'tram') && (
              <ServiceDisruptions mode={isTram ? 'metro' : 'bus'} />
            ))}
          <ServiceTimetable />
        </>
      )}
    </>
  );
};

export default ServiceInfo;
