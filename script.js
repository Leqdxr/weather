const form = document.querySelector('form')
const results = document.querySelector('.results')

// Free-tier API Key exposed on purpose because this is a practice project with no backend
const API_KEY = '82b7461b5f374a1f89513626262909'

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get city from user
    const city = document.getElementById('city').value.trim()
    const requestUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

    async function getWeather() {
        try {
            const response = await fetch(requestUrl)
        }
        catch {
            
        }
    }
})