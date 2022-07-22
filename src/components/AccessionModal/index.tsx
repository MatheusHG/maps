import { FC } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import {
  Link,
  Container,
  Content,
  Description,
  Footer,
  Title,
  Close,
} from './styles';

interface Props {
  isOpen: boolean;
  handleClose(): void;
}

// eslint-disable-next-line react/function-component-definition
const AccessionModal: FC<Props> = (props) => {
  const { isOpen, handleClose } = props;

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Container>
      <Content>
        <Close onClick={handleClose}>
          <AiOutlineCloseCircle />
        </Close>

        <Title>Atenção</Title>

        <Description>
          Para ter acesso a esses dados você deve acessar pelo{' '}
          <Link href="https://www.sicgesp.com.br" target="_blank">
            SICGESP
          </Link>{' '}
          ou o município já deve ter adesão.
        </Description>

        <Footer>
          <Link href="https://google.com" target="_blank">
            Fazer adesão
          </Link>
        </Footer>
      </Content>
    </Container>,
    document.getElementById('modal-root') as Element,
  );
};

export default AccessionModal;
