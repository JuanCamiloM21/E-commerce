const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('lista-compra');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const $overlayForm = document.getElementById('overlay-form');
const $overlayCompra = document.getElementById('overlay-compra');
const $modal = document.querySelectorAll('.modal');
console.log($modal);

cargarEventos();

function cargarEventos() {
  document.addEventListener('DOMContentLoaded', compra.leerLSCompra());
  carrito.addEventListener('click', (e) => compra.eliminarProducto(e));
  compra.calcularTotal();
  procesarCompraBtn.addEventListener('click', procesarCompra);
  carrito.addEventListener('change', (e) => compra.obtenerEvento(e));
  carrito.addEventListener('keyup', (e) => compra.obtenerEvento(e));
  $overlayCompra.addEventListener('click', (e) => compra.ocultarModalCompra(e));
  $overlayForm.addEventListener('click', (e) => compra.ocultarModalForm(e));
}

function procesarCompra(e) {
  e.preventDefault();
  if (compra.obtenerLS().length === 0) {
    compra.mostrarModalCompra().then(() => (window.location = 'index.html'));
  } else if (cliente.value === '' || correo.value === '') {
    compra.mostrarModalForm();
  } else {
    const cargandoGif = document.querySelector('#cargando');
    cargandoGif.style.display = 'block';
    const enviado = document.createElement('img');
    enviado.src = 'src/img/mail.gif';
    enviado.style.display = 'block';
    enviado.width = '150';

    setTimeout(() => {
      cargandoGif.style.display = 'none';
      document.querySelector('#loaders').appendChild(enviado);
      setTimeout(() => {
        enviado.remove();
        compra.vaciarLS();
        window.location = 'index.html';
      }, 2000);
    }, 3000);
  }
}
