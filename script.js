const form = document.querySelector('form')
const results = document.querySelector('.results')
const errors = document.querySelector('.errors')

// Free-tier API Key exposed on purpose because this is a practice project with no backend
const API_KEY = '82b7461b5f374a1f89513626262909'

function paragraphElement([...content]) {
    const p = document.createElement('p')
    p.textContent = content.join('\n')
    results.appendChild(p)
}

function errorElement(content) {
    const p = document.createElement('p')
    p.textContent = `${content}`
    errors.appendChild(p)
    p.style.color = '#bf616a'
}

function imageElement(url) {
    const img = document.createElement('img')
    img.src = `${url}`
    img.alt = 'status-image'
    results.appendChild(img)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    results.textContent = ''
    errors.textContent = ''
    
    // Get city from user
    const city = document.getElementById('city').value.trim()
    const requestUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

    async function getWeather() {
        try {
            const response = await fetch(requestUrl)
            const data = await response.json()
            if(data.error) {
                switch (data.error.code) {
                    case 1003:
                        errorElement('Please enter a city name')
                        break;
                    
                    case 1006:
                        errorElement('Please make sure the city name is correct and contains no spelling mistake')
                        break;
                    case 2006:
                    case 2008:
                        errorElement('Problems with API Key, Please try again later')
                        break;
                    case 2007:
                        errorElement('Maximum number of calls per month has been exceeded')
                        break;
                    case 2009:
                        errorElement('API Key does not have access to this resouce')
                        break;
                    default:
                        errorElement('Something went wrong please try again later')
                        break;
                }
                return
            }
            const cityName = data.location.name
            const country = data.location.country
            const localTime = data.location.localtime
            const condition = data.current.condition.text
            const icon = data.current.condition.icon
            const temp = data.current.temp_c
            const humidity = data.current.humidity
            const wind = data.current.wind_kph

            paragraphElement([
                `${cityName}, ${country}`,
                `Local time: ${localTime}`,
                condition,
                `${temp}°C`,
                `${humidity}%`,
                `${wind}km/h`
            ], true)
            imageElement(`https:${icon}`)
            
        }
        catch {
            errorElement('Something went wrong, check your connection and try again later')
        }
    }
    getWeather()
})