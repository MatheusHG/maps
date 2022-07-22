import { ReactChild, useState } from 'react';

import {
  BlockBox,
  Button,
  Container,
  Content,
  Filters,
  Label,
  Options,
  ButtonAdesao,
} from './styles';

interface BoxProps {
  label: string;
  children: ReactChild;
  isLocked?: boolean;
  isAdmin?: boolean;
}

export function Box(props: BoxProps) {
  const { children, label, isLocked, isAdmin } = props;
  const [large, setLarge] = useState<boolean>(false);

  function handleSize() {
    setLarge((prev: boolean) => !prev);
  }

  return (
    <Container>
      <Content>
        <Label>{label}</Label>
        {!isLocked && (
          <Button onClick={handleSize}>{large ? 'menos' : 'mais'}</Button>
        )}
      </Content>
      {large && <Filters>{children}</Filters>}
      {isLocked && <BlockBox />}
    </Container>
  );
}
