import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor() {
      super();
      this.state = {
          data: []
      }
  }
  loadDataFromServer() {
      $.ajax({
          url      : this.props.url,
          dataType : 'json',
          type     : 'GET',
          success  : data => {
              this.setState({ data: data });
              console.log(this.state.data[0]);
          },
          error: (xhr, status, err) => {
              console.error(this.props.url, status, err.toString());
          }
      })
      
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
                        <tr>
                        <th scope="row">1</th>
                            <td>
                                <img src="https://avatars.githubusercontent.com/u/4639625?v=3" alt="user" className="userimage" />
                                <a className="username" href="#">sjames1958gm</a>
                            </td>
                            <td>475</td>
                            <td>39201</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                            <td>
                                <img className="userimage" src="https://avatars.githubusercontent.com/u/4639625?v=3" alt="user" />
                                <a className="username" href="#">sjames1958gm</a>
                            </td>
                            <td>475</td>
                            <td>39201</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                            <td>
                                <img className="userimage" src="https://avatars.githubusercontent.com/u/4639625?v=3" alt="user" />
                                <a className="username" href="#">sjames1958gm</a>
                            </td>
                            <td>475</td>
                            <td>39201</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            </div>
      </div>
    );
  }
}

export default App;
