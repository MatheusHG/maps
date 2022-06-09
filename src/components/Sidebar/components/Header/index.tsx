import { useFilterContext } from '@hooks/useFilterContext';

import { HeaderStyled, Title } from './styles';

interface Props {
  onClick(): void;
  onClear(): void;
}

export function Header(props: Props) {
  const { onClick, onClear } = props;

  const { filterValues } = useFilterContext();

  return (
    <HeaderStyled>
      <Title>Filtros</Title>
      <div>
        <button type="button" onClick={onClear}>
          Limpar
        </button>

        <button type="button" onClick={onClick}>
          Buscar
        </button>
      </div>
    </HeaderStyled>
  );
}
