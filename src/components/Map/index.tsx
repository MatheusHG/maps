/* eslint-disable camelcase */
import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';

import { useFilterContext } from '@hooks/useFilterContext';

import { Markers } from './components/Markers';

const MAP_TOKEN =
  'pk.eyJ1IjoicGlsYWIiLCJhIjoiY2wweTQwMzZ3MGU4eTNjazF1Z290bmljcyJ9.ihIhhD4xNC2xtGCgn9uoVw';

const initialViewState = {
  latitude: -15.8400953,
  longitude: -48.0408881,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

const style = {
  width: '100%',
  height: '100vh',
};

export function Map() {
  const { schools, mapRef, myLocation, cities } = useFilterContext();

  return (
    <ReactMapGl
      ref={mapRef}
      // onZoom={handleZoom}
      initialViewState={initialViewState}
      style={style}
      mapboxAccessToken={MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {myLocation && <GeolocateControl position="top-right" />}
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />
      <ScaleControl position="bottom-right" />

      <Markers
        values={!cities.length ? schools : cities}
        query={!cities.length ? 'school' : 'cities'}
      />
    </ReactMapGl>
  );
}
