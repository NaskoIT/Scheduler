export const apiRoutes = {
    hairdressers: {
        all: 'account/hairdressers',
        register: 'account/hairdresser',
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