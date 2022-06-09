import { AiTwotoneCompass } from 'react-icons/ai';
import { Marker } from 'react-map-gl';

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
}

interface Props {
  value: SchoolProps | CityProps;
  onClick: () => void | Promise<void>;
  color: string;
}

export function SchoolMarker(props: Props) {
  const { value, onClick, color } = props;
  return (
    <Marker
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
    </Marker>
  );
}
