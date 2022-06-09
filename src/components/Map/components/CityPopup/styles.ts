import styled from 'styled-components';

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
