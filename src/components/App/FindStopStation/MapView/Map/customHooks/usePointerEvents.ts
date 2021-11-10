/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { useEffect, useState, useCallback } from 'react';
import { useStopStationContext } from 'globalState';

const usePointerEvents = (view: any, isStopsLayerCreated: boolean) => {
  const [areEventsAdded, setAreEventsAdded] = useState(false);
  const [, stopStationDispatch] = useStopStationContext();

  const getClickedFeature = useCallback(
    async (hitTestResponse) => {
      const clickedIcons = hitTestResponse.results.filter((result: any) => {
        return result.graphic?.sourceLayer?.id === 'stopsLayer';
      });
      if (!clickedIcons.length) return null;

      const clickedFeatureOID = clickedIcons[0]?.graphic?.attributes?.oid;
      if (!clickedFeatureOID) return null;

      const stopsLayer = view.map.findLayerById('stopsLayer');
      const query = stopsLayer.createQuery();
      query.where = `oid = ${clickedFeatureOID}`;
      const queryResult = await stopsLayer.queryFeatures(query);

      const clickedFeature = queryResult?.features[0];
      if (!clickedFeature) return null;

      return clickedFeature;
    },
    [view]
  );

  const selectStopStation = useCallback(
    (stopStationId) => {
      stopStationDispatch({
        type: 'UPDATE_SELECTED_STOP',
        payload: stopStationId,
      });
    },
    [stopStationDispatch]
  );

  const setSelectedItem = useCallback(
    async (event) => {
      try {
        const response = await view.hitTest(event.screenPoint);
        const feature = await getClickedFeature(response);
        if (feature) selectStopStation(feature.attributes.id);
      } catch (error) {
        console.log('setSelectedItem error:', error);
      }
    },
    [view, getClickedFeature, selectStopStation]
  );

  const usePointerCursor = useCallback(
    async (event) => {
      const stopsLayer = view.map.findLayerById('stopsLayer');
      const options = { include: stopsLayer };

      try {
        const { results } = await view.hitTest(event, options);
        if (results && results.length) {
          view.root.style.cursor = 'pointer';
        } else {
          view.root.style.cursor = null;
        }
      } catch (error) {
        console.log('usePointerCursor error:', error);
      }
    },
    [view]
  );

  const addPointerEvents = useCallback(() => {
    view.on('click', setSelectedItem);
    view.on('pointer-move', usePointerCursor);
    setAreEventsAdded(true);
  }, [setSelectedItem, usePointerCursor, view]);

  useEffect(() => {
    if (view === null || !view?.map) return;
    if (areEventsAdded || !isStopsLayerCreated) return;
    addPointerEvents();
  });
};

export default usePointerEvents;
