import { AiTwotoneCompass } from 'react-icons/ai';
import { Marker as MapGlMarker } from 'react-map-gl';

import { SchoolContainer } from './styles';

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
  uf: string;
}

export interface CityProps {
  exibicao: string;
  regiao: string;
  uf: string;
  municipio: string;
  latitude: number;
  longitude: number;
  ['Ainda não Fez']: number;
  Assentamento: number;
  ['Capacidade de 1.000']: number;
  ['Capacidade de 50']: number;
  ['Capacidade de 200']: number;
  ['Capacidade de 600']: number;
  ['Demais combina']: number;
  EF: number;
  ['EF, EJA']: number;
  ['EF,EM']: number;
  EI: number;
  ['EI, EF']: number;
  Estadual: number;
  Municipal: number;
  Federal: number;
  Nenhuma: number;
  Privada: number;
  Quilombo: number;
  Rural: number;
  ['Sem Restri']: number;
  Urbana: number;
}

interface Props {
  value: SchoolProps | CityProps;
  onClick: () => void | Promise<void>;
  color: string;
}

export function Marker(props: Props) {
  const { value, onClick, color } = props;
  return (
    <MapGlMarker
      latitude={value.latitude}
      longitude={value.longitude as unknown as number}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick();
      }}
    >
      <SchoolContainer>
        <AiTwotoneCompass size={16} color={color} />
      </SchoolContainer>
    </MapGlMarker>
  );
}