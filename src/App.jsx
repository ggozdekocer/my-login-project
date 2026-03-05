import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { Success } from './components/Success';


function App() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/">
          <Login />
        </Route>
        
        
        <Route path="/main">
          <Success />
        </Route>

        <Route path="/error">
          <div>Giriş Başarısız!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;