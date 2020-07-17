import axios from 'axios';

import { notification } from '~/utilities/notification';
import { logoff } from '~/store/modules/auth/actions';

const auaiApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default auaiApi;

export const setupInterceptor = store => {
  auaiApi.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        store.dispatch(logoff());

        notification(
          'warning',
          'Sessão expirada',
          'Sua sessão expirou. Faça login novamente para continuar usando o sistema'
        );

        return null;
      }
      return Promise.reject(error);
    }
  );
};
