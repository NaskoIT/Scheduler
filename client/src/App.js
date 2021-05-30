import React, { Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import Home from './pages/home/home.jsx'
import SignIn from './pages/login/login.jsx'
import SignUp from './pages/register/register.jsx'
import NotFound from './pages/notFound/notFound.jsx'
import Header from './components/Header'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp
      } />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}