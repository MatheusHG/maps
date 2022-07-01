import styled from 'styled-components';

export const SchoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  justify-content: center;
  border-radius: 30px;
  background-color: white;

  button {
    background: transparent;
    border: none;
    width: fit-content;
    outline: none;
  }
`;
