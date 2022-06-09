import { useState } from 'react';

import FiltersService from '@services/Filters';

import { CityPopup } from '../CityPopup';
import { SchoolMarker, SchoolProps, CityProps } from '../SchoolMarker';
import { SchoolPopup } from '../SchoolPopup';

interface Props {
  values: SchoolProps[] | CityProps[];
  query: string;
}

export function Schools(props: Props) {
  const { values, query } = props;
  const [popupInfo, setPopupInfo] = useState<SchoolProps | CityProps | null>(
    null,
  );

  function clearPopupInfo() {
    setPopupInfo(null);
  }

  async function getResume(value: CityProps | SchoolProps) {
    const response = await FiltersService.getStateResume(
      value?.uf,
      value?.municipio,
    );

    setPopupInfo(response);
  }

  function getOnClick(value: CityProps | SchoolProps) {
    return query === 'school' ? setPopupInfo(value) : getResume(value);
  }
  console.log(popupInfo);
  return (
    <>
      {values?.map((value) => {
        return (
          <SchoolMarker
            value={value}
            onClick={() => getOnClick(value)}
            color={query === 'school' ? '#0064ad' : '#0064ad'}
          />
        );
      })}
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
