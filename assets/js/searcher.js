
const loadProducts = async (textFilter) => {
  let eProducto = '';
  let responseJson = await fetch('https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json');
  let resultJson = await responseJson.json();

  resultJson.map(e => {

    if(e.name === textFilter || e.type === textFilter || textFilter === ''){
      eProducto = eProducto + `
      <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${e.src}" alt="${e.name}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${e.type}</p>
            <a href="javascript:;">
              <h5>
                ${e.name}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${e.price}
            </p>
          </div>
        </div>
      </div>`;
    }
    
  })

  let responseXml = await fetch('https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml');
  let resultXml = await responseXml.text();
  const xml = (new DOMParser()).parseFromString(resultXml, 'application/xml');
  const productsXml = xml.getElementsByTagName("product");

  for (let e of productsXml) {
    let name = e.getElementsByTagName("name")[0].innerHTML;
    let src = e.getElementsByTagName("src")[0].innerHTML;
    let type = e.getElementsByTagName("type")[0].innerHTML;
    let price = e.getElementsByTagName("price")[0].innerHTML;

    if(name === textFilter || type === textFilter || textFilter === ''){
      eProducto = eProducto + `
      <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
          <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
              <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
            </a>
          </div>
          <div class="card-body p-3">
            <p class="mb-0 text-sm">${type}</p>
            <a href="javascript:;">
              <h5>
                ${name}
              </h5>
            </a>
            <p class="mb-4 text-sm">
              <b>Price: </b> $ ${price}
            </p>
          </div>
        </div>
      </div>`;
    }
    
  }

  const eListProducts = document.getElementById("listProducts");
  eListProducts.innerHTML = eProducto;
}


const btnFilter = document.getElementById("filter");

btnFilter.addEventListener('click', () => {
  const text = document.getElementById("text").value;
  loadProducts(text);
})

