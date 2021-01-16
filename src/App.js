/* import logo from './logo.svg'; */
import './App.css';

import {BrowserRouter, Route} from "react-router-dom"

import Header from "./JS/Header.js"
import Peliculas from "./JS/peliculas.js"
import Portada from "./JS/portada.js"
import Libros from "./JS/libros.js"
import Footer from "./JS/Footer.js"


function App() {

  return(<BrowserRouter>
  <Header/>
  <Route exact path="/">
    <br></br>
<div className="promociones"><p>PROMOCIONES</p><hr></hr></div>

<div><Portada/></div>
  </Route>
  <Route exact path="/ropa">
<div><p>Ropa</p></div>
  </Route>
  <Route exact path="/zapatillas">
<div><p>Zapatillas</p></div>
  </Route>
  <Route exact path="/peliculas">
<div><Peliculas/></div>
  </Route>
  <Route exact path="/libros">
<div><p>Libros</p></div>
<Libros />
  </Route>
  <Route exact path="/gammer">
<div><p>Videojuegos</p></div>
  </Route>
  <Footer/>
  </BrowserRouter>)
  
}

export default App;


/* https://rapidapi.com/collection/how-to-get-amazon-product-reviews-api */
/* https://rapidapi.com/collection/amazon-products */
/* https://rapidapi.com/blog/email-apis-which-one-is-right-for-you/ */
/* https://blog.api.rakuten.net/top-retail-product-apis/ */