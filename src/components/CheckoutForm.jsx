import { useState } from "react";

function CheckoutForm({ totalItems, totalPrice, onOrderComplete }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onOrderComplete();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="checkout-success" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <h3>¡Simulación completada!</h3>
        <p>
          Tu pedido de prueba fue registrado correctamente en esta
          demostración. El carrito se ha vaciado. No se realizó ningún
          pago ni se enviaron datos.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Volver al formulario
        </button>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout-heading">
        <span className="section-eyebrow">ÚLTIMO PASO</span>
        <h3>Finalizar compra</h3>
        <p>Completa los datos de ejemplo para probar el proceso de compra</p>
      </div>

      <div className="checkout-order">
        <div>
          <span>Productos seleccionados</span>
          <strong>{totalItems}</strong>
        </div>
        <div>
          <span>Total de prueba</span>
          <strong>${totalPrice.toLocaleString("es-CO")}</strong>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-field">
          <label htmlFor="checkout-name">Nombre completo</label>
          <input id="checkout-name" name="name" type="text" autoComplete="name" placeholder="Ejemplo: Juan Pérez" required minLength={3} />
        </div>
        <div className="checkout-field">
          <label htmlFor="checkout-email">Correo electrónico</label>
          <input id="checkout-email" name="email" type="email" autoComplete="email" placeholder="ejemplo@correo.com" required />
        </div>
        <div className="checkout-field">
          <label htmlFor="checkout-phone">Teléfono</label>
          <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Teléfono de prueba" required />
        </div>
        <div className="checkout-field">
          <label htmlFor="checkout-city">Ciudad</label>
          <input id="checkout-city" name="city" type="text" autoComplete="address-level2" placeholder="Ciudad de ejemplo" required />
        </div>
        <div className="checkout-field checkout-field-full">
          <label htmlFor="checkout-address">Dirección de entrega</label>
          <input id="checkout-address" name="address" type="text" autoComplete="street-address" placeholder="Dirección ficticia para la demostración" required />
        </div>
        <p className="checkout-notice">
          Demostración académica: utiliza datos ficticios. Este formulario
          no guarda ni envía información personal y no procesa pagos.
        </p>
        <button className="checkout-submit" type="submit">
          Confirmar pedido de prueba <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}

export default CheckoutForm;
