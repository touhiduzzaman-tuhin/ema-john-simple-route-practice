import React, { useEffect, useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        // console.log('Product added');
        // console.log(product);

        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        
        if(sameProduct){
            count = count + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
        // const newCart = [...cart, product];
        // setCart(newCart);

        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count);
    }

    useEffect( () => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            // console.log(saveCart[key]);
            return product;
        })
        setCart(previousCart);
        // console.log(saveCart);
    }, [])
    return (
        <div className='main-shop-body'> 
            <div className='search-box'>
                <p>
                    <input autoFocus type="text" name="" className="searchProduct" id=""/>
                    &nbsp;&nbsp; <FontAwesomeIcon icon={ faShoppingCart }></FontAwesomeIcon>
                    &nbsp; <span style={{color: 'red'}}>{cart.length}</span>
                </p>
            </div>           
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product addToCartButton = {true} key={product.key} handleAddProduct = {handleAddProduct} product={product}></Product>)
                    }
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className='addProductButton'>
                                Review Order
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;