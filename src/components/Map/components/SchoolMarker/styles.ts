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

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 42rem;
  overflow-x: hidden;
  overflow-y: scroll;

  img {
    object-fit: cover;
  }

  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    padding: 12px 0 4px 0;
  }
`;

export const InfoPopupContainer = styled.div`
  padding: 8px 4px;

  span {
    color: #6b7280;
  }
`;
