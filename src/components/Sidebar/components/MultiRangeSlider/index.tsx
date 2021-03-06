import { useEffect, useState } from 'react';

import {
  MultipleRangeProps,
  RangeProps,
  RangeValue,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Box } from '../Box';
import { ButtonTest, Test } from '../Checkbox/styles';
import {
  ContentFilter,
  InputText,
  Input,
  SliderContainer,
  Label,
  Content,
} from './style';

export function RangeSlider(props: RangeProps) {
  const { label, min, max, column } = props;

  const { onChangeFilterValue, filterValues } = useFilterContext();

  const minDistance = 1;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (Array.isArray(newValue) && newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        onChangeFilterValue(
          column,
          { lt: clamped, gt: clamped + minDistance },
          VALUE_TYPE.SLIDER,
        );
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onChangeFilterValue(
          column,
          { lt: clamped - minDistance, gt: clamped },
          VALUE_TYPE.SLIDER,
        );
      }
    } else {
      const values = newValue as number[];
      onChangeFilterValue(
        column,
        { lt: values[0], gt: values[1] },
        VALUE_TYPE.SLIDER,
      );
    }
  };

  function getValue(opt: 'lt' | 'gt') {
    const filterValue = filterValues[column] as RangeValue;
    if (filterValue?.value[opt]) return filterValue?.value[opt];
    return opt === 'lt' ? 0 : 10;
  }

  return (
    <>
      <Label>{label}</Label>
      <SliderContainer>
        <Input
          min={min}
          max={max}
          getAriaLabel={() => 'Minimum distance shift'}
          value={[getValue('lt'), getValue('gt')]}
          onChange={handleChange}
          disableSwap
        />

        <ContentFilter>
          <InputText
            value={getValue('lt')}
            onChange={({ target }) =>
              onChangeFilterValue(
                column,
                { lt: Number(target.value), gt: getValue('gt') },
                VALUE_TYPE.SLIDER,
              )
            }
          />
          <InputText
            value={getValue('gt')}
            onChange={({ target }) =>
              onChangeFilterValue(
                column,
                { lt: getValue('lt'), gt: Number(target.value) },
                VALUE_TYPE.SLIDER,
              )
            }
          />
        </ContentFilter>
      </SliderContainer>
    </>
  );
}

export function MultiRangeSlider(props: MultipleRangeProps) {
  const { title, min, max, items, isLocked, isAdmin } = props;

  const renderRangeSlider = (rangeSlider: RangeProps) => {
    const finalMin = rangeSlider.min || min;
    const finalMax = rangeSlider.max || max;

    return (
      <RangeSlider
        key={rangeSlider.column}
        label={rangeSlider.label}
        min={finalMin}
        max={finalMax}
        column={rangeSlider.column}
        title=""
      />
    );
  };

  return (
    <Box label={title} isLocked={isLocked}>
      <>
        <Content>{items.map(renderRangeSlider)}</Content>
        {!isAdmin && (
          <Test>
            <ButtonTest href="/google.com">Fa??a a ades??o</ButtonTest>
          </Test>
        )}
      </>
    </Box>
  );
}
