eagaApp.controller("BannerController", [ '$scope', '$http', '$window', function($scope, $http, $window) {
	$scope.callAjaxImage = function(idImg) {
		var path = CQ.shared.HTTP.getPath(); 
		$http({
			method : 'GET',
			url : path + '.LoadImage.json',
            params:{
            	'J_pathI': $(idImg.toElement).attr('src').toString()
	   		}
		}).success(function(data) {
			$scope.image = data;
            $window.location.href = '/content/eaga/product.html/id='+$scope.image.IdProdotto; 
		}).error(function(data) {
            console.log('Load Image error!!' + data);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
}]); 
