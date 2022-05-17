/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import {
  createContext,
  Dispatch,
  DispatchWithoutAction,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useReducer,
  useRef,
  useState,
} from 'react';

import { SchoolProps } from '@components/Map/components/SchoolMarker';
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

interface FilterContextProps {
  filterValues: MutableRefObject<FilterValues>;
  schools: SchoolProps[];
  setSchools: (schools: SchoolProps[]) => void;
  viewport: PropsViewport;
  setViewport: React.Dispatch<React.SetStateAction<PropsViewport>>;
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
}

interface FilterProviderProps {
  children: ReactNode;
}

const FilterContext = createContext({} as FilterContextProps);

function FilterProvider({ children }: FilterProviderProps) {
  const [forceUpdate, handleForceUpdate] = useReducer((prev) => !prev, false);
  const [schools, setSchools] = useState<SchoolProps[]>([]);
  const [allFilters, setAllFilters] = useState<FiltersMaps>();

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

  const filterValues = useRef<FilterValues>({} as FilterValues);

  function onChangeFilterValue(
    filterName: keyof FilterValues,
    value: InFilterValues,
    type: VALUE_TYPE,
  ) {
    filterValues.current = {
      ...JSON.parse(JSON.stringify(filterValues?.current)),
      [filterName]: {
        value,
        type,
      },
    };
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
    filterValues.current = {} as FilterValues;
    handleForceUpdate();
  }

  return (
    <FilterContext.Provider
      value={{
        schools,
        setSchools,
        allFilters,
        setAllFilters,
        viewport,
        setViewport,
        clearFilters,
        filterValues,
        forceUpdate,
        handleForceUpdate,
        renderFilters,
        onChangeFilterValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
