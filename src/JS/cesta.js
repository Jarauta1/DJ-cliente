import { useState, useEffect} from "react";
import {Link} from "react-router-dom"
/* import '../App.css'; */
import '../CSS/cesta.css';
import logo from "../Imagenes/logo_header_blanco.png"



function Cesta(props) {


    let [usuario,setUsuario] = useState(props.usuario)
    let [total,setTotal] = useState("")
    let [cesta,setCesta] = useState([])

    useEffect(function(){
  
        fetch("http://localhost:3000/usuarios/visualizarCesta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: usuario}),
            }).then((res)=>res.json()).then((res)=>{
               console.log(res)
               setCesta(res.datos[0].cesta)
               setTotal(parseFloat(res.total))
               
                     
                
            })
          
      },[usuario])


      function comprar() {
        window.alert("compra realizada")
        fetch("http://localhost:3000/usuarios/compras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({usuario: usuario}),
            }).then((res)=>res.json()).then((res)=>{
               console.log(res)
               setCesta(res.datos[0].cesta)
               setTotal(parseFloat(res.total))
               
                     
                
            })
      }

      let mostrarCesta = cesta.map(producto=>{
          return(<>
          <div class="product">
    <div class="product-image">
      <img src={producto.cartel}/>
    </div>
    <div class="product-details">
      <div class="product-title">{producto.titulo}</div>
      <p class="product-description">Sección: {producto.producto}</p>
    </div>
    <div class="product-price">{producto.precio} €</div>
    <div class="product-quantity">
      <input type="number" value={producto.cantidad} min="1"/>
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Eliminar
      </button>
    </div>
    <div class="product-line-price">{producto.precio} €</div>
  </div>
          </>)
      })

        return(<div className="body-cesta">
         <h2 className="h2-cesta">Cesta</h2>

<div class="shopping-cart">

  <div class="column-labels">
    <label class="product-image">Imagen</label>
    <label class="product-details">Producto</label>
    <label class="product-price">Precio</label>
    <label class="product-quantity">Cantidad</label>
    <label class="product-removal">Eliminar</label>
    <label class="product-line-price">Total</label>
  </div>

  

 {mostrarCesta}

  <div class="totals">
    <div class="totals-item">
      <label>Total</label>
      <div class="totals-value" id="cart-subtotal">{total} €</div>
    </div>
    
  </div>
      
      <Link to="/cesta_finalizada"><button onClick={comprar} class="checkout">Comprar</button></Link>

</div>
        </div>)
    


    
    }

export default Cesta;