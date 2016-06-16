/*******************************************************************************
 * START PRODUCT PAGE
 ******************************************************************************/
var product = {};
var mock = {
			IdProdotto: 6,
			NomeProdotto: "Iphone4",
			DescrizioneProdotto: "iphone4",
			PrezzoProdotto: 299,
			QuantitaProdotto: 100,
			QuantitaSelezionata: 1,
			CategoriaProdotto: "Telefono"
			};


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
        	console.log("msg: " + typeof msg + ", msg text: "+ msg+ ", mock: "+ typeof mock);
        	if(typeof msg  == "string"){
        		console.log("dentro a undefined");
        		msg = mock;
        		console.log("msg: " + typeof msg + ", mock: "+ typeof mock);
        	};
        	
        	console.log('Load Single Product success!!\n\n\tID Prodotto:\t\t'
        	+ msg.IdProdotto 
			+ ',\n\tName:\t\t\t\t'+ msg.NomeProdotto
			+ ',\n\tDescription:\t\t'+ msg.DescrizioneProdotto
			+ ',\n\tPrice:\t\t\t\t'+ msg.PrezzoProdotto
			+ ',\n\tQuantity:\t\t\t'+ msg.QuantitaProdotto
			+ ',\n\tCategogy:\t\t\t'+ msg.CategoriaProdotto);
        	    	
        	$(".product-name").text(msg.NomeProdotto);
        	$(".product-desc").text(msg.DescrizioneProdotto);
        	$(".product-price").text(msg.PrezzoProdotto);
        	
        	var quantity = 0;
        	if(msg.QuantitaProdotto != undefined){
        		if(msg.QuantitaProdotto < 30){
        			quantity = msg.QuantitaProdotto;
        		} else {
        			quantity = 30;
        		}
        	}
       		
    		for(var i = 1; i <= quantity; i++){
    			$('<option>').val(i).text(i).appendTo('#productPage-select');
			}
        	
    		product = msg;    		
        	deleteCookie(ckToFind);
        	
        },
        error: function (data, status) {
            console.log('Load Single Product procedure failed: ' + status);
        }
    });
    
};

function addToCart(){
	
	alert("ciao, questa è una proprietà del prodott: " + product.NomeProdotto);
};

/*function trackCartAdd() {
	var productQuantity = $( "#productPage-select" ).val();
	alert("ciao, i prodotti acquistati sono " + productQuantity);
	
    if (CQ_Analytics.Sitecatalyst) {
        var productQuantity = Number($("input[name='product-quantity']", form).val() || '1');
        var productPrice    = Number($("input[name='product-size']:checked", form).data('price').replace(/[^0-9\\.]/g, ''));
        var productChildSku =        $("input[name='product-size']:checked", form).data('sku');
        CQ_Analytics.record({
            "event": ["cartAdd"<%= (session.getCartEntryCount() == 0) ? ", 'cartOpen'" : "" %>],
            "values": {
                "product": [{
                    "category": "",
                    "sku": "<%= xssAPI.encodeForJSString(baseProduct.getSKU()) %>",
                    "price": productPrice * productQuantity,
                    "quantity": productQuantity,
                    "evars": {
                        "childSku": CQ.shared.Util.htmlEncode(productChildSku)
                    }
                }]
            },
            "componentPath": "<%= xssAPI.encodeForJSString(resource.getResourceType()) %>"
        });
    }
    return true;
}*/


function addToWishList(){
	var addedProducts = $( "#productPage-select" ).val();
	alert("ciao, i prodotti desiderati sono " + addedProducts);
	
};


/*******************************************************************************
 * PRODUCT PAGE AT DOCUMENT READY
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

/*******************************************************************************
 * END PRODUCT PAGE
 ******************************************************************************/
