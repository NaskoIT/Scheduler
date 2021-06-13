import { get, post } from './requester.js';
import {apiRoutes} from '../constants/apiRoutes.js';

export function getHairdressers() {
    return get(apiRoutes.hairdressers.all);
}

export function register(body) {
    return post(apiRoutes.hairdressers.register, body);
}

export function getHairdresserAppointments() {
    return get(apiRoutes.hairdressers.appointments);
}

// Mocked hairdressers data
const hairdressersData = [
    {
        "id": "1",
        "username": "naskoIT",
        "email": "nasko01_vasilev@abv.bg",
        "firstName": "Atanas",
        "lastName": "Vasilev",
        "location": "Studentski grad, street 2, blok 18",
        "phone": "0871234567",
        "workHours": {
            "start": "9:00",
            "end": "18:00"
        },
        "description": "some description about the hairdresser"
    },
    {
        "id": "2",
        "username": "naskoIT2",
        "email": "nasko0122_vasilev@abv.bg",
        "firstName": "Vasi",
        "lastName": "Andreev",
        "location": "Studentski grad, street 25, blok 18",
        "phone": "0871784567",
        "workHours": {
            "start": "10:00",
            "end": "20:00"
        },
        "description": "some description about the hairdresser about the second hairdresser"
    }
]