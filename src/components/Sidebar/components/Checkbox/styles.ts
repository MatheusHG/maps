import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 3rem 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  & + & {
    margin-top: 2rem;
  }
  /* margin-bottom: 2rem; */
`;

export const Test = styled.div.attrs(({ isAdmin }: any) => ({
  isAdmin,
}))`
  background-color: ${({ isAdmin }) => !isAdmin && '#94949457'};
  z-index: 999;
  /* opacity: ${({ isAdmin }) => !isAdmin && '0.4'}; */
  padding: ${({ isAdmin }) => !isAdmin && '5px'};
  position: relative;
  border-radius: 4px;
`;

export const ButtonTest = styled.a.attrs(({ isAdmin }: any) => ({
  isAdmin,
}))`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

export const CheckBox = styled.input.attrs(({ type, value }) => ({
  value,
  type: 'checkbox',
}))`
  position: relative;
  cursor: pointer;
  cursor: ${({ disabled }) => disabled && 'no-drop'};

  :before {
    content: '';
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    top: -1px;
    left: -1px;
    /* background: #ffffff; */
    /* gray/300 */
    background: #e9e9e9;

    border: 1px solid #d1d5db;
    box-sizing: border-box;
    border-radius: 4px;
  }

  :checked:after {
    content: '';
    display: block;
    width: 5px;
    height: 10px;
    border: solid white;

    border: ${({ theme }) => `solid ${theme.colors.primary}`};

    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 4px;
    left: 8px;
  }
`;

export const Content = styled.div`
  /* display: flex; */
  /* height: 2.4rem; */
  /* gap: 1.4rem; */
  /* align-items: flex-end; */
  position: relative;

  + div {
    margin-top: 1.4rem;
    margin-bottom: 1rem;
  }
`;

export const Label = styled.p`
  font-size: 1.4rem;
  position: absolute;
  left: 10%;
  top: 22%;
  color: ${({ theme }) => theme.colors.label};
`;
