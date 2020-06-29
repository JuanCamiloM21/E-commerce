const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
  document.addEventListener('DOMContentLoaded', compra.leerLSCompra());
  carrito.addEventListener('click', (e) => compra.eliminarProducto(e));
  compra.calcularTotal();
  procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e) {
  e.preventDefault();
  if (compra.obtenerLS().length === 0) {
    alert('No tienes nada en tu carrito').then(() => (window.location = 'index.html'));
  } else if (cliente.value === '' || correo.value === '') {
    alert('Llena el formulario para continuar');
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
