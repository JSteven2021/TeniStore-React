import { useEffect, useRef, useState } from "react";

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="navbar">
      <a
        href="#inicio"
        className="navbar-logo"
        onClick={closeMenu}
        aria-label="TeniStore, ir al inicio"
      >
        <img
          src="/img/logo.png"
          alt=""
          className="navbar-logo-image"
        />
        <span className="navbar-brand-name">TeniStore</span>
      </a>

      <button
        ref={menuButtonRef}
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={menuOpen}
        aria-controls="navegacion-principal"
      >
        <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
      </button>

      <nav
        id="navegacion-principal"
        className={`navbar-links ${menuOpen ? "active" : ""}`}
        aria-label="Navegación principal"
      >
        <a href="#inicio" onClick={closeMenu}>Inicio</a>
        <a href="#productos" onClick={closeMenu}>Productos</a>
        <a href="#ofertas" onClick={closeMenu}>Ofertas</a>
        <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
        <a href="#contacto" onClick={closeMenu}>Contacto</a>

        <a
          href="#carrito"
          className="navbar-cart"
          onClick={closeMenu}
          aria-label={`Carrito de compras, ${cartCount} productos`}
        >
          <span aria-hidden="true">🛒</span>
          Carrito
          <span className="navbar-cart-count" aria-hidden="true">
            {cartCount}
          </span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
