const displayPhones = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const containerDiv = document.getElementById('container-div');
    containerDiv.textContent = ''
    for (const product of data.data) {
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="card" style="width: 18rem">
        <img src=${product.image} class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${product.phone_name}</h5>
        <p class="card-text">
        ${product.brand}
        </p>
        </div>
        <div class="card-body">
        <button class="btn btn-dark">Details</button>
        </div>
        </div>
        `
        div.classList.add('col-md-4')
        containerDiv.appendChild(div)
        document.getElementById('search-field').value = ''
    }
  })
}