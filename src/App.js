import './App.css';
import {useState,useEffect} from "react"
import {BrowserRouter, Route, Redirect} from "react-router-dom"

import Header from "./JS/Header.js"
import Login from "./JS/login.js"
import Peliculas from "./JS/peliculas.js"
import Portada from "./JS/portada.js"
import Libros from "./JS/libros.js"
import Footer from "./JS/Footer.js"
import PeliculaCard from "./JS/peliculaCard.js"
import Comics from "./JS/comics.js"
import ComicCard from "./JS/comicCard.js"
import Buscador from "./JS/buscador.js"
import Zapatillas from "./JS/zapatillas.js"
import Dashboard from "./Dashboard/dashboard.js"
import Usuario from "./Usuario/usuario.js"
import Cesta from "./JS/cesta.js"
import ZapatillasCard from "./JS/zapatillasCard.js"
import Camisetas from "./JS/camisetas.js"


function App() {

let [usuario, setUsuario] = useState("")
let [mensaje,setMensaje] = useState("")
let [vuelta,setVuelta] = useState("")
let [datos, setDatos] = useState([])
let [nombre, setNombre] = useState()
let [edad, setEdad] = useState()
let [rango,setRango] = useState()

useEffect(function(){
  
  if (usuario !== "") {
  fetch("http://localhost:3000/usuarios/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({usuario: usuario}),
      }).then((res)=>res.json()).then((res)=>{
          setDatos(res.datos[0])
          setNombre(res.datos[0].usuario)

          let anyo = res.datos[0].anyo
          let edad = 2021 - parseInt(anyo)
          setEdad(edad)

          setRango(res.datos[0].rango)
          
      })
    }
},[usuario])

const login = (email, password) => {
  fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({mail: email, password: password}),
  }).then((res)=>res.json()).then((res)=>{
    console.log(res.mensaje)
    setMensaje(res.mensaje)
    if (res.entrar == "si") {
      setVuelta("volver")
      console.log(res.usuario)
      setUsuario(res.usuario)
    }
  })
}

const registrar = (nombre,apellido1,apellido2,fecha,mail,password,confirmarPassword) => {
   console.log(nombre,apellido1,apellido2,fecha,mail,password,confirmarPassword)
    
    if (password.length < 6) {
      document.getElementById("mensajeRegistro").innerHTML = "<span>La contraseña debe tener al menos 6 carácteres</span>"
    } else {
      if (confirmarPassword !== password) {
        document.getElementById("mensajeRegistro").innerHTML = "<span>La contraseña no coincide</span>"
      } else {
        fetch("http://localhost:3000/usuarios/registro",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({nombre: nombre,apellido1: apellido1, apellido2: apellido2, fecha: fecha, mail: mail, password: password}),
        }).then((res)=>res.json()).then((res)=>{
          setMensaje(res.mensaje)
          setUsuario(res.usuario)
          console.log(res)
         /*  setVuelta(true) */
        })
      } 
    }
  
    
  
  
}

/* if(usuario.administrador){
return
}else{
  return <Redirect to="/" />
} */


  return(<BrowserRouter>
  <Header nombre={nombre} usuario={usuario}/>
  <Route exact path="/">
    <br></br>
      <div className="promociones"><p>PROMOCIONES</p><hr></hr></div>
      <div><Portada/></div>
  </Route>
  {/* <Route exact path="/buscador">
    <Buscador/>
  </Route> */}
  <Route exact path="/login">
    <Login vuelta={vuelta} mensaje={mensaje} login={login} registrar={registrar}/>
  </Route>
  <Route exact path="/camisetas">
    <Camisetas edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/zapatillas">
    <Zapatillas edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/zapatillas/:id">
    <ZapatillasCard edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/peliculas">
    <Peliculas edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/peliculas/:id">
    <PeliculaCard edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/libros">
    <Libros edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/comics">
    <Comics edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/comics/:id">
    <ComicCard edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/usuario">
    <Usuario rango={rango} edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/dashboard">
    <Dashboard rango={rango} edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/cesta">
    <Cesta rango={rango} edad={edad} usuario={usuario}/>
  </Route>
  <Route exact path="/cesta_finalizada">
    <Cesta rango={rango} edad={edad} usuario={usuario}/>
  </Route>
  <Footer/>
  </BrowserRouter>)
  
}

export default App;


/* https://rapidapi.com/collection/how-to-get-amazon-product-reviews-api */
/* https://rapidapi.com/collection/amazon-products */
/* https://rapidapi.com/blog/email-apis-which-one-is-right-for-you/ */
/* https://blog.api.rakuten.net/top-retail-product-apis/ */