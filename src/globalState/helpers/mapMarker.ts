import busMarker from 'assets/svgs/map/map-marker-bus.svg';
import tramMarker from 'assets/svgs/map/map-marker-metro.svg';
import trainMarker from 'assets/svgs/map/map-marker-rail.svg';
import pinMarker from 'assets/svgs/map/map-marker.svg';

const mapMarker = (mode?: string) => {
  switch (mode) {
    case 'bus':
    case 'bus-stop':
      return busMarker;
    case 'metro':
    case 'tram':
    case 'tram-stop':
      return tramMarker;
    case 'train':
    case 'rail':
    case 'rail-station':
      return trainMarker;
    default:
      return pinMarker;
  }
};

export default mapMarker;
