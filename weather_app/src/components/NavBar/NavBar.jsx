import React from 'react'
import "./NavBar.css";
import logo from "../../assets/logo.png";
const NavBar = () => {
 return <section className='nav-section'>
    <nav>
        <img src={logo} alt="logo" />
    <ul>
        <li> <ion-icon name="home-outline"></ion-icon><span>Home</span></li>
        <li><ion-icon name="document-text-outline"></ion-icon><span>Blogs</span></li>
        <li><ion-icon name="map-outline"></ion-icon><span>Maps</span></li>
        <li><ion-icon name="videocam-outline"></ion-icon><span>Video</span></li>
        <li><ion-icon name="images-outline"></ion-icon><span>Photos</span></li>
        <li><ion-icon name="call-outline"></ion-icon><span>Phone</span></li>
    </ul>
    <ul className='logout'>
        <li><ion-icon name="log-out-outline"></ion-icon><span>Log Out</span></li>
    </ul>
    </nav>
 </section>
};

export default NavBar