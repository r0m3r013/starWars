var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html'
        })
        .when('/logs', {
            templateUrl: 'logs.html'
        })
})

app.controller('appCtrl', function($scope, $http) {
    $scope.name = ''
    $scope.types = [
        { type: '', label: 'Selecciona una opción' },
        { type: 'people', label: 'Personajes' },
        { type: 'species', label: 'Especies' },
        { type: 'starships', label: 'Naves' }
    ]

    $scope.Consult = function() {
        if ($scope.type && $scope.name) {
            $http.get('http://localhost:3000/StarWars/?type=' + $scope.type + '&name=' + $scope.name)
                .then((res) => {
                    console.log(res.data.results)
                    switch ($scope.type) {
                        case 'people':
                            $scope.names = res.data.results;
                            $("#ships").hide();
                            $("#species").hide();
                            $("#people").show();
                            break;
                        case 'species':
                            $scope.species = res.data.results;
                            $("#ships").hide();
                            $("#people").hide();
                            $("#species").show();
                            break;
                        case 'starships':
                            $scope.ships = res.data.results;
                            $("#people").hide();
                            $("#species").hide();
                            $("#ships").show();
                            break;
                    }

                })
        }
    }
})

app.controller('logCtrl', ($scope, $http) => {
    $http.get('http://localhost:3000/StarWarsLog')
        .then((res) => {
            console.log(res.data)
            $scope.names = res.data;
        })
})