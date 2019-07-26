import React, { Fragment } from 'react';
import Navbar from './components/layouts/Navbar';

import User from './components/Users/User';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Alert from './components/layouts/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
// import axios from 'axios';
import About from './components/pages/About';
import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/Alerts/AlertState';
const App = () => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchUsersData() {
  //     setLoading(true);
  //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //     setUsers(res.data);
  //     setLoading(false);
  //   }
  //   fetchUsersData();
  // }, [])

  //Set Alert

  return (
    <GithubState>
      <AlertState>
        <Router>
          <React.Fragment>
            <Navbar title="Github Finder" icon="fab fa-github" />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
