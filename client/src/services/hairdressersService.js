import { get } from './requester.js';
import {apiRoutes} from '../constants/apiRoutes.js';

export function getHairdressers() {
    console.log('get hairdressers')
    return get(apiRoutes.hairdressers.all);
}