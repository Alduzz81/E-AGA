//var eagaApp = angular.module('eagaApp', []);

eagaApp.controller("LoginController", ['$scope', '$window', function($scope,$window) {
    // I contain the details of the customer to be rendered.
	$scope.utenti=1;
	$scope.loginValidate() = function() {
		$window.location.href = '/content/eaga/products.html';
    };
}]);


/*
eagaApp.controller("LoginController", ['$scope', function($scope) {  
	$scope.utenti1=1;
	$scope.fullName = function() {
		console.log("Ciao");
		$scope.utenti1=5;
    };
	
	$scope.loginAccount= function(){
		$scope.utenti1=5;
	}
	
	/*
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
}]);*/
/*
function loginAccount(){
	console.log("Ciao");
}*/