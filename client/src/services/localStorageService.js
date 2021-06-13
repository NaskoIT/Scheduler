const BEARER_TOKEN_KEY = 'BEARER_TOKEN';
const USERNAME_KEY = 'USERNAME';
const USER_ID_KEY = 'USER_ID';


export function getBearerToken() {
    return localStorage.getItem(BEARER_TOKEN_KEY);
}

export function setBearerToken(token) {
    localStorage.setItem(BEARER_TOKEN_KEY, token);
}

export function setUser(user) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(USER_ID_KEY, user.id);
}

export function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

export function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}