import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getHairdresserAppointments } from '../../services/hairdressersService';
import { APPOINTMENTS_STATUS } from '../../common/modelConstants';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppointmentInfo from '../../components/AppointmentInfo';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25
    },
    card: {
        height: 120,
        width: 300,
        textAlign: 'left',
    },
}));

export default function HairdresserWaitingAppointments() {
    const [appointments, setAppointments] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getHairdresserAppointments(APPOINTMENTS_STATUS.ACCEPT)
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
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <AppointmentInfo appointment={appointment} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}