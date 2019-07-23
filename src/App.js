import React, { Fragment } from 'react';
import Navbar from './components/layouts/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './components/layouts/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';
import About from './components/pages/About';
class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }
  //Search User
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }
 //Get single User
 gerUser = async (username) => {
  this.setState({ loading: true });
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({ user: res.data, loading: false });
}
  //Clear Users
  clearUsers = () => this.setState({ users: [], loading: '' });

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route path="/" exact render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
