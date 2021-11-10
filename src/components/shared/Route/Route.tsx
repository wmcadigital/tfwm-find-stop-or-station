import { Link } from 'react-router-dom';

const Route = ({ route }: { route: any[] }) => {
  return (
    <div className="wmnds-p-md wmnds-p-l-lg wmnds-p-r-lg wmnds-bg-white">
      <ul className="wmnds-timetable__route">
        {route.map((stop) => (
          <li key={`${stop.Id}_${stop.ArrivalDeparture}`} className="wmnds-timetable__route-item">
            <Link to={`/stop/${stop.NaPTAN}`}>{stop.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Route;
