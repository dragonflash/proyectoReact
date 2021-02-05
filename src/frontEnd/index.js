import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import HelloWord from './components/HelloWord';
import reducer from './reducers';
import App from './routes/App';
//El estado inicial que se le pasara al store
//import initialState from "./initialState"

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;

//Creando el store. La funcion createStore recibe dos parametros, el reducer
// y el estado inicial de la aplicacion.

//Con SSR ya no llamamos al estado inicial sino que llamamos a preloadedState

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState, composeEnhancers());

//No permite que se muestre en consola el preoloadedState
delete window.__PRELOADED_STATE__;

//Se le asigna la propiedad store a Provider para que la aplicacion se conecte
//al store que se creo.

//Router history pone el enrutador del lado del cliente. Esto es de
//Server Side Render.
ReactDom.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
