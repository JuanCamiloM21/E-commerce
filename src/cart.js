const $payButton = document.getElementById('payButton');
const $item = document.getElementById('contentItem');
const $cartCount = document.querySelector('.cartCount');
const $subTotal = document.querySelector('.table__sumary--sub1');
const $shipping = document.querySelector('.table__sumary--shipping');
const $taxes = document.querySelector('.table__sumary--taxes');
const $total = document.getElementsByClassName('table__sumary--total');
const $localCount = document.getElementsByClassName('cart__header--count');

// $localCount.textContent = localStorage.length;

class Carrito {
  //Añadir producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
      const producto = e.target.parentElement.parentElement;
      this.leerDatosProducto(producto);
    }
  }

  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector('h4').textContent,
      precio: producto.querySelector('p').textContent,
      id: producto.querySelector('.item').getAttribute('data-id'),
      cantidad: 1,
    };
    console.log(infoProducto.id);
    this.insertarCarrito(infoProducto);
  }

  insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${producto.imagen}" width=100>
      </td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">borrar</a>
      </td>
    `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }

  eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains('borrar-producto')) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    this.eliminarProductoLocalStorage(productoID);
  }

  vaciarCarrito(e) {
    e.preventDefault();
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    return false;
  }

  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  obtenerProductosLocalStorage() {
    let productoLS;

    if (localStorage.getItem('producto') === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
    }

    return productoLS;
  }

  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((productoLS, index) => {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
  }
}
