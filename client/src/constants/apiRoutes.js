export const apiRoutes = {
    hairdressers: {
        all: 'account/hairdressers',
        register: 'account/hairdresser/register',
        appointments: 'account/hairdresser/appointments',
    },
    users: {
        register: 'account/client/register',
        login: 'account/login'
    },
    appointments: {
        all: 'appointments',
        create: 'appointment',
        changeStatus: 'appointment/changeStatus'
    }
}