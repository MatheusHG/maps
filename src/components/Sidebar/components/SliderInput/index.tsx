import React, { ChangeEvent, Dispatch } from 'react';

// import { ValuePropsName, ValuesProps } from '@contexts/FilterContext';

import { formatNumber } from '@utils/dataFunctions';

import { Box } from '../Box';
import {
  Container,
  SliderContainer,
  Input,
  Label,
  InputText,
  ContentFilter,
} from './style';

interface SliderProps {
  name: string;
  label: string;
  min: number;
  max: number;
  setValue: Dispatch<React.SetStateAction<string>>;
  value: number;
  shouldFormatLabels?: boolean;
}

export function SliderInput(props: SliderProps) {
  const { name, label, min, max, setValue, value, shouldFormatLabels } = props;

  function handleChangeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue((prevState: any) => ({
      ...prevState,
      [name]: Number(event.target.value),
    }));
  }

  function renderLabel(labelValue: number) {
    if (!shouldFormatLabels) {
      return <Label>{labelValue}+</Label>;
    }

    return <Label>R$ {formatNumber(labelValue)}+</Label>;
  }
  return (
    <Box label={label}>
      {/* <Label>{label}</Label> */}
      <SliderContainer>
        <Input min={min} max={max} onChange={handleChangeValue} value={value} />
        {/* {renderLabel(min)} */}
        {/* {renderLabel(max)} */}
        <ContentFilter>
          <InputText value={value} onChange={handleChangeValue} />
          <InputText value={value} onChange={handleChangeValue} />
        </ContentFilter>
      </SliderContainer>
    </Box>
  );
}
