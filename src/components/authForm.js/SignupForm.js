import React, { Component } from "react";
import apiUrl from "../../apiConfig";
import { setUser } from "../../services/AuthService";
class SignupForm extends Component {
  state = {
    formData: {
      email: null,
      password: null,
      password_confirmation: null,
      type: "florist"
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/sign-up`;

    console.log("\n\n\n ****  "  , user)
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ credentials: user })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 299) 
          this.setState({ err: data.message});
        else {
          setUser(data);
          this.props.onSignin();
        }
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleLoginRequest(this.state.formData);
  };

  handleChange = ({ currentTarget }) => {
    const formData = { ...this.state.formData };
    console.log("\n\n\n\n _____" , currentTarget.name , currentTarget.value )
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        <h1>PLEASE SIGNUP</h1>
        {this.state.err ? (
          <div className="alert alert-warning"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>email </label>
            <input
              name="email"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />

            <label>Password Confirmation</label>
            <input
              name="password_confirmation"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />
            
          {/* <div className="btn-group">
              <button type="button" className="btn btn-danger">Choose</button>
              <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
              <a name="choose" onChange={this.handleChange} className="dropdown-item" href="#">Florist</a>
              <a name="choose" onChange={this.handleChange} className="dropdown-item" href="#">Customer</a>
             
          </div>
          </div> */}
          <select name="type"
              className="form-control slectUser"
              onChange={this.handleChange}
              >
        <option value="florist">Florist</option>
        <option value="customer">Customer</option>
        
      </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
