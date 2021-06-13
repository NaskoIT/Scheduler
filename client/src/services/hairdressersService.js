import { get, post } from './requester.js';
import {apiRoutes} from '../constants/apiRoutes.js';

export function getHairdressers() {
    console.log('get hairdressers')
    return get(apiRoutes.hairdressers.all);
}

export function register(body) {
    console.log('register hairdresser');
    return post(apiRoutes.hairdressers.register, body);
}