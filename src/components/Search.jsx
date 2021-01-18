import React from "react"
import "../assets/styles/components/Search.scss"
import { connect } from "react-redux"
import { searchVideo } from "../actions"


const Search = (props) => {

    const { searchVideo } = props

    const handleInput = (event) => {
        searchVideo(event.target.value)
    } 
    
    return (
        <section className="main">
            <h2 className="main__title">¿Qué quieres Buscar?</h2>
            <input 
            className="input" 
            type="text" 
            placeholder="Buscar..." 
            onChange={ handleInput }
            />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        searchResult: state.searchResult
    }
    
}

const mapDispatchToProps = {
    searchVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)