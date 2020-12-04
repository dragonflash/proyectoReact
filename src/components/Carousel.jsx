import React from "react"
import "../assets/styles/components/Carousel.scss"

//children seran los items del carousel
const Carousel = ( { children }) => (
    <section className = "carousel">
       <div className="carousel__container">
           { children }
       </div>
    </section>
)

export default Carousel