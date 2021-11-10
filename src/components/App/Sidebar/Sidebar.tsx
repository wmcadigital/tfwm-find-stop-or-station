import NearestStops from './NearestStops';
import PlanJourney from './PlanJourney';
import FindStopStation from './FindStopStation';

function Sidebar({ longitude, latitude, id }: { longitude: number; latitude: number; id: string }) {
  return (
    <div>
      <PlanJourney longitude={longitude} latitude={latitude} />
      <NearestStops lon={longitude} lat={latitude} id={`NearestStops_${id}`} />
      <FindStopStation />
    </div>
  );
}

export default Sidebar;
