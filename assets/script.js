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
