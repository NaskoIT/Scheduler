import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppointmentCard from '../../components/AppointmentCard'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Hairdressers() {
    const [appointments, setAppointments] = useState(getAppointments());
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                    {appointments.map(appointment => (
                        <Grid key={appointment.id} item>
                            <AppointmentCard appointment={appointment} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

const getAppointments = () => {
    return [
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
}