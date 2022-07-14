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

export const InfoPopupContainer = styled.div.attrs(({ inputDisable }: any) => ({
  inputDisable,
}))`
  display: flex;
  flex-direction: column;
  padding: 8px 4px;

  span {
    color: #6b7280;
  }

  input {
    :nth-child(1) {
      margin-top: 12px;
      border: 1px solid #dadcdf;
      padding: 2px;
    }
  }

  input,
  select {
    ${({ inputDisable }: any) =>
      inputDisable
        ? `
          border: 1px solid #DADCDF;
          padding: 2px;
        `
        : `
          border: none;
          background: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-indent: 1px;
          text-overflow: '';
    `}
  }
`;

export const ButtonEdit = styled.button`
  cursor: pointer;
  padding: 6px;
  border: solid 1px #0064ad;
  border-radius: 16px;
  background-color: #3e8ac1;
  position: absolute;
  bottom: 16px;
  right: 20px;
`;
