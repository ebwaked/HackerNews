var app = angular.module('myApp', []);

app.controller('myCtrl', [
    '$scope', '$http', '$q',
    function ($scope, $http, $q) {

        var storyIds = [];
        var promises = [];
        var allData = [];

        $scope.init = function () {
            $http.get('https://hacker-news.firebaseio.com/v0/askstories').
                then(function (response) {
                    storyIds = response.data;

                    for (i = 0; i < storyIds.length; i++) {
                        var ref = 
                        promises.push($http.get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json'));
                    }

                    $q.all(promises).then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].data != null) {
                                allData.push(
                                    data[i].data
                                );
                            }
                        }
                        //var sortedData = _.sortBy(allData, 'time');
                        //var onlyStories = _.where(sortedData, { type: "story" });
                        //$scope.finalData = onlyStories.slice(0, 25);
                        $scope.finalData = allData;
                        //$scope.finalData = onlyStories.slice(onlyStories.length - 25, onlyStories.length + 1);
                    })

                    
                    
                });

            
        };

        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
        
    }]
);