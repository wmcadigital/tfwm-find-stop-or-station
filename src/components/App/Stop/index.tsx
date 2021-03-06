import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStopContext } from 'globalState';
import useDisruptionsAPI from 'components/App/customHooks/useDisruptionsAPI';

// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import Loader from 'components/shared/Loader/Loader';
import ErrorPage from 'components/shared/ErrorPage/ErrorPage';
import useStopAPI from './customHooks/useStopAPI';
import StopInfo from './StopInfo/StopInfo';

const Stop = () => {
  const [mounted, setMounted] = useState(false);
  const { atcoCode } = useParams<{ atcoCode: string }>();
  const stopPoint = useStopAPI(`/Stop/v2/Point/${atcoCode}`, 'UPDATE_STOP_POINT');
  const departures = useStopAPI(`/Stop/v2/Departures/${atcoCode}`, 'UPDATE_STOP_DEPARTURES');
  useDisruptionsAPI(`/Disruption/v2`);
  const [{ stopPointData, stopDepartures }, stopDispatch] = useStopContext();

  useEffect(() => {
    const apiInterval = setInterval(departures.getAPIResults, 60000);
    if (!mounted) {
      setMounted(true);
    }
    return () => {
      clearInterval(apiInterval);
    };
  }, [mounted, departures.getAPIResults]);

  useEffect(() => {
    if (!mounted) {
      stopDispatch({ type: 'UPDATE_STOP_DEPARTURES', payload: [] });
    }
  }, [mounted, stopDispatch]);

  useEffect(() => {
    stopDispatch({ type: 'UPDATE_ATCOCODE', payload: atcoCode });
  }, [stopDispatch, atcoCode]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {stopPoint.loading || (!departures.results && departures.loading) ? (
        <div className="wmnds-p-lg">
          <Loader text="Finding stop" />
        </div>
      ) : (
        <>
          {stopPoint.errorInfo ? (
            <ErrorPage />
          ) : (
            <>{stopPointData && stopDepartures && <StopInfo />}</>
          )}
        </>
      )}
    </div>
  );
};

export default Stop;
