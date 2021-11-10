/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStationContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
import useTrainOperatorAPI from './customHooks/useTrainOperatorAPI';

const operatorInfo = [
  { name: 'Avanti West Coast', website: 'https://www.avantiwestcoast.co.uk/' },
  { name: 'Chiltern Railways', website: 'http://www.chilternrailways.co.uk/' },
  { name: 'CrossCountry', text: 'Cross Country', website: 'http://www.crosscountrytrains.co.uk/' },
  { name: 'London Northwestern Railway', website: 'https://www.londonnorthwesternrailway.co.uk/' },
  { name: 'Transport for Wales', website: 'https://tfwrail.wales/' },
  {
    name: 'West Midlands Trains',
    text: 'West Midlands Railway',
    website: 'https://www.westmidlandsrailway.co.uk/',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Operator = ({ name }: { name: string }) => {
  const operator = operatorInfo.find((op) => op.name === name);
  return (
    <a href={operator?.website} target="_blank" rel="noreferrer">
      {operator?.text ? operator?.text : operator?.name}
    </a>
  );
};

const TrainResult = () => {
  const [{ stations }] = useStationContext();
  const { from, to } = stations;
  const { loading, results } = useTrainOperatorAPI();
  const operatorArray = results.map((result: any, i: number) => {
    const punctuation = i + 1 < results.length;
    const separator = i + 1 === results.length - 1 ? ' and ' : ', ';
    return (
      <>
        <Operator key={result} name={result} />
        {punctuation && separator}
      </>
    );
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="wmnds-inset-text">
          {results.length > 0 && (
            <p>
              {operatorArray} run trains from or between {from?.name} and {to?.name}. Visit their
              website to view timetables.
            </p>
          )}
          <p className="wmnds-m-b-none">
            If you do not know which of these train companies you travel with, you’ll need to{' '}
            <a href="https://journeyplanner.tfwm.org.uk/">plan a journey</a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainResult;
