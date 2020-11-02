import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from "../utils/indexedDB";
import { card } from 'react-bootstrap';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    // description,
    quantity
  } = item;

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card mb-4 shadow-sm responsive">
      <Link to={`/products/${_id}`}>
        <img
          className="card-img-top" display="block" max-width="auto" max-height="400px"
          alt={name}
          src={`/images/${image}`}
        />
        <p className="text-center">{name}</p>
      </Link>
      <div>
        <div>{quantity} in stock</div>
        <span>${price}</span>
      </div>
      <button  onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;