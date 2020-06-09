import React , {useEffect} from 'react';
import axios from 'axios';
import './App.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoutes';
import { PublicRoute } from './utils/PublicRoutes';
import { Login } from './components/Login/Login';
import { Profile } from './components/Profile/Profile';
import { getToken, setUserSession, removeUserSession } from './utils/Common';

import { getBaseUrl} from './utils/Common'; 

function App() {

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`${getBaseUrl()}verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
    }).catch(error => {
      removeUserSession();
    });
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="row">
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
