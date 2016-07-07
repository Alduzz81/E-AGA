eagaApp.controller("BannerController", [ '$scope', '$http', function($scope, $http) {
	$scope.callAjaxImage = function(idImg) {
        var f="IdImage1";
        $scope.idTagImg=idImg;
		console.log(idImg);
        console.log('param_ '+$scope.idTagImg+' param1: ' +idImg);

		var path = CQ.shared.HTTP.getPath();
		$http({
			method : 'GET',
			url : path + '.LoadImage.json',
            params:{
            	'J_pathI': $('#'+idImg).attr('src')

	   		}
		}).success(function(data) {
			$scope.image = data;
            console.log('json: '+$scope.image.IdProdotto);
		}).error(function(data) {
			console.log('Load Products error!!' + data);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
}]);


$(document).ready(function(){
	var x=1;
    var string='IdImage';
	$('.imageBanner').each(function(){
		var idImage=string+x;
		$(this).attr('id',(idImage));
        $(this).parent().attr("ng-click","callAjaxImage('"+idImage+"')");
        x++;
	});
});
