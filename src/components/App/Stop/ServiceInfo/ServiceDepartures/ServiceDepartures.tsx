import { useStopContext } from 'globalState';
import useSetFavourites from 'components/App/customHooks/useSetFavourites';
import Button from 'components/shared/Button/Button';

const ServiceDepartures = ({ departures, isTram }: { departures: any[]; isTram?: boolean }) => {
  const [{ selectedLine, stopDepartures }] = useStopContext();
  const { setFavourites, isFavourite } = useSetFavourites(selectedLine, isTram ? 'tram' : 'bus');
  if (!selectedLine.routes) return null;
  return (
    <div className="wmnds-m-b-lg">
      <div className="wmnds-live-departures wmnds-live-departures--service">
        <div className="wmnds-live-departures__service-details wmnds-m-b-md">
          <div className="wmnds-live-departures__service-name">{selectedLine.name}</div>
          <div className="wmnds-live-departures__service-description">
            <div className="wmnds-h3 wmnds-m-none">{selectedLine.routes[0].routeName}</div>
          </div>
        </div>
        <p>
          <strong>{selectedLine.routes[0].operatorName}</strong> runs this service
        </p>
        <Button
          iconLeft={`general-star${isFavourite ? '' : '-empty'}`}
          text={isFavourite ? 'Remove from homepage' : 'Add to homepage'}
          btnClass="wmnds-btn--favourite"
          onClick={() => setFavourites()}
        />
        <hr />
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--spacing-md-2-md">
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-md">Real time departures</div>
            <p className="wmnds-m-b-md">
              See when the next {isTram ? 'tram' : `${selectedLine.name} bus`} leaves this stop
            </p>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <p className="wmnds-live-departures__last-updated">
              Last updated {stopDepartures.updatedAt}
            </p>
          </div>
        </div>
        <div className="wmnds-live-departures__times">
          {departures.length
            ? departures.map((departure: any, i: number) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${departure.timeToArrival}_${i}`}
                  className="wmnds-live-departures__time"
                >
                  {Math.ceil(departure.timeToArrival / 60)} mins
                </div>
              ))
            : 'Currently there are no services'}
        </div>
      </div>
    </div>
  );
};

export default ServiceDepartures;
