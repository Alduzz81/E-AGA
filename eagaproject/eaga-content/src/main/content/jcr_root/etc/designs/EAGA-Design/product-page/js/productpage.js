/*******************************************************************************
 * START PRODUCT PAGE
 ******************************************************************************/
function loadSingleProductByID(idProdotto) {
	
	var ckToFind = "singleIdProduct";
	var params = {
	        'j_idProdotto': idProdotto
    	};
	
    var path = CQ.shared.HTTP.getPath();

    $.ajax({
        type: 'GET',
        url: path + '.LoadSingleProduct.json',
        data: params,
        success: function (msg) {
        	console.log('Load Single Product success!!\n\n\tID Prodotto:\t\t'
        	+ msg.IdProdotto 
			+ ',\n\tName:\t\t\t\t'+ msg.NomeProdotto
			+ ',\n\tDescription:\t\t'+ msg.DescrizioneProdotto
			+ ',\n\tPrice:\t\t\t\t'+ msg.PrezzoProdotto
			+ ',\n\tQuantity:\t\t\t'+ msg.QuantitaProdotto
			+ ',\n\tCategogy:\t\t\t'+ msg.CategoriaProdotto);
        	
        	$(".product-name").text(msg.NomeProdotto);
        	$(".product-desc").text(msg.NomeProdotto);
        	$(".product-price").text(msg.PrezzoProdotto);
        	
        	deleteCookie(ckToFind);
    		var newCk = getCookie(ckToFind);
    		console.log("single id product cookie dopo delete 1: " + newCk+1);
        	
        },
        error: function (data, status) {
            console.log('Load Single Product procedure failed: ' + status);
        }
    });
    
};

/*******************************************************************************
 * END PRODUCT PAGE
 ******************************************************************************/


$(document).ready(function () {
	
	if($(document).find("title").text() == "Product"){
		
		var ckToFind = "singleIdProduct";
		var ck = getCookie(ckToFind);
		console.log("single id product cookie: " + ck);
				
		if(ck != "" && ck != undefined){
			loadSingleProductByID(ck);
		}
		
		
		var pathForFrontImg = $(".img-column-item").first().attr("src");
		$(".front-img").attr("src", pathForFrontImg);
		var pathForFrontLargeImg = pathForFrontImg.replace("icons", "large");
		$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
		$(".img-column-item").first().addClass("img-shadow");
		
	}	
	
		$(".img-column-item").click(function(){
			$(".img-column-item").removeClass("img-shadow");
			$(this).addClass("img-shadow");
			var pathForFrontImg = $(this).attr("src");
			$(".front-img").attr("src", pathForFrontImg);
			
			var zoomWindowStyle = $(".zoomWindow").attr("style");
			var zoomWindowStyleBegin = zoomWindowStyle.substr(0, zoomWindowStyle.indexOf('"/')+1);
			var zoomWindowStyleEnd = zoomWindowStyle.substr(zoomWindowStyle.indexOf('");'));
			var pathForFrontLargeImg = pathForFrontImg.replace("/icons/", "/large/");
			zoomWindowStyle = zoomWindowStyleBegin + pathForFrontLargeImg + zoomWindowStyleEnd;
			$(".zoomWindow").attr("style", zoomWindowStyle);
			$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
		});
	
	$(".front-img").elevateZoom({zoomWindowPosition: 1, zoomWindowOffetx: 20, zoomWindowHeight: 500, zoomWindowWidth:500, scrollZoom : true});
	
});
