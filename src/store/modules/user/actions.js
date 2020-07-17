export function loginRequest(login, password) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { login, password },
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
