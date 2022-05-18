/* eslint-disable camelcase */
import { memo, useState } from 'react';
import ReactMapGl, { ViewStateChangeEvent } from 'react-map-gl';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolMarker } from './components/SchoolMarker';

const MAP_TOKEN =
  'pk.eyJ1IjoicGlsYWIiLCJhIjoiY2wweTQwMzZ3MGU4eTNjazF1Z290bmljcyJ9.ihIhhD4xNC2xtGCgn9uoVw';

export function Map() {
  const { schools, viewport } = useFilterContext();
  // const [showName, setShowName] = useState<boolean>(false);

  /* function handleZoom(event: ViewStateChangeEvent) {
    if (event.viewState.zoom > 15) {
      setShowName(true);
    } else {
      setShowName(false);
    }
  } */

  const MapComponent = memo(() => (
    <ReactMapGl
      // onZoom={handleZoom}
      mapboxAccessToken={MAP_TOKEN}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {schools?.map((school) => {
        return <SchoolMarker school={school} />;
      })}
    </ReactMapGl>
  ));

  return <MapComponent />;
}
