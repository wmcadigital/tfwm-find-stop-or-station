/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';

const getCookieData = (cookieName: string) => {
  const cookies = document.cookie;
  const hasCookie = cookies.indexOf(cookieName) > -1;
  if (!hasCookie) return undefined;

  const cookieSplit = cookies.split('; ').find((row) => row.startsWith(`${cookieName}=`));
  if (cookieSplit === undefined) return undefined;

  const cookieData = cookieSplit.split('=')[1];

  return JSON.parse(cookieData);
};

const setCookie = (cname: string, cvalue: string, exdays: number): void => {
  const env = process.env.NODE_ENV || 'development';
  const cookieDomain = 'tfwm.org.uk';
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires =
    exdays < 0 ? 'expires=Thu, 01 Jan 1970 00:00:00 UTC' : `expires=${d.toUTCString()}`;
  const domain = env === 'development' ? 'domain=localhost' : `domain=.${cookieDomain}`;
  document.cookie = `${cname}=${cvalue};${expires};${domain};path=/`;
};

const useSetFavourites = (selectedLine: any, mode: string) => {
  const [{ stopAtcoCode, stopPointData }] = useStopContext();
  const { stopPoint } = stopPointData;
  const stopName = `${stopPoint.locality}, ${stopPoint.commonName} (${stopPoint.indicator})`;
  const [stopFavourites, setStopFavourites] = useState<any[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(
    stopFavourites.map((stop: any) => stop.id).includes(selectedLine.id)
  );

  useEffect(() => {
    setIsFavourite(stopFavourites.map((stop: any) => stop.id).includes(selectedLine.id));
    const savedCookies = getCookieData('favStopStation');
    if (!mounted) {
      setMounted(true);
      if (savedCookies && savedCookies[mode]) {
        const savedStopData = savedCookies[mode].find(
          (stop: any) => stop.stopAtcoCode === stopAtcoCode
        );
        if (savedStopData?.lines) {
          setStopFavourites(savedStopData.lines);
        }
      }
    }
  }, [stopFavourites, selectedLine, mode, stopAtcoCode, mounted]);

  useEffect(() => {
    const savedCookies = getCookieData('favStopStation');
    const cookieObj = savedCookies || {};
    let existingStops = [];
    const newStop = [];

    if (cookieObj[mode])
      existingStops = cookieObj[mode].filter((stop: any) => stop.stopAtcoCode !== stopAtcoCode);
    if (stopFavourites?.length) {
      newStop.push({
        stopName,
        stopAtcoCode,
        lines: stopFavourites,
      });
    }

    cookieObj[mode] = [...existingStops, ...newStop];

    setCookie('favStopStation', JSON.stringify(cookieObj), 181);
    if (cookieObj[mode] && !cookieObj[mode]?.length) {
      delete cookieObj[mode];
    }
    // Check if cookie is empty
    if (Object.keys(cookieObj).length === 0) {
      setCookie('favStopStation', '{}', 1);
    }
  }, [stopFavourites, mode, stopName, stopAtcoCode]);

  const setFavourites = () => {
    if (isFavourite) {
      // if is already a favourite then filter it out
      setStopFavourites(stopFavourites.filter((fav: any) => fav.id !== selectedLine.id));
    } else {
      // if is not a favourite, add to the array
      setStopFavourites(() => [
        ...stopFavourites,
        {
          id: selectedLine.id,
          name: selectedLine.name,
          routeName: selectedLine.routes[0].routeName,
        },
      ]);
    }
  };

  return { setFavourites, isFavourite };
};

export default useSetFavourites;
