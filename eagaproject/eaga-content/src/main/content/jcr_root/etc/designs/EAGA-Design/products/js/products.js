eagaApp.controller("ProductsController", [ '$scope', '$http', function($scope, $http) {
	$scope.products = [];
    $scope.noproducts="";
	$scope.callAjaxProducts = function(categoria) {
		var path = CQ.shared.HTTP.getPath();
		$http({
			method : 'GET',
			url : path + '.LoadProductsListSearch.json',
            params:{
            	'J_categoria': categoria,
            	'J_search': $("input[name=search]").val()
	   		}
		}).success(function(data) {
			$scope.products = data;
			$scope.isEmptyProducts();				
		}).error(function(data) {
            $scope.isEmptyProducts();
			console.log('Load Products error!!' + data);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
		
	$scope.categorie = [];
	$scope.selected={IdCategoria: 1};
	$scope.callAjaxCategorie = function() {
		var path = CQ.shared.HTTP.getPath();
		$http({
			method : 'GET',
			url : path + '.LoadCategorie.json'
		}).success(function(data) {
			$scope.categorie = data;	
		}).error(function(data) {
			console.log('Load Categorie error!!' + data);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};

	$scope.isEmptyProducts= function(){
		if(Object.keys($scope.products).length<1)
			$scope.noproducts="Nessun prodotto disponibile!";
		else
            $scope.noproducts="Lista prodotti:";
	};
}]);