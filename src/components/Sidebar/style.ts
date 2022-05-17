import styled from 'styled-components';

export const Container = styled.div<{ isOpen: boolean }>`
  background-color: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: 0.4s ease-in;

  left: ${({ isOpen }) => (isOpen ? '0' : '-45rem')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0.3')};

  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  min-height: 100vh;

  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Content = styled.div`
  padding: 1rem 2.4rem 3.2rem;
  width: 45rem;
  min-height: calc(100vh - 8.5rem);
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CloseLabel = styled.div<{ isOpen: boolean }>`
  width: 2rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 0 0.5rem 0.5rem 0;
  position: absolute;
  top: ${({ isOpen }) => (isOpen ? '1vh' : '50vh')};
  left: ${({ isOpen }) => (isOpen ? '45rem' : '0')};
  transform: ${({ isOpen }) =>
    !isOpen ? 'translateY(-50%)' : 'translateY(0)'};
  transition: 0.4s ease-in;
  cursor: pointer;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: 0.4s ease-in;
    color: #747474;
    transform: rotateY(${({ isOpen }) => (isOpen ? '0' : '180deg')});
  }
`;
