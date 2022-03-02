const toggleElementDisplay = (id, displayStyle) => {
  document.getElementById(id).style.display = displayStyle;
}
const displayPhones = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const detailResult = document.getElementById('detail-result');
    detailResult.textContent = '';
    const containerDiv = document.getElementById('container-div');
    containerDiv.textContent = ''
    if(!data.data.length) {
      toggleElementDisplay('error-message','block')
    }
    else {
      toggleElementDisplay('error-message','none')
      const phones = Object.keys(data.data).slice(0,20).map(key => ({0:data.data[key]}));
      console.log(phones)
      for (const phone of phones) {
        console.log(phone)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card p-3">
          <img src=${phone[0].image} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title fs-3">${phone[0].phone_name}</h5>
            <p class="card-text fs-4">${phone[0].brand}</p>
          </div>
          <button id=${phone[0].slug} onclick="displayDetails(this.id)" class="btn btn-dark">Details</button>
          </div>
          `
          div.classList.add('col-md-4')
          containerDiv.appendChild(div)
          document.getElementById('search-field').value = ''
      }
    }
  })
  }
const displayDetails = (clickedId) => {
  const detailResult = document.getElementById('detail-result');
  detailResult.textContent = ''
  const url = `https://openapi.programming-hero.com/api/phone/${clickedId}`
  // console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const release = data.data.releaseDate ? data.data.releaseDate: "No Release Date Found"
    const div = document.createElement('div');
    
  div.innerHTML = `
    <div class="col-md-6">
      <img class="d-block w-75 mx-auto" src=${data.data.image}>
    </div>
    <div class="col-md-6 mt-5 my-md-auto p-4 p-md-0">
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
      <h3>Other Features</h3>
      <ul>
        <li>WLAN: ${data.data.others.WLAN}</li>
        <li>Bluetooth: ${data.data.others.Bluetooth}</li>
        <li>GPS: ${data.data.others.GPS}</li>
        <li>NFC: ${data.data.others.NFC}</li>
        <li>Radio: ${data.data.others.Radio}</li>
        <li>USB: ${data.data.others.USB}</li>
      </ul>
    </div>
  `
  div.classList.add('row',)
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