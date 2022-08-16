import Lottie from 'react-lottie';
import { ThemeProvider } from 'styled-components';

import { FilterProvider } from '@contexts/FilterContext';

import { Map } from '@components/Map';
// eslint-disable-next-line import-helpers/order-imports
import { SideBar } from '@components/Sidebar';

import './App.css';

import { theme } from './assets';
import Loading from './components/Loading';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <FilterProvider>
        <Loading />
        <Map />
        <SideBar />
      </FilterProvider>
    </ThemeProvider>
  );
}
