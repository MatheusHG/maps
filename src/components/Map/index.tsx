/* eslint-disable camelcase */
import { useState } from 'react';
import ReactMapGl, { ViewStateChangeEvent } from 'react-map-gl';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolMarker } from './components/SchoolMarker';

const MAP_TOKEN =
  'pk.eyJ1IjoicGlsYWIiLCJhIjoiY2wweTQwMzZ3MGU4eTNjazF1Z290bmljcyJ9.ihIhhD4xNC2xtGCgn9uoVw';

export function Map() {
  const { schools } = useFilterContext();
  const [showName, setShowName] = useState<boolean>(false);
  const [viewport] = useState({
    initialViewState: {
      latitude: -15.8400953,
      longitude: -48.0408881,
      zoom: 10,
    },
    style: {
      width: '100%',
      height: '100vh',
    },
  });

  function handleZoom(event: ViewStateChangeEvent) {
    if (event.viewState.zoom > 15) {
      setShowName(true);
    } else {
      setShowName(false);
    }
  }

  return (
    <div>
      <ReactMapGl
        onZoom={handleZoom}
        mapboxAccessToken={MAP_TOKEN}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {schools?.map((school, index) => {
          return <SchoolMarker showName={showName} school={school} />;
        })}
      </ReactMapGl>
    </div>
  );
}
