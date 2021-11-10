import { useStopContext } from 'globalState';
import s from './StopServices.module.scss';

const StopServices = ({ lines, departures }: { lines: any; departures: any }) => {
  const [{ stopLines }, stopDispatch] = useStopContext();
  const linesWithDepartures = lines.map((line: any) => {
    return {
      ...line,
      departures: departures.filter((departure: any) => departure.line.id === line.id),
    };
  });

  const handleSelect = (value: any) => {
    let routeData: any = value ? { ...value } : null;
    if (value) {
      const routeInfo = stopLines?.services.find((service: any) => service.id === value.id);
      if (routeInfo) {
        const { hasDisruptions, disruptionSeverity, routes } = routeInfo;
        routeData = { ...value, hasDisruptions, disruptionSeverity, routes };
      }
    }
    stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: routeData });
  };

  return (
    <div className="wmnds-live-departures wmnds-live-departures--bus">
      {linesWithDepartures
        .filter((line: any) => line.departures.length)
        .map((line: any) => (
          <div
            key={line.id}
            className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between"
          >
            <div className="wmnds-col-1 wmnds-col-sm-1-2">
              <button
                type="button"
                onClick={() => handleSelect(line)}
                className={`${s.serviceSelect} wmnds-live-departures__service-details`}
              >
                <div className="wmnds-live-departures__service-name">{line.name}</div>
                <div className="wmnds-live-departures__service-description">
                  <strong>{line.departures[0].towards}</strong>
                  <span className="wmnds-live-departures__service-operator">{line.operator}</span>
                </div>
              </button>
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-1-2">
              <div className="wmnds-live-departures__times">
                {line.departures.length > 0 && (
                  <>
                    {line.departures.slice(0, 3).map((service: any) => (
                      <div
                        key={`time_${service.timeToArrival}`}
                        className="wmnds-live-departures__time"
                      >
                        {Math.ceil(service.timeToArrival / 60)} mins
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default StopServices;
