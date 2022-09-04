import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

/* HOME IMPORT */
import Home from "./components/home/Home";

/* BUSINESS IMPORTS */
import AddBusiness from "./components/business/AddBusiness";
// import Business from "./components/business/Business";
import BusinessList from "./components/business/BusinessList";

/* USER IMPORTS */
// import AddUser from "./components/users/AddUser";
// import User from "./components/users/User";
import UserList from "./components/users/UserList";

/* POINTS IMPORTS */
// import AddPoint from "./components/points/AddPoint";
// import Points from "./components/points/Points";
import PointList from "./components/points/PointList";

/* PUBLICATIONS IMPORTS */
// import AddPublication from "./components/publications/AddPublication";
// import Publication from "./components/publications/Publication";
import PublicationList from "./components/publications/PublicationList";

/* SELLGINS IMPORTS */
import SellingList from "./components/sellings/SellingList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          SuperRatas
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/business"} className="nav-link">
              Business
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/points"} className="nav-link">
              Type Points
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/publication"} className="nav-link">
              Publications
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sellings"} className="nav-link">
              Sellings
            </Link>
          </li>         
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path="/business" component={BusinessList} />
          <Route exact path="/business/add" component={AddBusiness} />
          <Route exact path="/user" component={UserList} />
          <Route exact path="/points" component={PointList} />
          <Route exact path="/publication" component={PublicationList} />
          <Route exact path="/sellings" component={SellingList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
