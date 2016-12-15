import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class LeaderBoard extends Component {
    render() {
        let leaderNodes = this.props.data.map(function(leader, index) {
            return(
                    <tr key={index}>
                    <td>
                      {index+1}
                    </td>

                    <td>
                    <img src={leader.img} alt={leader.username} className="userimage" />
                    <a className="username" href="#">{ leader.username }</a>
                    </td>
                    <td>{leader.alltime}</td>
                    <td>{leader.recent}</td>
                    </tr>
            );
        });
        return(
                <div className="main row">
                    <div className="row">
                        <h1> LeaderBoard </h1>
                    </div>
                    <div className="row">
                    <div className="col-xs-12">
                          <table className="table">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Camper Name</th>
                                      <th>
                                          Points in past 30 days
                                          <i className="fa fa-sort-amount-desc active" aria-hidden="true"></i>
                                      </th>
                                      <th>
                                         All time Points
                                         <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody>
                                 { leaderNodes }
                              </tbody>
                          </table>
                      </div>
                </div>
            </div>
        );
    }
}
class App extends Component {
  constructor() {
      super();
      this.state = {
          recent: [],
          alltime: []
      }
  }
  loadRecentLeaders() {
        let url_recent = this.props.base_url + 'recent';
        $.ajax({
            url      : url_recent,
            dataType : 'json',
            type     : 'GET',
            success  : data => {
                this.setState({ recent: data });
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
  }
  loadAllTimeLeaders() {
        let url_recent = this.props.base_url + 'alltime';
        $.ajax({
            url      : url_recent,
            dataType : 'json',
            type     : 'GET',
            success  : data => {
                this.setState({ alltime: data });
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
  loadDataFromServer() {
    this.loadRecentLeaders();
    this.loadAllTimeLeaders();
      console.log(this.state.alltime[1]);
      console.log(this.state.recent[1]);
      
  }

  componentDidMount() {
      this.loadDataFromServer();
  }
  render() {
    return (
      <div className="container">
            <div className="row title">
            <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="freecodecamp-logo" />
            </div>
            <LeaderBoard data={this.state.alltime} />
      </div>
    );
  }
}

export default App;
