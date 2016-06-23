/*******************************************************************************
 * START CART
 ******************************************************************************/

var list = {
		Prodotto_1: {
					IdProdotto: 1,
					NomeProdotto: "Pippo",
					DescrizioneProdotto: "baudo",
					PrezzoProdotto: 1256,
					QuantitaProdotto: 2,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "minchioni"
					},
		Prodotto_2: {
					IdProdotto: 2,
					NomeProdotto: "TestServlet",
					DescrizioneProdotto: "descrizioneServlet",
					PrezzoProdotto: 102,
					QuantitaProdotto: 99,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "Servlet"
					},
		Prodotto_3: {
					IdProdotto: 3,
					NomeProdotto: "Iphone6s",
					DescrizioneProdotto: "Descrizione",
					PrezzoProdotto: 499,
					QuantitaProdotto: 50,
					QuantitaSelezionata: 2,
					CategoriaProdotto: "Telefono"
					},
		Prodotto_4: {
					IdProdotto: 4,
					NomeProdotto: "Iphone 5",
					DescrizioneProdotto: "iphone5",
					PrezzoProdotto: 399,
					QuantitaProdotto: 50,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "Telefono"
					},
		Prodotto_5: {
					IdProdotto: 5,
					NomeProdotto: "Iphone5",
					DescrizioneProdotto: "iphone5",
					PrezzoProdotto: 399,
					QuantitaProdotto: 50,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "Telefono"
					},
		Prodotto_6: {
					IdProdotto: 6,
					NomeProdotto: "Iphone4",
					DescrizioneProdotto: "iphone4",
					PrezzoProdotto: 299,
					QuantitaProdotto: 100,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "Telefono"
					},
		Prodotto_7: {
					IdProdotto: 7,
					NomeProdotto: "Iphone 6",
					DescrizioneProdotto: "4322",
					PrezzoProdotto: 432,
					QuantitaProdotto: 23,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "423"
					},
		Prodotto_8: {
					IdProdotto: 8,
					NomeProdotto: "Iphone6",
					DescrizioneProdotto: "656",
					PrezzoProdotto: 23,
					QuantitaProdotto: 30,
					QuantitaSelezionata: 3,
					CategoriaProdotto: "565"
					},
		Prodotto_9: {
					IdProdotto: 9,
					NomeProdotto: "Samsung S5",
					DescrizioneProdotto: "descrizione",
					PrezzoProdotto: 349,
					QuantitaProdotto: 100,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "Telefono"
					},
		Prodotto_10: {
					IdProdotto: 10,
					NomeProdotto: "S4",
					DescrizioneProdotto: "f",
					PrezzoProdotto: 600,
					QuantitaProdotto: 3,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "f"
					},
		Prodotto_11: {
					IdProdotto: 11,
					NomeProdotto: "S3",
					DescrizioneProdotto: "td",
					PrezzoProdotto: 89,
					QuantitaProdotto: 5,
					QuantitaSelezionata: 3,
					CategoriaProdotto: "fdt"
					},
		Prodotto_12: {
					IdProdotto: 12,
					NomeProdotto: "S2",
					DescrizioneProdotto: "w",
					PrezzoProdotto: 5,
					QuantitaProdotto: 5,
					QuantitaSelezionata: 1,
					CategoriaProdotto: "w"
					},
		Prodotto_13: {
					IdProdotto: 13,
					NomeProdotto: "maria",
					DescrizioneProdotto: "sdfsdfsd",
					PrezzoProdotto: 2312,
					QuantitaProdotto: 22,
					QuantitaSelezionata: 2,
					CategoriaProdotto: "3333"
					}
	};


eagaApp.controller("CartController", ['$scope', '$window', '$http', function($scope, $window, $http) {
	
	$scope.goToCheckout = function(){
		var modifiedItems = [];
		for(var key in $scope.cartList){
			if($scope.cartList[key].QuantitaSelezionata > $scope.cartList[key].QuantitaProdotto){
				$scope.cartList[key].QuantitaSelezionata = $scope.cartList[key].QuantitaProdotto;
				modifiedItems.push($scope.cartList[key].NomeProdotto);
			}
		}
		if(modifiedItems.length == 0){
			alert("Acquisto effettuato correttamente!\n\nProcedi con il pagamento.");
		} else {
			var cartItemsList = "";
			for(var i = 0; i < modifiedItems.length; i++){
				cartItemsList += "   - " + modifiedItems[i] + "\n";
				if(i == modifiedItems.length -1){
					cartItemsList += "\n";
				}
			}
			modifiedItems = [];
			alert("Attenzione! Il quantitativo dei seguenti articoli superava la disponibilità in magazzino.\n\n" +
				cartItemsList + "È stata impostata la quantità massima disponibile.\n\n" +
				"Controlla l'ordine e procedi con l'acquisto.\n");
		}
	};
	
	$scope.cartList = list;
	
	$scope.options = function(qnt){
		var arr = [];
		if(qnt < 10){
			for(var i = 1; i <= qnt ; i++){
				arr.push(i);
			}
		} else {
			arr = [1,2,3,4,5,6,7,8,9,'10+'];
		}
		return arr;
	}
	
	$scope.findItem = function(id){
		for(var key in $scope.cartList){
			if($scope.cartList[key].IdProdotto == id){
				return $scope.cartList[key];
			}
		}
	}
	
	$scope.total = function(){
		var tot = 0;
		for(var i in $scope.cartList){
			var obj = $scope.cartList[i];
			tot += obj.PrezzoProdotto * obj.QuantitaSelezionata;
		}
		return tot;
	};
	
	$scope.totalQnt = function(){
		var tot = 0;
		for(var i in $scope.cartList){
			tot += parseInt($scope.cartList[i].QuantitaSelezionata);
		}
		return tot;
	};
	
	$scope.savedList = {};
	
	$scope.removeProduct = function(id){
		for(var key in $scope.cartList){
			if($scope.cartList[key].IdProdotto == id){
				delete $scope.cartList[key];
			}
		}
	};
	
	$scope.moveToSavedForLater = function(id){
		for(var key in $scope.cartList){
			if($scope.cartList[key].IdProdotto == id){
				$scope.savedList[key] = $scope.cartList[key];
				delete $scope.cartList[key];
			}
		}
	};
	
	$scope.removeSavedProduct = function(id){
		for(var key in $scope.savedList){
			if($scope.savedList[key].IdProdotto == id){
				delete $scope.savedList[key];
			}
		}
	};
	
	$scope.moveToCart = function(id){
		for(var key in $scope.savedList){
			if($scope.savedList[key].IdProdotto == id){
				$scope.cartList[key] = $scope.savedList[key];
				delete $scope.savedList[key];
			}
		}
	};
	
	$scope.totalSavedQnt = function(){
		var tot = 0;
		for(var i in $scope.savedList){
			tot++;
		}
		return tot;
	};
	
	
	
	$scope.loadCartListByID = function(customerId){
		
		var data = {
		        'j_customerId': customerId
	    	};
		
	    var path = CQ.shared.HTTP.getPath();
		
		$http({
	    	  method: 'GET',
	    	  url: path + '.LoadCartProducts.json',
	          params: data
	    	}).then(function successCallback(response) {
	    		console.log("Show Cart List Success! ang " + response.data.Prodotto_1.NomeProdotto);
	    		
	    		$scope.cartList = response.data;
	    		$("#total-cart-qnt-topnav").text($scope.totalQnt);
	    		
	    	  }, function errorCallback(response, status) {
	    		  console.log('Show Cart List procedure failed ang: ' + status);
	    	  });
	}
	
}]);

function getRandomId(){
	var randomID = parseInt(( Math.random()*3 ) + 1);
	return randomID;
};

/*******************************************************************************
 * CART AT DOCUMENT READY
 ******************************************************************************/


$(document).ready(function () {
	
	if($(document).find("title").text() == "Cart"){
		
		angular.element(document.getElementById('main-cart-id')).scope().loadCartListByID(getRandomId());	
	}
	
});

/*******************************************************************************
 * END CART
 ******************************************************************************/
