import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import Accordion from 'components/shared/Accordion/Accordion';
import Message from 'components/shared/Message/Message';
import { sanitize } from 'dompurify';
import s from './ServiceDisruptions.module.scss';

const ServiceDisruptions = ({ mode }: { mode?: 'bus' | 'metro' | 'rail' }) => {
  const [{ selectedLine, stopDisruptions }] = useStopContext();
  const [serviceDisruptions, setServiceDisruptions] = useState<any>(null);
  const lineId = selectedLine.id;
  const lineName = selectedLine.name;

  useEffect(() => {
    if (!serviceDisruptions && stopDisruptions?.length) {
      const thisLineDisruptions = stopDisruptions.filter((disruption: any) =>
        disruption.servicesAffected?.find((service: any) => service.id === lineId)
      );
      setServiceDisruptions(thisLineDisruptions);
    }
  }, [serviceDisruptions, stopDisruptions, lineId]);

  return (
    <div className="wmnds-m-b-md wmnds-p-b-md">
      <h3>Disruptions to this service</h3>
      {serviceDisruptions ? (
        <>
          {serviceDisruptions.map((disruption: any) => (
            <div className="wmnds-m-b-md" key={disruption.id}>
              <Accordion
                id={disruption.id}
                summary={
                  <>
                    <DisruptionIndicatorSmall
                      iconLeft={`modes-isolated-${mode}`}
                      className={s.disruptionIndicator}
                      text={lineName}
                      severity={disruption.disruptionSeverity}
                    />
                    <span className="wmnds-col-1">
                      {disruption.title} at <strong>{disruption.subtitle}</strong>
                    </span>
                  </>
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(disruption.description),
                  }}
                />
              </Accordion>
            </div>
          ))}
        </>
      ) : (
        <Message
          type="error"
          title="Please try again later"
          message="Sorry, we are experiencing technical issues."
        />
      )}
    </div>
  );
};

export default ServiceDisruptions;
