import 'date-fns';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { format } from 'date-fns';
import { dateTimeFormats } from '../../common/globalConstants'
import { register } from '../../services/hairdressersService';
import { appRoutes } from '../../constants/routes' 
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bottomLink: {
    textAlign: 'right',
    marginBottom: theme.spacing(1)
  },
  textarea: {
    marginTop: theme.spacing(2)
  }
}));

export default function RegisterHairdresser() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ startHour, setStartHour ] = useState(getWorkDayStartHour());
  const [ endHour, setEndHour ] = useState(getWorkDayEndHour());
  const [ description, setDescription ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      username,
      firstName,
      lastName,
      email,
      password,
      location,
      phone, 
      description,
      workHours: {
        start: format(startHour, dateTimeFormats.shortTime),
        end: format(endHour, dateTimeFormats.shortTime),
      },
      description
    };

    register(body)
      .then(response => {
        toast.success('You have registered successfully as a hairdresser!');
        history.push(appRoutes.login);
      })
      .catch(err => {
        toast.error('Sorry, your registration was invalid!. Please, try again.');
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setLocation(e.target.value)}
                autoComplete="location"
                name="location"
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={6}>
            <KeyboardTimePicker
          margin="normal"
          id="startHour"
          label="Workday start"
          value={startHour}
          onChange={setStartHour}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
            </Grid>
            <Grid item xs={12} sm={6}>
            <KeyboardTimePicker
          margin="normal"
          id="endHour"
          label="Workday end"
          value={endHour}
          onChange={setEndHour}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
            </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid xs={12}>
            <TextField
              className={classes.textarea}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              fullWidth
              label="Description"
              variant="outlined"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <div>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const getWorkDayStartHour = () => {
    let date = new Date();
    date.setMinutes(0);
    date.setHours(9);
    return date;
}

const getWorkDayEndHour = () => {
    let date = new Date();
    date.setMinutes(0);
    date.setHours(18);
    return date;
}