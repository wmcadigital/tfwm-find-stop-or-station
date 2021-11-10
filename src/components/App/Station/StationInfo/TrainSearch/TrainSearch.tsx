import { useStationContext } from 'globalState';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';
import TrainResult from './TrainResult/TrainResult';

function TrainSearch() {
  const [{ stations }] = useStationContext();
  return (
    <div className="wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
      <p>
        You can find full train timetables on the train company’s website. To find which train
        company runs your service, enter the stations you’ll travel between.
      </p>
      <div className="wmnds-col-md-2-3 wmnds-m-b">
        <TrainAutoComplete />
      </div>
      {stations.from?.id && stations.to?.id && <TrainResult />}
    </div>
  );
}

export default TrainSearch;
