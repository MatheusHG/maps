import styled from 'styled-components';

export const HeaderStyled = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 3.2rem 2.4rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  button {
    background: transparent;
    padding: 0.8rem;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    font-size: 1.8rem;
    letter-spacing: 0.06rem;
    transition: 0.1s ease-in;
    cursor: pointer;

    :hover {
      filter: brightness(0.8);
    }
  }
`;

export const Title = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;

  color: #0064ad;
`;
