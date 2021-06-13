import { getBearerToken, getUsername, getUserId } from "./localStorageService"
import { validateJwt } from './jwtHelper';

export function userIsLoggedIn() {
    var token = getBearerToken();
    return validateJwt(token);
}

export function getAppState() {
    return {
        isLoggedIn: userIsLoggedIn(),
        username: getUsername(),
        userId: getUserId(),
    }
}