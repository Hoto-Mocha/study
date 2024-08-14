const close = function() {
    document.getElementById("mySidebar").style.display = "none";
}
const Sidebar = () => {
    return(
        <nav className="w3-sidebar w3-bar-block w3-card w3-top w3-xlarge w3-animate-left" style={{display:"none", zIndex:"2", width:"40%", minWidth:"300px"}} id="mySidebar">
            <a href="" onClick={close}
            className="w3-bar-item w3-button">Close Menu</a>
            <a href="#food" onClick={close} className="w3-bar-item w3-button">Food</a>
            <a href="#about" onClick={close} className="w3-bar-item w3-button">About</a>
        </nav>
    );
}

export default Sidebar;