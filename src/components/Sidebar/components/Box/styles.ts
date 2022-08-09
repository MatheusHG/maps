import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;

  & + & {
    margin-top: 1rem;
  }

  position: relative;
`;

export const BlockBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Filters = styled.div`
  margin: 0.8rem 0;
  position: relative;
`;

export const Label = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  line-height: 2.8rem;
  font-weight: 600;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.placeholder};
  cursor: pointer;
`;
