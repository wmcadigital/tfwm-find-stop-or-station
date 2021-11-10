import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStationContext } from 'globalState';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import Loader from 'components/shared/Loader/Loader';
import StationInfo from './StationInfo/StationInfo';
import useStopAPI from './customHooks/useStationAPI';

const Stop = () => {
  const [mounted, setMounted] = useState(false);
  const { id } = useParams<{ id: string }>();
  const stationData = useStopAPI(`/Rail/V2/station/${id}`, 'UPDATE_STATION_POINT');
  const departures = useStopAPI(
    `/Rail/V1/departuresandarrivals/${id}`,
    'UPDATE_STATION_DEPARTURES'
  );
  const [{ stationPoint, stationDepartures }, stationDispatch] = useStationContext();

  useEffect(() => {
    const apiInterval = setInterval(departures.getAPIResults, 30000);
    if (!mounted) {
      setMounted(true);
    }
    return () => {
      clearInterval(apiInterval);
    };
  }, [mounted, departures.getAPIResults]);

  useEffect(() => {
    stationDispatch({ type: 'UPDATE_STATION_ID', payload: id });
  }, [stationDispatch, id]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {stationData.loading || (!departures.results && departures.loading) ? (
        <Loader />
      ) : (
        <>{stationPoint && stationDepartures && <StationInfo />}</>
      )}
    </div>
  );
};

export default Stop;
