const search_button = document.querySelector(".search button")
search_button.addEventListener("click", () => {
    checkwheather()
})


//hoisting concept is here becz we define function after calling it above 
//but we know that javascript have ability to put all the defined functions or variable at top called as hoisting
let checkwheather = async () => {

    //taking city name from user
    const user_city = () => {
        let input_city = document.querySelector(".search input")
        const city_name = input_city.value
        input_city.value = ""
        return city_name
    }

    //api detail 
    const apikey = "96b14b7479a6ddfc91f83e1c1f15edd4";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${user_city()}`

    //Api fetching
    try {
        const response = await fetch(apiurl + `&appid=${apikey}`)
        var data = await response.json();
        if(response.status==404){
            document.querySelector(".weather").style.display="none"
            document.querySelector(".error").style.opacity="1"    
            setTimeout(()=>{
                document.querySelector(".error").style.transition="opacity linear 0.5s"
                document.querySelector(".error").style.opacity="0"
            },2000)
        }
       
    } catch (error) {
        console.log("Error occured while fetching data " + error)
    }
    

    //checking its day or night
    // Calculate current local time based on timezone
    const localTime = (new Date().getTime() / 1000) + (data.timezone);

    // Determine if it's daytime or nighttime
    const isDaytime = localTime >= data.sys.sunrise && localTime <= data.sys.sunset;//returns true or false

    //taking data form api object
    const temp = data.main.temp
    const city = data.name
    const humidity = data.main.humidity
    const wind_speed = data.wind.speed

    //adding some transition for changing image based on temperature
    const weather_i = document.querySelector("#icon")


    if (temp < 0) {
        weather_i.className = 'ri-snowflake-line main_i';
        weather_i.style.color = '#0b77a6';
    } else if (temp < 10) {
        weather_i.className = 'ri-snowy-fill main_i';
        weather_i.style.color = 'white';
    } else if (temp < 20 && isDaytime == true) {
        weather_i.className = 'ri-sun-cloudy-fill main_i';
        weather_i.style.color = '#0b77a6';
    } else if (temp < 20 && isDaytime == false) {
        weather_i.className = 'ri-moon-cloudy-fill main_i';
        weather_i.style.color = 'white';
    } else if (temp < 30 && isDaytime == true) {
        weather_i.className = 'ri-sun-foggy-fill main_i';
        weather_i.style.color = 'yellow';
    } else if (temp < 30 && isDaytime == false) {
        weather_i.className = 'ri-moon-foggy-fill main_i';
        weather_i.style.color = 'white';
    } else if (temp < 40) {
        weather_i.className = 'ri-temp-hot-line main_i';
        weather_i.style.color = ' #FF4500';
    } else {
        weather_i.className = 'ri-fire-fill main_i';
        weather_i.style.color = '#ff6723';
    }


    //dom manipulation data
    const dom_temp = document.querySelector(".temp")
    const dom_city = document.querySelector(".city")
    const dom_humidity = document.querySelector(".humidity")
    const dom_wind = document.querySelector(".wind")

    //putting data into dom
    dom_temp.textContent = temp + "°C"
    dom_city.textContent = city
    dom_humidity.textContent = humidity + "%"
    dom_wind.textContent = wind_speed + "(km/h)"

     //now we making main display block
    document.querySelector(".weather").style.display="block"

    

}



