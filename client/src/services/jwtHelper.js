import jwt_decode from "jwt-decode";
import { getUserId } from "./localStorageService";

export function validateJwt(token) {
    if (!token) {
        return false;
    }

    try {
        var decoded = jwt_decode(token);
        return decoded && decoded.client_id == getUserId();
    }
    catch {
        return false;
    }
}

function validateJwtExpiration(expiresAt) {
    if (!expiresAt) {
        return false;
    }

    return Date.now() < expiresAt * 1000;
}