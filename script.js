const url= "https://api.openweathermap.org/data/2.5/weather?q=";
const API_URL= "8f88711e2f829ce41806f947d638f311";

const search= document.querySelector(".search");
const temp= document.querySelector("#temp");
const main= document.querySelector("#main");
const humidity= document.querySelector("#humidity");
const pressure= document.querySelector("#pressure");
const wind= document.querySelector("#wind");
const clouds= document.querySelector("#clouds");
const city= document.querySelector("#city");
const time= document.querySelector("#time");
const icons= document.querySelector("#icnos");

var newDate = new Date();
setInterval(function() {
    
    let datetime =  newDate.timeNow();
    time.innerHTML= `${datetime}`;
}, 60000);

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() ;
}


search.addEventListener("keypress", (event) => {
   const input= search.value;
   
    if( event.key === "Enter" )
    { 
        if( input.length > 0 )
        {
            console.log( "input");
            console.log( input);
        
            searchFunc(input);
            search.value= "";
        }
        else
        alert("Search something....")
        
    }
})

searchFunc("Patna");
let datetime =  newDate.timeNow();
    time.innerHTML= `${datetime}`;

async function searchFunc(query) {
    
    try {
        const res= await fetch(`${url}${query}&appid=${API_URL}`);
        const data= await res.json();

        console.log(data);
        fillData(data);

    } catch (error) {
        console.log("Eroor in fetching data");
        console.log(error.message);
        alert("City not found");
    }
}

function fillData(data) {

    let t= Math.floor(data.main.temp- 273);

    city.innerHTML= `${data.name}`;
    temp.innerHTML= `${t}°`;
    main.innerHTML= `${data.weather[0].main}`;
    humidity.innerHTML= `${data.main.humidity} %`;
    pressure.innerHTML= `${data.main.pressure} hP`;
    wind.innerHTML= `${data.wind.speed} km/h`;
    clouds.innerHTML= `${data.clouds.all} %`;

    if( data.weather[0].main === "Clouds" )
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/b83a352b1228b6e4c2f29e916941654e.png`;
    if( data.weather[0].main === "Haze" )
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/463ce3e79803e306a75840bb4cedbdc3.png`;
    if( data.weather[0].main === "Thunderstorms")
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/cff4f21092d5ce03d120d747954c1abb.png`
    if( data.weather[0].main === "Rain" )
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/6816842292a58d78e7586a48b672e45e.png`;
    if( data.weather[0].main === "Snow")
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/699c7a62088b0831b6ef8d965402aa0a.png`;
    if( data.weather[0].main === "Clear")
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/35c778528f79f2aa038b07526447f606.png`
    else
    icons.src= `https://help.apple.com/assets/6222428998C2CE34C75A5252/6222428B98C2CE34C75A5267/en_US/eebb5704c3a2c58fc97e2ed792204f2e.png`

    
}