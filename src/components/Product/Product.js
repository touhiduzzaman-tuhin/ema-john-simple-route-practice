import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    // console.log(props.product);
    const {name, key, price, stock, seller, category, img, shipping, features} = props.product;
    const categoryUpper = category.toUpperCase();
    const addToCartButton = props.addToCartButton;

    const notFound = ['Product Features Coming Soon....'];
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h3 className="product-name">
                    <Link to={"/product/"+key}>{name}</Link>                   
                </h3>
                <hr/>
                <div className='product-description'>
                    <div>
                        <p>Category - {categoryUpper}</p>
                        <p>By - {seller}</p>
                        <h3 className="price-style"> ${price}</h3>
                        <p>Shipping Cost - ${shipping}</p>
                        <p>Only <span className="stock-style">{stock}</span> Left in stock - Order Soon</p>

                        {
                            addToCartButton === true && <button onClick={() => props.handleAddProduct(props.product)} className='addProductButton'> 
                                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                                Add To Cart
                            </button>
                        }
                    </div>
                    <div className='features'>
                        <h3>Features</h3>
                        {
                            features.map(feature => <li key={feature.description}> {feature.description} - {feature.value} </li>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;