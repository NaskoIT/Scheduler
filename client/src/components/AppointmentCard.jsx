import React, { useState, Link } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';
import {dateTimeFormats} from '../common/globalConstants'

const useStyles = makeStyles(theme => ({
    card: {
        height: 170,
        width: 300,
        textAlign: 'left',
    },

}));

export default function HairdresserCard({appointment}) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {`${appointment.user.firstName} ${appointment.user.lastName} - ${appointment.user.username}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {format(new Date(appointment.date), dateTimeFormats.defaultDate)} from {appointment.start} to {appointment.end}
                    </Typography>
                    <Typography variant="body2" component="p">
                       Phone: {appointment.user.phone}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary">
                    Accept
                </Button>
                <Button color="primary">
                    Decline
                </Button>
            </CardActions>
        </Card>
    )
}