class Carrito {
  //Añadir el producto al carrito
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
      id: parseInt(producto.querySelector('a').getAttribute('dataset.id')),
      cantidad: 1,
    };
    this.insertarCarrito(infoProducto);
  }

  insertarCarrito(producto) {
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
    // console.log(producto);
  }
}
