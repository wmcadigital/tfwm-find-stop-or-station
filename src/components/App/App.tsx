import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindStopStation from './FindStopStation';
import Stop from './Stop';
import Station from './Station';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <Switch>
            <Route path="/station/:id">
              <Station />
            </Route>
            <Route path="/stop/:atcoCode">
              <Stop />
            </Route>
            <Route path="/">
              <FindStopStation />
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
