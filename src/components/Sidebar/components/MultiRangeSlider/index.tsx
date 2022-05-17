import { useEffect, useState } from 'react';

import {
  MultipleRangeProps,
  RangeProps,
  VALUE_TYPE,
} from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Box } from '../Box';
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
  const [value, setValue] = useState<number[]>([min || 0, max || 100]);

  const { onChangeFilterValue } = useFilterContext();

  useEffect(() => {
    const [lt, gt] = value;
    onChangeFilterValue(column, { lt, gt }, VALUE_TYPE.SLIDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, column]);

  const minDistance = 1;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (Array.isArray(newValue) && newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <>
      <Label>{label}</Label>
      <SliderContainer>
        <Input
          min={min}
          max={max}
          getAriaLabel={() => 'Minimum distance shift'}
          value={value}
          onChange={handleChange}
          disableSwap
        />

        <ContentFilter>
          <InputText
            value={value[0]}
            onChange={({ target }) =>
              setValue([Number(target.value), value[1]])
            }
          />
          <InputText
            value={value[1]}
            onChange={({ target }) =>
              setValue([value[0], Number(target.value)])
            }
          />
        </ContentFilter>
      </SliderContainer>
    </>
  );
}

export function MultiRangeSlider(props: MultipleRangeProps) {
  const { title, min, max, items } = props;

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
    <Box label={title}>
      <Content>{items.map(renderRangeSlider)}</Content>
    </Box>
  );
}
