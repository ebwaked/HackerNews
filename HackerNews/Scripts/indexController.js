var app = angular.module('myApp', []);

app.controller('myCtrl', [
    '$scope', '$http', '$q',
    function ($scope, $http, $q) {

        var baseUrl = "https://hacker-news.firebaseio.com/";
        var apiVersion = "v0/";
        var storyIds = [];
        var promises = [];
        var allData = [];

        $scope.init = function () {
            console.log(baseUrl + apiVersion);
            $http.get(baseUrl + apiVersion + 'topstories.json').
                then(function (response) {
                    storyIds = response.data;

                    for (i = 0; i < storyIds.length; i++) {
                        var ref = 
                        promises.push($http.get(baseUrl + apiVersion + 'item/'+storyIds[i]+'.json'));
                    }

                    $q.all(promises).then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].data != null) {
                                allData.push(
                                    data[i].data
                                );
                            }
                            $scope.finalData = allData;
                        }
                    })
                });
        };
        
    }]
);