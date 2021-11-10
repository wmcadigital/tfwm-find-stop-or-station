import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon/Icon';
import useNearestStopsAPI from './useNearestStopsAPI';

function NearestStops({ lat, lon, id }: { lat: number; lon: number; id: string }) {
  const { results } = useNearestStopsAPI(
    `https://journeyplanner.networkwestmidlands.com/API/WebApi/GetNearestStopTrainPoints/${lat}/${lon}`
  );

  return (
    <div className="wmnds-nearest-stop-station wmnds-m-b-lg">
      <div className="wmnds-content-card">
        <div className="wmnds-p-md">
          <h2>Nearest stops or stations</h2>
          {results?.length > 0 && (
            <>
              {results
                .sort((a: any, b: any) => a.Distance - b.Distance)
                .filter((result: any) => result.NaPTAN !== id)
                .slice(0, 4)
                .map((result: any) => {
                  const mode = () => {
                    switch (result.StopType) {
                      case 'NaptanMetroPlatform':
                        return 'metro';
                      case 'NaptanTrainPlatform':
                        return 'rail';
                      default:
                        return 'bus';
                    }
                  };
                  const url = () => {
                    switch (mode()) {
                      case 'rail':
                        return `/station/${result.NaPTAN}`;
                      default:
                        return `/stop/${result.NaPTAN}`;
                    }
                  };
                  return (
                    <div
                      key={`${result.NaPTAN}_${result.Distance}`}
                      className="wmnds-grid wmnds-grid--spacing-2-md wmnds-nearest-stop-station__stop"
                    >
                      <div className="wmnds-col-auto">
                        <Icon
                          iconName={`modes-isolated-${mode()}`}
                          className={`wmnds-nearest-stop-station__icon wmnds-nearest-stop-station__icon--${mode()}`}
                        />
                      </div>
                      <div className="wmnds-col-auto">
                        <div>
                          <Link to={url()}>{result.CommonName}</Link>
                        </div>
                        <span>{result.DistanceTime} minute walk</span>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NearestStops;
