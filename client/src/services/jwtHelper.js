import jwt_decode from "jwt-decode";

function validateJwt(token) {
    if (!token) {
        return false;
    }

    try {
        var decoded = jwt_decode(token);
        return decoded && decoded.exp && validateJwtExpiration(decoded.exp);
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