/*******************************************************************************
 * START PRODUCT PAGE
 ******************************************************************************/

var product = {};

function loadSingleProductByID(idProdotto) {
	var params = {
	        'j_idProdotto': idProdotto
    	};

    var path = CQ.shared.HTTP.getPath();
    var positionPath=path.indexOf(".html/id");
    path=path.substring(0,positionPath);

    $.ajax({
        type: 'GET',
        url: path + '.LoadSingleProduct.json',
        data: params,
        success: function (msg) {
			for(var key in msg.ImmaginiProdotto){
        		$(".img-column-container").append("<img class='img-column-item' src='" + msg.ImmaginiProdotto[key] + "' />")
        	}
        	
        	var pathForFrontImg = $(".img-column-item").first().attr("src");
    		$(".front-img").attr("src", pathForFrontImg);
    		var pathForFrontLargeImg = pathForFrontImg ;
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
    			var pathForFrontLargeImg = pathForFrontImg + "/jcr:content/renditions/cq5dam.web.1280.1280.jpeg";
    			zoomWindowStyle = zoomWindowStyleBegin + pathForFrontLargeImg + zoomWindowStyleEnd;
    			$(".zoomWindow").attr("style", zoomWindowStyle);
    			$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
    		});
    		
    		$(".front-img").elevateZoom({zoomWindowPosition: 1, zoomWindowOffetx: 20, zoomWindowHeight: 500, zoomWindowWidth:500, scrollZoom : true});
        	
        	$(".product-name").text(msg.NomeProdotto);
        	$(".product-price").text(msg.PrezzoProdotto);
        	$(".trade-mark").text('Categoria: '+msg.CategoriaProdotto);
        	var descrizione='<br>'+msg.DescrizioneProdotto;
        	$(".product-desc").append(descrizione);
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
        			$(".cart-msg-text").text("Attenzione!  La quantita desiderata eccedeva la disponibilita in magazzino.\n" +
        					"È stata inserita la quantita massima a disposizione.\n" +
        					"Puoi modificarla nuovamente nel carrello.");
        		} else {
        			$(".cart-msg-text").text("Congratulazioni!  La quantita del tuo articolo è stata modificata correttamente nel carrello.");
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
};


/*******************************************************************************
 * PRODUCT PAGE AT DOCUMENT READY
 ******************************************************************************/

$(document).ready(function () {
    var url=window.location.href;
    var positionID=url.indexOf("=");
    var finalID=url.substring(positionID+1);
	$(".cart-msg-container").hide();	
	if($(document).find("title").text() == "Product"){
		if(finalID != "" && finalID != undefined){
			loadSingleProductByID(finalID);
		}
	}	
});

/*******************************************************************************
 * END PRODUCT PAGE
 ******************************************************************************/
