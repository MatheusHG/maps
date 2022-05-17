import Slider from '@mui/material/Slider';
import styled from 'styled-components';

export const Container = styled.div`
  // height: 11.2rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1.7rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;
export const InputText = styled.input`
  min-width: 10rem;
  height: 4.2rem;
  font-size: 1.6rem;
  padding: 1rem;
  border: 1px solid rgba(209, 213, 219, 1);
  width: 7rem;
  text-align: left;
  border-radius: 2.1rem;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const ContentFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SliderContainer = styled.div`
  // width: 40rem;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // gap: 1rem;
  // padding: 1.7rem 2.5rem;
`;

export const Input = styled(Slider)`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 0.8rem;
  outline: transparent;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 0.8rem;

  span {
    &:nth-child(2) {
      background: #0064ad !important;
      height: 0.8rem !important;
    }

    &:nth-child(3) {
      background: #0064ad !important;
      height: 2.4rem !important;
      width: 2.4rem !important;
    }

    &:nth-child(4) {
      background: #0064ad !important;
      height: 2.4rem !important;
      width: 2.4rem !important;
    }
  }

  :hover {
    opacity: 1;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2.4rem;
    height: 2.4rem;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4285f4;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Label = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  line-height: 2.8rem;
  font-weight: 600;
`;

export const Content = styled.div`
  padding: 0 1rem 0 1rem;
`;
