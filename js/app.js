// Tootle Element Display Style
const toggleElementDisplay = (id, displayStyle) => {
  document.getElementById(id).style.display = displayStyle;
};

// Display Search Result
const displaySearchResults = () => {
  // Get Search Text
  const searchText = document
    .getElementById("search-field")
    .value.toLowerCase();
  // Make Dynamic API url
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  // Fetch API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Get detail result container and clear text content
      const detailResult = document.getElementById("detail-result");
      detailResult.textContent = "";
      // Get Result container div and clear text content
      const containerDiv = document.getElementById("container-div");
      containerDiv.textContent = "";
      // Error Checking
      if (searchText == 0) {
        return;
      } else if (!data.data.length) {
        toggleElementDisplay("error-message", "block");
      }
      // Else
      else {
        // hide previous error message (if it's already showing)
        toggleElementDisplay("error-message", "none");
        // Slice fetched object upto 20 properties
        const phones = Object.keys(data.data)
          .slice(0, 20)
          .map((key) => ({ 0: data.data[key] }));
        // Get Each phones indivisually using for loop
        for (const phone of phones) {
          // Create and append cards using bootstrap styles
          const div = document.createElement("div");
          div.innerHTML = `
        <div class="card p-3">
          <img src=${phone[0].image} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title fs-3">${phone[0].phone_name}</h5>
            <p class="card-text fs-4">${phone[0].brand}</p>
          </div>
          <button id=${phone[0].slug} onclick="displayDetails(this.id)" class="btn btn-dark">Details</button>
          </div>
          `;
          div.classList.add("col-md-4");
          containerDiv.appendChild(div);
          // Clear Search Field Value
          document.getElementById("search-field").value = "";
        }
      }
    });
};

// Details Button Click Handler
const displayDetails = (clickedId) => {
  // Get detail result container and clear text content
  const detailResult = document.getElementById("detail-result");
  detailResult.textContent = "";
  // Get Dynamic API url
  const url = `https://openapi.programming-hero.com/api/phone/${clickedId}`;
  // Fetch Details API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      {
        // Create and append div using bootstrap styles
        const div = document.createElement("div");

        div.innerHTML = `
          <div class="col-md-6">
            <img class="d-block w-75 mx-auto" src=${data.data.image}>
          </div>
          <div class="col-md-6 mt-5 my-md-auto p-4 p-md-0">
            <h2>${data.data.name}</h2>
            <p>${
              data.data.releaseDate
                ? data.data.releaseDate
                : "No Release Date Found"
            }</p>
            <h3>Main Features</h3>
            <ul>
              <li>Storage: ${
                data.data.mainFeatures?.storage
                  ? data.data.mainFeatures?.storage
                  : "No Data Found"
              }</li>
              <li>Display Size: ${
                data.data.mainFeatures?.displaySize
                  ? data.data.mainFeatures?.displaySize
                  : "No Data Found"
              }</li>
              <li>Chipset: ${
                data.data.mainFeatures?.chipSet
                  ? data.data.mainFeatures?.chipSet
                  : "No Data Found"
              }</li>
              <li>Memory: ${
                data.data.mainFeatures?.memory
                  ? data.data.mainFeatures?.memory
                  : "No Data Found"
              }</li>
              <li>Sensors: ${
                data.data.mainFeatures?.sensors
                  ? data.data.mainFeatures.sensors.join(", ")
                  : "No Data Found"
              }</li>
            </ul>
            <h3>Other Features</h3>
            <ul>
              <li>WLAN: ${
                data.data.others?.WLAN ? data.data.others.WLAN : "No Data Found"
              }</li>
              <li>Bluetooth: ${
                data.data.others?.Bluetooth
                  ? data.data.others.Bluetooth
                  : "No Data Found"
              }</li>
              <li>GPS: ${
                data.data.others?.GPS ? data.data.others.GPS : "No Data Found"
              }</li>
              <li>NFC: ${
                data.data.others?.NFC ? data.data.others.NFC : "No Data Found"
              }</li>
              <li>Radio: ${
                data.data.others?.Radio
                  ? data.data.others.Radio
                  : "No Data Found"
              }</li>
              <li>USB: ${
                data.data.others?.USB ? data.data.others.USB : "No Data Found"
              }</li>
            </ul>
          </div>
        `;
        div.classList.add("row");
        detailResult.appendChild(div);
      }
    });
};
