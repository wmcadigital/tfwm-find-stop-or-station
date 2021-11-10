import { useStopStationContext } from 'globalState';
import StopStationSearch from '../StopStationSearch/StopStationSearch';
import SearchResult from '../StopStationSearch/SearchResults/SearchResult';
import s from './MapView.module.scss';
import Map from './Map/Map';

const SelectedStop = () => {
  const [{ selectedStopId, stops }] = useStopStationContext();
  const selectedStop = stops.find(
    (stop) => stop.properties.atcoCode === selectedStopId || stop.properties.crs === selectedStopId
  );

  if (selectedStop) {
    return (
      <div className={s.results}>
        <SearchResult
          stopType={selectedStop.properties.type}
          distance={`${selectedStop.locationDistance?.toFixed(1)} miles away`}
          text={selectedStop.properties.name}
          atcoCode={selectedStop.properties.atcoCode || selectedStop.properties.crs || ''}
          key={selectedStop.properties.atcoCode}
        />
      </div>
    );
  }
  return null;
};

const HelpMessage = () => {
  const [{ selectedModes, selectedStopId, stops, location }] = useStopStationContext();
  let helpMsg: any = null;
  if (location && selectedModes.length === 0) {
    helpMsg = <>Select modes of transport to view stops and stations near {location.name}</>;
  } else if (!stops.length && location && selectedModes.length) {
    helpMsg = <>No stops or stations were found. Please try increasing the search radius.</>;
  } else if (!selectedStopId && stops.length) {
    helpMsg = <>Select a stop{selectedModes.includes('rail') && ' or station'} on the map</>;
  }
  if (!helpMsg) {
    return null;
  }
  return <div className="wmnds-m-t-lg wmnds-msg-help">{helpMsg}</div>;
};

const MapView = () => {
  return (
    <div className={s.mapViewSection}>
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-1-3">
          <div className="wmnds-p-md wmnds-p-b-lg wmnds-bg-white">
            <StopStationSearch />
            <HelpMessage />
            <SelectedStop />
          </div>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapView;
