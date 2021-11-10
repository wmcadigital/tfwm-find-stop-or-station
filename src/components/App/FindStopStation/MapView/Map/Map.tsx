// Using https://developers.arcgis.com/javascript/latest/api-reference/ and ESRI JS API
import { useRef } from 'react';
import Loader from 'components/shared/Loader/Loader';
import s from './Map.module.scss';
import './Map.scss';
// Import custom hooks for map functionality
import useCreateMapView from './customHooks/useCreateMapView';
import useUpdateLocationLayer from './customHooks/useUpdateLocationLayer';
import useCreateStopsLayer from './customHooks/useCreateStopsLayer';
import useUpdateStopsLayer from './customHooks/useUpdateStopsLayer';
import usePointerEvents from './customHooks/usePointerEvents';

const Map = () => {
  // MAP SETUP
  const mapContainerRef = useRef<any>();
  const { isLoading, viewState } = useCreateMapView(mapContainerRef);
  useUpdateLocationLayer(viewState);
  const { isStopsLayerCreated } = useCreateStopsLayer(viewState);
  useUpdateStopsLayer(isStopsLayerCreated, viewState);
  usePointerEvents(viewState, isStopsLayerCreated);

  return (
    <div className={`${s.mapView}`}>
      <div
        id="bus-areas-map"
        className={`${s.mapContainer} webmap busAreas-esri-map`}
        ref={mapContainerRef}
        title="Bus areas map"
      />
      {isLoading && (
        <div className={s.loader}>
          <Loader size="small" text="Loading map" />
        </div>
      )}
    </div>
  );
};

export default Map;
