import api from '@services/api';

import {
  CheckboxItemProps,
  FilterValues,
  RangeItemProps,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { SchoolProps } from '@components/Map/components/SchoolMarker';

import { IFilterService } from './types';
import { translate } from './utils/makesure';

class FiltersService implements IFilterService {
  generateQueryString(filterValues: FilterValues): string {
    const queryString = Object.keys(filterValues).map((key) => {
      const column = key as keyof FilterValues;

      if (filterValues[column].type === VALUE_TYPE.SELECT) {
        return `filter[${column}]=${filterValues[column].value}&`;
      }

      if (filterValues[column].type === VALUE_TYPE.SLIDER) {
        const value = filterValues[column].value as RangeItemProps;
        return `filter[${column}][lt]=${value.gt}&filter[${column}][gt]=${value.lt}&`;
      }
      if (filterValues[column].type === VALUE_TYPE.CHECKBOX) {
        const values = filterValues[column].value as CheckboxItemProps[];
        return values
          .map((checkbox) => `filter[${column}][in]=${checkbox.id}&`)
          .join('');
      }

      return '';
    });
    const queryStr = queryString.join('');
    const queryStringFormatted = `${queryStr.slice(0, queryStr.length - 1)}`;
    return queryStringFormatted;
  }

  generateSQL(queryString: string) {
    const sql = translate({
      query: queryString,
      format: 'sql',
      tableName: 'escolas',
    });
    return sql;
  }

  async getAllFilters() {
    const { data } = await api.get('maps/filters');
    return data;
  }

  async getCities(ufCode: string) {
    const { data } = await api.get(`maps/municipio?codigo_uf=${ufCode}`);
    return data;
  }

  async getStateResume(ufCode: string, cityName: string) {
    const { data } = await api.get(
      `maps/abstract?codigo_uf=${ufCode}&nome_municipio=${cityName}`,
    );
    return data;
  }

  async searchByFilters(queryString: string) {
    const { data } = await api.post<SchoolProps[]>('maps', { queryString });

    return data;
  }
}
export default new FiltersService();
