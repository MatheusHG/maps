import { useEffect, useMemo, useState } from 'react';
import { BiArrowFromRight } from 'react-icons/bi';

import { getCities, getStates, IStates, ICities } from '@services/City/index';
import FiltersService from '@services/Filters';

import { Filters } from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Header } from './components/Header';
import { Container, Content, CloseLabel } from './style';

export function SideBar() {
  const { allFilters, setAllFilters, setMyLocation } = useFilterContext();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [firstFilter, setFirstFilter] = useState<boolean>(true);
  const [states, setStates] = useState<IStates[]>([]);
  const [cities, setCities] = useState<ICities[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const {
    filterValues,
    forceUpdate,
    renderFilters,
    setSchools,
    clearFilters,
    setLocation,
  } = useFilterContext();

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
    if (
      !filterValues.municipio?.value ||
      filterValues.municipio?.value === 'DEFAULT VALUE'
    ) {
      setIsLocked(true);
      return;
    }
    setIsLocked(false);
  }, [filterValues.municipio]);

  async function handleConfirmFilterValues() {
    if (!filterValues.municipio) return;

    const queryString = FiltersService.generateQueryString(filterValues);
    // const sql = FiltersService.generateSQL(queryString);

    const response = await FiltersService.searchByFilters(queryString);
    const initialValueLat = 0;
    function calcLat() {
      const latitude = response.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.latitude / response.length,
        initialValueLat,
      );

      return latitude;
    }

    const initialValueLong = 0;
    function calcLong() {
      const longitude = response.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.longitude / response.length,
        initialValueLong,
      );

      return longitude;
    }

    if (response.length > 0) {
      setLocation({ latitude: calcLat(), longitude: calcLong() - 0.1 });
    }

    setMyLocation(false);

    setSchools(response);
  }
  function handleClear() {
    clearFilters();
    setFirstFilter((prev) => !prev);
  }
  useEffect(() => {
    (async () => {
      const selectedState = states.find(
        (item) => item.sigla === filterValues?.codigo_uf?.value,
      );
      if (selectedState) {
        const citiesLocations = await getCities(selectedState?.id);
        setCities(citiesLocations);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate, states, firstFilter]);

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
            isLocked,
          },
          {
            title: 'Localização',
            column: 'localizacao',
            items: allFilters?.localizacao,
            isLocked,
          },
          {
            title: 'Etapas e Modalidade',
            column: 'etapas',
            items: allFilters?.etapas,
            isLocked,
          },
          {
            title: 'Porte de Matrícula',
            column: 'porte',
            items: allFilters?.porte,
            isLocked,
          },
          {
            title: 'Restrição de Atendimento',
            column: 'atendimento',
            items: allFilters?.atendimento,
            isLocked,
          },
          {
            title: 'Localidade Diferenciada',
            column: 'caracteristica',
            items: allFilters?.caracteristica,
            isLocked,
          },
          {
            title: 'Adesao',
            column: 'adesao',
            items: allFilters?.adesao,
            isLocked,
          },
        ],
        multipleSliders: [
          {
            title: 'Critérios Numéricos',
            min: 0,
            max: 10,
            isLocked,
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
    [forceUpdate, allFilters, states, cities, firstFilter, isLocked],
  );
  return (
    <>
      <Container isOpen={isOpen}>
        <Header onClick={handleConfirmFilterValues} onClear={handleClear} />
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
