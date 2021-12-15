import Icon from 'components/shared/Icon/Icon';

const Facilities = ({ facilities }: { facilities: any }) => {
  const { StationFacilities, InterChange, ImpairedAccess } = facilities;
  return (
    <div className="wmnds-facilities wmnds-grid wmnds-grid--spacing-md-2-md wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Station facilities</h3>
        <ul className="wmnds-facilities__list">
          {StationFacilities.SeatedArea.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-seating" className="wmnds-facilities__icon" />
              Seated area
            </li>
          )}
          {StationFacilities.Toilets.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-toilets" className="wmnds-facilities__icon" />
              Toilets
            </li>
          )}
          {StationFacilities.BabyChange.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-baby-changing" className="wmnds-facilities__icon" />
              Baby changing
            </li>
          )}
          {StationFacilities.WiFi.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-wifi" className="wmnds-facilities__icon" />
              Wifi
            </li>
          )}
          {InterChange.CycleStorageAvailability && (
            <>
              <li className="wmnds-facilities__list-item">
                <Icon iconName="modes-isolated-cycle" className="wmnds-facilities__icon" />
                Cycle storage
              </li>
              <li className="wmnds-facilities__list-item">
                <Icon iconName="modes-isolated-cycle" className="wmnds-facilities__icon" />
                Cycle stands: NUM
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Accessibility</h3>
        <ul className="wmnds-facilities__list">
          {ImpairedAccess.StepFreeAccess.Coverage === 'Yes' && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-step-free-access" className="wmnds-facilities__icon" />
              Step-free access
            </li>
          )}
          {ImpairedAccess.RampForTrainAccess.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-ramp" className="wmnds-facilities__icon" />
              Ramp for train access
            </li>
          )}
          {ImpairedAccess.InductionLoop && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-induction-loop" className="wmnds-facilities__icon" />
              Induction loop
            </li>
          )}
          {ImpairedAccess.NationalKeyToilets.Available && (
            <li className="wmnds-facilities__list-item">
              <Icon iconName="facilities-key-scheme" className="wmnds-facilities__icon" />
              National key toilets available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Facilities;
