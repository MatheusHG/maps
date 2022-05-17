import axios from 'axios';

export interface IStates {
  id: number;
  sigla: string;
  nome: string;
}

export interface ICities {
  id: number;
  nome: string;
}

const getStates = async () => {
  const states = await axios.get<IStates[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  );

  // console.log('aqui estados -> ', states);

  const normalizedStates = states.data.map((item) => ({
    id: item.id,
    sigla: item.sigla,
    nome: item.nome,
  }));
  return normalizedStates;
};

const getCities = async (idState: number) => {
  const cities = await axios.get<ICities[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idState}/municipios`,
  );
  console.log('aqui ->', cities);
  const normalizedCities = cities.data.map((item) => ({
    id: item.id,
    nome: item.nome,
  }));

  return normalizedCities;
};

export { getStates, getCities };
