/* eslint-disable prettier/prettier */
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { IStop } from 'globalState/StopStationContext/types/IStop';
import { useStopStationContext } from 'globalState';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useGetStopsAPI = () => {
  const [results, setResults] = useState<any[]>([]);
  const [{ location, searchRadius, selectedModes, stops }, stopStationDispatch] =
    useStopStationContext();
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState<IError | null>(null); // Placeholder to set error messaging

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

  const handleApiResponse = useCallback(
    (response) => {
      function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
      }

      function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1); // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d / 1.609;
      }

      const stopTypes: string[] = selectedModes.map((mode: string) => {
        switch (mode) {
          case 'rail':
            return 'rail-station';
          case 'metro':
            return 'tram-stop';
          default:
            return 'bus-stop';
        }
      });

      if (response?.data) {
        // filter out car parks and map distance
        const payload = response.data.features
          .filter(
            (stop: IStop) =>
              stop.properties.type !== 'car-park' && stopTypes.includes(stop.properties.type)
          )
          .map((stop: IStop) => ({
            ...stop,
            locationDistance: getDistanceFromLatLon(
              stop.geometry.coordinates![0],
              stop.geometry.coordinates![1],
              location!.location.x,
              location!.location.y
            ),
          }))
          .sort((a: IStop, b: IStop) => (a.locationDistance || 0) - (b.locationDistance || 0));
        stopStationDispatch({ type: 'UPDATE_STOPS', payload });
      } else {
        setErrorInfo({
          // Update error message
          title: 'Please try another location',
          message: 'No west midlands stops or stations were found near to your search area',
        });
      }
      clearApiTimeout();
      setLoading(false);
    },
    [stopStationDispatch, location, selectedModes]
  );

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
  const getAPIResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    const { x: longitude, y: latitude } = location!.location;
    const options = {
      headers: {
        'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
      },
      cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
    };

    axios
      .get(
        `${REACT_APP_API_HOST}/Stop/v2/Nearest/${latitude}/${longitude}/${searchRadius * 1609}`,
        options
      )
      .then((res) => mounted.current && handleApiResponse(res))
      .catch(handleApiError);
  }, [location, searchRadius, handleApiResponse, startApiTimeout]);

  useEffect(() => {
    if (location && searchRadius && selectedModes.length) {
      getAPIResults();
    }
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAPIResults, location, searchRadius, selectedModes]);

  return { loading, errorInfo, results, getAPIResults, stops };
};

export default useGetStopsAPI;
