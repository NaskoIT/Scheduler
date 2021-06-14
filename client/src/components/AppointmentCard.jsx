import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ConfirmationDialog from './ConfirmationDialog';
import { changeAppointmentStatus } from '../services/appointmentsService';
import { APPOINTMENTS_STATUS } from '../common/modelConstants';
import { toast } from 'react-toastify';
import AppointmentInfo from './AppointmentInfo';

const useStyles = makeStyles(theme => ({
    card: {
        height: 170,
        width: 300,
        textAlign: 'left',
    },
}));

export default function AppointmentCard({ appointment, onDecline }) {
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
            });
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <AppointmentInfo appointment={appointment} />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary" onClick={() => setIsOpenAcceptConfirmation(true)}>
                    Accept
                </Button>
                <Button color="primary" onClick={() => setIsOpenRejectConfirmation(true)}>
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