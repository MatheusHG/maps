import { useState } from 'react';

import { SchoolMarker, SchoolProps } from '../SchoolMarker';
import { SchoolPopup } from '../SchoolPopup';

interface Props {
  schools: SchoolProps[];
}

export function Schools(props: Props) {
  const { schools } = props;
  const [popupInfo, setPopupInfo] = useState<SchoolProps | null>(null);

  return (
    <>
      {schools?.map((school) => {
        return <SchoolMarker school={school} setPopupInfo={setPopupInfo} />;
      })}
      <SchoolPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
    </>
  );
}
