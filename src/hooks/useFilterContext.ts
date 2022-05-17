import { useContext } from 'react';

import { FilterContext } from '@contexts/FilterContext';

export function useFilterContext() {
  const filterContext = useContext(FilterContext);
  return filterContext;
}
