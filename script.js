var myApp = angular.module('myApp', []);
myApp.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});
myApp.controller('mainController', function($scope, $http) {
    $scope.hideValue = true;
    $scope.pressure = "NA";
    $scope.humidity = "NA";
    $scope.minTemp = "NA";
    $scope.maxTemp = "NA";
    $scope.weatherHead = "Fetching your location";
    $scope.getLocation = function(city){
        // console.log(city);
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=8e7f53509f9979ea3be81371f0e09c40&units=imperial";
        $http.get(url).success (function(data){
            // console.log(data.weather[0].icon);
            var access = data.main;
            $scope.pressure = access.pressure+ "in";
            $scope.humidity = access.humidity+ "%";
            $scope.minTemp = access.temp_min+ " &#8457";
            $scope.maxTemp = access.temp_max+ " &#8457";
            $scope.weatherHead = "Weather in the city of "+data.name;
            $scope.city = data.name;
            $scope.tempHead = "<img src=\"http://openweathermap.org/img/w/"+data.weather[0].icon+".png\">"+" "+access.temp+" &#8457";
            $scope.hideValue = false;
            getHourly(city);
            getDaily(city);
        });    
    }
    function getHourly(city){
        $scope.hourTable = "";
        var url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=8e7f53509f9979ea3be81371f0e09c40&units=imperial";
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $http.get(url).success (function(data){
            for(i=0;i<data.list.length;i++){
                var milli = new Date(data.list[i].dt*1000);
                if(i%3==0) $scope.hourTable += "<tr>";
                $scope.hourTable += "<td id=\"td\">"+months[milli.getMonth()]+" "+milli.getDate()+" "+milli.getHours()+":00:00</td><td><img src=\"http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png\"> "+data.list[i].main.temp+" &#8457</td>";
                if(i%3==2) $scope.hourTable += "</tr>";
            }
        });  
    }
    function getDaily(city){
        $scope.dailyTable = "";
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&units=imperial&appid=8e7f53509f9979ea3be81371f0e09c40";
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $http.get(url).success (function(data){
            for(i=0;i<data.list.length;i++){
                var milli = new Date(data.list[i].dt*1000);
                if(i%3==0) $scope.dailyTable += "<tr>";
                $scope.dailyTable += "<td id=\"td\">"+months[milli.getMonth()]+" "+milli.getDate()+" </td><td><img src=\"http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png\"> "+data.list[i].temp.day+" &#8457</td>";
                if(i%3==2) $scope.dailyTable += "</tr>";
            }
        });  
    }
});