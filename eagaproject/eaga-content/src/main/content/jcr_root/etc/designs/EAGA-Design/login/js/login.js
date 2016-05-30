eagaApp.controller("LoginController", ['$scope', '$window', function($scope,$window) {
	$scope.email="";
	$scope.password="";
	$scope.valid=true;
	$scope.loginValidate = function(e,p) {
		$scope.valid=true;
		var i=0;
		while(i<$scope.utenti.length){
			if(($scope.utenti[i].email==$scope.email) && ($scope.utenti[i].password==$scope.password)){
				$window.location.href = '/content/eaga/products.html';
				return;
			}
			i++;
		}
		$scope.valid=false;
    };
    
    $scope.utenti =   
	    [
			{
				email:"eaga1@eag.it",
				password:"123"
			},
			{
				email:"eaga2@eag.it",
				password:"123"
			},
			{
				email:"eaga3@eag.it",
				password:"123"
			}
		]
}]);