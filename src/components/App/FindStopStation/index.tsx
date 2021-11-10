import { useState } from 'react';
import Button from 'components/shared/Button/Button';
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import MapView from './MapView/MapView';
import ListView from './ListView/ListView';
import s from './FindStopStation.module.scss';

const FindStopStation = () => {
  const [listView, setListView] = useState(false);
  return (
    <>
      <div className="wmnds-container">
        <div className="wmnds-m-b-md">
          <Breadcrumbs />
        </div>
        <div className={`wmnds-grid wmnds-grid--justify-between ${s.mainHeading}`}>
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <h1>Find a stop or station</h1>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <Button
              text={`${listView ? 'Map view' : 'List view'}`}
              btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-md-auto"
              iconRight={`general-${!listView ? 'list' : 'location-pin'}`}
              onClick={() => setListView(!listView)}
            />
          </div>
        </div>
        <div className="wmnds-grid">
          <div className="wmnds-col-md-2-3">
            <p>
              Select a stop or station to see live departures, disruptions, timetables and nearest
              stops or stations.
            </p>
            <p>
              If you do not know which bus stop, train station or tram station to search for, you’ll
              need to <a href="#0">plan a journey</a>.
            </p>
          </div>
        </div>
      </div>
      {listView ? <ListView /> : <MapView />}
    </>
  );
};

export default FindStopStation;
