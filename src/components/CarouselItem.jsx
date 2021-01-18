import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setFavorite, deleteFavorite } from "../actions"
import PropTypes from "prop-types"
import "../assets/styles/components/CarouselItem.scss"
import plusIcon from "../assets/static/plus-icon.png"
import playIcon from "../assets/static/play-icon.png"
import removeIcon from "../assets/static/removeIcon.png"

const CarouselItem = (props) => {
    const { id, cover, title, year, contentRating, duration, isList} = props 
    const handleSetFavorite = () => {
        props.setFavorite({
            id, cover, title, year, contentRating, duration
        })
    }

    const handleDeleteFavorite = (itemId) => {
        props.deleteFavorite(itemId)
    }

    return (
        <div className="carousel-item">
            <img src= { cover } alt={title} />
            <div className="carousel-item__details">
                <div>

                    {
                        isList ? 
                        <img 
                        src= { removeIcon } 
                        alt="Remove"
                        //Se crea una funcion que retorna la funcion handle
                        //Porque hay que pasar un parametro.
                        onClick= { () => handleDeleteFavorite(id)} 
                        /> :
                        <img 
                        src= { plusIcon } 
                        alt="Plus" 
                        onClick= { handleSetFavorite } 
                        />

                    }

                    <Link to={`/player/${id}`}>
                        <img src= { playIcon } alt="Play" />  
                    </Link>       
                </div>  
                <p>{title}</p>
                <p>{`${year} ${contentRating} ${duration}`}</p>
            </div> 
        </div> 
    )
    
}

CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number
}

const mapDispatchToProps = {
    setFavorite,
    deleteFavorite
}

//export default CarouselItem
export default connect(null, mapDispatchToProps)(CarouselItem)