let apiUrl;
const apiUrls = {
  production: "https://fathomless-dusk-33104.herokuapp.com",
  development: "http://localhost:3001"
};

// if (window.location.hostname === "localhost") {
//   apiUrl = apiUrls.development;
// } else {
//   apiUrl = apiUrls.production;
// }



apiUrl = apiUrls.production;

export default apiUrl;
