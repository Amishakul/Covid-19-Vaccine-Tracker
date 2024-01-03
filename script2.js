let centers = [];
const cards = document.querySelector(".cards");
const searchBtn = document.querySelector(".searchBox").querySelector("button");

function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function cowinData(pincode) {
  let today = new Date();
  let formattedDate = formatDate(today);

  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${formattedDate}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);

      if (data.sessions.length !== 0) {
        data.sessions.forEach((e, i) => {
          let centerInfo = [
            e.name,
            e.address,
            e.vaccine,
            e.date,
            e.min_age_limit,
            e.available_capacity,
            e.block_name,
            e.district_name,
            e.timings, // Add timings to the array
          ];
          centers.push(centerInfo);
          let code = `
            <div class="card">
              <h1>
                <span class="category">Center Name - </span>
                ${centers[i][0]}
              </h1>
              <div class="innerCard">
                <h3>
                  <span class="category">Center Address - </span>
                  ${centers[i][1]}
                </h3>
                <h3>
                  <span class="category">Vaccine Name - </span>
                  ${centers[i][2]}
                </h3>
                <h3>
                  <span class="category">Date Of Vaccination - </span>
                  ${centers[i][3]}
                </h3>
                <h3>
                  <span class="category">Minimum Age Limit - </span>
                  ${centers[i][4]}
                </h3>
                <h3>
                  <span class="category">Available Capacity - </span>
                  ${centers[i][5]}
                </h3>
                <h3>
                  <span class="category">Block Name - </span>
                  ${centers[i][6]}
                </h3>
                <h3>
                  <span class="category">District Name - </span>
                  ${centers[i][7]}
                </h3>
                <h3>
                  <span class="category">Vaccine Timings - </span>
                  ${centers[i][8] || "Not available"} <!-- Display timings or "Not available" -->
                </h3>
              </div>
            </div>`;
          cards.innerHTML += code;
        });
      } else {
        alert("No Vaccinations Available");
      }
    } else {
      alert("Enter a valid 6-digit Pin-Code");
    }
  };

  xhr.send();
}

const input = document.querySelector("#input");
input.addEventListener("keypress", (e) => {
  if (e.which === 13) {
    let pincode = input.value;
    cards.innerHTML = "";
    if (/^\d{6}$/.test(pincode)) {
      cowinData(pincode);
    } else {
      alert("Enter a valid 6-digit Pin-Code");
    }
  }
});

searchBtn.addEventListener("click", () => {
  let pincode = input.value;
  cards.innerHTML = "";
  if (/^\d{6}$/.test(pincode)) {
    cowinData(pincode);
  } else {
    alert("Enter a valid 6-digit Pin-Code");
  }
});
