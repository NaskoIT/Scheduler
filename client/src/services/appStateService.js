import { getBearerToken } from "./localStorageService"
import { validateJwt } from './jwtHelper';

export function isLoggedIn() {
    var token = getBearerToken();
    return validateJwt(token);
}