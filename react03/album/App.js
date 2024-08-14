import { useState } from "react";
import Photo from "./src/Photo";

const App = () => {
    const [photoArr, setPhotoArr] = useState([
        {no:1, img:"images/img_5terre.jpg", title:"5terre", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:2, img:"images/img_Corniglia.jpg", title:"Corniglia", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:3, img:"images/img_Manarola.jpg", title:"Manarola", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:4, img:"images/img_Monterosso.jpg", title:"Monterosso", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:5, img:"images/img_Riomaggiore.jpg", title:"Riomaggiore", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:6, img:"images/img_Vernazza.jpg", title:"Vernazza", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
    ]);
    return(
        <div className="w3-content">
            {
                photoArr.map(function(item, idx) {
                    return(<Photo key={item.no} item={item}/>);
                })
            }
        </div>
    );
}




export default App;