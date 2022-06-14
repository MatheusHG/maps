import React from 'react';
import { Popup } from 'react-map-gl';

import { CityProps as ICityProps } from '../Marker';
import { InfoPopupContainer, PopupContainer } from './styles';

type CityProps = Partial<ICityProps> & {
  latitude: number;
  longitude: number;
};

interface Props {
  popupInfo: CityProps | null;
  onClose: () => void;
}

export function CityPopup(props: Props) {
  const { popupInfo, onClose } = props;

  console.log('dados do popup', popupInfo);

  if (!popupInfo) {
    return null;
  }

  return (
    <Popup
      onClose={onClose}
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude}
    >
      <PopupContainer>
        <img
          src="https://user-images.githubusercontent.com/56003521/165186523-9a2207a9-db8e-4a56-9679-270a78e70e0a.png"
          alt="schoolImage"
        />

        <h2>Resumo</h2>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.Municipal || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.Estadual || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.Federal || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.Rural || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.Urbana || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.EF || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['EF, EJA'] || 'Sem informação'}</p>
        </InfoPopupContainer>
        {/*
        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['EI, EF, EJA'] || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['EF,EM'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.EI || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['EI, EF'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        {/* <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.EM || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        {/* <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['EM,EP'] || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo?.['Demais combina'] || 'Sem informação'}</p>
        </InfoPopupContainer>
      </PopupContainer>
    </Popup>
  );
}
