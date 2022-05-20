import React, { ChangeEvent } from 'react';

import {
  MultipleSelectsProps,
  SelectProps,
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
      handleForceUpdate();
    }
  }

  if (hasNoBox) {
    return (
      <SelectElement
        disabled={
          dependencyColumn && !filterValues.current[dependencyColumn]?.value
        }
        small={small}
        onChange={handleSelect}
      >
        <option value="">{placeholder}</option>
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
      <SelectElement small={small} onChange={handleSelect}>
        <option value="">{placeholder}</option>
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
  const { items, title } = props;

  return (
    <Box label={title}>
      <Content>
        {items.map((item) => (
          <Select {...item} hasNoBox />
        ))}
      </Content>
    </Box>
  );
}
