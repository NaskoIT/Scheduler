const BEARER_TOKEN_KEY = 'BEARER_TOKEN';

export function getBearerToken() {
    return localStorage.getItem(BEARER_TOKEN_KEY);
}

export function setBearerToken(token) {
    localStorage.setItem(BEARER_TOKEN_KEY, token);
}