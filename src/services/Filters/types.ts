import { FilterValues } from '@contexts/FilterContext/types';

import { SchoolProps } from '@components/Map/components/Marker';

export interface IFilterService {
  generateQueryString(filterValues: FilterValues): string;
  searchByFiltersPublic(queryString: string): Promise<SchoolProps[]>;
  searchByFiltersPrivate(queryString: string): Promise<SchoolProps[]>;
}
