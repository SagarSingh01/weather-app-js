async function Weather(e) {
    if (e.key === "Enter") {
        let city = document.querySelector(".search-city > input").value;
        let weatherApp = document.querySelector(".weather-app");
        let wrongSearch = document.querySelector(".wrong-search");
        let weatherShow = document.querySelector(".show-weather");
        const api = `https://api.weatherapi.com/v1/current.json?key=ab5b58beed904cc79fd65013261802&q=${city}&aqi=yes`;

        weatherApp.classList.remove("weather-app-show");
        wrongSearch.classList.remove("wrong-search-show");

        if (city === "") {
            weatherShow.classList.remove("show-weather-show");
            weatherApp.classList.add("weather-app-show");
            wrongSearch.classList.add("wrong-search-show");
            return;
        }

        else {

            try {
                const response = await fetch(api);
                const data = await response.json();

                weatherShow.classList.add("show-weather-show");
                document.querySelector(".weather-app").classList.add("weather-app-show");
                document.querySelector("#name").innerHTML = `${data?.location.name}, ${data?.location.country.slice(0, 2).toUpperCase()}`;
                document.querySelector("#day").innerHTML = `${data?.location.localtime}`;
                document.querySelector("#temp").innerHTML = `${data?.current.temp_c} &degc`;
                document.querySelector("#icon").src = data?.current.condition.icon;
                document.querySelector(".humidity-aqi").innerHTML = `
                <span id="humidity"><i class="fa-solid fa-droplet"></i> ${data?.current.humidity}% Humidity</span>
                <span id="speed"><i class="fa-solid fa-wind"></i> ${parseInt(data?.current.wind_kph)} km/hr Wind Speed</span>
                `;
            }

            catch (err) {
                weatherShow.classList.remove("show-weather-show");
                weatherApp.classList.add("weather-app-show");
                wrongSearch.classList.add("wrong-search-show");
                document.querySelector(".search-city > input").value = "";
                return;
            }
        }

        document.querySelector(".search-city > input").value = "";
    }
};