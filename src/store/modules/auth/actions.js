export function loginRequest(login, password, recaptchaKey) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { login, password, recaptchaKey },
  };
}

export function loginSuccess(token, user) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { token, user },
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function logoff() {
  return {
    type: '@auth/LOGOFF',
  };
}
