function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <span className="product-tag">TENISTORE</span>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>

        <h3>{product.name}</h3>

        <span className="product-category">
          {product.category}
        </span>

        <div className="product-bottom">
          <p className="product-price">
            ${product.price.toLocaleString("es-CO")}
          </p>

          <button
            className="product-button"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
