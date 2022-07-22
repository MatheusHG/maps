import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  backdrop-filter: blur(2px);
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: 1px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Close = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  outline: none;
  background-color: transparent;
  transition: 200ms;

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3.2rem 2.4rem;

  background-color: #fff;
  border-radius: 0.8rem;

  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  max-width: 48rem;
`;

export const Title = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

export const Footer = styled.footer`
  margin-top: 2.4rem;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.4rem;
  font-size: 1.2rem;
  font-weight: bold;

  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
