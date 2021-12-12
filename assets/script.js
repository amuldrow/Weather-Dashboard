var key = '6e24ae4caaceaa4df66eb50fd45e65aa'
var city = ''

// get current date and time 
var date = moment().format('dddd, MMMM Do YYYY');
var time = moment().format('YYYY-MM-DD HH:MM:SS');

var cityhistory = [];
$('.search').on("click", function (event) {
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if (city === "") {
        return;
    };
    cityhistory.push(city);

    localStorage.setItem('city', JSON.stringify(cityhistory));
    fivedayForecastEl.empty();
    getHistory();
    getWeatherToday();
});

// will create buttons for recent cities searched 
var conthistoryEl = $('.cityhistory');
function getHistory(){
    conthistoryEl.empty();

    for (let i = 0; i < cityhistory.length; i++) {
        var rowEl = $('<row>');
        var btnEl = $('<button>').text('${cityhistory[i]}')

        rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

        contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
    }
    // buttons start search 
    $('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		fiveForecastEl.empty();
		getWeatherToday();
	});

    // main Today card body 
    var cardTodayBody = $('.cardBodyToday')
    // applies weather info to weather today card and 5 day forecast
    function getWeatherToday() {
        var getURLCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}';

        $(cardTodayBody).empty();

        $.ajax({
            url: getURLCurrent,
            method: 'GET',

        }).then(function (response) {
            $('.cardTodayCityName').text(response.name);
            $('.cardTodayDate').text(date);
            //icons
            $('.icons').attr('src', 'https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png');
            //Temp
            var pEl = $('<p>').text('Temperature: ${response.main.temp}°F');
            cardTodayBody.append(pEl);
            // Feels like
            var pElTemp = $('<p>').text('Feels Like: ${response.main.feels_like}°F');
            cardTodayBody.append(pElTemp);
            //Humidity
            var pElHumid = $('<p>').text('Humidity: ${response.humidity}°F');
            cardTodayBody.append(pElHumid);
            //Wind Speed
            var pElWind = $('<p>').text('Wind speed: ${response.wind.speed}MPH');
            cardTodayBody.append(pElWind);
            //Set Lattitude and longitude for city 
            var CityLon = response.coord.lon;
            var Citylat = response.coord.lat;

            var getURLUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

            $.ajax({
                url: getURLUvi,
                method: 'GET'
            }).then(function (response) {
                var pElUvi = $('<p>').text(`UV Index: `);
			var uviSpan = $('<span>').text(response.current.uvi);
			var uvi = response.current.uvi;
			pElUvi.append(uviSpan);
			cardTodayBody.append(pElUvi);
			//set the UV index to match an exposure chart severity based on color 
			if (uvi >= 0 && uvi <= 2) {
				uviSpan.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				uviSpan.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				uviSpan.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				uviSpan.attr("class", "red")
			} else {
				uviSpan.attr("class", "purple")
			}
		});
            }
            })
        }
    }
