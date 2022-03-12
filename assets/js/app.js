let weatherForm = document.querySelector('.weatherForm')
let apiURL = 'https://api.weatherapi.com/v1/forecast.json?key=3a8c11bfdf284fd0af1124659221203&days=7&q='
let apiDataContainer = document.querySelector('.apiData')
let loader = document.querySelector('.loader')

weatherForm.addEventListener('submit', (event) => {
    showLoader();
    let userCity = document.querySelector('.city').value;
    let userApiURL = apiURL + userCity;
    fetch(userApiURL)
    .then(response => response.json())
    .then((dataFromAPI) => {
        hideLoader();
        // console.log(dataFromAPI.current.condition.text);
        let view = '';
        view += `<div class="mainInfo">`

        // icon
        
        view += `<div class="icon">`
        view += `<img src="${dataFromAPI.current.condition.icon}" alt="${dataFromAPI.current.condition.text}">`
        view += `</div>`

        // degrees
        view += `<div class="degrees">`
        view += `${dataFromAPI.current.temp_c} <span><sup>o</sup>C</span>`
        view += `</div>`

        // info
        view += `<div class="info">`
        view += `<p>The amount of rainfall: ${dataFromAPI.current.precip_mm} mm</p>`
        view += `<p>Humidity: ${dataFromAPI.current.humidity} %</p>`
        view += `<p>Wind: ${dataFromAPI.current.wind_kph} km/h</p>`
        view += `</div>`

        view += `</div>`
        

        view += `<div class="days">`
        dataFromAPI.forecast.forecastday.forEach((day) => {
            view += `<div class="day">`
            view += `<div class="date">${day.date}</div>`
            view += `<div class="icon"><img src="${day.day.condition.icon}" alt=""></div>`
            view += `<div class="avgTemp">${day.day.avgtemp_c}<sup>o</sup>C</div>`
            view += `</div>`
        })
        view += `</div>`

        

        apiDataContainer.innerHTML = view;
    })

    event.preventDefault();
})

let showLoader = () => {
    loader.style.display = 'block'
}
let hideLoader = () => {
    loader.style.display = 'none'
}