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
    setCities: setCitiess,
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

  function calcLat(response: any) {
    const latitude = response.reduce(
      (previousValue: any, currentValue: any) => {
        return Number.isNaN(Number(currentValue.latitude))
          ? previousValue + 0
          : previousValue + currentValue.latitude / response.length;
      },
      0,
    );

    return latitude;
  }

  function calcLong(response: any) {
    const longitude = response.reduce(
      (previousValue: any, currentValue: any) => {
        return Number.isNaN(currentValue.longitude)
          ? previousValue + 0
          : previousValue + currentValue.longitude / response.length;
      },
      0,
    );

    return longitude;
  }

  async function handleConfirmFilterValues() {
    if (filterValues.codigo_uf.value && !filterValues.municipio.value) {
      const response = await FiltersService.getCities(
        filterValues.codigo_uf.value,
      );

      const normalizedCities = response.map((city) => ({
        ...city,
        longitude: Number(city.longitude),
        latitude: Number(city.latitude),
      }));

      setSchools([]);
      setCitiess(normalizedCities);

      if (normalizedCities.length > 0) {
        setLocation({
          latitude: calcLat(normalizedCities),
          longitude: calcLong(normalizedCities) - 0.1,
          zoom: 5,
        });
      }

      setMyLocation(false);

      return;
    }

    const queryString = FiltersService.generateQueryString(filterValues);
    // const sql = FiltersService.generateSQL(queryString);
    const response = await FiltersService.searchByFilters(queryString);

    if (response.length > 0) {
      setLocation({
        latitude: calcLat(response),
        longitude: calcLong(response) - 0.1,
      });
    }

    setMyLocation(false);

    setCitiess([]);
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
