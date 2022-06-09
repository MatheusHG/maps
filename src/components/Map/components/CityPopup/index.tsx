import React from 'react';
import { Popup } from 'react-map-gl';

import { CityProps, SchoolProps } from '../SchoolMarker';
import { InfoPopupContainer, PopupContainer } from './styles';

interface Props {
  popupInfo: SchoolProps | CityProps | null;
  onClose: () => void;
}

export function CityPopup(props: Props) {
  const { popupInfo, onClose } = props;

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
          <p>Sem informação</p>
        </InfoPopupContainer>
      </PopupContainer>
    </Popup>
  );
}
