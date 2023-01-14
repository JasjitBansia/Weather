import key from "./key.json" assert { type: "json" };
const Key = key.key;
//°
let temperature = document.getElementById("temperature");
let maxTemp = document.getElementById("max");
let minTemp = document.getElementById("min");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let input = document.getElementById("input");
let button = document.getElementById("button");

let changeText = (one, two, three, four, five) => {
  temperature.innerText = one;
  maxTemp.innerText = two;
  minTemp.innerText = three;
  description.innerText = four;
  humidity.innerText = five;
};
button.addEventListener("click", () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${Key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      report(response[0].lat, response[0].lon);
    })
    .catch(() => {
      changeText("An error occured", "--", "--", "--", "--");
    });
});
let report = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      changeText(
        response.main.temp + "°C",
        "Max: " + response.main.temp_max + "°C",
        "Min: " + response.main.temp_min + "°C",
        "Description: " + response.weather[0].main,
        "Humidity: " + response.main.humidity + "%"
      );
    })
    .catch((error) => {
      changeText("An error occured", "--", "--", "--", "--");
    });
};
