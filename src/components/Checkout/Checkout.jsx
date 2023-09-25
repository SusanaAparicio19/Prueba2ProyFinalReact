import { useCart } from '../../context/CartContext'
import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { useState } from 'react'
import ContactForm from '../ContactForm/ContactForm'
import { Link } from 'react-router-dom'


const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const {cart, total, clearCart} = useCart()
    
    const createOrder = async ({ nombre, telefono, email }) => {
        try {
            setLoading(true)
            const objOrder = {
                buyer: {
                    nombre,
                    telefono,
                    email
                },
                items: cart,
                total
                
            }

            const batch = writeBatch(db)
            const outOfStock = []

            const ids = cart.map(prod => prod.id)
            console.log(ids)

            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))

            const { docs } = await getDocs(productsRef)

            docs.forEach(doc => {
                const fields = doc.data()
                const stockDb = fields.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const productQuantity = productAddedToCart?.quantity

                if (stockDb >= productQuantity) {
                    batch.update(doc.ref, { stock: stockDb - productQuantity})

                }else {
                    outOfStock.push({ id: doc.id, ...fields})
                }
            })

            if(outOfStock.length === 0) {
                const orderRef = collection(db, 'orders')

                const { id: orderId } = await addDoc(orderRef, objOrder)
                
                batch.commit()
                clearCart()
                setOrderId(orderId)
               
            }else {
                return <h2>Hay Productos Sin Stock...</h2>
            }
        } catch (error) {
            return <h2>Ups.. Ocurrio Un Error Al Cargar Los Datos: ' + error.message</h2>
        } finally {
            setLoading(false)
        }
    }

    if(loading === true) {
        return (
            <>
                <h2>Se esta generando su orden...</h2>
                
            </>
        )
    }
           
    return (
        <>
          <ContactForm createOrder={createOrder} />
        </>
     )
      
      
   
}

export default Checkout

