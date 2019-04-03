import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setUser } from "../services/AuthService";
class Addstore extends Component {
  state = {
    formData: {
      store_name: null,
      location: null,
      email: null,
      phone: null,
      image: null
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/api/store`;

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
          alert("store added");
          this.props.changeToAddFlower(data.store.id);
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
            <label>Store Name </label>
            <input
              required
              name="store_name"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Location</label>
            <input
              required
              name="location"
              className="form-control"
              type="location"
              onChange={this.handleChange}
            />
            <label> Email</label>
            <input
              required
              name="email"
              className="form-control"
              type="email"
              onChange={this.handleChange}
            />
            <label> Phone Number</label>
            <input
              required
              name="phone"
              className="form-control"
              type="phone"
              onChange={this.handleChange}
            />
            <label> Store Image</label>
            <input
              required
              name="image"
              className="form-control"
              type="text"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Store
          </button>
        </form>
      </div>
    );
  }
}

export default Addstore;
