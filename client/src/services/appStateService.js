import { getBearerToken } from "./localStorageService"
import { validateJwt } from './jwtHelper';

export function userIsLoggedIn() {
    var token = getBearerToken();
    return validateJwt(token);
}