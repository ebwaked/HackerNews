var app = angular.module('myApp', []);

app.controller('myCtrl', [
    '$scope', '$http', '$q',
    function ($scope, $http, $q) {

        var storyIds = [];
        var promises = [];
        $scope.allData = [];

        $scope.init = function () {
            $http.get('https://hacker-news.firebaseio.com/v0/topstories.json').
                then(function (response) {
                    storyIds = response.data;

                    for (i = 0; i < storyIds.length; i++) {
                        promises.push($http.get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json'));
                    }

                    $q.all(promises).then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].data != null) {
                                $scope.allData.push(
                                    data[i].data
                                );
                            }
                        }
                        console.log($scope.allData);
                    })
                });
        };
    }]
);