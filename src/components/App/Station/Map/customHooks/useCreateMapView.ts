/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import mapMarker from 'globalState/helpers/mapMarker';
import { useStationContext } from 'globalState';

const useCreateMapView = (mapContainerRef: any) => {
  const [viewState, setViewState] = useState<any>();
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [{ stationPoint }] = useStationContext();

  const createMapView = useCallback(async () => {
    try {
      setDefaultOptions({ css: true }); // Load esri css by default
      const [
        Map,
        MapView,
        Basemap,
        VectorTileLayer,
        Graphic,
        GraphicsLayer,
        FeatureLayer,
        watchUtils,
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/FeatureLayer',
        'esri/core/watchUtils',
      ]);

      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            id: 'wmca-basemap',
            portalItem: {
              // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
              id: '53f165a8863c4d40ba017042e248355e',
            },
          }),
        ],
      });

      const view = new MapView({
        container: mapContainerRef.current,
        map: new Map({ basemap }),
        center: [stationPoint.data[0].lon, stationPoint.data[0].lat],
        constraints: {
          snapToZoom: true,
        },
      });

      const stations = stationPoint.data;

      const stationGraphics = stations.map((station: any) => {
        return new Graphic({
          attributes: {
            name: station.name,
          },
          geometry: {
            type: 'point',
            longitude: station.lon,
            latitude: station.lat,
            spatialreference: {
              wkid: 4326,
            },
          },
        });
      });

      const stationsLayer = new FeatureLayer({
        id: 'stationsMapView',
        title: 'Stops nearby',
        source: stationGraphics,
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
        ],
        renderer: {
          type: 'simple',
          symbol: {
            type: 'picture-marker',
            url: mapMarker('train'),
            width: 24,
            height: 24,
          },
        },
      });

      const popup = {
        featureCount: 0,
        actions: [
          {
            title: '{name}',
            id: 'add-station',
            image: mapMarker('train'),
            className: 'esri-add-stop',
          },
        ],
      };
      stationsLayer.popupTemplate = popup;

      view.goTo({
        zoom: 15,
      });
      view.map.add(stationsLayer);

      // Move ui elements into the right position
      view.ui.move(['zoom'], 'top-right');
      view.ui.move(['attribution'], 'bottom');
      view.whenLayerView(stationsLayer).then((layerView: any) => {
        watchUtils.whenFalse(layerView, 'updating', () => {
          setIsLoading(false);
        });
      });
      setViewState(view);
      setIsCreated(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [mapContainerRef, stationPoint]);

  useEffect(() => {
    if (!isCreated) {
      createMapView();
    }

    return () => {
      if (!viewState) return;
      viewState!.destroy();
    };
  }, [createMapView, isCreated, viewState]);

  return { viewState, isLoading };
};

export default useCreateMapView;
