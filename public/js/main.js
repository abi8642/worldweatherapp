const submit = document.getElementById("submit");
const city = document.getElementById("city");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
let day = document.getElementById("day");
let today_date = document.getElementById("today_date");

const datahide = document.querySelector(".middle_layer");

//   get Time
const getCurrentDay = () => {
  var weekday = new Array(7);

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let currentTime = new Date();
  let days = weekday[currentTime.getDay()];

  day.innerText = days;
};

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();

  today_date.innerText = `${date} ${month}`;
};

getCurrentDay();
getCurrentTime();

const getInfo = async (event) => {
  event.preventDefault();

  let cityName = city.value;

  if (cityName === "") {
    city_name.innerHTML = "Please Enter City Name Before Search";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=557de56cbb199307dac79a0f92bb3a8c`;
      const response = await fetch(url);
      const data = await response.json();
      const array = [data];

      datahide.classList.remove("data_hide");
      temp_real_val.innerText = array[0].main.temp;
      city_name.innerHTML = `${array[0].name} ${array[0].sys.country}`;

      const tempStatus = array[0].weather[0].main;

      if (tempStatus == "Clear") {
        temp_status.innerHTML =
          '<i class="fas fa-sun" style="color: #eccc68;"></i>';
      } else if (tempStatus == "Clouds") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color: #fffcf5;"></i>';
      } else if (tempStatus == "Rainy") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color: #eccc68;"></i>';
      }
    } catch {
      city_name.innerHTML = "Please Enter The Correct City Name";
      datahide.classList.add("data_hide");
    }
  }
};

submit.addEventListener("click", getInfo);
