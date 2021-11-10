import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useStopContext } from 'globalState';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useDepartureRouteAPI = () => {
  const [results, setResults] = useState<any>();
  const [fetchTime, setFetchTime] = useState<string>('');
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState<IError | null>(null); // Placeholder to set error messaging
  const [{ stopAtcoCode, selectedLine }] = useStopContext();

  // Reference variables
  const mounted = useRef<any>();
  const source = useRef<any>();
  const apiTimeout = useRef<any>();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const handleApiResponse = useCallback((response) => {
    if (response?.data) {
      setResults(response.data);
    } else {
      setErrorInfo({
        // Update error message
        title: 'We are experiencing technical issues.',
        message: 'Departure route not found',
      });
    }
    clearApiTimeout();
    setLoading(false);
  }, []);

  const handleApiError = (error: any) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(error),
    });
    setResults([]); // Reset the results
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAPIResults = useCallback(
    (time: string, dayCode: number) => {
      source.current = axios.CancelToken.source();
      mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
      const { REACT_APP_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      setFetchTime(time);
      startApiTimeout();
      const options = {
        headers: {
          'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
        },
        cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
      };

      axios
        .get(
          `https://journeyplanner.networkwestmidlands.com/api/TimetableStopApi/GetStopsFromTimetableDeparture/${stopAtcoCode}/0/${selectedLine.id}/${dayCode}/${time}/${selectedLine.routes[0].operatorCode}`,
          options
        )
        .then((res) => mounted.current && handleApiResponse(res))
        .catch(handleApiError);
    },
    [handleApiResponse, startApiTimeout, stopAtcoCode, selectedLine]
  );

  useEffect(() => {
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, []);

  return { loading, errorInfo, results, getAPIResults, fetchTime };
};

export default useDepartureRouteAPI;
