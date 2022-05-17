import { FilterProvider } from '@contexts/FilterContext';

import { Map } from '@components/Map';

import { SideBar } from '@components/Sidebar';
import { ThemeProvider } from 'styled-components';

import './App.css';
import { theme } from './assets';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <FilterProvider>
        <Map />
        <SideBar />
      </FilterProvider>
    </ThemeProvider>
  );
}
