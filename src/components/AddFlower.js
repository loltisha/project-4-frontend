import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setUser } from "../services/AuthService";
class AddFlower extends Component {
  state = {
    formData: {
      type: null,
      price: null,
      information: null,
      image: null
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/api/store/${this.props.id}/flowers`;

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
          alert("flower added");
          this.props.changeToViewFlower(this.props.id)
          // this.props.changeActivePage("view-flower");
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
        <h1>Please Enter The flower Information</h1>
        {this.state.err ? (
          <div className="alert alert-danger"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Flower Name </label>
            <input
              required
              name="type"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Price</label>
            <input
              required
              name="price"
              className="form-control"
              type="text"
              onChange={this.handleChange}
            />
            <label>Flower Information</label>
            <input
              required
              name="information"
              className="form-control"
              type="text"
              onChange={this.handleChange}
            />
           
            <label> Flower Image</label>
            <input
              required
              name="image"
              className="form-control"
              type="text"
              onChange={this.handleChange}
              value={this.state.formData.image}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Flower
          </button>
        </form>
      </div>
    );
  }
}

export default AddFlower;
