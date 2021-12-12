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
