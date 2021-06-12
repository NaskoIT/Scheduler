import { post } from "./requester";

export function register(body) {
    return post('register', body);
}