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
			CategoriaProdotto: "Telefono",
			ImmaginiProdotto: {	ImmagineProdotto_1: "/content/dam/eaga/common/products/provaaaCAT/americano.jpg",
								ImmagineProdotto_2: "/content/dam/eaga/common/products/provaaaCAT/espresso.jpg",
								ImmagineProdotto_3: "/content/dam/eaga/common/products/provaaaCAT/macchiato.jpg",
								ImmagineProdotto_4: "/content/dam/eaga/common/products/provaaaCAT/espresso.jpg"
							  }
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
        	console.log('\tImage 1:\t\t\t'+ msg.ImmaginiProdotto.ImmagineProdotto_1);
        	
        	for(var key in msg.ImmaginiProdotto){
        		$(".img-column-container").append("<img class='img-column-item' src='" + msg.ImmaginiProdotto[key] + "' />")
        	}
        	
        	var pathForFrontImg = $(".img-column-item").first().attr("src");
    		$(".front-img").attr("src", pathForFrontImg);
    		//var pathForFrontLargeImg = pathForFrontImg.replace("icons", "large");
    		var pathForFrontLargeImg = pathForFrontImg + "/jcr:content/renditions/cq5dam.web.1280.1280.jpeg";
    		$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
    		$(".img-column-item").first().addClass("img-shadow");
    		
    		$(".img-column-item").click(function(){
    			$(".img-column-item").removeClass("img-shadow");
    			$(this).addClass("img-shadow");
    			var pathForFrontImg = $(this).attr("src");
    			$(".front-img").attr("src", pathForFrontImg);
    			
    			var zoomWindowStyle = $(".zoomWindow").attr("style");
    			var zoomWindowStyleBegin = zoomWindowStyle.substr(0, zoomWindowStyle.indexOf('"/')+1);
    			var zoomWindowStyleEnd = zoomWindowStyle.substr(zoomWindowStyle.indexOf('");'));
    			//var pathForFrontLargeImg = pathForFrontImg.replace("/icons/", "/large/");
    			var pathForFrontLargeImg = pathForFrontImg + "/jcr:content/renditions/cq5dam.web.1280.1280.jpeg";
    			zoomWindowStyle = zoomWindowStyleBegin + pathForFrontLargeImg + zoomWindowStyleEnd;
    			$(".zoomWindow").attr("style", zoomWindowStyle);
    			$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
    		});
    		
    		$(".front-img").elevateZoom({zoomWindowPosition: 1, zoomWindowOffetx: 20, zoomWindowHeight: 500, zoomWindowWidth:500, scrollZoom : true});
        	
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
		
	var customerId = getRandomId();
	console.log("Customer ID: " + customerId);
	var addedProducts = $( "#productPage-select" ).val();
	console.log("Product quantity: " + addedProducts);
	console.log("Product ID: " + product.IdProdotto);
	
	var params = {
	        'j_customerId': customerId,
	        'j_productId': product.IdProdotto,
	        'j_productAddedQuantity': addedProducts,
    	};
	
    var path = CQ.shared.HTTP.getPath();
	
	$.ajax({
        type: 'POST',
        url: path + '.InsertProductToCart.json',
        data: params,
        success: function (msg) {
        	console.log("Insert Product To Cart Success!");
        	console.log("Msg: " + msg.J_RESULT);
        	console.log("Cart total quantity: " + msg.J_TOT_QNT);
        	console.log("Cart updated? " + msg.J_IS_UPDATED);
        	console.log("Max quantity reduced? " + msg.J_IS_QNT_REDUCED);
        	
        	$("#total-cart-qnt-topnav").text(msg.J_TOT_QNT);
        	if(msg.J_IS_UPDATED){
        		if(msg.J_IS_QNT_REDUCED){
        			$(".cart-msg-text").text("Attenzione!  La quantità desiderata eccedeva la disponibilità in magazzino.\n" +
        					"È stata inserita la quantità massima a disposizione.\n" +
        					"Puoi modificarla nuovamente nel carrello.");
        		} else {
        			$(".cart-msg-text").text("Congratulazioni!  La quantità del tuo articolo è stata modificata correttamente nel carrello.");
        		}
        		$("#cart-msg-container").slideDown();
	        	setTimeout(function(){
	        		$("#cart-msg-container").slideUp();
	        	}, 5000);
        	} else {
        		$(".cart-msg-text").text("Congratulazioni!  Articolo aggiunto correttamente nel carrello.");
	        	$("#cart-msg-container").slideDown();
	        	setTimeout(function(){
	        		$("#cart-msg-container").slideUp();
	        	}, 5000);
        	}
        	$("#productPage-select").val('1');
        },
        error: function (data, status) {
            console.log('Insert Product To Cart procedure failed: ' + status);
        }
    });
	
};



function addToWishList(){
	var addedProducts = $( "#productPage-select" ).val();
	alert("ciao, i prodotti desiderati sono " + addedProducts);
	
};

function getRandomId(){
	var randomID = parseInt(( Math.random()*3 ) + 1);
	return randomID;
	/*if(randomID == 1){
		return "abcd@gmail.com";
	} else if(randomID == 2){
		return "efgh@gmail.com";
	} else {
		return "ilmn@gmail.com";
	}*/
};


/*******************************************************************************
 * PRODUCT PAGE AT DOCUMENT READY
 ******************************************************************************/


$(document).ready(function () {
	
	$(".cart-msg-container").hide();
	
	if($(document).find("title").text() == "Product"){
		
		var ckToFind = "singleIdProduct";
		var ck = getCookie(ckToFind);
		console.log("single id product cookie: " + ck);
				
		if(ck != "" && ck != undefined){
			loadSingleProductByID(ck);
		}
		
		/*var pathForFrontImg = $(".img-column-item").first().attr("src");
		$(".front-img").attr("src", pathForFrontImg);
		var pathForFrontLargeImg = pathForFrontImg.replace("icons", "large");
		$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
		$(".img-column-item").first().addClass("img-shadow");*/
	}	
	
	/*$(".img-column-item").click(function(){
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
	
	$(".front-img").elevateZoom({zoomWindowPosition: 1, zoomWindowOffetx: 20, zoomWindowHeight: 500, zoomWindowWidth:500, scrollZoom : true});*/
	
});

/*******************************************************************************
 * END PRODUCT PAGE
 ******************************************************************************/
