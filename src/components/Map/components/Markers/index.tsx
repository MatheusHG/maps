import QueryString from 'qs';
import { Dispatch, SetStateAction, useState } from 'react';

import FiltersService from '@services/Filters';

import { CityPopup } from '../CityPopup';
import { Marker, SchoolProps, CityProps } from '../Marker';
import { SchoolPopup } from '../SchoolPopup';

interface Props {
  values: SchoolProps[] | CityProps[];
  query: 'school' | 'cities';
}

export function Markers(props: Props) {
  const access = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const isAdmin = (Object.keys(access)[0] === 'admin') as boolean;

  const { values, query } = props;
  const [popupInfo, setPopupInfo] = useState<SchoolProps | CityProps | null>(
    null,
  );

  function clearPopupInfo() {
    setPopupInfo(null);
  }

  async function getResume(value: CityProps | SchoolProps) {
    const response = isAdmin
      ? await FiltersService.getStateResumePrivate(value?.uf, value?.municipio)
      : await FiltersService.getStateResumePublic(value?.uf, value?.municipio);

    setPopupInfo({
      ...response,
      latitude: value.latitude,
      longitude: value.longitude,
      municipio: value.municipio,
    });
  }

  function getOnClick(value: CityProps | SchoolProps) {
    return query === 'school' ? setPopupInfo(value) : getResume(value);
  }

  return (
    <>
      {values?.map((value) => (
        <Marker
          value={value}
          onClick={() => getOnClick(value)}
          color={query === 'school' ? '#0064ad' : '#0064ad'}
        />
      ))}
      {query === 'school' ? (
        <SchoolPopup
          popupInfo={popupInfo as SchoolProps}
          onClose={clearPopupInfo}
        />
      ) : (
        <CityPopup popupInfo={popupInfo} onClose={clearPopupInfo} />
      )}
    </>
  );
}
