import React from "react";
import apiUrl from "../apiConfig";
import { getUser  } from "../services/AuthService";
class ViewFlower extends React.Component {
   state = {
    flowers: []
  };
  // state = {
  //   flowers: [{store_name: 'shop', phone: '232'},{store_name: 'shop', phone: '232'}, {store_name: 'shop', phone: '232'}]
  // };

  handleFlowerRequest() {
    console.log("view flower")
    const user = getUser();
    console.log("the user id is ", user.id);
    const url = `${apiUrl}/api/store/${this.props.id}/flowers`;

    fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
          console.log(response.body);
          return response.json()
      })

      .then(data => {
          console.log(data);
          this.setState({ flowers: data.store.Flowers })
      })
      .catch(e => console.log(e));
  }


  componentDidMount() {
   this.handleFlowerRequest();
 }


// delete the flower for specific user
 handleFlowerDeleteRequest = (storeID, event) => {
   event.preventDefault();
    // api req delete by id
    console.log("view flower")
    const user = getUser();
    console.log("the user id is ", user.id);
    const url = `${apiUrl}/api/flower/${storeID}`;
    console.log('url is ', url)
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
          console.log(response.body);
          return response.json()
      })

      .then(data => {
          console.log(data);
          this.handleFlowerRequest()
      })
      .catch(e => console.log(e));
  }

  render() {
      let noflowers;
      if (this.state.flowers.length === 0) {
        noflowers = <div className="alert alert-danger no" role="alert"> <p>You have no flowers, please add one 🌸</p></div> 
      } else {
        noflowers = ""
      }
      const flowers = this.state.flowers.map(flowers => {
        return (
          <div className="col-6">
            <div className="card" style={{width: "30rem"}}>
               <img className="card-img-top" src={flowers.image} width="600" height="300" alt="Card image cap"/> 
              <div className="card-body">
                {/* <h5 className="card-title">florist store</h5> */}
                <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>Flower Name: </h3> <p>{flowers.type} </p></li>
                <li className="list-group-item"><h3>Price: </h3> <p>{flowers.price} </p></li>
                <li className="list-group-item"><h3>Flower Information: </h3> <p>{flowers.information} </p></li>
              </ul>
              </div>
            
              <div className="card-body">
              <button type="button" className="btn btn-warning"><a onClick={() => this.props.changeToEditFlower(flowers.id)} href="#" className="card-link">Edit Flower </a></button> 
              <button type="button" className="btn btn-warning"><a onClick={(event)=>this.handleFlowerDeleteRequest(flowers.id, event)} href="#" className="card-link">delete Flower</a></button>

              </div>
            </div> 
          </div>
        );
      });

     return <div className="row">
      
        {flowers}
        {noflowers}
    
     </div>;
  }
}

export default ViewFlower;
