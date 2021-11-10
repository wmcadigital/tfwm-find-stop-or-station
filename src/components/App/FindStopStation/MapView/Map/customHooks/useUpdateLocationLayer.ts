/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import { useGlobalContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useUpdateLocationLayer = (view: any) => {
  const map = view !== null && view?.map;
  const locationLayer = view?.map?.findLayerById('locationLayer');

  const [{ location, searchRadius }] = useGlobalContext();

  const updateLocationLayer = useCallback(async () => {
    try {
      if (!location) {
        locationLayer.removeAll();
        return;
      }
      const [Circle, Graphic] = await loadModules(['esri/geometry/Circle', 'esri/Graphic']);

      const circleGeometry = new Circle({
        center: [location.location.x, location.location.y],
        geodesic: true,
        numberOfPoints: 100,
        radius: searchRadius,
        radiusUnit: 'miles',
      });

      const circleGraphic = new Graphic({
        geometry: circleGeometry,
        symbol: {
          type: 'simple-fill',
          style: 'solid',
          color: [157, 91, 175, 0.2],
          outline: {
            style: 'none',
          },
        },
      });

      const pinMarker = new Graphic({
        geometry: {
          type: 'point',
          longitude: location.location.x,
          latitude: location.location.y,
          spatialreference: {
            wkid: 4326,
          },
        },
        symbol: {
          type: 'picture-marker',
          url: mapMarker(),
          width: 24,
          height: 24,
        },
      });

      locationLayer.removeAll();
      locationLayer.addMany([circleGraphic, pinMarker]);
      view.goTo(circleGraphic);

      map.reorder(locationLayer, 0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [location, view, map, searchRadius, locationLayer]);

  useEffect(() => {
    if (!map || !locationLayer) return;
    updateLocationLayer();
  }, [locationLayer, updateLocationLayer, map]);
};

export default useUpdateLocationLayer;
