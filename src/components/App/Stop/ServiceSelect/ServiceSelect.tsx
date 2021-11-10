/* eslint-disable prettier/prettier */
import { useEffect, useState, useCallback } from 'react';
import { useStopContext } from 'globalState';
import s from './ServiceSelect.module.scss';

type Line = { id: string; name: string; operator: string };

const ServiceSelect = ({ isTram }: { isTram?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const [{ stopPointData, stopLines, selectedLine }, stopDispatch] = useStopContext();
  const services = stopPointData.stopPoint.lines;

  const getRouteData = useCallback(
    (value: Line | null) => {
      let routeData: any = value ? { ...value } : null;
      if (value) {
        const routeInfo = isTram
          ? stopLines?.metroStopsById.find((service: any) => service.id === value.id)
          : stopLines?.services.find((service: any) => service.id === value.id);
        if (routeInfo) {
          const { hasDisruptions, disruptionSeverity, routes } = routeInfo;
          routeData = { ...value, hasDisruptions, disruptionSeverity, routes };
        } else if (isTram) {
          routeData = {
            ...value,
            routes: [
              {
                operatorCode: 'TMM',
                routeName: 'Birmingham - Wolverhampton',
                operatorName: stopPointData.stopPoint.lines[0].operator,
              },
            ],
          };
        }
      }
      return routeData;
    },
    [isTram, stopLines?.services, stopLines?.metroStopsById, stopPointData.stopPoint.lines]
  );

  useEffect(() => {
    if (services.length === 1 && (stopLines || isTram) && !selectedLine?.routes) {
      stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: getRouteData(services[0]) });
    }
  }, [services, selectedLine, stopLines, stopDispatch, getRouteData, isTram]);

  useEffect(() => {
    if (!mounted) {
      stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: null });
      setMounted(true);
    }
  }, [stopDispatch, mounted]);

  const handleChange = (value: Line | null) => {
    stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: getRouteData(value) });
  };

  if (services.length === 1) {
    return null;
  }

  return (
    <div className="wmnds-col-1 wmnds-col-md-2-3">
      <div className={s.serviceContainer}>
        <p>
          Select a {!isTram ? 'bus' : 'tram'} service to see real time information, timetable and
          travel updates. <br />
          {!isTram && 'Bus services with the same number are run by different bus companies.'}
        </p>
        <div className={s.serviceGrid}>
          <div className={s.serviceBtn}>
            <input
              className="wmnds-screenreaders-only"
              type="radio"
              id="allServices"
              name="serviceSelect"
              value=""
              checked={!selectedLine?.id}
              onChange={() => handleChange(null)}
            />
            <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor="allServices">
              All
            </label>
          </div>
          {services.map((service: any) => (
            <div key={service.id} className={s.serviceBtn}>
              <input
                className="wmnds-screenreaders-only"
                type="radio"
                id={service.id}
                name="serviceSelect"
                value={service.name}
                checked={selectedLine?.id === service.id}
                onChange={() => handleChange(service)}
              />
              <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor={service.id}>
                {service.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelect;
