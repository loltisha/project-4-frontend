import React from "react";
import flower from "../image/ppflorist-vert-3624.jpg";
import flower2 from "../image/ff.jpg"
import flower3 from "../image/images1.jpeg";
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';


const Home = () => <div>
{/* <img src="src/image/florist.png" width="60" height="60"  alt=" Florist"/> */}
<h1>Flower Delivery from Florist</h1>
<hr></hr>
<h4>Bouquets Hand-Delivered by a Local Florist</h4>
<p className= "font">We are proud to offer beautiful flowers that are always hand-arranged and hand-delivered by local florists. We make it easy to send flowers, you can order online from your desktop, tablet, or phone. </p>
<h4>Send Fresh Flowers for Every Occasion</h4>
<p className= "font">If you don’t know what to get, here are some of the best flowers to buy for any occasion. With Teleflora, you can buy cheerful birthday blooms, thoughtful Mother's Day bouquets, funeral and sympathy flower arrangements, and your everyday beautiful florals. </p>


<div className="flex-container"> <img className=" home" src={flower} width="600" height="300"  alt=" Florist"/>  <img className=" home" src={flower2} width="600" height="300"  alt=" Florist"/> 
</div>




<footer><h4>Contact Us</h4>
<SocialIcon url="http://linkedin.com/in/jaketrent" /> <SocialIcon network="twitter" /> <SocialIcon network="pinterest"/>
</footer>

</div>;

export default Home;
