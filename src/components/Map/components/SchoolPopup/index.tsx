/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';
import { Popup } from 'react-map-gl';

import SchoolsService from '@services/Schools';

import { useFilterContext } from '@hooks/useFilterContext';

import { SchoolProps } from '../Marker';
import { ButtonEdit, InfoPopupContainer, PopupContainer } from './styles';

type IdebValues = '2019_ideb_1_5' | '2019_ideb_6_9' | '2019_ideb_em';

interface Props {
  popupInfo: SchoolProps | null;
  onClose: () => void;
}

export function SchoolPopup(props: Props) {
  const { popupInfo, onClose } = props;
  const { allFilters } = useFilterContext();
  const [img, setImg] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    async function getImage() {
      const imageUrl = await SchoolsService.getSchoolImage({
        codigo_uf: popupInfo?.codigo_uf,
        municipio: popupInfo?.municipio,
        escola: popupInfo?.escola,
      });
      setImg(imageUrl);
    }

    if (popupInfo) {
      getImage();
    }
  }, [popupInfo]);

  // function formatCurrency(value: number) {
  //   return (
  //     <p>
  //       {value?.toLocaleString('pt-br', {
  //         style: 'currency',
  //         currency: 'BRL',
  //       })}
  //     </p>
  //   );
  // }

  // formatCurrency(Number(popupInfo.custo));

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

  function handleClose() {
    setIsEdit(false);
    onClose();
  }

  return (
    <Popup
      onClose={handleClose}
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude as number}
    >
      <PopupContainer>
        <img src={img} alt="schoolImage" />

        <InfoPopupContainer>
          {isEdit ? (
            <input value={popupInfo.escola} disabled={!isEdit} />
          ) : (
            <h2>{popupInfo.escola}</h2>
          )}
        </InfoPopupContainer>

        {renderMaxIdeb()}

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Evidência auditável</span>
          <input
            value={popupInfo.evid_audit || 'Sem informação'}
            disabled={!isEdit}
          />
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Custo total</span>
          <input value={Number(popupInfo!.custo)} disabled={!isEdit} />
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Nível de serviço</span>
          <input
            value={popupInfo.nivel_serv_comparado || 'Sem informação'}
            disabled={!isEdit}
          />
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Localização</span>
          <select
            value={allFilters?.localizacao[popupInfo.localizacao - 1]?.name}
            disabled={!isEdit}
          >
            {allFilters?.localizacao.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Etapas e Modalidade</span>
          <select
            value={allFilters?.etapas[popupInfo.etapas - 1]?.name}
            disabled={!isEdit}
          >
            {allFilters?.etapas.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Porte de Matrícula</span>
          <select
            value={allFilters?.porte[popupInfo.porte - 1]?.name}
            disabled={!isEdit}
          >
            {allFilters?.porte.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Restrição de Atendimentoa</span>
          <select
            value={allFilters?.atendimento[popupInfo.atendimento - 1]?.name}
            disabled={!isEdit}
          >
            {allFilters?.atendimento.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Localidade Diferenciada</span>
          <select
            value={
              allFilters?.caracteristica[popupInfo.caracteristica - 1]?.name
            }
            disabled={!isEdit}
          >
            {allFilters?.caracteristica.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>

        <InfoPopupContainer inputDisable={isEdit}>
          <span>Adesão</span>
          <select
            value={allFilters?.adesao[popupInfo.adesao - 1]?.name}
            disabled={!isEdit}
          >
            {allFilters?.adesao.map((item: any) => {
              return <option value={item?.name}>{item?.name}</option>;
            })}
          </select>
        </InfoPopupContainer>
      </PopupContainer>
      {/* {isEdit ? (
        <ButtonEdit onClick={() => setIsEdit(false)}>
          <FiSave size={16} color="#FFF" />
        </ButtonEdit>
      ) : (
        <ButtonEdit onClick={() => setIsEdit(true)}>
          <FiEdit size={16} color="#FFF" />
        </ButtonEdit>
      )} */}
    </Popup>
  );
}
