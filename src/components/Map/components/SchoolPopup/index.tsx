import React from 'react';
import { Popup } from 'react-map-gl';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolProps } from '../SchoolMarker';
import { InfoPopupContainer, PopupContainer } from './styles';

type IdebValues = '2019_ideb_1_5' | '2019_ideb_6_9' | '2019_ideb_em';

interface Props {
  popupInfo: SchoolProps | null;
  setPopupInfo: React.Dispatch<React.SetStateAction<SchoolProps | null>>;
}

export function SchoolPopup(props: Props) {
  const { popupInfo, setPopupInfo } = props;
  const { allFilters } = useFilterContext();

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

  function renderMaxIdeb() {
    const formatIdeb = (ideb: string) => {
      return ideb ? Number(ideb.replace(',', '.')) : 0;
    };

    const getMaxIdeb = () => {
      const idebsLabels = [
        '2019_ideb_1_5',
        '2019_ideb_6_9',
        '2019_ideb_em',
      ] as IdebValues[];

      const idebs = idebsLabels.map((ideb) => formatIdeb(popupInfo![ideb]));

      const maxIdeb = Math.max.apply(null, idebs);
      const maxIdebLabel =
        idebsLabels[idebs.findIndex((ideb) => maxIdeb === ideb)];

      return { maxIdeb, maxIdebLabel };
    };

    const ideb = getMaxIdeb();

    return (
      <InfoPopupContainer>
        <span>{ideb.maxIdebLabel}</span>
        <p>{ideb.maxIdeb}</p>
      </InfoPopupContainer>
    );
  }

  if (!popupInfo) {
    return null;
  }

  return (
    <Popup
      onClose={() => setPopupInfo(null)}
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude as number}
    >
      <PopupContainer>
        <img
          src="https://user-images.githubusercontent.com/56003521/165186523-9a2207a9-db8e-4a56-9679-270a78e70e0a.png"
          alt="schoolImage"
        />

        <h2>{popupInfo.escola || 'Sem informação'}</h2>

        {renderMaxIdeb()}

        <InfoPopupContainer>
          <span>Evidência auditável</span>
          <p>{popupInfo.evid_audit || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Custo total</span>
          {formatCurrency(Number(popupInfo.custo))}
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Nível de serviço</span>
          <p>{popupInfo.nivel_serv_comparado || 'Sem informação'}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Localização</span>
          <p>{allFilters?.localizacao[popupInfo.localizacao - 1]?.name}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Etapas e Modalidade</span>
          <p>{allFilters?.etapas[popupInfo.etapas - 1]?.name}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Porte de Matrícula</span>
          <p>{allFilters?.porte[popupInfo.porte - 1]?.name}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Restrição de Atendimentoa</span>
          <p>{allFilters?.atendimento[popupInfo.atendimento - 1]?.name}</p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Localidade Diferenciada</span>
          <p>
            {allFilters?.caracteristica[popupInfo.caracteristica - 1]?.name}
          </p>
        </InfoPopupContainer>

        <InfoPopupContainer>
          <span>Adesão</span>
          <p>{allFilters?.adesao[popupInfo.adesao - 1]?.name}</p>
        </InfoPopupContainer>
      </PopupContainer>
    </Popup>
  );
}
