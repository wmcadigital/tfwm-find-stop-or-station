const PlanJourney = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  return (
    <div className="wmnds-content-card wmnds-m-b-lg">
      <div className="wmnds-p-md">
        <h2>Plan your journey</h2>
        <div className="wmnds-grid wmnds-grid--spacing-2-md">
          <div className="wmnds-col-1-2">
            <a
              className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-text-align-center"
              href={`https://journeyplanner.networkwestmidlands.com/?origin=${longitude},${latitude}`}
              target="_blank"
              rel="noreferrer"
            >
              From here
            </a>
          </div>
          <div className="wmnds-col-1-2">
            <a
              className="wmnds-btn wmnds-btn--secondary wmnds-col-1 wmnds-text-align-center"
              href={`https://journeyplanner.networkwestmidlands.com/?destination=${longitude},${latitude}`}
              target="_blank"
              rel="noreferrer"
            >
              To here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanJourney;
