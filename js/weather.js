$(function () {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=50.8814331&lon=20.8034145&appid=d96cf17da3884e7438af5a7fd3f66737&lang=pl&units=metric", requestOptions)
        .then(response => response.json())
        .then(result => {
                let clouds = result.weather[0].description.toString();
                let temp = result.main.temp.toString();
                let feels = result.main.feels_like.toString();
                const weather = $("#weather");
                weather.append("<br>" + clouds + "<br>Temperatura: " + temp + "&deg;C" + "<br>odczuwalna: " + feels + "&deg;C");
            }
        )
        .catch(error => console.log('error', error));

    function time() {
        fetch("https://worldtimeapi.org/api/timezone/Europe/Warsaw", requestOptions)
            .then(response => response.json())
            .then(result => {
                let time = result.datetime.substr(11,8)
                document.getElementById("time").innerHTML = "<br>Aktualny czas w Bęczkowie: " + time;
            })
            .catch(error => console.log('error', error));
        setTimeout(function(){time()}, 1000);
    }
    time();
});
