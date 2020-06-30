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
          <h2>${element.nombre}</h3>
          <p>$<span>${element.precio.toFixed(3)}</span></p>
          <a href="" class="item_btn agregar-carrito" data-id='${element.id}'>Comprar</a>
        </div>
          `;
        });
        $('#products__items').innerHTML = template;
      });
  };
  getData(URL);
})();
