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
import AddFlower from "./components/AddFlower";
import ViewFlower from "./components/ViewFlower";
import EditFlower from "./components/EditFlower";
import rain from "./components/audio/Kiss the Rain - Yiruma.mp3";

//  import rain from "../audio/KisstheRain-Yiruma-Arabsong.mp3";
// import ReactAudioPlayer from 'react-audio-player';

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
    this.changeActivePage("home");
    // this.changeActivePage("add-store");
    
  };
  onSignout = () => {
    console.log("sigin out");
    this.setState({ user: null });
    this.changeActivePage("home")
    Signout();
  };

  changeToEditStore = (id) => {
    console.log('changeToEditStore ', id)
    this.setState({ storeId: id});
    this.changeActivePage("edit-store");
  }

  changeToEditFlower = (id) => {
    console.log(id)
    this.setState({ storeId: id});
    this.changeActivePage("edit-flower");
  }
  changeToAddFlower = (id) => {
    console.log(id)
    this.setState({ storeId: id});
    this.changeActivePage("add-flower");
  }
  changeToViewFlower = (id) => {
    console.log(id)
    this.setState({ storeId: id});
    this.changeActivePage("view-flower");
  }
  render() {
    const { user, activePage } = this.state;
    return (
      <div>
        
          <audio src ={rain} loop controls autoPlay />
        {/* <ReactAudioPlayer src= {rain} autoPlay controls/> */}
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
          {activePage === "add-store" ? <AddStore changeActivePage={this.changeActivePage} changeToAddFlower={this.changeToAddFlower} /> : ""}
          {activePage === "view-store" ? <ViewStore changeToViewFlower={this.changeToViewFlower} changeActivePage={this.changeActivePage} changeToEditStore={this.changeToEditStore} changeToAddFlower={this.changeToAddFlower}/> : ""}
          {activePage === "edit-store" ? <EditStore changeActivePage={this.changeActivePage} 
                                                    id={this.state.storeId} /> : ""}
          {activePage === "add-flower" ? <AddFlower changeActivePage={this.changeActivePage}
                                                    id={this.state.storeId}
                                                    changeToViewFlower={this.changeToViewFlower} /> : ""}
          {activePage === "view-flower" ? <ViewFlower id={this.state.storeId} changeActivePage={this.changeActivePage} changeToEditFlower={this.changeToEditFlower} changeToAddFlower={this.changeToAddFlower}/> : ""}
          {activePage === "edit-flower" ? <EditFlower changeActivePage={this.changeActivePage} 
                                                    id={this.state.storeId} /> : ""}
                                          
        </div>
      </div>
    );
  }
}

export default App;
