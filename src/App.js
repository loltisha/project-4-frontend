import React, { Component } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { getUser, Signout } from "./services/AuthService";
import SigninForm from "./components/authForm.js/SigninForm";
import SignupForm from "./components/authForm.js/SignupForm";
import ChangePasswordForm from "./components/authForm.js/ChangePasswordForm";
import Home from "./components/Home";
import AddStore from "./components/AddStore";
import ViewStore from "./components/ViewStore";
import EditStore from "./components/EditStore";
class App extends Component {
  state = {
    user: null,
    activePage: "home",
    storeId: null
  };
  componentDidMount() {
    // check if we have a token in the local storage
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }

  changeActivePage = activePage => {
    this.setState({ activePage });
  };
  onSignin = () => {
    this.setState({ user: getUser() });
    this.changeActivePage("sigin in");
    // this.changeActivePage("add-store");
    
  };
  onSignout = () => {
    console.log("sigin out");
    this.setState({ user: null });
    this.changeActivePage("home")
    Signout();
  };

  changeToEditStore = (id) => {
    console.log(id)
    this.setState({ storeId: id});
    this.changeActivePage("edit-store");
  }

 
  render() {
    const { user, activePage } = this.state;
    return (
      <div>
        <Nav
      
          user={user}
          changeActivePage={this.changeActivePage}
          onSignout={this.onSignout}
        />

        <div className="container">
          {activePage === "home" ? <Home /> : ""}
          {activePage === "sign-in" ? (
            <SigninForm onSignin={this.onSignin} />
          ) : (
            ""
          )}
          {activePage === "sign-up" ? (
            <SignupForm onSignin={this.onSignin} />
          ) : (
            ""
          )}
          {activePage === "change-password" ? (
            <ChangePasswordForm changeActivePage={this.changeActivePage} />
          ) : (
            ""
          )}
          {activePage === "add-store" ? <AddStore changeActivePage={this.changeActivePage} /> : ""}
          {activePage === "view-store" ? <ViewStore changeActivePage={this.changeActivePage} changeToEditStore={this.changeToEditStore} /> : ""}
          {activePage === "edit-store" ? <EditStore changeActivePage={this.changeActivePage} 
                                                    id={this.state.storeId} /> : ""}
        </div>
      </div>
    );
  }
}

export default App;
