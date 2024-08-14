import Sidebar from "./components/Sidebar";
import TopMenu from "./components/TopMenu";
import PhotoGrid from "./components/PhotoGrid";
import Pagination from "./components/Pagination";
import About from "./components/About";
import Footer from "./components/Footer";
import BlogPosts from "./components/BlogPosts";
import PopularTags from "./components/PopularTags";
import { useState } from "react";

const App = () => {
    const [photoArr1, setPhotoArr1] = useState([
        {no:1, img:"images/sandwich.jpg", alt:"Sandwich", title:"The Perfect Sandwich, A Real NYC Classic", desc:"Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum."},
        {no:2, img:"images/steak.jpg", alt:"Steak", title:"Let Me Tell You About This Steak", desc:"Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum."},
        {no:3, img:"images/cherries.jpg", alt:"Cherries", title:"Cherries, interrupted", desc:"Lorem ipsum text praesent tincidunt ipsum lipsum.<br><br>What else?"},
        {no:4, img:"images/wine.jpg", alt:"Pasta and Wine", title:"Once Again, Robust Wine and Vegetable Pasta", desc:"Lorem ipsum text praesent tincidunt ipsum lipsum."}
    ]);
    const [photoArr2, setPhotoArr2] = useState([
        {no:1, img:"images/popsicle.jpg", alt:"Popsicle", title:"All I Need Is a Popsicle", desc:"Lorem ipsum text praesent tincidunt ipsum lipsum."},
        {no:2, img:"images/salmon.jpg", alt:"Salmon", title:"Salmon For Your Skin", desc:"Once again, some random text to lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum."},
        {no:3, img:"images/sandwich.jpg", alt:"Sandwich", title:"The Perfect Sandwich, A Real Classic", desc:"Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum."},
        {no:4, img:"images/croissant.jpg", alt:"Croissant", title:"Le French", desc:"Lorem lorem lorem lorem ipsum text praesent tincidunt ipsum lipsum."}
    ]);
    const [blogArr, setBlogArr] = useState([
        {no:1, img:"images/workshop.jpg"},
        {no:2, img:"images/gondol.jpg"}
    ]);

    return(<>
        <Sidebar />
        <TopMenu />
        <PhotoGrid photoArr1={photoArr1} photoArr2={photoArr2}/>
        <Pagination />
        <hr id="about"/>
        <About />
        <hr/>
        <footer className="w3-row-padding w3-padding-32">
            <Footer />
            <BlogPosts blogArr={blogArr}/>
            <PopularTags />
        </footer>
    </>);
}

export default App;