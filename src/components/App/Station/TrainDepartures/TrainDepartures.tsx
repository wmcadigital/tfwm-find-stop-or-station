import React, { useState } from 'react';
import { useStationContext } from 'globalState';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';

const TrainDepartures = () => {
  const [tabs, setTabs] = useState<string>('departures');
  const [{ stationDepartures }] = useStationContext();
  const getTimeDiff = (a: string, b: string) => {
    const times = [a.split(':'), b.split(':')];
    const mins = times
      .map((time) => Number(time[0]) * 60 + Number(time[1]))
      .sort((x: number, y: number) => y - x);
    return mins[0] - mins[1];
  };
  return (
    <div className="wmnds-live-departures-train wmnds-m-b-lg">
      <div className="wmnds-live-departures-tabs">
        <input
          className="wmnds-live-departures-tabs__input wmnds-screenreaders-only"
          type="radio"
          value="departures"
          name="trainTabs"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTabs(e.target.value)}
          id="live-departures"
          aria-label="Live departures"
          checked={tabs === 'departures'}
        />
        <label className="wmnds-live-departures-tabs__label" htmlFor="live-departures">
          <span className="wmnds-h3 wmnds-m-none">Live departures</span>
        </label>
        <input
          className="wmnds-live-departures-tabs__input wmnds-screenreaders-only"
          type="radio"
          value="arrivals"
          name="trainTabs"
          id="live-arrivals"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTabs(e.target.value)}
          aria-label="Live arrivals"
          checked={tabs === 'arrivals'}
        />
        <label className="wmnds-live-departures-tabs__label" htmlFor="live-arrivals">
          <span className="wmnds-h3 wmnds-m-none">Live arrivals</span>
        </label>
        <div className="wmnds-live-departures wmnds-live-departures-tabs__departures">
          <div className="wmnds-col-1 wmnds-col-md-2-3">
            <p className="wmnds-h4 wmnds-m-t-none wmnds-m-b-md">
              Enter your destination to filter departures
            </p>
            <AutoComplete
              name="trainLiveDepartures"
              placeholder="Search"
              onUpdate={() => console.log('updated')}
            />
          </div>
          <hr className="wmnds-hide-mobile" />
          <div className="wmnds-grid wmnds-m-b-md">
            <div className="wmnds-col-1 wmnds-col-md-1-2" />
            <hr className="wmnds-col-1 wmnds-hide-desktop" />
            <div className="wmnds-col-1 wmnds-col-md-1-2">
              <p className="wmnds-text-align-right wmnds-m-b-none">
                Last updated {stationDepartures.updatedAt}
              </p>
            </div>
          </div>
          <table
            className="wmnds-table wmnds-live-departures__train-timetable"
            style={{ tableLayout: 'auto' }}
          >
            <caption className="wmnds-table__caption wmnds-screenreaders-only">
              Live departures
            </caption>
            <thead>
              <tr>
                <th scope="col">Train</th>
                <th scope="col">Platform</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {stationDepartures.departures.length > 0 ? (
                <>
                  {stationDepartures.departures.map((departure: any) => (
                    <tr key={departure.serviceId}>
                      <th scope="row" data-header="Train">
                        <strong>{departure.destinationName}</strong>
                        <span>{departure.operator}</span>
                      </th>
                      <td data-header="Platform">{departure.platform}</td>
                      <td data-header="Time">
                        {departure.estimatedTime === 'Cancelled' ||
                        departure.estimatedTime === 'Delayed' ? (
                          <>
                            {departure.scheduledTime}
                            <strong className="wmnds-live-departures__train-timetable-status">
                              {departure.estimatedTime}
                            </strong>
                          </>
                        ) : (
                          <>
                            {departure.scheduledTime}
                            {departure.estimatedTime !== 'On time' && (
                              <>
                                <strong className="wmnds-live-departures__train-timetable-status">
                                  {getTimeDiff(departure.scheduledTime, departure.estimatedTime)}{' '}
                                  mins late
                                </strong>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>There are currently no departures from this station to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="wmnds-live-departures wmnds-live-departures-tabs__arrivals">
          <p className="wmnds-text-align-right wmnds-m-b-md">
            Last updated {stationDepartures.updatedAt}
          </p>
          <table
            className="wmnds-table wmnds-live-departures__train-timetable wmnds-live-departures__train-timetable--responsive"
            style={{ tableLayout: 'auto' }}
          >
            <caption className="wmnds-table__caption wmnds-screenreaders-only">
              Live arrivals
            </caption>
            <thead>
              <tr>
                <th scope="col">Train</th>
                <th scope="col">Platform</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {stationDepartures.arrivals.length > 0 ? (
                <>
                  {stationDepartures.arrivals.map((arrival: any) => (
                    <tr key={arrival.serviceId}>
                      <th scope="row" data-header="Train">
                        <strong>{arrival.originName}</strong>
                        <span>{arrival.operator}</span>
                      </th>
                      <td data-header="Platform">{arrival.platform}</td>
                      <td data-header="Time">
                        {arrival.estimatedTime === 'Cancelled' ? (
                          <strong className="wmnds-live-departures__train-timetable-status">
                            {arrival.estimatedTime}
                          </strong>
                        ) : (
                          <>
                            {arrival.scheduledTime}
                            {arrival.estimatedTime !== 'On time' && (
                              <>
                                <strong className="wmnds-live-departures__train-timetable-status">
                                  {getTimeDiff(arrival.scheduledTime, arrival.estimatedTime)} mins
                                  late
                                </strong>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>There are currently no departures from this station to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainDepartures;
