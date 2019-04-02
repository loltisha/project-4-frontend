import React from "react";
import apiUrl from "../apiConfig";
import { getUser  } from "../services/AuthService";
class ViewStore extends React.Component {
   state = {
    stores: []
  };
  // state = {
  //   stores: [{store_name: 'shop', phone: '232'},{store_name: 'shop', phone: '232'}, {store_name: 'shop', phone: '232'}]
  // };

  handleStoresRequest() {
    console.log("view store")
    const user = getUser();
    console.log("the user id is ", user.id);
    const url = `${apiUrl}/api/user/${user.id}/stores`;

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
          this.setState({ stores: data.user.Stores })
      })
      .catch(e => console.log(e));
  }


  componentDidMount() {
   this.handleStoresRequest();
 }


// delete the store for specific user
 handleStoreDeleteRequest = (storeID, event) => {
   event.preventDefault();
    // api req delete by id
    console.log("view store")
    const user = getUser();
    console.log("the user id is ", user.id);
    const url = `${apiUrl}/api/store/${storeID}`;
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
          this.handleStoresRequest()
      })
      .catch(e => console.log(e));
  }

  render() {
      let noStores;
      if (this.state.stores.length === 0) {
        noStores = <p>You have no stores, please add one</p>
      } else {
        noStores = ""
      }
      const stores = this.state.stores.map(stores => {
        return (
          <div className="col-6">
            <div className="card" style={{width: "30rem"}}>
               <img className="card-img-top" src={stores.image} width="600" height="300" alt="Card image cap"/> 
              <div className="card-body">
                {/* <h5 className="card-title">florist store</h5> */}
                <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>Store: </h3> <p>{stores.store_name} </p></li>
                <li className="list-group-item"><h3>Location: </h3> <p>{stores.location} </p></li>
                <li className="list-group-item"><h3>Email: </h3> <p>{stores.email} </p></li>
                <li className="list-group-item"><h3>Phone: </h3> <p>{stores.phone} </p></li>
              </ul>
              </div>
              {/* <ul className="list-group list-group-flush">
                <li className="list-group-item"><h3>store: </h3> <p>{stores.store_name} </p></li>
                <li className="list-group-item"><h3>location: </h3> <p>{stores.location} </p></li>
                <li className="list-group-item"><h3>email: </h3> <p>{stores.email} </p></li>
                <li className="list-group-item"><h3>phone: </h3> <p>{stores.phone} </p></li>
              </ul> */}
              <div className="card-body">
              <button type="button" className="btn btn-warning"><a onClick={() => this.props.changeToEditStore(stores.id)} href="#" className="card-link">Edit </a></button>
                <button type="button" className="btn btn-warning"><a onClick={(event)=>this.handleStoreDeleteRequest(stores.id, event)} href="#" className="card-link">delete</a></button>
              </div>
            </div> 
          </div>
        );
      });

     return <div className="row">
      
        {stores}
        {noStores}
    
     </div>;
  }
}

export default ViewStore;
