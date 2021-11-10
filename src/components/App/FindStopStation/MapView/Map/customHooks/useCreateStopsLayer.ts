import { useEffect, useState, useCallback } from 'react';
import { loadModules } from 'esri-loader';
import { useStopStationContext } from 'globalState';
import mapMarker from 'globalState/helpers/mapMarker';

const useCreateStopsLayer = (view: any) => {
  const [isStopsLayerCreated, setIsStopsLayerCreated] = useState(false);
  const map = view !== null && view?.map;

  const [{ stops, selectedModes, location }] = useStopStationContext();

  const createStopsLayer = useCallback(async () => {
    try {
      if (stops.length === 0) return;
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

      const placeholder = {
        attributes: {
          name: stops[0].properties.name,
          id: stops[0].properties.atcoCode || stops[0].properties.crs,
          mapIcon: 'bus',
          stopType: stops[0].properties.type,
        },
        geometry: {
          type: 'point',
          longitude: location!.location.x,
          latitude: location!.location.y,
          spatialreference: {
            wkid: 4326,
          },
        },
        symbol: {
          type: 'simple-fill',
          style: 'none',
          outline: {
            style: 'none',
          },
        },
      };

      const stopsLayer = new FeatureLayer({
        id: `stopsLayer`,
        title: 'Nearest stops and stations',
        source: [placeholder], // autocast as a Collection of new Graphic()
        objectIdField: 'oid',
        fields: [
          {
            name: 'oid',
            alias: 'ObjectID',
            type: 'oid',
          },
          {
            name: 'name',
            alias: 'name',
            type: 'string',
          },
          {
            name: 'mapIcon',
            alias: 'mapIcon',
            type: 'string',
          },
          {
            name: 'stop-type',
            alias: 'stop-type',
            type: 'string',
          },
          {
            name: 'id',
            alias: 'id',
            type: 'string',
          },
        ],
        renderer: {
          type: 'unique-value',
          field: 'mapIcon',
          uniqueValueInfos: [
            {
              value: 'bus',
              symbol: {
                type: 'picture-marker',
                url: mapMarker('bus'),
                width: 24,
                height: 24,
              },
            },
            {
              value: 'rail',
              symbol: {
                type: 'picture-marker',
                url: mapMarker('train'),
                width: 24,
                height: 24,
              },
            },
            {
              value: 'metro',
              symbol: {
                type: 'picture-marker',
                url: mapMarker('tram'),
                width: 24,
                height: 24,
              },
            },
          ],
        },
      });

      map.add(stopsLayer);
      setIsStopsLayerCreated(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [stops, location, map]);

  useEffect(() => {
    if (isStopsLayerCreated || !map || selectedModes.length === 0) return;
    createStopsLayer();
  }, [isStopsLayerCreated, createStopsLayer, selectedModes, map]);

  return { isStopsLayerCreated, setIsStopsLayerCreated };
};

export default useCreateStopsLayer;
