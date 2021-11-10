import { useStopContext } from 'globalState';
import StopServices from './StopServices';

const AllStopDepartures = () => {
  const [{ stopPointData, stopDepartures }] = useStopContext();
  const { stopPoint } = stopPointData;
  const { departures, updatedAt } = stopDepartures;
  const { lines } = stopPoint;
  return (
    <div className="wmnds-m-b-lg">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between wmnds-m-b-md">
        <div className="wmnds-col-2-3">
          <h3>Real time departures</h3>
        </div>
        <div className="wmnds-col-auto">Last updated {updatedAt}</div>
      </div>
      <StopServices lines={lines} departures={departures} />
    </div>
  );
};

export default AllStopDepartures;
