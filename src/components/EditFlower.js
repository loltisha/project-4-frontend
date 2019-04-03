import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setUser } from "../services/AuthService";
class EditStore extends Component {
  state = {
    formData: {
      type: "",
      price: "",
      information: "",
      image: "",
    },
    err: null
  };

  componentDidMount(){
    let url = `${apiUrl}/api/store/${this.props.id}/flowers`;

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
          this.setState({ formData: data.store.Flowers[0] });
        }
      })
      .catch(e => console.log(e));
  }
  handleUpdateRequest = flower => {
    let url = `${apiUrl}/api/flower/${this.props.id}`;

    console.log(url);
    fetch(url, {
      mode: "cors",
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({flower: flower})
    })
      .then(res => res.json())
      .then(data => {
        if (data.status > 200) this.setState({ err: data.message });
        else {
            alert("folwer edited");
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
        <h1>Please Edit The Flower Information</h1>
        {this.state.err ? (
          <div className="alert alert-danger"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Flower Name </label>
            <input
              name="type"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formData.type}
            />
            <label> Price</label>
            <input
              name="price"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formData.price}
            />
            <label> Flower Details</label>
            <input
              name="information"
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formData.information}
            />
            <label> Flower Image</label>
            <input
              name="image"
              className="form-control"
              type="text"
              onChange={this.handleChange}
              value={this.state.formData.image}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Edit Flower
          </button>
        </form>
      </div>
    );
  }
}

export default EditStore;
