import type { FC } from "react";
import type { Product } from "../../types/types";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="col-md-5 p-4 d-flex flex-column align-items-center gap-3 shadow">
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        width="100"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/100";
        }}
      />
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <Rating style={{ maxWidth: 100 }} value={product.rating.rate} readOnly />
      
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
