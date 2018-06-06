var app = angular.module('myApp', []);

app.controller('myCtrl', [
    '$scope', '$http', '$q',
    function ($scope, $http, $q) {

        var baseUrl = "https://hacker-news.firebaseio.com/";
        var apiVersion = "v0/";
        var fullUrl = baseUrl + apiVersion;
        var storyIds = [];
        var promises = [];
        var allData = [];
        $http.defaults.cache = true;

        $scope.init = function () {

              
                $http.get(fullUrl + 'topstories.json', { cache: true }).
                    then(function (response) {
                        storyIds = response.data;

                        for (i = 0; i < storyIds.length; i++) {
                            var ref = 
                            promises.push($http.get(fullUrl + 'item/'+storyIds[i]+'.json', { cache: true}));
                        }

                        $q.all(promises).then(function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].data != null) {
                                    allData.push(
                                        data[i].data
                                    );
                                }
                            }
                            $scope.finalData = allData;
                        })
                    });
                };
    }]
);