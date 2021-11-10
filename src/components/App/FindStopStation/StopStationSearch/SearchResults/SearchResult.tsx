import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon/Icon';
import s from './SearchResult.module.scss';

const SearchResult = ({
  stopType,
  text,
  distance,
  atcoCode,
}: {
  stopType: string;
  text: string;
  distance: string;
  atcoCode: string;
}) => {
  const getMode = (type: string) => {
    switch (type) {
      case 'tram-stop':
        return 'metro';
      case 'rail-station':
        return 'rail';
      default:
        return 'bus';
    }
  };
  const mode = getMode(stopType);

  return (
    <div className={`wmnds-grid wmnds-grid--spacing-2-md ${s.result}`}>
      <div className="wmnds-col-auto wmnds-p-t-xs">
        <Icon iconName={`modes-bg-${mode}`} className={`${s.icon} ${s[mode]}`} />
      </div>
      <div className="wmnds-col-auto">
        <Link to={`/${mode === 'rail' ? 'station' : 'stop'}/${atcoCode}`}>{text}</Link>
        <p className="wmnds-m-none">{distance}</p>
      </div>
    </div>
  );
};

export default SearchResult;
