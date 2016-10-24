

var app = angular.module('myapp', []);
app.controller('mySrvctrl', function($scope,$http) {
    console.log('hello thhis is servic controller');
    $scope.message = "this controller message";
    $scope.create = function(){
        console.log($scope.serviceClient);
        $http.post('/serviceClients',$scope.serviceClient).success(function(response){
            $scope.all() ;
        });
    }

    $scope.all =function () {
    $http.get('/serviceClients').success(function(response){
        $scope.serviceClients =response
    });

    }

    $scope.select =function(id){
        $http.get('/serviceClients/'+id).success(function (response) {
            console.log('edit data',response);
            $scope.serviceClient =response;
        })
    }
    $scope.update =function(id){
        $http.put('/serviceClients/'+id,$scope.serviceClient).success(function (response) {
            console.log('put data',response);
            $scope.all() ;
        })
    }

    $scope.remove =function(id){
        $http.delete('/serviceClients/'+id).success(function (response) {
            $scope.all() ;
        })
    }

    $scope.all();
});