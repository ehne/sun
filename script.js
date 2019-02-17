
  
  $(document).ready(function() {
    
    
  var latitude;
  var longitude;
  var ctx = $("#weatherChart");
  
  var forecastData = {
      highTemp: [],
    }


  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(location) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
      console.log(latitude + " " + longitude);

      

    
   setTimeout(function(){
		$('div').removeClass('loader');
	}, 1500);     

      var url = "https://api.darksky.net/forecast/55c3094a65ec3abf647b001be8293bf1/" + latitude + "," + longitude + "?callback=?&units=si";

      $.getJSON(url, function(data) {
        console.log(data);

        var temp = data.currently.temperature;
        var celsius = data.currently.temperature.toFixed(1) + "&deg;C";
        var description = data.currently.summary;
        var icon = "is-icon is-big-icon wi wi-forecast-io-" + data.currently.icon;
        var rain = (data.currently.precipProbability * 100).toFixed(0) + " %";
        var uvIndex = data.currently.uvIndex;
        
        for (i = 0; i < data.hourly.data.length; i++) {
              forecastData.highTemp[i] = data.hourly.data[i].temperature;
              console.log(data.hourly.data[i].temperature);
            }  
        
        //bloody timeout so you can see the loading bars
        setTimeout(function() {
          $("#icon").html("<i class=\"" + icon + "\">");
          $("#description").html(description);

          $("#temp").html(celsius);

          $("#rain").html(rain)
          $("#uv").html(uvIndex)
          
        //today forecast in C
        var todayMaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
        var todayMinTemp = data.daily.data[0].temperatureMin.toFixed(0);
        var todayIcon = "wi wi-forecast-io-" + data.daily.data[0].icon;
        $("#todayC").html("<br>"+ todayMinTemp + "&deg;/"+ todayMaxTemp +"&deg; <br> <i class=\"" + todayIcon + "\" id=\"smallIcon\">");
                
                
              
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['12 am','1 am','2 am','3 am','4 am','5 am','6 am','7 am','8 am','9 am','10 am','11 am','12 pm','1 pm','2 pm','3 pm','4 pm','5 pm','6 pm','7 pm','8 pm','9 pm','10 pm','11 pm','12 pm'],
                        datasets: [{
                            label: 'Temperature',
                            data: forecastData.highTemp,
                            backgroundColor: [
                                'rgba(255,43,0, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,43,0,1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Todays Temperature",
                            fontSize: 17,
                            fontColor: "#000",
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 3,
                                top: 0,
                                bottom: 0
                            }
                        },
                        legend: {
                            display: false,
                        }
                    }
                });
        
        
        
        
        
         }, 100);   // end of timeout 

      });

    });
  } else {
    alert("We couldn` retrieve your location, please check your location settings");
  };

});