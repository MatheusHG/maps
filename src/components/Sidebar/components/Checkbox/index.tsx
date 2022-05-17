/* eslint-disable react/jsx-no-useless-fragment */
import { ChangeEvent } from 'react';

import {
  CheckboxItemProps,
  CheckboxProps,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Box } from '../Box';
import { CheckBox, Content, Label } from './styles';

export function Checkbox(props: CheckboxProps) {
  const { title, items, column } = props;

  const { filterValues, onChangeFilterValue } = useFilterContext();

  function handleChecked(
    event: ChangeEvent<HTMLInputElement>,
    id: string | number,
    name: string,
  ) {
    let checkedValues = [];

    const values =
      (filterValues?.current?.[column]?.id as CheckboxItemProps[]) || [];

    if (!event.target.checked) {
      checkedValues = values.filter((checkbox) => checkbox.id !== id);
    } else {
      checkedValues = [...values, { id, name }];
    }

    onChangeFilterValue(column, checkedValues, VALUE_TYPE.CHECKBOX);
  }

  return (
    <Box label={title}>
      <>
        {items?.map(({ id, name, ...rest }) => (
          <Content key={id}>
            <CheckBox
              value={id}
              onChange={(event) => handleChecked(event, id, name)}
              {...rest}
            />
            <Label>{name}</Label>
          </Content>
        ))}
      </>
    </Box>
  );
}
