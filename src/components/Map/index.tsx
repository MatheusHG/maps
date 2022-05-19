/* eslint-disable camelcase */
import { memo, useEffect, useState } from 'react';
import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';

import { PropsViewport } from '@contexts/FilterContext';

import { useFilterContext } from '@hooks/useFilterContext';

import { Schools } from './components/Schools';

const MAP_TOKEN =
  'pk.eyJ1IjoicGlsYWIiLCJhIjoiY2wweTQwMzZ3MGU4eTNjazF1Z290bmljcyJ9.ihIhhD4xNC2xtGCgn9uoVw';

export function Map() {
  const { schools, location } = useFilterContext();

  const [viewport, setViewport] = useState<PropsViewport>({
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
  useEffect(() => {
    setViewport((prevState) => ({
      ...prevState,
      initialViewState: {
        ...prevState.initialViewState,
        ...location,
      },
    }));
  }, [location]);

  const MapComponent = memo(() => (
    <ReactMapGl
      // onZoom={handleZoom}
      mapboxAccessToken={MAP_TOKEN}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <GeolocateControl position="top-right" />
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />
      <ScaleControl position="bottom-right" />

      <Schools schools={schools} />
    </ReactMapGl>
  ));

  return <MapComponent />;
}
