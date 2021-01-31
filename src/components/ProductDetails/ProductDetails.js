import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h3 className="text-center">Selected Product Details</h3>
            <Product addToCartButton = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;