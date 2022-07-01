import React, { useEffect, useState } from 'react';
import { Popup } from 'react-map-gl';

import SchoolsService from '@services/Schools';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolProps } from '../Marker';
import { InfoPopupContainer, PopupContainer } from './styles';

type IdebValues = '2019_ideb_1_5' | '2019_ideb_6_9' | '2019_ideb_em';

interface Props {
  popupInfo: SchoolProps | null;
  onClose: () => void;
}

export function SchoolPopup(props: Props) {
  const { popupInfo, onClose } = props;
  const { allFilters } = useFilterContext();
  const [img, setImg] = useState<string>('');

  async function getImage() {
    const imageUrl = await SchoolsService.getSchoolImage({
      codigo_uf: popupInfo?.codigo_uf,
      municipio: popupInfo?.municipio,
      escola: popupInfo?.escola,
    });
    setImg(imageUrl);
  }

  useEffect(() => {
    if (popupInfo) {
      getImage();
    }
  }, [popupInfo]);

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
      onClose={onClose}
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude as number}
    >
      <PopupContainer>
        <img src={img} alt="schoolImage" />

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
