const form = document.querySelector('form')
const results = document.querySelector('.results')

// Free-tier API Key exposed on purpose because this is a practice project with no backend
const API_KEY = '82b7461b5f374a1f89513626262909'

function paragraphElement([...content], isValid) {
    results.textContent = ''
    const p = document.createElement('p')
    p.textContent = `${content}`
    results.appendChild(p)
    if(!isValid) {
        p.style.color = '#bf616a'
    }
}

function imageElement(url) {
    const img = document.createElement('img')
    img.src = `${url}`
    img.alt = 'status-image'
    results.appendChild(img)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get city from user
    const city = document.getElementById('city').value.trim()
    const requestUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

    async function getWeather() {
        try {
            const response = await fetch(requestUrl)
            const data = await response.json()
            const cityName = data.location.name
            const region = data.location.region
            const country = data.location.country
            const localTime = data.location.localtime
            const condition = data.current.condition.text
            const icon = data.current.condition.icon
            const temp = data.current.temp_c
            const humidity = data.current.humidity
            const wind = data.current.wind_kph

            paragraphElement([
                `${cityName}, ${region}, ${country}`,
                `Local time: ${localTime}`,
                condition,
                `${temp}°C`,
                `${humidity}%`,
                `${wind}km/h`
            ], true)
            imageElement(`https:${icon}`)
            
            switch (response.code) {
                case 1003:
                    paragraphElement('Please enter a city name', false)
                    break;
                
                case 1006:
                    paragraphElement('Please make sure the city name is correct and contains no spelling mistake', false)
                    break;
                case 2006:
                case 2008:
                    paragraphElement('Problems with API Key, Please try again later', false)
                    break;
                case 2007:
                    paragraphElement('Maximum number of calls per month has been exceeded', false)
                    break;
                case 2009:
                    paragraphElement('API Key does not have access to this resouce', false)
                    break; 
            }
        }
        catch {
            paragraphElement('Something went wrong, check your connection and try again later', false)
        }
    }
    getWeather()
})