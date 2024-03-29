import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleDelete = id => {
        // console.log(id);
        const uri = `http://localhost:5000/products/${id}`
        fetch(uri, {
            method: 'DELETE',
            // headers: {
            //     "content-type": "application/json"
            // },
            // body: id,
        }).then(res => res.json())
            .then(data => {
                if (data > 0) {
                    alert('Products Removed Successfully!')
                    const updateProducts = products.filter(product => product._id !== id)
                    setProducts(updateProducts)
                }
            })
    }

    return (
        <div>
            <h2>Products</h2>
            <ol>
                {
                    products.map(product => <li key={product._id}>Name: {product.name} || Price: {product.price} || Quantity: {product.quantity}
                        <Link to={`/products/update/${product._id}`}><button>Update</button></Link>
                        <button onClick={() => handleDelete(product._id)}>X</button></li>)
                }
            </ol>
        </div>
    );
};

export default Products;