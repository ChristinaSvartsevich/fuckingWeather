let cityInp = document.getElementsByClassName("header")[0].querySelector("input");

let date = document.getElementsByClassName("date")[0];

let timesofday = document.getElementsByClassName("image")[0].querySelector("img");

let tempnow = document.getElementsByClassName("temperature")[0];

let temphour = document.getElementsByClassName("weathontime")[0].querySelectorAll("div");
let littleImg = document.getElementsByClassName("weathontime")[0].querySelectorAll("img");

cityInp.addEventListener('keyup', (e)=>{
    if (e.key == 'Enter') {
        showWeather(cityInp.value)
        cityInp.value=''
    }
})

showWeather("minsk")

console.log ()
async function showWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=66b3c3e1676ddd60a73d8a3160445061`;
    let response = await fetch(api);
    let data = await response.json();
    render(data);
    temphour[2].innerText = `${everyHours(data.list[1].dt)}`
    temphour[5].innerText = `${everyHours(data.list[2].dt)}`
    temphour[8].innerText = `${everyHours(data.list[3].dt)}`
    temphour[11].innerText = `${everyHours(data.list[4].dt)}`
    temphour[3].innerText = Math.trunc(data.list[1].main.temp) + "º";
    temphour[6].innerText = Math.trunc(data.list[2].main.temp) + "º";
    temphour[9].innerText = Math.trunc(data.list[3].main.temp) + "º";
    temphour[12].innerText = Math.trunc(data.list[4].main.temp) + "º";

    setDayNight(data.list[0],data.city.sunrise,data.city.sunset, timesofday);




    litlDayNight(data.list[1],data.list[1].clouds.all,littleImg[0]);
    litlDayNight(data.list[2],data.list[3].clouds.all, littleImg[1]);
    litlDayNight(data.list[5].clouds.all, littleImg[2]);
    litlDayNight(data.list[7].clouds.all, littleImg[3]);
    console.log (data)
}

printDate()


function printDate(){

    let headDATA = new Date();
    let options = {weekday: 'long',day: 'numeric',  month: 'long' }
    date.innerText = headDATA.toLocaleString("eng",options);
}


function everyHours(ms){
    let headDATA = new Date(+(ms + "000"));
    return(headDATA.toLocaleTimeString("en-UK", {hour:"2-digit", minute:"2-digit"}))
}


function render(data){
console.log(data);
console.log(data.list[0].main.temp);
tempnow.innerText = data.list[0].main.temp + "°C";


}



function setDayNight(list,sunrise,sunset, timesofday) {
    if (list.dt >sunrise && list.dt <sunset) {
        timesofday.src= "./pic/sun for daynight.png"
    } else {
        timesofday.src= "./pic/moon.png"
    }
}


function litlDayNight( clouds, littleImg) {
    if (clouds <40) {
        littleImg.src= "./pic/sun.png"
    } else {
        littleImg.src= "./pic/cloud.png"
    }
}

