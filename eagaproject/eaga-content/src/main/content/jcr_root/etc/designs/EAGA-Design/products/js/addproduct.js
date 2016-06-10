/*******************************************************************************
 * START ADD PRODUCT
 ******************************************************************************/
var notready;
var interval;
var done = false;
var suc;
function formEmpty(sel,mes){
	$(sel).addClass('product-form-empty');
	$(sel).val(mes);
	notready = true;
};
function doModal(){
	$('#add-product-result').html(suc);
    console.log(suc + " .. " + done);
    if(done === true){
		clearInterval(interval);
    }
};  
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44)
		return false;
	return true;
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
    suc = "Sta caricando...."
    var params = {
	        'j_nomeProdotto': $("input[name=productname]").val(),
	        'j_categoriaProdotto': $("input[name=productcategory]").val(),
	        'j_descrizioneProdotto': $("input[name=productdescription]").val(),
	        'j_prezzoProdotto': $("input[name=productprice]").val(),
	        'j_quantitaProdotto': $("input[name=productquantity]").val()
    	};
    var path = CQ.shared.HTTP.getPath();
    console.log("ENTRATO");
     $.ajax({
        type: 'POST',
        url: path + '.InsertProduct.json',
        data: params,
        success: function (msg) {
        	if(msg.J_RESULT === ""){
        		suc = "SERVER DOWN!"
        	}else if(msg.J_RESULT === "Success"){
        		suc = "Product "+ $("input[name=productname]").val() +" added!"
        		$('input').val('');
        	}else{
        		suc = "Product "+ $("input[name=productname]").val() +" already existing!"
        		$('#productname').val('');
        	}
			done = true;
		},
        error: function (data, status) {
           suc = "Something went wrong";
           done = true;
        }
    });
	$('#add-product-result').html(suc);
	$('#eagamodal').css('display','block');
	interval = setInterval(doModal, 2000);
};

/*******************************************************************************
 * END ADD PRODUCT
 ******************************************************************************/


$(document).ready(function () {
    $('input').on('click',function() {
		var compare = $(this).val().indexOf("Inserisci") > -1;
    	if(compare)
    	{
        	$(this).val('');
			$(this).removeClass('product-form-empty');
     	}
	});
    $('.close-modal').on('click',function() {
    	$('#eagamodal').css('display','none');
	});
	window.onclick = function(event) {
    if (event.target == $('#eagamodal')) {
        $('#eagamodal').css('display','none');
    }};
});
