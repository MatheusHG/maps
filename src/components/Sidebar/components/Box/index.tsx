import React, { ReactChild, useState } from 'react';

import { Button, Container, Content, Filters, Label } from './styles';

interface BoxProps {
  label: string;
  children: ReactChild;
}

export function Box({ label, children }: BoxProps) {
  const [large, setLarge] = useState<boolean>(false);

  function handleSize() {
    setLarge((prev: boolean) => !prev);
  }

  return (
    <Container>
      <Content>
        <Label>{label}</Label>
        <Button onClick={handleSize}>{large ? 'menos' : 'mais'}</Button>
      </Content>
      {large && <Filters>{children}</Filters>}
    </Container>
  );
}
