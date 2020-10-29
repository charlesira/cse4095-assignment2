import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddClass from "./components/add-class.component";
import Class from "./components/class.component";
import ClassList from "./components/class-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/class" className="navbar-brand">
            Charles Ira
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/class"} className="nav-link">
                Class
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/class"]} component={ClassList} />
            <Route exact path="/add" component={AddClass} />
            <Route path="/class/:id" component={Class} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
