import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';


class Heading extends Component {

    buildClass() {
        var cl = "fa fa-sort-amount-desc";
        if (this.props.isActive) {
            return cl + " active";
        }
        else {
            return cl;
        }
    }
    render() {
        return (
            <th>
                { this.props.label }
                <i onClick={this.props.handleClick}
                   id={this.props.isRecent ? "recent" : "alltime" }
                   className={this.buildClass()} aria-hidden="true"></i>
           </th>
        );

    }
}

class LeaderBoard extends Component {

    fccLink(username) {
        return "https://freecodecamp.com/" + username;
    }
    render() {
        let leaderNodes = this.props.data.map(function(leader, index) {
            return(
                    <tr key={index}>
                    <td className="col-xs-1">
                      {index+1}
                    </td>

                    <td className="col-md-4">
                    <img src={leader.img} alt={leader.username} className="userimage" />
                    <a className="username" href={this.fccLink(leader.username)}>{ leader.username }</a>
                    </td>
                    <td>{leader.alltime}</td>
                    <td>{leader.recent}</td>
                    </tr>
            );
        }.bind(this));
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
                <Heading label="Past 30 days"
                    isRecent={true}
                    handleClick={this.props.handleClick }
                    isActive={this.props.isRecentActive}/>
                <Heading
                    isRecent={false}
                    label="All Time Points"
                    isActive={!this.props.isRecentActive}
                    handleClick={this.props.handleClick } />
     
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
          alltime: [],
          isRecentActive: true
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
  }
  componentDidMount() {
      this.loadDataFromServer();
  }
  handleClick(e) {
      let col = e.target.id;
      if (col === "alltime" && this.state.isRecentActive) {
          this.setState( { isRecentActive: false } );
      }
      else if (col === "recent" && !this.state.isRecentActive ) {
          this.setState( { isRecentActive: true } );
      }
  }
  render() {
    return (
      <div className="container">
            <div className="row title">
            <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="freecodecamp-logo" />
            </div>
            <LeaderBoard
               data={this.state.isRecentActive ? this.state.recent : this.state.alltime }
               handleClick={this.handleClick.bind(this)}
               isRecentActive={this.state.isRecentActive}
            />
      </div>
    );
  }
}

export default App;
