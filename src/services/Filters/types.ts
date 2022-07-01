import { FilterValues } from '@contexts/FilterContext/types';

import { SchoolProps } from '@components/Map/components/Marker';

export interface IFilterService {
  generateQueryString(filterValues: FilterValues): string;
  searchByFilters(queryString: string): Promise<SchoolProps[]>;
}
