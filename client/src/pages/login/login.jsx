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
import { login } from '../../services/usersService';
import { toast } from 'react-toastify';
import { setBearerToken, setUser } from '../../services/localStorageService';
import { appRoutes } from '../../constants/routes'
import AppContext from '../../contexts/appContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function SignIn() {
  const history = useHistory();

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [appState, setAppState] = React.useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      username,
      password
    };

    login(body)
      .then((response) => {
        setBearerToken(response.jwt_token);
        setUser({
          username,
          id: response.id,
        });

        setAppState(state => ({ ...state, isLoggedIn: true, username, userId: response.id }));

        toast.success('You have logged in successfully!');
        history.push(appRoutes.hairdressers.all);
      })
      .catch(() => {
        toast.error('Invalid username or password!');
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Already don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}