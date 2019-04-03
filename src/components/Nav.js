import React from "react";
import logo from "../image/florist١٢.png";
import { getUser } from "../services/AuthService";

const authenticatedOptions = (changeActivePage, onSignout) => {
  const userType = getUser().type
  let addFlowerButton;
  if (userType === "florist") {
    addFlowerButton = (
      <li className="nav-item" onClick={() => changeActivePage("add-store")}>
        <div className="nav-link">Add Store</div>
      </li>
    )
  } else {
    addFlowerButton = ""
  }
  return (
    <React.Fragment>
      {addFlowerButton}
      <li className="nav-item" onClick={() => changeActivePage("view-store")}>
        <div className="nav-link">View Store</div>
      </li>
      {/* <li className="nav-item" onClick={() => changeActivePage("edit-store")}>
        <div className="nav-link">Edit Store</div>
      </li> */}
      <li
        className="nav-item"
        onClick={() => changeActivePage("change-password")}
      >
        <div className="nav-link">Change Password</div>
      </li>
      <li className="nav-item" onClick={() => onSignout()}>
        <div className="nav-link">Sign Out</div>
      </li>
    </React.Fragment>
)};

const unauthenticatedOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => changeActivePage("sign-in")}>
      <div className="nav-link">Sign In</div>
    </li>
    <li className="nav-item" onClick={() => changeActivePage("sign-up")}>
      <div className="nav-link">Sign Up</div>
    </li>
  </React.Fragment>
);

const alwaysOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => changeActivePage("home")}>
      <div className="nav-link">Home</div>
    </li>
  </React.Fragment>
);

const Nav = ({ user, changeActivePage,  onSignout }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: '#ff6347' }}>
    <div className="navbar-brand">Florist</div>
   
<nav className="navbar navbar-light bg-light">
    <img src={logo} width="80" height="80" className="d-inline-block align-top" alt=""/>
</nav>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {alwaysOptions(changeActivePage)}

        {user
          ? authenticatedOptions(changeActivePage, onSignout)
          : unauthenticatedOptions(changeActivePage)}
        {/* {user && (
          <li className="nav-item">
            <div className="nav-link"> Hola, {user.email.split("@")[0]}</div>
          </li>
        )} */}
      </ul>
    </div>
  </nav>
);

export default Nav;
