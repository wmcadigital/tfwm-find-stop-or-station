import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/shared/Button/Button';
import s from './TimetableTime.module.scss';

const TimetableTime = ({
  time,
  isOpen,
  handleOpen,
  handleClose,
  isFetching,
  stops,
}: {
  time: string;
  isOpen?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  isFetching?: boolean;
  stops?: any[];
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    if (contentRef.current) {
      const setHeight = () => {
        setContentHeight(contentRef.current.offsetHeight);
      };
      setHeight();
      window.addEventListener('resize', setHeight);
    }
  }, [contentRef, stops]);

  return (
    <div className="wmnds-timetable__time">
      <Button
        text={time}
        btnClass={`wmnds-btn--secondary wmnds-timetable__time-toggle ${
          isFetching ? s.isFetching : ''
        }`}
        isActive={isOpen}
        onClick={handleOpen}
        isFetching={isFetching}
      />
      <div className="wmnds-timetable__time-details" style={{ height: `${contentHeight}px` }}>
        <div ref={contentRef} className="wmnds-timetable__time-details-content">
          <Button
            text="Close"
            btnClass="wmnds-btn--link wmnds-timetable__time-close wmnds-is--active"
            iconRight="general-cross"
            onClick={handleClose}
          />
          <ul className="wmnds-timetable__route">
            {stops?.map((stop: any) => (
              <li
                className="wmnds-timetable__route-item"
                key={`${stop.StopTime}_${stop.SequenceNumber}`}
              >
                <strong className="wmnds-timetable__route-item-time">{stop.StopTime}</strong>
                <Link to={`/stop/${stop.TimetableStop.NaPTAN}`}>
                  {stop.TimetableStop.CommonName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimetableTime;
