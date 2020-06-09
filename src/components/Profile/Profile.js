import React from 'react';
import axios from 'axios';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Profile/Profile.css';

import { Notification } from '../Notification/Notification';
import { removeUserSession, getUser, getBaseUrl } from '../../utils/Common';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getUser(),
      notifications: [],
      unreadCount: 0
    };
  }

  componentDidMount() {
    // polling notiofications API
    this.notificationsPolling = setInterval(
      () => {
        this.getNotifications();
      }, 1000
    );
  }

  /**
   * Method to get notiofications by making an API call
   */
  getNotifications() {
    axios.get(`${getBaseUrl()}notifications`).then(response => {
      const unreadNotifications = response.data.filter(x => {
        return x.read === false;
      });
      this.setState({ notifications: response.data, unreadCount: unreadNotifications.length });
    }).catch(error => {
      console.log(error);
    });
  }

  handleLogout = () => {
    removeUserSession();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="col-lg-12">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Notifications Portal</a>
          <div className="notifications">
            <a href="#" role="button" id="notificationLink" data-toggle="dropdown" >
              <FontAwesomeIcon className="notificationIcon" icon={faBell} style={{ color: '#20a8d8' }} />
              <span className="badge">{this.state.unreadCount}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="notificationsLink">
              <p className="dropdown-item">You have <span id="notificationsCount">{this.state.unreadCount}</span> notifications</p>
              {this.state.notifications.map((notification, i) => (
                <Notification key={i} {...notification}></Notification>
              ))}
            </div>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="navbar-text welcome">Welcome {this.state.user.name}</span>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-light" id="logoutBtn" onClick={this.handleLogout} >Logout</button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Hello, {this.state.user.name}</h1>
            <p className="lead">This is your profile screen. Click on the bell icon to see all your notifications.</p>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // clearing interval for polling API
    clearInterval(this.notificationsPolling);
  }
}

