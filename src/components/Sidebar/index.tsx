import qs from 'qs';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { BiArrowFromRight } from 'react-icons/bi';

import { getCities, getStates, IStates, ICities } from '@services/City/index';
import FiltersService from '@services/Filters';

import { Filters, VALUE_TYPE } from '@contexts/FilterContext/types';

import { useFilterContext } from '@hooks/useFilterContext';

import { Header } from './components/Header';
import { Container, Content, CloseLabel } from './style';

export function SideBar() {
  const { allFilters, setAllFilters, setMyLocation, setPopupInfo, setLoading } =
    useFilterContext();

  const access = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const isAdmin = (Object.keys(access)[0] === 'admin') as boolean;

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [firstFilter, setFirstFilter] = useState<boolean>(true);
  const [states, setStates] = useState<IStates[]>([]);
  const [cities, setCities] = useState<ICities[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const [isFirstRender, handleForceUpdate] = useReducer(
    (prevState) => !prevState,
    true,
  );

  const {
    filterValues,
    forceUpdate,
    renderFilters,
    setSchools,
    setCities: setCitiess,
    clearFilters,
    setLocation,
    onChangeFilterValue,
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
    setLoading(true);
    setPopupInfo(null);
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
          zoom: 8,
        });
      }

      setMyLocation(false);
      setLoading(false);

      return;
    }

    const queryString = FiltersService.generateQueryString(filterValues);
    // const sql = FiltersService.generateSQL(queryString);

    const response = isAdmin
      ? await FiltersService.searchByFiltersPrivate(queryString)
      : await FiltersService.searchByFiltersPublic(queryString);

    if (response.length > 0) {
      setLocation({
        latitude: calcLat(response),
        longitude: calcLong(response) - 0.1,
        zoom: 12,
      });
    }
    setMyLocation(false);

    setCitiess([]);
    setSchools(response);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (isFirstRender) {
        onChangeFilterValue('codigo_uf', 'DF', VALUE_TYPE.SELECT);
        onChangeFilterValue('municipio', 'Brasília', VALUE_TYPE.SELECT);
        handleForceUpdate();
        return;
      }

      await handleConfirmFilterValues();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender]);

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
            title: 'Estado / Cidade',
            isOpen: true,
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
            isAdmin,
          },
          {
            title: 'Localização',
            column: 'localizacao',
            items: allFilters?.localizacao,
            isLocked,
            isAdmin,
          },
          {
            title: 'Etapas e Modalidade',
            column: 'etapas',
            items: allFilters?.etapas,
            isLocked,
            isAdmin,
          },
          {
            title: 'Porte de Matrícula',
            column: 'porte',
            items: allFilters?.porte,
            isLocked,
            isAdmin,
          },
          {
            title: 'Restrição de Atendimento',
            column: 'atendimento',
            items: allFilters?.atendimento,
            isLocked,
            isAdmin,
          },
          {
            title: 'Localidade Diferenciada',
            column: 'caracteristica',
            items: allFilters?.caracteristica,
            isLocked,
            isAdmin,
          },
          {
            title: 'Adesao',
            column: 'adesao',
            items: allFilters?.adesao,
            isLocked,
            isAdmin,
          },
        ],
        multipleSliders: [
          {
            title: 'Critérios Numéricos',
            min: 0,
            max: 10,
            isLocked,
            isAdmin,
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
    [forceUpdate, allFilters, states, cities, firstFilter, isLocked, isAdmin],
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
