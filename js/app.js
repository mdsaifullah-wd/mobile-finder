const displayPhones = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const containerDiv = document.getElementById('container-div');
    containerDiv.textContent = ''

  const detailResult = document.getElementById('detail-result');
  detailResult.textContent = ''
    for (const phone of data.data) {
      // console.log(phone)
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="card" style="width: 18rem">
        <img src=${phone.image} class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">
        ${phone.brand}
        </p>
        </div>
        <div class="card-body">
        <button id=${phone.slug} onclick="displayDetails(this.id)" class="btn btn-dark">Details</button>
        </div>
        </div>
        `
        div.classList.add('col-md-4')
        containerDiv.appendChild(div)
        document.getElementById('search-field').value = ''
    }
  })
}

const displayDetails = (clicked_id) => {
  const detailResult = document.getElementById('detail-result');
  detailResult.textContent = ''
  const url = `https://openapi.programming-hero.com/api/phone/${clicked_id}`
  // console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const release = data.data.releaseDate ? data.data.releaseDate: "No Release Date Found"
    const div = document.createElement('div');
    
  div.innerHTML = `
    <div class="col-md-3">
      <img class="w-100" src=${data.data.image}>
    </div>
    <div class="col-md-9 my-auto">
      <h2>${data.data.name}</h2>
      <p>${release}</p>
      <h3>Main Features</h3>
      <ul>
        <li>Storage: ${data.data.mainFeatures.storage}</li>
        <li>Display Size: ${data.data.mainFeatures.displaySize}</li>
        <li>Chipset: ${data.data.mainFeatures.chipSet}</li>
        <li>Memory: ${data.data.mainFeatures.memory}</li>
        <li>Sensors: ${data.data.mainFeatures.sensors}</li>
      </ul>
    </div>
  `
  div.classList.add('row')
detailResult.appendChild(div)
})  
}







/* data: {mainFeatures: {storage: "128GB/256GB storage, microSDXC",…}, slug: "samsung_galaxy_tab_s8+-11342",…}
brand: "Samsung"
image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s8-plus.jpg"
mainFeatures: {storage: "128GB/256GB storage, microSDXC",…}
name: "Galaxy Tab S8+"
others: {WLAN: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, Wi-Fi Direct, hotspot", Bluetooth: "5.2, A2DP, LE",…}
releaseDate: "Exp. release 2022, February"
slug: "samsung_galaxy_tab_s8+-11342"
status: true */