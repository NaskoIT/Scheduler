import { toQueryString } from "../common/urlHelpers";
import { apiRoutes } from "../constants/apiRoutes";
import { get, post } from "./requester";
import { format } from 'date-fns';
import { dateTimeFormats } from '../common/globalConstants'

export function getAppointmentsByDateAndUser(date, hairdresserId) {
    const queryParams = toQueryString({
        date: format(new Date(date), dateTimeFormats.machine),
        hairdresserId
    });

    return get(apiRoutes.appointments.all + queryParams);
}

export function createAppointment(body) {
    post(apiRoutes.appointments.create, body);
}

export function changeAppointmentStatus(id, status) {
    post(apiRoutes.appointments.changeStatus, { id, status });
}

export function toTime(date) {
    let dateAsString = `${date.getHours()}:${date.getMinutes()}`;
    if (date.getMinutes() === 0) {
        dateAsString += '0';
    }

    return dateAsString;
}

export function formatAppointmentLabel(appointment) {
    return `${appointment.start} - ${appointment.end}`;
}

export function parseAppointment(appointmentLabel) {
    let parts = appointmentLabel.split(' - ');
    return {
        start: parts[0],
        end: parts[1]
    }
}

export const getCurrentAppointments = () => {
    const start = new Date();
    start.setHours(10);
    start.setMinutes(0);

    const appointments = [];

    for (let i = 1; i <= 20; i++) {
        let startTime = toTime(start);
        start.setMinutes(start.getMinutes() + 30);
        let endTime = toTime(start);

        appointments.push({
            start: startTime,
            end: endTime,
            free: (Boolean)(i % 2)
        })
    }

    return appointments;
}

// Mocked appointments data
export const appointments = [
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