import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector} from "react-redux";

import { Link } from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";


function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  

  const cart = useSelector((state) => state.cart);

  const totalProducts = cart.reduce((total, item) => total + item.count, 0);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories",
      );
      return response.json();
    },
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === "all"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${selectedCategory}`;

      const response = await fetch(url);
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <nav className="navbar">
        <h3>Grey Ghost Shopping Center</h3>
        <Link to="/cart">
          <button>Cart ({totalProducts})</button>
        </Link>
      </nav>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Products</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {products.map((product) => (
        <div
          key={product.id}
          className="d-flex flex-wrap gap-3 justify-content-center"
        >
          <ProductCard product={product} />
          
        </div>
      ))}
    </div>
  );
}

export default Home;
