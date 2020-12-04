import React from "react"
import "../assets/styles/components/Header.scss"
import logo from "../assets/static/logo-platzi.png"
import userIcon from "../assets/static/user-icon.png"

const Header = () => (
    <header className="header">
       <img src= { logo } alt="logo" />
       <div className = "header__menu">
           <div className = "header__menu--profile">
                <img src= { userIcon } alt="Usuario" />
                <p>Perfil</p>
           </div>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="#">Cerrar Sesión</a></li> 
            </ul>
        </div>
    </header> 

)

export default Header