import React, {useState, useEffect} from "react"
import Header from "../components/Header"
import "../assets/styles/App.scss"
import Search from "../components/Search"
import Categories from "../components/Categories"
import Carousel from "../components/Carousel"
import CarouselItem from "../components/CarouselItem"
import Footer from "../components/Footer"
import useInitialState from "../hooks/useInitialState"

//Se crea una constante de array con dos elementos, el primero es la variable
//de estado y el segundo es la variable que actualizara ese estado
// useState permite brindar estado al componente, este estado se tiene que
//inicializar, puede ser cualquier tipo de elemento, ya sea string, number, array
//etc.

//useEffect es el que se encarga de resolver las peticiones o eventos que ocurriran
//el estado, recibe una funcion que se encarga de resolver las peticiones y pasarle
//la informacion de esa peticion a la variable que actualiza el estado.

//useEffect tiene un segundo parametro el cual es el que escucha si una propiedad
//ha sido cambiada o modificada, es importante ponerlo porque sino se crea un bucle
//infinito. 

const API = 'http://localhost:3000/initialState'

const App = () => {
    /*const [videos, setVideos] = useState({ mylist: [], trends: [],
    originals: []})

    useEffect(() => {
        fetch('http://localhost:3000/initialState')
        .then(response => response.json())
        .then(data => setVideos(data))
    }, [])*/

    const initialState = useInitialState(API)

    return initialState.length === 0 ? <h1>Loading...</h1> : (
        <div className="App">
            <Header />
            <Search />

            {
                //Agregando Validacion, si el arreglo mylist esta vacio
                //Que no se muestre el componente.
                //videos.mylist.length > 0 &&
                initialState.mylist.length > 0 && 
                <Categories title="Mi lista">
                    <Carousel>
                        {
                            initialState.mylist.map(item => 
                                <CarouselItem key={item.id} {...item} />
                            )
                            
                        }
                        
                    </Carousel>
                </Categories>

            }
            

            <Categories title="Tendencias">
                <Carousel>
                    {
                        //Se itera a traves del array trends para pasarle toda
                        //la informacion de ese array a CarouselItem.
                        //videos.trends.map(item =>
                        initialState.trends.map(item =>
                            <CarouselItem key={item.id} {...item}/>
                        )    
                    }              
                </Carousel>
            </Categories>

            <Categories title="Originales de Platzi">
                <Carousel>
                    {
                        initialState.originals.map(item =>
                            <CarouselItem key={item.id} {...item} />
                        )
                        
                    }
                    
                </Carousel>
            </Categories>

            <Footer />
        </div>
    )
}

export default App