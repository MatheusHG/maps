import api from '@services/api';

import {
  CheckboxItemProps,
  FilterValues,
  RangeItemProps,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { removeSpecialChars } from '@utils/dataFunctions';

import { CityProps, SchoolProps } from '@components/Map/components/Marker';

import { IFilterService } from './types';
import { translate } from './utils/makesure';

class FiltersService implements IFilterService {
  generateQueryString(filterValues: FilterValues): string {
    const queryString = Object.keys(filterValues).map((key) => {
      const column = key as keyof FilterValues;

      if (filterValues[column].type === VALUE_TYPE.SELECT) {
        return `filter[${column}]=${removeSpecialChars(
          filterValues[column].value as string,
        )}&`;
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

  async getCities(ufCode: string): Promise<CityProps[]> {
    const { data } = await api.get(
      `maps/municipio?codigo_uf=${removeSpecialChars(ufCode)}`,
    );
    return data;
  }

  async getStateResumePublic(ufCode: string, cityName: string) {
    const { data } = await api.get(
      `maps/abstract?codigo_uf=${removeSpecialChars(
        ufCode,
      )}&nome_municipio=${removeSpecialChars(cityName)}`,
    );
    return data;
  }

  async getStateResumePrivate(ufCode: string, cityName: string) {
    const { data } = await api.get(
      `maps/abstract/private?codigo_uf=${removeSpecialChars(
        ufCode,
      )}&nome_municipio=${removeSpecialChars(cityName)}`,
    );
    return data;
  }

  async searchByFiltersPublic(queryString: string) {
    const { data } = await api.post<SchoolProps[]>('maps', { queryString });

    return data;
  }

  async searchByFiltersPrivate(queryString: string) {
    const { data } = await api.post<SchoolProps[]>('maps/private', {
      queryString,
    });

    return data;
  }
}
export default new FiltersService();
