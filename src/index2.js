// const URL = 'https://my.api.mockaroo.com/my_saved_schema.json?key=196b0c40';
const URL = '../src/data.json';

const load = async () => {
  const $overlay = document.getElementById('overlay');
  const $modal = document.getElementById('modal');
  const $hideModal = document.getElementById('hide-modal');
  const $addBtnCart = document.getElementsByClassName('modal__btn--cart');
  const $cartCount = document.querySelector('.cartCount');
  const $modalTitle = $modal.querySelector('h1');
  const $modalImage = $modal.querySelector('img');
  const $modalDescription = $modal.querySelector('p');
  const $modalPrecio = $modal.querySelectorAll('p')[1];
  const $productsContainer = document.getElementById('products__items');

  const getData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  // const cacheExist = async () => {
  //   const cacheList = sessionStorage.getItem('productos');

  //   if (cacheList) {
  //     return JSON.parse(cacheList);
  //   }

  //   const data = await getData(URL);
  //   sessionStorage.setItem('productos', JSON.stringify(data));
  //   return data;
  // };

  // const productos = await cacheExist('productos');
  const productos = await getData(URL);

  const template = (producto) => `
    <div class="item" data-id='${producto.id}'>
      <h4>${producto.nombre}</h4>
      <img src="${producto.imagen}">
      <p>${producto.precio}</p>
      <a href="" class="item_btn agregar-carrito" data-id='${producto.id}'>Comprar</a>
    </div>
    `;

  const createTemplate = (HTMLString) => {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  };

  const $form = document.getElementById('form');
  $form.addEventListener('submit', async (event) => {
    $productsContainer.classList.add('active');
    event.preventDefault();
    $productsContainer.classList.add('active');

    const data = new FormData($form);
    // const productFilter = await getData(`${URL}?filtro=${data.get('name')}`);
    // const HTMLString = template(productFilter[0]);
  });

  const addEventClick = ($element) => {
    $element.addEventListener('click', () => {
      // showModal($element);
    });
  };

  const renderProductsList = (list, container) => {
    container.children[0].remove();
    list.forEach((producto) => {
      const HTMLString = template(producto);
      const productElement = createTemplate(HTMLString);
      container.append(productElement);
      addEventClick(productElement);
    });
  };
  renderProductsList(productos, $productsContainer);

  const findById = (id) => productos.find((producto) => producto.id === parseInt(id));

  const showModal = ($element) => {
    $overlay.classList.add('active');
    $modal.classList.remove('modalOut');
    $modal.classList.add('modalIn');
    const id = $element.dataset.id;
    const data = findById(id);
    $modalTitle.textContent = data.nombre;
    $modalImage.setAttribute('src', data.imagen);
    $modalDescription.textContent = data.descripcion;
    $modalPrecio.textContent = data.precio;
  };

  const hideModal = () => {
    $overlay.classList.remove('active');
    $modal.classList.remove('modalIn');
    $modal.classList.add('modalOut');
  };
  $hideModal.addEventListener('click', hideModal);
};

load();
