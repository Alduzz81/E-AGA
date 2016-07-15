eagaApp.controller("ProductsController", [ '$scope', '$http', function($scope, $http) {
	$scope.products = [];
    $scope.noproducts="";

    $scope.searchRedirect = function(categories){
        setCookie("searchProduct", $("input[name=search-products]").val(), 1);
        setCookie("categoriesProduct", categories, 1);
        setCookie("anotherPage", true, 1);
		window.location.href = '/content/eaga/products.html';
	};

    $scope.callAjaxSearchProducts = function() {
        var categoriesProducts=getCookie("categoriesProduct");
        var searchProducts=getCookie("searchProduct");
		var path = CQ.shared.HTTP.getPath();
		$http({
			method : 'GET',
			url : path + '.LoadProductsListSearch.json',
            params:{
            	'J_categoria': categoriesProducts,
            	'J_search': searchProducts
	   		}
		}).success(function(data) {
			$scope.products = data;
			$scope.selected={IdCategoria: categoriesProducts};
			$scope.isEmptyProducts();        
        	$('#selected-categories').val(categoriesProducts);
            $('#text-search').val(searchProducts);
            setCookie("anotherPage", false, 1);
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
    	var positionPath=path.indexOf(".html/id");
    	if(positionPath >-1){
    		path=path.substring(0,positionPath);
        }
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

$(document).ready(function () {
    if(CQ.shared.HTTP.getPath()==="/content/eaga/products"){
        var anotherPage=getCookie("anotherPage");
        if(anotherPage=='true'){
            angular.element(document.getElementById('readyCallAjax')).scope().callAjaxSearchProducts();
        }
    }
});