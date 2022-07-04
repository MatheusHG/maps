/* eslint-disable camelcase */

import api from '@services/api';

interface GetSchoolImageProps {
  codigo_uf: string;
  escola: string;
  municipio: string;
}

class SchoolsService {
  async getSchoolImage(props: Partial<GetSchoolImageProps>) {
    const { codigo_uf, escola, municipio } = props;
    const { hostname } = window.location;

    const apiURL =
      hostname === 'localhost'
        ? 'http://localhost:3333'
        : 'https://api.pilab.com.br';

    try {
      await api.get(
        `maps/photo?codigo_uf=${codigo_uf}&escola=${escola}&municipio=${municipio}`,
      );
      return `${apiURL}/maps/photo?codigo_uf=${codigo_uf}&escola=${escola}&municipio=${municipio}`;
    } catch (err) {
      return 'https://user-images.githubusercontent.com/56003521/165186523-9a2207a9-db8e-4a56-9679-270a78e70e0a.png';
    }
  }
}
export default new SchoolsService();
