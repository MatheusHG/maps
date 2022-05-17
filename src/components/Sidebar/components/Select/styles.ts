import styled from 'styled-components';

type SelectElementProps = {
  small?: boolean;
};

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const SelectElement = styled.select<SelectElementProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  ${({ small }) =>
    small &&
    `
    width: 25%;
  `}

  color: gray;
  font-size: 14px;

  border: 1px solid #d1d5db;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;

  padding: 0.9rem 2rem;
  background: transparent url('src/assets/images/seta.png') 95.5% 50% no-repeat;
  font-size: 1.4rem;
  outline: transparent;
  cursor: ${({ disabled }) => (disabled ? 'normal' : 'pointer')};
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px 5rem;
  }
`;
