import { ICities, IStates } from '@services/City';

// eslint-disable-next-line no-shadow
export enum VALUE_TYPE {
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  SLIDER = 'slider',
}

interface CommumValue {
  type: VALUE_TYPE;
}

export interface SelectValue extends CommumValue {
  // eslint-disable-next-line no-use-before-define

  value: string;
}

export interface RangeItemProps {
  gt: number;
  lt: number;
}

export interface RangeValue extends CommumValue {
  // eslint-disable-next-line no-use-before-define

  value: RangeItemProps;
}

export interface CheckboxItemProps {
  id: string | number;
  name: string;
}

export interface CheckboxValue extends CommumValue {
  value: CheckboxItemProps[];
}

export type InFilterValues = RangeItemProps | string | CheckboxItemProps[];

export interface FilterValues {
  codigo_uf: SelectValue;
  municipio: SelectValue;
  dependencia: CheckboxValue;
  localizacao: CheckboxValue;
  etapas: CheckboxValue;
  porte: CheckboxValue;
  atendimento: CheckboxValue;
  caracteristica: CheckboxValue;
  adesao: CheckboxValue;
  '2019_ideb_1_5': RangeValue;
  '2019_ideb_6_9': RangeValue;
  '2019_ideb_em': RangeValue;
}

export interface CommumProps {
  title: string;
  column: keyof FilterValues;
  isLocked?: boolean;
  isAdmin?: boolean;
}

export interface SelectProps extends CommumProps {
  items: ICities[] | IStates[];
  labelProp: string | number;
  small?: boolean;
  placeholder?: string;
  shouldForceUpdate?: boolean;
  hasNoBox?: boolean;
  dependencyColumn?: keyof FilterValues;
}

export interface CheckboxProps extends CommumProps {
  title: string;
  items: CheckboxItemProps[];
}

export interface RangeProps extends CommumProps {
  max?: number;
  min?: number;
  label: string;
}

export interface MultipleRangeProps {
  title: string;
  max: number;
  min: number;
  items: RangeProps[];
  isLocked?: boolean;
  isAdmin?: boolean;
}

export interface MultipleSelectsProps {
  title: string;
  items: SelectProps[];
  isLocked?: boolean;
  isAdmin?: boolean;
}

export interface Filters {
  selects: SelectProps[];
  multipleSelects: MultipleSelectsProps[];
  checkboxes: CheckboxProps[];
  sliders: RangeProps[];
  multipleSliders: MultipleRangeProps[];
}
