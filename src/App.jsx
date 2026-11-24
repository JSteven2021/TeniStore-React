import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import CheckoutForm from "./components/CheckoutForm";
import products from "./data/products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("tenistore-cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tenistore-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const completeOrder = () => setCart([]);

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.toLowerCase().includes(search.toLowerCase())
  );

  const offers = [
    {
      image: "/img/Oferta1.jpg",
      number: "01",
      title: "Estilo que destaca",
      description: "Encuentra diseños que hablan por ti"
    },
    {
      image: "/img/oferta2.jpg",
      number: "02",
      title: "Tu próximo favorito",
      description: "Descubre nuevas opciones para cada día"
    },
    {
      image: "/img/oferta3.jpg",
      number: "03",
      title: "Camina a tu manera",
      description: "Comodidad y personalidad en cada paso"
    }
  ];

  return (
    <>
      <Navbar cartCount={totalItems} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <span className="hero-label">ESTILO QUE TE MUEVE</span>
            <h1>Encuentra tus tenis ideales</h1>
            <p>
              Descubre diseños que combinan comodidad, calidad
              y personalidad en cada paso
            </p>
            <a href="#productos" className="hero-button">
              Explorar colección <span>→</span>
            </a>
          </div>

          <div className="hero-decoration">
            <span>TS</span>
          </div>
        </section>

        <section className="benefits">
          <article>
            <span>✦</span>
            <div>
              <h3>Estilo auténtico</h3>
              <p>Diseños para cada personalidad</p>
            </div>
          </article>

          <article>
            <span>✓</span>
            <div>
              <h3>Calidad y comodidad</h3>
              <p>Camina con confianza</p>
            </div>
          </article>

          <article>
            <span>♡</span>
            <div>
              <h3>Tu mejor elección</h3>
              <p>Encuentra tu próximo favorito</p>
            </div>
          </article>
        </section>

        <section className="promo-section" id="ofertas">
          <div className="section-heading">
            <span className="section-eyebrow">DESCUBRE TENISTORE</span>
            <h2>Inspiración para cada paso</h2>
            <p>Explora nuestros estilos destacados y encuentra el que va contigo</p>
          </div>

          <div className="promo-grid">
            {offers.map((offer) => (
              <a
                href="#productos"
                className="promo-card"
                key={offer.number}
              >
                <img src={offer.image} alt={offer.title} />
                <div className="promo-overlay">
                  <span className="promo-number">{offer.number}</span>
                  <div>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <span className="promo-link">Ver colección →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="catalog" id="productos">
          <div className="section-heading">
            <span className="section-eyebrow">NUESTRA SELECCIÓN</span>
            <h2>Encuentra tu próximo par</h2>
            <p>Explora nuestra colección y elige el estilo que va contigo</p>
          </div>

          <div className="catalog-toolbar">
            <div>
              <span className="catalog-caption">COLECCIÓN TENISTORE</span>
              <h3>Nuestros productos</h3>
            </div>
            <span className="catalog-count">
              {filteredProducts.length} productos
            </span>
          </div>

          <SearchBar search={search} setSearch={setSearch} />

          <div className="products-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <p className="empty-message">
                No encontramos productos con esa búsqueda
              </p>
            )}
          </div>
        </section>

        <section className="cart-section" id="carrito">
          <div className="section-heading">
            <span className="section-eyebrow">TU SELECCIÓN</span>
            <h2>Mi carrito</h2>
            <p>Revisa los productos que has elegido</p>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <span>🛒</span>
              <h3>Tu carrito está esperando</h3>
              <p>Agrega tus tenis favoritos para verlos aquí</p>
              <a href="#productos">Ver productos</a>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-product-info">
                    <h3>{item.name}</h3>
                    <p>{item.brand}</p>
                    <strong>${item.price.toLocaleString("es-CO")}</strong>
                  </div>

                  <div className="cart-actions">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))}

              <CheckoutForm
                totalItems={totalItems}
                totalPrice={totalPrice}
                onOrderComplete={completeOrder}
              />
            </div>
          )}
        </section>

        <section className="about" id="nosotros">
          <div className="section-heading">
            <span className="section-eyebrow">CONÓCENOS</span>
            <h2>Más que una tienda de tenis</h2>
            <p>
              En TeniStore creemos que cada paso refleja tu estilo.
              Queremos ayudarte a encontrar opciones que se adapten
              a tu día a día.
            </p>
          </div>

          <div className="about-content">
            <article>
              <span>01</span>
              <h3>Nuestra misión</h3>
              <p>
                Ofrecer tenis que combinen diseño, comodidad y calidad,
                brindando una experiencia de compra sencilla y agradable.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Nuestra visión</h3>
              <p>
                Ser una tienda reconocida por su variedad de estilos,
                atención al cliente y compromiso con cada comprador.
              </p>
            </article>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="section-heading">
            <span className="section-eyebrow">ESTAMOS PARA AYUDARTE</span>
            <h2>Hablemos</h2>
            <p>
              ¿Tienes alguna pregunta? Comunícate con nosotros.
              Será un gusto atenderte.
            </p>
          </div>

          <div className="contact-content">
            <article>
              <span>✉</span>
              <h3>Correo de la tienda</h3>
              <a href="mailto:tenistore@store.com">
                tenistore@store.com
              </a>
            </article>

            <article>
              <span>◉</span>
              <h3>WhatsApp</h3>
              <a
                href="https://wa.me/573204567898"
                target="_blank"
                rel="noreferrer"
              >
                320 456 7898
              </a>
            </article>

            <article>
              <span>↗</span>
              <h3>Correo de atención</h3>
              <a href="mailto:jotasteven26@gmail.com">
                Escríbenos
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#inicio" className="footer-brand">TeniStore</a>
        <p>Estilo, comodidad y calidad en cada paso</p>
        <span>© 2026 TeniStore - Todos los derechos reservados</span>
      </footer>
    </>
  );
}

export default App;




