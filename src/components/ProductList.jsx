// Componente que organiza y muestra todos los productos

import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <section className="product-list" id="productos">
      <h2>Nuestros productos</h2>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;