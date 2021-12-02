import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import Message from 'components/shared/Message/Message';
import Loader from 'components/shared/Loader/Loader';
import Icon from 'components/shared/Icon/Icon';
import TimetableTime from './TimetableTime';
import useStopAPI from '../../customHooks/useStopAPI';
import useDepartureRouteAPI from '../../customHooks/useDepartureRouteAPI';

const ServiceTimetable = () => {
  const [{ selectedLine, stopAtcoCode }] = useStopContext();
  const [dayCode, setDayCode] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeMustUpdate, setTimeMustUpdate] = useState(false);
  const { loading, results } = useStopAPI(
    `/Stop/v2/LineTimetable/${stopAtcoCode}/${selectedLine.id}/${selectedLine.routes[0].operatorCode}/${dayCode}`
  );
  const departureRoute = useDepartureRouteAPI();

  useEffect(() => {
    if (timeMustUpdate && departureRoute.results) {
      setSelectedTime(departureRoute.fetchTime);
      setTimeMustUpdate(false);
    }
  }, [timeMustUpdate, departureRoute]);

  const handleOpen = (time: string) => {
    departureRoute.getAPIResults(time, dayCode);
    setTimeMustUpdate(true);
  };

  return (
    <div className="wmnds-m-b-lg">
      <h3>Timetable</h3>
      <div className="wmnds-p-lg wmnds-bg-white">
        <p className="wmnds-h4 wmnds-m-b-md wmnds-m-t-none">{selectedLine.routes[0].routeName}</p>
        <div className="wmnds-warning-text ">
          <Icon iconName="general-info" className="wmnds-warning-text__icon" />
          This is the latest timetable (last updated 2 July 2021)
        </div>
        <p className="wmnds-h4 wmnds-m-b-md">Select day of the week</p>
        <div className="wmnds-col-1-2 wmnds-col-sm-auto">
          <div className="wmnds-grid wmnds-grid--spacing-sm-3-md">
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Monday to Friday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
                onClick={() => setDayCode(0)}
                isActive={dayCode === 0}
              />
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Saturday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
                onClick={() => setDayCode(2)}
                isActive={dayCode === 2}
              />
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-auto">
              <Button
                text="Sunday"
                btnClass="wmnds-btn--secondary wmnds-col-1 wmnds-col-sm-auto wmnds-m-b-xsm"
                onClick={() => setDayCode(3)}
                isActive={dayCode === 3}
              />
            </div>
          </div>
        </div>
        <h4>Select a departure time</h4>
        <p>Show the route from this stop at the departure time</p>
        <div className="wmnds-timetable">
          {loading ? (
            <div className="wmnds-p-lg wmnds-col-1">
              <Loader />
            </div>
          ) : (
            <>
              {results?.departures && results?.departures.length ? (
                <>
                  {results?.departures.map((time: any) => (
                    <TimetableTime
                      key={time.departureTime}
                      time={time.departureTime}
                      isOpen={selectedTime === time.departureTime}
                      handleOpen={() => handleOpen(time.departureTime)}
                      handleClose={() => setSelectedTime(null)}
                      isFetching={
                        departureRoute.loading && departureRoute.fetchTime === time.departureTime
                      }
                      stops={departureRoute?.results?.Stop}
                    />
                  ))}
                </>
              ) : (
                <Message
                  type="error"
                  title="There is a problem"
                  message="We are currently unable to show departure routes from this stop."
                />
              )}
            </>
          )}
        </div>
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-t-md">
          <div className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-m-b-md">
            <div className="wmnds-file-download">
              <Icon iconName="general-file" className="wmnds-file-download__icon" />
              <div className="wmnds-file-download__desc">
                <a
                  href="#0"
                  title="link title"
                  target="_self"
                  className="wmnds-link wmnds-file-download__link"
                  download="file_name.pdf"
                >
                  Download ‘Full Timetable’ (PDF)
                </a>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-3">
            {/*
              Need to find a way to generate a link to the timetable page
              <Button btnClass="wmnds-btn--primary wmnds-col-1" text="View full route" />
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTimetable;
