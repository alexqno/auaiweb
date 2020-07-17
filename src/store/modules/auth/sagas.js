import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import auaiApi from '~/services/auaiApi';

import { loginSuccess, loginFailure } from './actions';

import { notification } from '~/utilities/notification';

export function* doLogin({ payload }) {
  try {
    const { login, password, recaptchaKey } = payload;

    const response = yield call(auaiApi.post, 'sessions', {
      email: login,
      password,
      recaptchaKey,
    });

    const { token, user } = response.data;

    yield put(loginSuccess(token, user));

    if (token) {
      auaiApi.defaults.headers.Authorization = `Bearer ${token}`;
      history.push('/call');
    } else {
      history.push('/updatePassword');
    }
  } catch (error) {
    notification('error', 'Erro', 'Não foi possível fazer login');
    yield put(loginFailure());
  }
}

export function doLogoff() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    auaiApi.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/LOGIN_REQUEST', doLogin),
  takeLatest('@auth/LOGOFF', doLogoff),
  takeLatest('persist/REHYDRATE', setToken),
]);
