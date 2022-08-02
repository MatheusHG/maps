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
          Precisamos da adesão da Secretaria de Educação ao projeto Sala de
          Gestão e Governança para que possamos compartilhar os dados de custos
          e também algumas informações sobre as escolas do seu municipio.
          <br />
          <br />A adesão ao projeto é <strong>SEM CUSTOS</strong> para o
          município e o objetivo do projeto é melhorar a comunicação das
          secretarias de educação com a <strong>SEB/MEC</strong>.
        </Description>

        <Footer>
          <Link
            href="https://www.projetosalasebunb.com.br/adesao"
            target="_blank"
          >
            Faça sua adesão clicando aqui.
          </Link>
        </Footer>
      </Content>
    </Container>,
    document.getElementById('modal-root') as Element,
  );
};

export default AccessionModal;
