import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    hoursFormControl: {
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function BookAppointmentDialog({ }) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [hour, setHour] = React.useState('');

    const classes = useStyles();
    const currentAppointments = getCurrentAppointments().filter(a => a.free);


    const handleChange = (event) => {
        setHour(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetState = () => {
        setSelectedDate(new Date());
        setHour('');
    }

    const bookAppointment = () => {
        const body = {
            date: selectedDate,
            ...parseAppointment(hour),
        }

        console.log(body);
        handleClose();
        resetState();
    }

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>Book</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Book appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose convenient date and time for your appointment.
                    </DialogContentText>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select appointment date"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.hoursFormControl}>
                            <InputLabel id="demo-simple-select-helper-label">Hour</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={hour}
                                onChange={handleChange}
                            >
                                {currentAppointments.map(a => (
                                    <MenuItem value={formatAppointmentLabel(a)} key={formatAppointmentLabel(a)}>{formatAppointmentLabel(a)}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select your convenient hour</FormHelperText>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={bookAppointment} color="primary">
                        Book
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const getCurrentAppointments = () => {
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

const toTime = (date) => {
    let dateAsString = `${date.getHours()}:${date.getMinutes()}`;
    if (date.getMinutes() === 0) {
        dateAsString += '0';
    }

    return dateAsString;
}

const formatAppointmentLabel = (appointment) => {
    return `${appointment.start} - ${appointment.end}`;
}

const parseAppointment = (appointmentLabel) => {
    let parts = appointmentLabel.split(' - ');
    return {
        start: parts[0],
        end: parts[1]
    }
}