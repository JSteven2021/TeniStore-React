
// Lista inicial de productos de TeniStore
// Estos datos son de prueba y luego podremos conectarlos con MySQL.

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 450000,
    image: "/img/nike-air-max.jpg",
    category: "Hombre"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: 799900,
    image: "/img/adidas-ultraboost.jpg",
    category: "Hombre"
  },
  {
    id: 3,
    name: "Puma RS-X",
    brand: "Puma",
    price: 649900,
    image: "/img/puma-rsx.jpg",
    category: "Mujer"
  }
];

// Exportamos los productos para utilizarlos en otros componentes.
export default products;
