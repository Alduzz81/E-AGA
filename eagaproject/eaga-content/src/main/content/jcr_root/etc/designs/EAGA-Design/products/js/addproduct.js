/*******************************************************************************
 * START ADD PRODUCT
 ******************************************************************************/
var notready;
function formEmpty(sel,mes){
	$(sel).addClass('product-form-empty');
	$(sel).val(mes);
	notready = true;
};

var productSubmit = function(){
	notready=false;

	if($('#productname').val() == '' ){
        formEmpty('#productname', 'Inserisci un nome.');
	}if($('#productcategory').val() == '' ){
        formEmpty('#productcategory', 'Inserisci una categoria.');
	}if($('#productdescription').val() == '' ){
		formEmpty('#productdescription', 'Inserisci una descrizione.');
	}if($('#productprice').val() == '' ){
		formEmpty('#productprice', 'Inserisci il prezzo.');
	}if($('#productquantity').val() == '' ){
		formEmpty('#productquantity', 'Inserisci la quantita.');
	} if(notready === false){
		addProductInDB();
	}
};
function addProductInDB() {
    var params = {
	        'j_nomeProdotto': $("input[name=productname]").val(),
	        'j_categoriaProdotto': $("input[name=productcategory]").val(),
	        'j_descrizioneProdotto': $("input[name=productdescription]").val(),
	        'j_prezzoProdotto': $("input[name=productprice]").val(),
	        'j_quantitaProdotto': $("input[name=productquantity]").val()
    	};
    var path = CQ.shared.HTTP.getPath();

    $.ajax({
        type: 'POST',
        url: path + '.InsertProduct.json',
        data: params,
        success: function (msg) {
        	var suc;
        	if(msg.J_RESULT === "Success"){
        		suc = "Product "+ $("input[name=productname]").val() +" added!"
        	}else{
        		suc = "Product "+ $("input[name=productname]").val() +" already existing!"
        	}
        	window.alert(suc);
        	$('input').val('');
        },
        error: function (data, status) {
            window.alert("Something went wrong");
        }
    });
};
	
/*******************************************************************************
 * END ADD PRODUCT
 ******************************************************************************/


$(document).ready(function () {
    $('input').on('dblclick',function() {
		$(this).val('');
        $(this).removeClass('product-form-empty');
	});
});
