import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setUser } from "../services/AuthService";
class EditStore extends Component {
  state = {
    formData: {
      store_name: "",
      location: "",
      email: "",
      phone: "",
    },
    err: null
  };

  componentDidMount(){
    let url = `${apiUrl}/api/store/${this.props.id}`;

    console.log(url);
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 200) this.setState({ err: data.message });
        else {
            console.log(data)
          this.setState({ formData: data.store });
        }
      })
      .catch(e => console.log(e));
  }
  handleUpdateRequest = store => {
    let url = `${apiUrl}/api/store/${this.props.id}`;

    console.log(url);
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({store: store})
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 200) this.setState({ err: data.message });
        else {
            alert("store edited");
            this.props.changeActivePage("home");
        }
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleUpdateRequest(this.state.formData);
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
              name="store_name"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formData.store_name}
            />
            <label>Location</label>
            <input
              name="location"
              className="form-control"
              type="location"
              onChange={this.handleChange}
              value={this.state.formData.location}
            />
            <label> Email</label>
            <input
              name="email"
              className="form-control"
              type="email"
              onChange={this.handleChange}
              value={this.state.formData.email}
            />
            <label> Phone Number</label>
            <input
              name="phone"
              className="form-control"
              type="phone"
              onChange={this.handleChange}
              value={this.state.formData.phone}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Edit Store
          </button>
        </form>
      </div>
    );
  }
}

export default EditStore;
