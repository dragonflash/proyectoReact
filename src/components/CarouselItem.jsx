import React from "react"
import PropTypes from "prop-types"
import "../assets/styles/components/CarouselItem.scss"
import paisaje from "../assets/static/paisaje1.jpg"
import plusIcon from "../assets/static/plus-icon.png"
import playIcon from "../assets/static/play-icon.png"

const CarouselItem = ({ cover, title, year, contentRating, duration}) => (
    <div className="carousel-item">
        <img src= { cover } alt={title} />
            <div className="carousel-item__details">
                <div>
                    <img src= { plusIcon } alt="Plus" />
                    <img src= { playIcon } alt="Play" />  
                </div>  
                <p>{title}</p>
                <p>{`${year} ${contentRating} ${duration}`}</p>
            </div> 
    </div>
)

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number
}


export default CarouselItem