import Icon from 'components/shared/Icon/Icon';

const StationParking = ({ parkingInfo }: { parkingInfo: any }) => {
  const { Parking } = parkingInfo.InterChange;
  if (Parking) {
    return (
      <div className="wmnds-facilities wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
        <h3 className="wmnds-facilities__title">{Parking[0].Name}</h3>
        <p className="wmnds-p-t-xsm">
          Owned by <strong>{Parking[0].Operator}</strong>
        </p>
        <ul className="wmnds-facilities__list">
          <li className="wmnds-facilities__list-item">
            <Icon iconName="facilities-taxi-rank" className="wmnds-facilities__icon" />
            Spaces: {Parking[0].Spaces}
          </li>
        </ul>
        {Parking[0].Operator === 'Network West Midlands' && (
          <>
            <div className="wmnds-inset-text wmnds-m-b-lg">
              Parking is available on a first come, first served basis
            </div>
            <p>
              West Midlands Combined Authority operates a considerate parking policy to ensure all
              sites are accessible and used in the most appropriate way.
            </p>
            <p className="wmnds-m-b-none">
              Find information on how{' '}
              <a
                href="https://www.tfwm.org.uk/plan-your-journey/ways-to-travel/park-and-ride/"
                target="_blank"
                rel="noreferrer"
              >
                Park and Ride
              </a>{' '}
              works.
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default StationParking;
