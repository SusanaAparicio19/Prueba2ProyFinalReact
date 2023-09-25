import './ItemDetailContainer.module.css'
import { useState, useEffect } from 'react'
/*import { getProductById } from '../../asyncMock'*/
import ItemDetail  from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'
import { getDoc, doc, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

const ItemDetailContainer = () => {
	const [product, setProduct]  = useState (null)
	const [loading, setLoading] = useState(true)

	const { itemId } = useParams()

	useEffect(()  => {
		setLoading(true)

		const productRef = doc(db, 'products', itemId)

		getDoc(productRef)
			.then(documentSnapshot => {
				console.log(documentSnapshot)
				const fields = documentSnapshot.data()
				const productsAdapted = {id: documentSnapshot.id, ...fields}
				setProduct(productsAdapted)
			})
			.catch(error => {
				console.error(error)
			})
			.finally(() => {
				setLoading(false)
			})

	}, [itemId])

	
	return (
		<div className= 'ItemDetailContainer'>
			<ItemDetail {...product}/>
		</div>
	)
}

export default ItemDetailContainer