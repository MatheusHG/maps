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
          <span>Quant. Esc. Municipal</span>
          <p>{popupInfo?.Municipal || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Quant. Esc. Estadual</span>
          <p>{popupInfo?.Estadual || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Quant. Esc. Federal</span>
          <p>{popupInfo?.Federal || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Localização Rural</span>
          <p>{popupInfo?.Rural || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Localização Urbana</span>
          <p>{popupInfo?.Urbana || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Etapa EF</span>
          <p>{popupInfo?.EF || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Etapas EF, EJA</span>
          <p>{popupInfo?.['EF, EJA'] || 'Sem informação'}</p>
        </InfoPopupContainer>
        {/*
        <InfoPopupContainer>
          <span>Etapas EI, EF, EJA</span>
          <p>{popupInfo?.['EI, EF, EJA'] || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        <InfoPopupContainer>
          <span>Etapas EF,EM</span>
          <p>{popupInfo?.['EF,EM'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Etapas EI</span>
          <p>{popupInfo?.EI || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Etapas EI, EF</span>
          <p>{popupInfo?.['EI, EF'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        {/* <InfoPopupContainer>
          <span>Etapa EM</span>
          <p>{popupInfo?.EM || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        {/* <InfoPopupContainer>
          <span>Etapas EM,EP</span>
          <p>{popupInfo?.['EM,EP'] || 'Sem informação'}</p>
        </InfoPopupContainer> */}

        <InfoPopupContainer>
          <span>Demais Combinações</span>
          <p>{popupInfo?.['Demais combina'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Capacidade 50 matrículas</span>
          <p>{popupInfo['Capacidade de 50'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Capacidade 200 matrículas</span>
          <p>{popupInfo?.['Capacidade de 200'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Capacidade 600 matrículas</span>
          <p>{popupInfo?.['Capacidade de 600'] || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Capacidade 1.000 matrículas</span>
          <p>{popupInfo?.['Capacidade de 1.000'] || 'Sem informação'}</p>
        </InfoPopupContainer>
      </PopupContainer>
    </Popup>
  );
}
