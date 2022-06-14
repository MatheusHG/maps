/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import {
  createContext,
  Dispatch,
  DispatchWithoutAction,
  MutableRefObject,
  ReactNode,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { MapRef } from 'react-map-gl';

import {
  SchoolProps,
  CityProps,
} from '@components/Map/components/SchoolMarker';
import { Checkbox } from '@components/Sidebar/components/Checkbox';
import {
  MultiRangeSlider,
  RangeSlider,
} from '@components/Sidebar/components/MultiRangeSlider';
import { MultiSelect, Select } from '@components/Sidebar/components/Select';

import {
  CheckboxProps,
  Filters,
  FilterValues,
  InFilterValues,
  MultipleRangeProps,
  MultipleSelectsProps,
  RangeProps,
  SelectProps,
  VALUE_TYPE,
} from './types';

export interface PropsViewport {
  initialViewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  style: {
    width: string;
    height: string;
  };
}

interface FiltersMaps {
  dependencia: Object;
  localizacao: Object;
  etapas: Object;
  porte: Object;
  atendimento: Object;
  caracteristica: Object;
  adesao: Object;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom?: number;
}

interface FilterContextProps {
  filterValues: FilterValues;
  schools: SchoolProps[];
  setSchools: (schools: SchoolProps[]) => void;
  cities: CityProps[];
  setCities: (cities: CityProps[]) => void;
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  myLocation: boolean;
  setMyLocation: React.Dispatch<React.SetStateAction<boolean>>;
  allFilters: FiltersMaps | any;
  setAllFilters: Dispatch<SetStateAction<FiltersMaps | undefined>>;
  clearFilters: () => void;
  forceUpdate: boolean;
  onChangeFilterValue(
    filterName: keyof FilterValues,
    value: InFilterValues,
    type: VALUE_TYPE,
  ): void;
  renderFilters(
    filter: Filters,
    filterType: keyof Filters,
  ): JSX.Element[] | null;
  handleForceUpdate: DispatchWithoutAction;
  mapRef: Ref<MapRef> | undefined;
}

interface FilterProviderProps {
  children: ReactNode;
}

const FilterContext = createContext({} as FilterContextProps);

function FilterProvider({ children }: FilterProviderProps) {
  const mapRef = useRef<MapRef>();

  const [forceUpdate, handleForceUpdate] = useReducer((prev) => !prev, false);
  const [schools, setSchools] = useState<SchoolProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [allFilters, setAllFilters] = useState<FiltersMaps>();
  const [location, setLocation] = useState<Location>({} as Location);
  const [myLocation, setMyLocation] = useState<boolean>(true);

  // eslint-disable-next-line prettier/prettier
  const [filterValues, setFilterValues] = useState<FilterValues>(
    {} as FilterValues,
  );

  useEffect(() => {
    const { latitude, longitude, zoom } = location;
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 1000,
      zoom: zoom || 10,
    });
  }, [location]);

  function onChangeFilterValue(
    filterName: keyof FilterValues,
    value: InFilterValues,
    type: VALUE_TYPE,
  ) {
    setFilterValues((prevState) => ({
      ...JSON.parse(JSON.stringify(prevState)),
      [filterName]: {
        value,
        type,
      },
    }));
  }

  function createSelects(selectsObject: SelectProps[]) {
    return selectsObject.map((props) => <Select {...props} />);
  }

  function createMultipleSelects(
    multipleSelectsObject: MultipleSelectsProps[],
  ) {
    return multipleSelectsObject.map((props) => <MultiSelect {...props} />);
  }

  function createCheckboxes(checkboxesObject: CheckboxProps[]) {
    return checkboxesObject.map((props) => <Checkbox {...props} />);
  }

  function createMultipleSliders(multipleSlidersObject: MultipleRangeProps[]) {
    return multipleSlidersObject.map((props) => (
      <MultiRangeSlider {...props} />
    ));
  }

  function createSliders(slidersObject: RangeProps[]) {
    return slidersObject.map((props) => <RangeSlider {...props} />);
  }

  function renderFilters(filter: Filters, filterType: keyof Filters) {
    if (!filter[filterType]) {
      return null;
    }

    switch (filterType) {
      case 'selects':
        return createSelects(filter[filterType]);
      case 'multipleSelects':
        return createMultipleSelects(filter[filterType]);
      case 'checkboxes':
        return createCheckboxes(filter[filterType]);
      case 'multipleSliders':
        return createMultipleSliders(filter[filterType]);
      case 'sliders':
        return createSliders(filter[filterType]);
      default:
        return null;
    }
  }

  function clearFilters() {
    setFilterValues({} as FilterValues);
    handleForceUpdate();
  }

  return (
    <FilterContext.Provider
      value={{
        schools,
        setSchools,
        cities,
        setCities,
        allFilters,
        setAllFilters,
        location,
        setLocation,
        myLocation,
        setMyLocation,
        clearFilters,
        filterValues,
        forceUpdate,
        handleForceUpdate,
        renderFilters,
        onChangeFilterValue,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mapRef: mapRef as any,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
