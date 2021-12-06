// Using https://developers.arcgis.com/javascript/latest/api-reference/ and ESRI JS API
import { useRef } from 'react';
import Loader from 'components/shared/Loader/Loader';
import { useStationContext } from 'globalState';
import s from './Map.module.scss';
import './Map.scss';
// Import custom hooks for map functionality
import useCreateMapView from './customHooks/useCreateMapView';

const Map = () => {
  // MAP SETUP
  const [{ stationPoint }] = useStationContext();
  const address = `${stationPoint.data[0].address.join(', ')}, ${stationPoint.data[0].postcode}`;
  const mapContainerRef = useRef<any>();
  const { isLoading } = useCreateMapView(mapContainerRef);
  return (
    <>
      <div className="wmnds-screenreaders-only ">{address}</div>
      <div className={`${s.mapView}`}>
        <div
          id="bus-areas-map"
          className={`${s.mapContainer} webmap busAreas-esri-map`}
          ref={mapContainerRef}
          title="Bus areas map"
        />
        {isLoading && (
          <div className={s.loader}>
            <Loader size="small" />
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
