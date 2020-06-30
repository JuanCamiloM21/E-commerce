class Carrito {
  //Añadir el producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
      const producto = e.target.parentElement;
      this.leerDatosProducto(producto);
    }
  }

  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector('h2').textContent,
      precio: producto.querySelector('span').textContent,
      id: producto.querySelector('a').getAttribute('data-id'),
      cantidad: 1,
    };
    let productosLS;
    productosLS = this.obtenerLS();
    productosLS.forEach((productoLS) => {
      if (productoLS.id === infoProducto.id) {
        productosLS = productoLS.id;
      }
    });
    productosLS === infoProducto.id ? alert('Producto ya agregado XXXX') : this.insertarCarrito(infoProducto);
  }

  insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${producto.imagen}" width="100">
      </td>
      <td>${producto.titulo}</td>
      <td>$${producto.precio}</td>
      <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
      </td>
    `;
    listaProductos.appendChild(row);
    this.guardarLS(producto);
  }

  eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains('borrar-producto')) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    this.eliminarLS(productoID);
    this.calcularTotal();
  }

  vaciarCarrito(e) {
    e.preventDefault();
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    this.vaciarLS();
    return false;
  }

  guardarLS(producto) {
    let productos;
    productos = this.obtenerLS();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  obtenerLS() {
    let productoLS;
    localStorage.getItem('productos') === null ? (productoLS = []) : (productoLS = JSON.parse(localStorage.getItem('productos')));
    return productoLS;
  }

  eliminarLS(productoID) {
    let productosLS;
    productosLS = this.obtenerLS();
    productosLS.forEach((productoLS, index) => {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
    localStorage.setItem('productos', JSON.stringify(productosLS));
  }

  leerLS() {
    let productosLS;
    productosLS = this.obtenerLS();
    productosLS.forEach((producto) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>
        <img src="${producto.imagen}" width="100">
      </td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
      </td>
    `;
      listaProductos.appendChild(row);
    });
  }
  leerLSCompra() {
    let productosLS;
    productosLS = this.obtenerLS();
    productosLS.forEach((producto) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>
        <img src="${producto.imagen}" width="100">
      </td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>
        <input type="number" class="cantidad" min="1" value="${producto.cantidad}">
      </td>
      <td>$${parseFloat(producto.precio * producto.cantidad).toFixed(3)}</td>
      <td>
        <a href="#" class="borrar-producto fas fa-times-circle" style="font-size: 30px" data-id="${producto.id}"></a>
      </td>
    `;

      listaCompra.appendChild(row);
    });
  }

  vaciarLS() {
    localStorage.clear();
  }

  procesarPedido(e) {
    e.preventDefault();
    console.log(e);
    this.obtenerLS().length === 0 ? alert('El carrito esta vacio') : (location.href = 'compra.html');
  }

  calcularTotal() {
    let productoLS;
    let total = 0;
    // subtotal = 0,
    // igv = 0;
    productoLS = this.obtenerLS();
    for (let i = 0; i < productoLS.length; i++) {
      let element = Number(productoLS[i].precio * productoLS[i].cantidad);
      total += element;
    }
    // igv = parseFloat(total * 0.19).toFixed(3);
    // subtotal = parseFloat(total - igv).toFixed(3);

    // document.getElementById('subtotal').innerHTML = `$${subtotal}`;
    // document.getElementById('igv').innerHTML = `$${igv}`;
    document.getElementById('total').innerHTML = `$${total.toFixed(3)}`;
  }

  mostrarCarrito(e) {
    e.preventDefault;
    carrito.classList.toggle('mostrar');
  }
}
