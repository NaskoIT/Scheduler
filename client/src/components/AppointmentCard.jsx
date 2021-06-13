import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';
import {dateTimeFormats} from '../common/globalConstants'
import ConfirmationDialog from './ComfirmationDialog';
import { changeAppointmentStatus } from '../services/appointmentsService';
import { APPOINTMENTS_STATUS } from '../common/modelConstants';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    card: {
        height: 170,
        width: 300,
        textAlign: 'left',
    },

}));

export default function AppointmentCard({appointment, onDecline}) {
    const classes = useStyles();

    const [isOpenRejectConfirmation, setIsOpenRejectConfirmation] = useState(false);
    const [isOpenAcceptConfirmation, setIsOpenAcceptConfirmation] = useState(false);

    const rejectConfirmationTitle = "Are you sure, you want to reject this appointment!";
    const acceptConfirmationTitle = "Are you sure, you want to accept this agreement!";

    const onCloseRejectConfirmationDialog = () => {
        setIsOpenRejectConfirmation(false);
    }

    const onCloseAcceptConfirmationDialog = () => {
        setIsOpenAcceptConfirmation(false);
    }

    const onReject = () => {
        changeAppointmentStatus(appointment.id, APPOINTMENTS_STATUS.DECLINE)
            .then(() => {
                onCloseRejectConfirmationDialog();
                onDecline(appointment.id);
                toast.success('The appointment was declined successfully!');
            });
    }

    const onAccept = () => {
        changeAppointmentStatus(appointment.id, APPOINTMENTS_STATUS.ACCEPT)
            .then(() => {
                onCloseAcceptConfirmationDialog();
                toast.success('The appointment was accepted successfully!');
            })
    }

    const onRejectClick = () => {
        setIsOpenRejectConfirmation(true);
    }

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
                <Button color="primary" onClick={() => setIsOpenAcceptConfirmation(true)}>
                    Accept
                </Button>
                <Button color="primary" onClick={onRejectClick}>
                    Decline
                </Button>
            </CardActions>

            <div>
                <ConfirmationDialog 
                    isOpen={isOpenRejectConfirmation}
                    onClose={onCloseRejectConfirmationDialog}
                    content={rejectConfirmationTitle}
                    onSuccess={onReject} />

                <ConfirmationDialog 
                    isOpen={isOpenAcceptConfirmation}
                    onClose={onCloseAcceptConfirmationDialog}
                    content={acceptConfirmationTitle}
                    onSuccess={onAccept} />
            </div>
        </Card>
    )
}