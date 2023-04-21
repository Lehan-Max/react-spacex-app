import React from 'react';
import LaunchesPast from './components/launchesPast';
import { Switch, Route, Redirect } from 'react-router-dom';
import RocketDetails from './components/rocketDetails';
import './App.css';
import NotFound from './components/notFound';
import Home from './components/home';
import Navbar from './components/navbar';
import LaunchesPastDetails from './components/LaunchesPastDetails';

function App() {
  return (
    <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route exact path='/launches-past' component={LaunchesPast}/>
            <Route path='/launches-past/:id' component={LaunchesPastDetails} />
            <Route path="/rocket/:id" component={RocketDetails} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found"/>
          </Switch>
    </div>
  );
}

export default App;
