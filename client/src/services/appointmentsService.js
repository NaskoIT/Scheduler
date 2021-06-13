import { toQueryString } from "../common/urlHelpers";
import { apiRoutes } from "../constants/apiRoutes";
import { get, post } from "./requester";

export function getAppointmentsByDateAndUser(date, hairdresserId) {
    const queryParams = toQueryString({
        date,
        hairdresserId
    });

    return get(apiRoutes.appointments + queryParams);
}

export function createAppointment(body) {
    post(apiRoutes.appointments.create, body);
}

// Mocked appointments data
const appointments = [
    {
        id: 1,
        date: "2021-05-31",
        start: "10:30",
        end: "11:00",
        user: {
            username: "nasko.it",
            firstName: "Atanas",
            lastName: "Vasilev",
            phone: "087123456",
        }
    },
    {
        id: 2,
        date: "2021-06-31",
        start: "11:30",
        end: "12:00",
        user: {
            username: "vesko.it",
            firstName: "Vesko",
            lastName: "Vasilev",
            phone: "087123456",
        }
    },
]