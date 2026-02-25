const inputBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button')
const weatherIcon = document.querySelector('.weather-icon')
const weather = document.querySelector('.weather')
const errorMessage = document.querySelector('.error')

//Key1: cb57074d28fec50fdc4ef3ee88c8e8c6
///Key2: 12437abe7636dda81ee3622308935c3a

async function checkWeather(city){
    try{
    const apiKey = 'cb57074d28fec50fdc4ef3ee88c8e8c6'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error('Erros. Ciudad no encontrada');
    }
    const data = await response.json();

    console.log(data)

    updateWeatherUI(data)

    }catch(error){
        console.error(error.message);
        weather.style.display = 'none'
        errorMessage.style.display='block'
    }

}

function updateWeatherUI(data){
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`
    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.humidity').innerHTML=`${data.main.humidity}%`
    document.querySelector('.wind').innerHTML = `${data.wind.speed}KM/H`;

    const weatherIcons = {
        Clear: './images/clear.png',
        Snow: './images/snow.png',
        Rain: './images/rain.png',
        Cloud: './images/clouds.png'
    }
    weather.src = weatherIcons[data.weather[0].main] || './images/rain.png'

    weather.style.display = 'block'
    errorMessage.style.display='none'

}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})

window.onload = ()=>{
    checkWeather('Medellín')
}