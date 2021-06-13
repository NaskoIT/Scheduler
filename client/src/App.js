import React from "react"
import { Route, Switch } from "react-router-dom"
import { toast } from 'react-toastify'
import Home from './pages/home/home.jsx'
import SignIn from './pages/login/login.jsx'
import SignUp from './pages/register/register.jsx'
import NotFound from './pages/notFound/notFound.jsx'
import Header from './components/Header'
import Hairdressers from './pages/hairdressers/all.jsx'
import RegisterHairdresser from './pages/hairdressers/register.jsx'
import HairdresserCalendar from './pages/hairdressers/calendar.jsx'
import { appRoutes } from "./constants/routes.js"
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  position: toast.POSITION.TOP_CENTER,
  pauseOnHover: true,
});

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={appRoutes.home} exact component={Home} />
        <Route path={appRoutes.login} component={SignIn} />
        <Route path={appRoutes.register} component={SignUp} />
        <Route path={appRoutes.hairdressers.all} component={Hairdressers} />
        <Route path={appRoutes.hairdressers.register} component={RegisterHairdresser} />
        <Route path={appRoutes.hairdressers.calendar} component={HairdresserCalendar} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}