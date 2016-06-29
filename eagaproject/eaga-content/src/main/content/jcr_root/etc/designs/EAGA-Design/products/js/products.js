eagaApp.controller("ProductsController", [ '$scope', '$http', function($scope, $http) {
	$scope.products = [];
	$scope.callAjaxProducts = function() {
		var path = CQ.shared.HTTP.getPath();
		$http({
			method : 'GET',
			url : path + '.LoadProductsList.json'
		}).success(function(data) {
			$scope.products = data;
		}).error(function(data) {
			console.log('Load Products error!!' + data);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
}]);



