// @ts-ignore
/* eslint-disable */
import request from '../utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

// TODO: get user details from the server
/** GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** POST /api/login/outLogin */
export async function outLogin(token: string) {
  return request<Record<string, any>>('/real_estate_gateway/revoke', {
    method: 'POST',
    data: {
      token: token
    }
  });
}

/** POST /api/login/account */
export async function login(params: LoginParamsType) {

  return request<API.LoginResult>('/real_estate_gateway/login', {
    method: 'POST',
    data: { username: params.username, password: params.password },
  }).then((response) => {
    if (response) {
      return {
        status: 'ok',
        type: params.type,
        /**
             * // TODO: set authority as user role
             * and add validation to show error if authority not get set
             */
        currentAuthority: 'admin',
        token: response,
      }
    } else {
      throw response;
    }

  })
    .catch((error) => {
      return {
        status: 'error',
        type: params.type,
        currentAuthority: 'admin',
      }
    });
}

