import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import NotFound from './pages/notFound/notFound.jsx'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}