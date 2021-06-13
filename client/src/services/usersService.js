import { apiRoutes } from "../constants/apiRoutes";
import { post } from "./requester";

export function register(body) {
    return post(apiRoutes.users.register, body);
}

export function login(body) {
    return post(apiRoutes.users.login, body);
}