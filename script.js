var q = "";
// Click listener for the Search Button
$("#button-addon2").click(function (e) {
    q = document.getElementById("citySearch").value;
    previousCities();
    clearWeather();
    getCurrentWeather();
    getFiveDayWeather();
})
// Click listener for Past Cities list
$("#pastSearches").click(function (e) {
    e.preventDefault();
    q = $(event.target).text();
    console.log($(event.target).text())
    clearWeather();
    getCurrentWeather();
    getFiveDayWeather();
});
// Function to get the current weather and post it to the corresponding div
function getCurrentWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&APIkey=b79b01d2b2979ed0c619ce14bf31c3f6"
    // console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var d = new Date()
        // Create a new img for the weather icon
        var newIMG = $("<img>")
        var imgURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        $(newIMG).attr("src", imgURL)
        // Calculate the temperature in F
        var K = response.main.temp
        var fahrenheit = Math.floor(((K - 273.15) * 1.8) + 32)
        // Add the City, Date, Temp, Humidity, Wind, and UV Index values to their divs
        $("#city-name").text(q.charAt(0).toUpperCase() + q.substring(1) + ", " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear())
        $("#city-name").append(newIMG)
        $("#temperature").text("Temperature: " + fahrenheit + "℉")
        $("#humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH")
        // Get the UV index passing the latitude and longitude provided by the weatherAPI response as parameters
        getUvIndex(response.coord.lat, response.coord.lon)
        // Show the weather div
        $("#all-weather").removeClass('collapse');
    });
}
// Function to get the five day weather and post it to the corresponding div
function getFiveDayWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + q + ",us&APIkey=b79b01d2b2979ed0c619ce14bf31c3f6"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var d = new Date()
        // Set today's day date to a variable
        today = d.getDate()
        // Change the first day's card title to today's date
        $("#card-1-date").text((d.getMonth() + 1) + "/" + today + "/" + d.getFullYear())
        // Create a new image with the icon's URL
        var newimg1 = $("<img>")
        var newimgurl1 = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
        $(newimg1).attr("src", newimgurl1)
        // Add the image, temp, and humidity to the card
        $("#card-1").append(newimg1)
        $("#card-1-temp").text("Temp: " + (Math.floor((response.list[0].main.temp - 273.15) * 1.8) + 32) + "℉")
        $("#card-1-humidity").text("Humidity: " + response.list[0].main.humidity + "%")
        // Second day, manually looping through the same process but getting info for the next day
        $("#card-2-date").text((d.getMonth() + 1) + "/" + (today + 1) + "/" + d.getFullYear())
        var newimg2 = $("<img>")
        var newimgurl2 = "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png"
        $(newimg2).attr("src", newimgurl2)
        $("#card-2").append(newimg2)
        $("#card-2-temp").text("Temp: " + (Math.floor((response.list[8].main.temp - 273.15) * 1.8) + 32) + "℉")
        $("#card-2-humidity").text("Humidity: " + response.list[8].main.humidity + "%")
        // Third day
        $("#card-3-date").text((d.getMonth() + 1) + "/" + (today + 2) + "/" + d.getFullYear())
        var newimg3 = $("<img>")
        var newimgurl3 = "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png"
        $(newimg3).attr("src", newimgurl3)
        $("#card-3").append(newimg3)
        $("#card-3-temp").text("Temp: " + (Math.floor((response.list[16].main.temp - 273.15) * 1.8) + 32) + "℉")
        $("#card-3-humidity").text("Humidity: " + response.list[16].main.humidity + "%")
        // Fourth day
        $("#card-4-date").text((d.getMonth() + 1) + "/" + (today + 3) + "/" + d.getFullYear())
        var newimg4 = $("<img>")
        var newimgurl4 = "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png"
        $(newimg4).attr("src", newimgurl4)
        $("#card-4").append(newimg4)
        $("#card-4-temp").text("Temp: " + (Math.floor((response.list[24].main.temp - 273.15) * 1.8) + 32) + "℉")
        $("#card-4-humidity").text("Humidity: " + response.list[24].main.humidity + "%")
        // Fifth day
        $("#card-5-date").text((d.getMonth() + 1) + "/" + (today + 4) + "/" + d.getFullYear())
        var newimg5 = $("<img>")
        var newimgurl5 = "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png"
        $(newimg5).attr("src", newimgurl5)
        $("#card-5").append(newimg5)
        $("#card-5-temp").text("Temp: " + (Math.floor((response.list[32].main.temp - 273.15) * 1.8) + 32) + "℉")
        $("#card-5-humidity").text("Humidity: " + response.list[32].main.humidity + "%")
    });
}
// Function to clear past weather info
function clearWeather() {
    $("#city-name").empty
    $("#temperature").empty
    $("#humidity").empty
    $("#wind").empty
    for (var i = 1; i < 6; i++) {
        $("#card-" + i + "-date").empty
        $("#card-" + i + "> img").remove()
        $("#card-" + i + "-temp").empty
        $("#card-" + i + "-humidity").empty
    }
}
// Function to get UV Index using latitude and longitude parameters
function getUvIndex(la, lo) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=b79b01d2b2979ed0c619ce14bf31c3f6&lat=" + la + "&lon=" + lo
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response.value)
        // Set the UV-index to a variable and change the background color depending on its value (green/yellow/red)
        var UVi = response.value
        $("#uv-index").text(UVi)
        if (UVi <= 3) {
            $("#uv-index").attr("class", "badge badge-success")
        }
        else if (3 < UVi <= 6) {
            $("#uv-index").attr("class", "badge badge-warning")
        }
        else if (UVi > 6) {
            $("#uv-index").attr("class", "badge badge-danger")
        }
    });
}
// Function to save the last city to sessionStorage and add a new button to the list of previous cities
function previousCities() {
    var cityName = q;
    sessionStorage.setItem("lastCity", cityName);
    var newLi = $("<button>");
    newLi.text(cityName.charAt(0).toUpperCase() + cityName.substring(1));
    $(newLi).attr("class", "list-group-item list-group-item-action btn-outline-secondary pastCity");
    $('#pastSearches').append(newLi);
}// Function to use last search on page load
function pageLoad() {
    q = sessionStorage.getItem("lastCity")
    previousCities();
    getCurrentWeather();
    getFiveDayWeather();
}
pageLoad()