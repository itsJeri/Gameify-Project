const API_ENDPOINT_BASE = '/api/v1';
const getApiEndpoint = (apiEndpoint) => API_ENDPOINT_BASE + apiEndpoint;

export const LOGIN_API_ENDPOINT = getApiEndpoint('/login');
export const LOGOUT_API_ENDPOINT = getApiEndpoint('/logout');
export const SIGNUP_API_ENDPOINT = getApiEndpoint('/signup');
export const CURRENT_USER_API_ENDPOINT = getApiEndpoint('/me');
export const PROFILES_API_ENDPOINT = getApiEndpoint('/profiles');
export const LEADERBOARDS_API_ENDPOINT = getApiEndpoint('/leaderboards');
export const USERS_API_ENDPOINT = getApiEndpoint('/users');
export const GAMES_API_ENDPOINT = getApiEndpoint('/games');
export const SCORES_API_ENDPOINT = getApiEndpoint('/scores');
