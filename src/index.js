(() => {
  const URL = './src/data.json';
  const $ = (selector) => document.querySelector(selector);

  const getData = (URL) => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        let template = ``;
        data.forEach((element) => {
          template += `
          <div class="item" data-id='${element.id}'>
          <img src="${element.imagen}">
          <h4>${element.nombre}</h4>
          <p>${element.precio}</p>
          <a href="" class="item_btn agregar-carrito" data-id='${element.id}'>Comprar</a>
        </div>
          `;
        });
        $('#products__items').innerHTML = template;
      });
  };
  getData(URL);
})();
