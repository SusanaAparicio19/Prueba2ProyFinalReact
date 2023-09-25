import classes from './ContactForm.module.css'
import { useState } from "react"


const ContactForm = ({ createOrder }) => {

    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')



    return (
        <>
        <h2 className="animate__animated animate__fadeInTopLeft">Checkout</h2>
			<div className={classes.contenedorContacto}>
                <form className="animate__animated animate__fadeInTopLeft form" onSubmit={() => createOrder({ nombre, telefono, email })}>
  					<label>Nombre:</label>
					<input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe Tu Nombre y Apellido" maxLength="40" size="50"/>
					<label>Telefono :</label>
					<input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Escribe Tu Telefono" maxLength="40" size="50"/>
					<label>Email :</label>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Escribe Tu Email" maxLength="40" size="50"/>
                    <br/>
				    <button className={classes.buttonForm}>Generar Orden</button>
                </form> 
			</div>
        </>
    )
}

export default ContactForm

