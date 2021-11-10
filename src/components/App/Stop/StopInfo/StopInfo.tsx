import { useStopContext } from 'globalState';

// Components
import Stop from './Stop';

const StopInfo = () => {
  const [{ stopPointData, stopDepartures }] = useStopContext();
  const { stopPoint } = stopPointData;

  let mode = 'bus';
  if (stopPoint.busStopType === 'NaptanMetroPlatform') {
    mode = 'metro';
  }

  return <>{stopDepartures ? <Stop isTram={mode !== 'bus'} /> : 'No results'}</>;
};

export default StopInfo;
