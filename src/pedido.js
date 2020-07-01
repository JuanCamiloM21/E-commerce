const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');
const mostrarCarritoBtn = document.getElementById('mostrar-carrito');
const $overlayCarrito = document.getElementById('overlay-carrito');
const $overlayProducto = document.getElementById('overlay-producto');
const $modal = document.querySelectorAll('.modal');
console.log($modal);

cargarEventos();

function cargarEventos() {
  productos.addEventListener('click', (e) => carro.comprarProducto(e));
  carrito.addEventListener('click', (e) => carro.eliminarProducto(e));
  vaciarCarritoBtn.addEventListener('click', (e) => carro.vaciarCarrito(e));
  document.addEventListener('DOMContentLoaded', carro.leerLS());
  procesarPedidoBtn.addEventListener('click', (e) => carro.procesarPedido(e));
  $overlayCarrito.addEventListener('click', (e) => carro.ocultarModalCarrito(e));
  $overlayProducto.addEventListener('click', (e) => carro.ocultarModalProducto(e));
}
