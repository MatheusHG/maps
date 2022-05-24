import React, { ChangeEvent } from 'react';

import {
  MultipleSelectsProps,
  SelectProps,
  SelectValue,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Box } from '../Box';
import { Content, SelectElement } from './styles';

export function Select(props: SelectProps) {
  const {
    title,
    labelProp,
    items,
    small,
    placeholder,
    column,
    shouldForceUpdate,
    hasNoBox,
    dependencyColumn,
  } = props;

  const { filterValues, onChangeFilterValue, handleForceUpdate } =
    useFilterContext();

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    onChangeFilterValue(column, event.target.value, VALUE_TYPE.SELECT);
    if (shouldForceUpdate) {
      onChangeFilterValue('municipio', '', VALUE_TYPE.SELECT);
      handleForceUpdate();
    }
  }

  const getValue = () => {
    const filterValue = filterValues[column] as SelectValue;
    return filterValue?.value || 'DEFAULT VALUE';
  };

  if (hasNoBox) {
    return (
      <SelectElement
        disabled={dependencyColumn && !filterValues[dependencyColumn]?.value}
        value={getValue()}
        small={small}
        onChange={handleSelect}
      >
        <option value="DEFAULT VALUE">{placeholder}</option>
        {items?.map((item: any) => (
          <option key={item.id} value={item[labelProp]}>
            {item[labelProp]}
          </option>
        ))}
      </SelectElement>
    );
  }

  return (
    <Box label={title}>
      <SelectElement value={getValue()} small={small} onChange={handleSelect}>
        <option value="DEFAULT VALUE">{placeholder}</option>
        {items?.map((item: any) => (
          <option key={item.id} value={item[labelProp]}>
            {item[labelProp]}
          </option>
        ))}
      </SelectElement>
    </Box>
  );
}

export function MultiSelect(props: MultipleSelectsProps) {
  const { items, title, isLocked } = props;

  return (
    <Box label={title} isLocked={isLocked}>
      <Content>
        {items.map((item) => (
          <Select {...item} hasNoBox />
        ))}
      </Content>
    </Box>
  );
}
