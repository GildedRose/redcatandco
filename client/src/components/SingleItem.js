import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from "../utils/indexedDB";

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    description,
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
    <div class="card mb-4 shadow-sm" width="400px">
      <Link to={`/products/${_id}`}>
        <img
          class="card-img-top" width="400px"
          alt={name}
          src={`/images/${image}`}
        />
        <p class="text-center">{name}</p>
      </Link>
      <div>
        <div>{quantity} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;