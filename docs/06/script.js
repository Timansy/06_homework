// Weather API
// 5ad304cdfd2a3284e3031eae940ea6b3
// api.openweathermap.org/data/2.5/forecast/daily?q=austin&cnt=5&appid=5ad304cdfd2a3284e3031eae940ea6b3
// icon url: "http://openweathermap.org/img/w/" + iconcode + ".png";

// 2020/04/22
// Need to make links dissapear with - sign click
// need to add graceful exit when leaving field
// Metric Imperial toggling
var storedCity = localStorage.getItem('lastCity');
console.log(storedCity);


$(document).ready(function () {

    function formatDate(date) {
        return date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4)

    }


    function getWeather(location, units, addLink) {

        function getWeatherForecast(location, units) {

            $.ajax({
                type: "GET",
                //alt= find
                url: `http://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=20&units=${units}&mode=JSON&APPID=5ad304cdfd2a3284e3031eae940ea6b3`,
                //data: "data",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    $("#cityRow").append(`
                    <div class="col-lg-6">
                    <div class="card-group">
                        <div class="card">
                            <div class="card-body">
                                <h7 class="card-title">${formatDate(response.list[3].dt_txt)} <img src="http://openweathermap.org/img/w/${response.list[3].weather[0].icon}.png" alt="${response.list[3].weather[0].description}">
                                </h7>
                                <p class="card-text">
                                    Temperature ${response.list[3].main.temp}<br>
                                    Humidity ${response.list[3].main.humidity}<br>
                                    <em>${response.list[3].weather[0].description}</em>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h7 class="card-title">${formatDate(response.list[11].dt_txt)} <img src="http://openweathermap.org/img/w/${response.list[11].weather[0].icon}.png" alt="${response.list[11].weather[0].description}">
                                </h7>
                                <p class="card-text">
                                    Temperature ${response.list[11].main.temp}<br>
                                    Humidity ${response.list[11].main.humidity}<br>
                                    <em>${response.list[11].weather[0].description}</em>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h7 class="card-title">${formatDate(response.list[19].dt_txt)} <img src="http://openweathermap.org/img/w/${response.list[19].weather[0].icon}.png" alt="${response.list[19].weather[0].description}">
                                </h7>
                                <p class="card-text">
                                    Temperature ${response.list[19].main.temp}<br>
                                    Humidity ${response.list[19].main.humidity}<br>
                                    <em>${response.list[19].weather[0].description}</em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                        `);
                }
            });

        }

        $.ajax({
            type: "GET",
            //alt= find
            url: `http://api.openweathermap.org/data/2.5/find?q=${location}&cnt=20&units=${units}&mode=JSON&APPID=5ad304cdfd2a3284e3031eae940ea6b3`,
            //data: "data",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (addLink) {
                    $("#cities").prepend(`
                    <li class="nav-item" id="${location}_li">
                    <a href="#remove" ><i class="fas fa-minus" data-value="${location}_li"></i>&nbsp;</a><a class="cityLink" href="#link" data-value="${location}">${location}&nbsp;&nbsp;</a>
                    </li>
                    `);
                }

                $("#cityRow").empty().append(`
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">${response.list[0].name} 
                            <img src="http://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png" alt="${response.list[0].weather[0].icon}">
                            </h3>
                            <p class="card-text">
                                Temperature ${response.list[0].main.temp}<br>
                                Humidity ${response.list[0].main.humidity}<br>
                                <em>They say "${response.list[0].weather[0].description}."</em>
                            </p>
                        </div>
                    </div>
                </div>
                `);
                getWeatherForecast(location, units);
            }
        });

    }


    //page start
    $("#cityRow").empty();

    if (storedCity != null) {
        getWeather(storedCity, "metric", true);
    }

    $("#inputNewCity").on("blur", function () {
        event.stopPropagation();
        if ($("#inputNewCity").val() != "") {
            storedCity = localStorage.setItem('lastCity', $("#inputNewCity").val());
            getWeather($("#inputNewCity").val(), "metric", true);
            $("#inputNewCity").val("");
        }
    });

    $("#inputNewCity").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.stopPropagation();
            if ($("#inputNewCity").val() != "") {
                storedCity = localStorage.setItem('lastCity', $("#inputNewCity").val());
                getWeather($("#inputNewCity").val(), "metric", true);
                $("#inputNewCity").val("");
            }
        }
    });

    $(document).on("click", "a.cityLink", function () {
        console.log("made it here");
        event.stopPropagation();
        getWeather($(this).attr("data-value"), "metric", false);
    });

    $(document).on("click", ".fa-minus", function () {
        console.log($(this).attr("data-value"));
        $("#" + $(this).attr("data-value")).remove();
    });

});
