import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from "react";
import { renderToString} from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../frontEnd/routes/serverRoutes";
import reducer from "../frontEnd/reducers";
import initialState from "../frontEnd/initialState";
import getManifest from "./getManifest";

dotenv.config()

const {ENV, PORT} = process.env
const app = express();

if (ENV === "development")
{
    console.log("Development config")
    const webpackConfig = require("../../webpack.config")
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = { serverSideRender: true, publicPath };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
    
}
else 
{
    //Middleware para leer y enviar el archivo manifest
    //al request de la aplicacion 
    app.use((req, res, next) => {
        if(!req.hashManifest) req.hashManifest = getManifest()
        next()
    })
    app.use(express.static(`${__dirname}/public`))
    app.use(helmet())
    app.use(helmet.permittedCrossDomainPolicies())
    app.disable('x-powered-by')
}

//Esta funcion es la que trae la app del frontEnd
//Para que se renderice en el server
const setResponse = (html, preloadedState, manifest) => {
  const mainStyle = manifest ? manifest['main.css'] : 'assets/app.css'
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js'

  return (`
  <!DOCTYPE html>
  <html>
     <head>
         <link rel="stylesheet" href="${ mainStyle }" type="text/css"/>
         <title>Proyecto React</title>
     </head>
 
     <body>
         <div id = "app">${ html }</div>
     </body>
     <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
     <script src="${ mainBuild }" type="text/javascript"></script>
     <script src="${ vendorBuild }" type="text/javascript"></script>
  </html>
  `)
}

//Esta funcion permite renderizar la aplicacion en un string y aplicar
//Server Side Render.
const renderApp = (req, res) => {
  const store = createStore(reducer, initialState)
  //Esta constante permite precargar el 
  //initialState del lado del servidor.
  const preloadedState = store.getState()
  const html = renderToString(
    <Provider store = { store }>
      <StaticRouter location={ req.url } context={{}}>
        { renderRoutes(routes) }
      </StaticRouter>
    </Provider>
  )
  
  res.send(setResponse(html, preloadedState, req.hashManifest))
}

/*app.get('*', (req, res) => {
  res.send();
});*/

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${PORT}`);
});