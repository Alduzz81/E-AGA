eagaApp.controller("ProductsController", [ '$scope', function($scope) {
	$scope.products =  callAjaxProducts();
    $scope.abcde = $scope.products;
	function callAjaxProducts() {
		var path = CQ.shared.HTTP.getPath();
		$.ajax({
			type : 'GET',
			url : path + '.LoadProducts.json',
			success : function(msg) {
				console.log('Load Products success!!'+msg+ ' asd');
           		 $scope.products = msg;
           		 for(var key in msg){
					console.log('Load Products success msg!!'+msg[key].IdProdotto+ ' ' + key);
       			 }
               for(var key in msg){
					console.log('Load Products success products!!'+msg[key].IdProdotto+ ' ' + key);
       			 }

            	console.log('Load Products success fine products!!'+$scope.products+ ' asd');
				return msg;
			},
			error : function(data, status) {
				console.log('Load Products procedure failed: ');
			}
		});
	};
}]);
