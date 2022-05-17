/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useMemo, useState } from 'react';
import { BiArrowFromRight } from 'react-icons/bi';

import { getCities, getStates, IStates, ICities } from '@services/City/index';
import FiltersService from '@services/Filters';

import { PropsViewport } from '@contexts/FilterContext';
import { Filters } from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Header } from './components/Header';
import { Container, Content, CloseLabel } from './style';

interface FiltersMaps {
  dependencia: Object;
  localizacao: Object;
  etapas: Object;
  porte: Object;
  atendimento: Object;
  caracteristica: Object;
  adesao: Object;
}

export function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // const [firstFilter, setFirstFilter] = useState<boolean>(true);
  const [states, setStates] = useState<IStates[]>([]);
  const [cities, setCities] = useState<ICities[]>([]);

  const [allFilters, setAllFilters] = useState<FiltersMaps>();

  const {
    filterValues,
    forceUpdate,
    renderFilters,
    setSchools,
    clearFilters,
    setViewport,
  } = useFilterContext();

  async function handleConfirmFilterValues() {
    if (!filterValues.current.municipio) return;

    const queryString = FiltersService.generateQueryString(
      filterValues?.current,
    );
    // const sql = FiltersService.generateSQL(queryString);

    const response = await FiltersService.searchByFilters(queryString);
    const initialValue = 0;

    function calcLat() {
      const latitude = response.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.latitude / response.length,
        initialValue,
      );

      return latitude;
    }

    function calcLong() {
      const longitude = response.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.longitude / response.length,
        initialValue,
      );

      return longitude;
    }

    setViewport(
      (prevState) =>
        ({
          ...prevState,
          initialViewState: {
            latitude: calcLat(),
            longitude: calcLong() - 0.1,
            zoom: 10,
          },
        } as PropsViewport),
    );
    setSchools(response);
  }

  useEffect(() => {
    async function loadFilters() {
      const response = await FiltersService.getAllFilters();
      setAllFilters(response);

      const statesLocations = await getStates();
      setStates(statesLocations);
    }

    loadFilters();
  }, []);

  useEffect(() => {
    (async () => {
      const selectedState = states.find(
        (item) => item.sigla === filterValues?.current?.codigo_uf?.value,
      );
      if (selectedState) {
        const citiesLocations = await getCities(selectedState?.id);
        setCities(citiesLocations);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate, states]);

  const filters = useMemo(
    () =>
      ({
        multipleSelects: [
          {
            title: 'Cidade / Estado',
            items: [
              {
                placeholder: 'UF',
                column: 'codigo_uf',
                title: 'Estados',
                labelProp: 'sigla',
                items: states,
                shouldForceUpdate: true,
                small: true,
              },
              {
                placeholder: 'Selecione uma cidade',
                column: 'municipio',
                title: 'Cidades',
                labelProp: 'nome',
                items: cities,
                dependencyColumn: 'codigo_uf',
              },
            ],
          },
        ],
        checkboxes: [
          {
            title: 'Categoria Administrativa',
            column: 'dependencia',
            items: allFilters?.dependencia,
          },
          {
            title: 'Localização',
            column: 'localizacao',
            items: allFilters?.localizacao,
          },
          {
            title: 'Etapas e Modalidade',
            column: 'etapas',
            items: allFilters?.etapas,
          },
          {
            title: 'Porte de Matrícula',
            column: 'porte',
            items: allFilters?.porte,
          },
          {
            title: 'Restrição de Atendimento',
            column: 'atendimento',
            items: allFilters?.atendimento,
          },
          {
            title: 'Localidade Diferenciada',
            column: 'caracteristica',
            items: allFilters?.caracteristica,
          },
          {
            title: 'Adesao',
            column: 'adesao',
            items: allFilters?.adesao,
          },
        ],
        multipleSliders: [
          {
            title: 'Critérios Numéricos',
            min: 0,
            max: 10,
            items: [
              {
                column: '2019_ideb_1_5',
                label: 'IDEB Series Iniciais',
              },
              {
                column: '2019_ideb_6_9',
                label: 'IDEB Series Finais',
              },
              {
                column: '2019_ideb_em',
                label: 'IDEB Ensino Médio',
              },
            ],
          },
        ],
      } as Filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forceUpdate, allFilters, states, cities],
  );

  return (
    <>
      <Container isOpen={isOpen}>
        <Header onClick={handleConfirmFilterValues} onClear={clearFilters} />
        <Content>
          {renderFilters(filters, 'multipleSelects')}

          {renderFilters(filters, 'selects')}

          {renderFilters(filters, 'checkboxes')}

          {renderFilters(filters, 'multipleSliders')}
        </Content>
      </Container>

      <CloseLabel isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <BiArrowFromRight size={18} />
      </CloseLabel>
    </>
  );
}
