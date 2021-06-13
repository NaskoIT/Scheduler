import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppointmentCard from '../../components/AppointmentCard'
import { getHairdresserAppointments } from '../../services/hairdressersService';
import { APPOINTMENTS_STATUS } from '../../common/modelConstants';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function HairdresserWaitingAppointments() {
    const [appointments, setAppointments] = useState([]);
    const classes = useStyles();

    const onDecline = (id) => {
        setAppointments(appointments.filter(a => a.id != id));
    }

    useEffect(() => {
        getHairdresserAppointments(APPOINTMENTS_STATUS.WAITING)
            .then(response => {
                setAppointments(response.appointments);
            })
    }, []);

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                    {appointments.map(appointment => (
                        <Grid key={appointment.id} item>
                            <AppointmentCard appointment={appointment} onDecline={onDecline} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}