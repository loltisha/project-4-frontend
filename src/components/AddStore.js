import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setUser } from "../services/AuthService";
class Addstore extends Component {
  state = {
    formData: {
      store_name: null,
      location: null,
      store_email: null,
      store_phone: null,
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/store-form`;

    console.log(url);
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 200) this.setState({ err: data.message });
        else {
          this.setState({ err: null });
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
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        <h1>Please Enter The Store Information</h1>
        {this.state.err ? (
          <div className="alert alert-danger"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>store_name </label>
            <input
              name="store_name"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>location</label>
            <input
              name="location"
              className="form-control"
              type="location"
              onChange={this.handleChange}
            />
            <label>store_email</label>
            <input
              name="store_email"
              className="form-control"
              type="store_email"
              onChange={this.handleChange}
            />
            <label>store_phone</label>
            <input
              name="store_phone"
              className="form-control"
              type="store_phone"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Addstore;
