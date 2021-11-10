import { useEffect, useState, useRef, useCallback } from 'react';
import { useStationContext } from 'globalState';
import axios from 'axios';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useTimetableAPI = () => {
  const [{ stations }] = useStationContext();
  const [results, setResults] = useState<any>([]);
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
    (responses) => {
      const lines = { from: stations.from?.lines, to: stations.to?.lines };
      const isSameLine = () => {
        let match = false;
        lines.from?.forEach((line) => {
          if (lines.to?.includes(line)) match = true;
        });
        return match;
      };

      if (responses.length) {
        const fromData = [...responses[0].data.arrivals, ...responses[0].data.departures].map(
          (operator) => operator.operator
        );
        const toData = [...responses[1].data.arrivals, ...responses[1].data.departures].map(
          (operator) => operator.operator
        );
        const data = [...fromData, ...toData];

        const getUniqueOperators = () => {
          const uniqueOperators: string[] = [];
          data.forEach((operator) => {
            if (!uniqueOperators.includes(operator)) uniqueOperators.push(operator);
          });
          return uniqueOperators;
        };

        let operators = getUniqueOperators();
        const matchingOperators = operators.filter(
          (op) => fromData.includes(op) && toData.includes(op)
        );

        if (isSameLine()) {
          operators = matchingOperators;
        }

        setResults(operators);
      }
      clearApiTimeout();
      setLoading(false);
    },
    [stations]
  );

  const handleApiError = (errors: any[]) => {
    errors.forEach((error) => {
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
    });
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAPIResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    const options = {
      headers: {
        'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
      },
      cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
    };
    const fromPath = `${REACT_APP_API_HOST}/Rail/V1/departuresandarrivals/${stations.from?.id}`;
    const toPath = `${REACT_APP_API_HOST}/Rail/V1/departuresandarrivals/${stations.to?.id}`;

    const fromReq = axios.get(fromPath, options);
    const toReq = axios.get(toPath, options);

    axios
      .all([fromReq, toReq])
      .then(axios.spread((...responses) => mounted.current && handleApiResponse(responses)))
      .catch(handleApiError);
  }, [handleApiResponse, startApiTimeout, stations]);

  useEffect(() => {
    getAPIResults();
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAPIResults]);

  return { loading, errorInfo, results, getAPIResults };
};

export default useTimetableAPI;
