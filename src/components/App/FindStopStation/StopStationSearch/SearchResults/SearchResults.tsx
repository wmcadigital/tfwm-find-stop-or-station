import { useState, useEffect } from 'react';
import { useStopStationContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import SearchResult from './SearchResult';

const SearchResults = ({ classes }: { classes?: string }) => {
  const [{ stops, searchRadius, selectedModes }] = useStopStationContext();
  const amountLimit = 25;
  const [amountToShow, setAmountToShow] = useState<number>(10);
  const showMoreButton = stops.length > amountLimit && amountToShow < stops.length;

  const showMore = () => {
    setAmountToShow((prev) => prev + amountLimit);
  };

  useEffect(() => {
    setAmountToShow(10);
  }, [stops, searchRadius, selectedModes]);

  return (
    <div>
      {stops.slice(0, amountToShow).map((stop) => (
        <div className={classes}>
          <SearchResult
            stopType={stop.properties.type}
            distance={`${stop.locationDistance?.toFixed(1)} miles away`}
            text={stop.properties.name}
            atcoCode={stop.properties.atcoCode || stop.properties.crs || ''}
            key={stop.properties.atcoCode}
          />
        </div>
      ))}
      {showMoreButton && (
        <Button
          text={`Show ${
            amountLimit <= stops.length - amountToShow ? amountLimit : stops.length - amountToShow
          } more results`}
          btnClass="wmnds-btn--primary"
          onClick={showMore}
        />
      )}
    </div>
  );
};

export default SearchResults;
