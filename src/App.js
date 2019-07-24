import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/layouts/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';
import About from './components/pages/About';
import GithubState from './components/context/github/GithubState';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchUsersData() {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      setUsers(res.data);
      setLoading(false);
    }
    fetchUsersData();
  }, [])

  //Get single User
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  //Get Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

  //Clear Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  }

  //Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000)
  }
  return (
    <GithubState>
      <Router>
        <React.Fragment>
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path="/" exact render={props => (
                <Fragment>
                  <Search clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} />
              )} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </GithubState>
  );
}

export default App;
