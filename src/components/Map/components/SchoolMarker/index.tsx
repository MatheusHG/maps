import { useState } from 'react';
import { AiTwotoneCompass } from 'react-icons/ai';
import { Marker, Popup } from 'react-map-gl';

import { SchoolContainer, PopupContainer, InfoPopupContainer } from './styles';

export interface SchoolProps {
  latitude: number;
  longitude: string | number;
  ideb_2019: number;
  nivel_servico: number;
  custos: number;
  valor: number;
  nome: string;
  indice: number;
  image: string;
}

interface Props {
  school: SchoolProps;
  showName: boolean;
}

export function SchoolMarker(props: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { school, showName } = props;

  function formatCurrency(value: number) {
    return (
      <p>
        {value.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
    );
  }

  function renderPopUp() {
    if (!isSelected) {
      return null;
    }

    return (
      <Popup latitude={school.latitude} longitude={school.longitude as number}>
        <PopupContainer>
          <img
            src="https://user-images.githubusercontent.com/56003521/165186523-9a2207a9-db8e-4a56-9679-270a78e70e0a.png"
            alt="schoolImage"
          />

          <h2>{school.nome}</h2>

          <InfoPopupContainer>
            <span>Info</span>
            <p>Olá mundo</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Custo total</span>
            {formatCurrency(school.custos)}
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Valor total</span>
            {formatCurrency(school.valor)}
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Nível de serviço</span>
            <p>{school.nivel_servico}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Ideb 2019</span>
            <p>{school.ideb_2019}</p>
          </InfoPopupContainer>
        </PopupContainer>
      </Popup>
    );
  }

  function renderName() {
    if (!showName) {
      return null;
    }

    return <small> {school.nome}</small>;
  }

  return (
    <>
      <Marker
        latitude={school.latitude}
        longitude={school.longitude as unknown as number}
      >
        <SchoolContainer>
          <button
            type="button"
            onClick={(e) => {
              setIsSelected(true);
            }}
          >
            <AiTwotoneCompass size={16} color="#0064ad" />
          </button>
          {renderName()}
        </SchoolContainer>
      </Marker>
      {renderPopUp()}
    </>
  );
}
