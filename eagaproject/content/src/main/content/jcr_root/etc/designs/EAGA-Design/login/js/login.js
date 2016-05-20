var myApp=angular.module("myApp",[]);

myApp.controller("LoginController", ['$scope', '$rootScope', function($scope, $rootScope) {  
    $scope.utenti =   
	    [
			{
				email:"eaga1@eag.it",
				passwrod:"123"
			},
			{
				email:"eaga2@eag.it",
				passwrod:"123"
			},
			{
				email:"eaga3@eag.it",
				passwrod:"123"
			}
		]
}]);