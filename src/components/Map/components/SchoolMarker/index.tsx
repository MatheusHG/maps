import { useState } from 'react';
import { AiTwotoneCompass } from 'react-icons/ai';
import { Marker, Popup } from 'react-map-gl';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolContainer, PopupContainer, InfoPopupContainer } from './styles';

export interface SchoolProps {
  '2019_ideb_1_5': string;
  '2019_ideb_6_9': string;
  '2019_ideb_em': string;
  adesao: number;
  atendimento: number;
  caracteristica: number;
  codigo_uf: string;
  custo: string;
  dependencia: number;
  escola: string;
  etapas: number;
  evid_audit: string;
  latitude: number;
  localizacao: number;
  longitude: number;
  municipio: string;
  nivel_serv_comparado: string;
  porte: number;
  image: string;
}

interface Props {
  school: SchoolProps;
  // showName: boolean;
}

export function SchoolMarker(props: Props) {
  const { allFilters } = useFilterContext();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { school } = props;

  function formatCurrency(value: number) {
    return (
      <p>
        {value?.toLocaleString('pt-br', {
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

          <h2>{school.escola || 'Sem informação'}</h2>

          <InfoPopupContainer>
            <span>Ideb 2019</span>
            <p>{school['2019_ideb_em'] || 'Sem informação'}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Evidência auditável</span>
            <p>{school.evid_audit || 'Sem informação'}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Custo total</span>
            {formatCurrency(Number(school.custo))}
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Nível de serviço</span>
            <p>{school.nivel_serv_comparado || 'Sem informação'}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Localização</span>
            <p>{allFilters?.localizacao[school.localizacao - 1]?.name}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Etapas e Modalidade</span>
            <p>{allFilters?.etapas[school.etapas - 1]?.name}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Porte de Matrícula</span>
            <p>{allFilters?.porte[school.porte - 1]?.name}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Restrição de Atendimentoa</span>
            <p>{allFilters?.atendimento[school.atendimento - 1]?.name}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Localidade Diferenciada</span>
            <p>{allFilters?.caracteristica[school.caracteristica - 1]?.name}</p>
          </InfoPopupContainer>

          <InfoPopupContainer>
            <span>Adesão</span>
            <p>{allFilters?.adesao[school.adesao - 1]?.name}</p>
          </InfoPopupContainer>
        </PopupContainer>
      </Popup>
    );
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
        </SchoolContainer>
      </Marker>
      {renderPopUp()}
    </>
  );
}
