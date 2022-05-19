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
}

interface Props {
  school: SchoolProps;
  setPopupInfo: React.Dispatch<React.SetStateAction<SchoolProps | null>>;
}

export function SchoolMarker(props: Props) {
  const { school, setPopupInfo } = props;

  return (
    <Marker
      latitude={school.latitude}
      longitude={school.longitude as unknown as number}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo(school);
      }}
    >
      <SchoolContainer>
        <AiTwotoneCompass size={16} color="#0064ad" />
      </SchoolContainer>
    </Marker>
  );
}
