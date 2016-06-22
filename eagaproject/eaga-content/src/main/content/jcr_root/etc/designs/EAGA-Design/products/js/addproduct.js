/*******************************************************************************
 * START ADD PRODUCT
 ******************************************************************************/
var notready, interval, hasImage, cont, img_ready, suc;
var done = false, images = [];
function formEmpty(sel,mes){
	$(sel).addClass('product-form-empty');
	$(sel).val(mes);
	notready = true;
};
function doModal(){
	$('#add-product-result').html(suc);
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
function imageIsLoaded(e) {
    $('#imgid-'+cont).attr('src', e.target.result);
    hasImage = true;
    cont++;
};
function loadImage(e){
    if (e.files && e.files[0]) {
		var reader = new FileReader();
        console.log(e.files[0]);
        console.log(cont);
        reader.readAsDataURL(e.files[0]);
        reader.onload = imageIsLoaded;
		$('.myimage').css('display','block');
        $('.del-img-btn').css('display','block');
        //$('.submit-img').css('margin-top','0px');
        images[cont] = e.files[0];
        img_ready = true;
     }
};
function initImageUpload(id) {
	var formData = new FormData();
   for(var i = 0; i<cont; i++){
		formData.append(id, images[i]);
    }
    sendXHRequest(formData);
};
function sendXHRequest(formData) {
	var test = 0;
	 $.ajax({
       type: 'POST',
       url:'/bin/updamfile',
       processData: false,
       contentType: false,
       data:formData,
       success: function(){
    	   $('.tfield').val('');
           $('.pimage').remove();
           $('.submit-img').removeAttr('id');
           $('.submit-prod').removeClass('move-add-btn');
           cont = 0;
   	   }
   });
	 
};
var deleteImage = function(){
	$('.myimage').css('display','none');
    $('.del-img-btn').css('display','none');
    $('.productimage[type=file]').val('');
    cont--;
    img_ready = false;
};
var addImage = function(){
    $('.submit-prod').addClass('move-add-btn');
	var newimage = "<li class='pimage'><input type='file' class='productimage' id='prodimg-"+cont+
        "'/><img class='myimage' src='#' id='imgid-"+cont+"'/><input class='del-img-btn' type='submit' value='X' onclick='deleteImage()'/></li>";
    if(img_ready || (img_ready && cont === 0)){
		$('.image-list').append(newimage);
        $('#prodimg-'+cont).css('display','block');
    	$('.submit-img').attr('id', 'prod-img');
        img_ready=false;
        $(":file").change(function () {
			loadImage(this);
    	});
	}
};
var productSubmit = function(){
	notready=false;
	if($('#productname').val() == '' ){
        formEmpty('#productname', 'Inserisci un nome.');
	}if($('#productcategory').val() == '' ){
        formEmpty('#productcategory', 'Inserisci una categoria.');
	}/*if($('#productdescription').val() == '' ){
		formEmpty('#productdescription', 'Inserisci una descrizione.');
	}*/if($('#productprice').val() == '' ){
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
	        'j_quantitaProdotto': $("input[name=productquantity]").val(),
    	};
    var path = CQ.shared.HTTP.getPath();
     $.ajax({
        type: 'POST',
        url: path + '.InsertProduct.json',
        data: params,
        success: function (msg) {
        	if(msg.J_RESULT === ""){
        		suc = "SERVER DOWN!";
        		 if(hasImage){
 					initImageUpload(20 + ","+ $("input[name=productcategory]").val());
                 }
        	}else if(msg.J_RESULT === "Success"){
        		suc = "Prodotto "+ $("input[name=productname]").val() +" aggiunto!";
                if(hasImage){
					initImageUpload(msg.J_IdProdotto + ","+ $("input[name=productcategory]").val());
                }
        	}else{
        		suc = "Product "+ $("input[name=productname]").val() +" gia' esistente!";
        		$('#productname').val('');
        	}
			done = true;
		},
        error: function (data, status) {
           suc = "Qualcosa e' andata in errore!";
           done = true;
        }
    });
	$('#add-product-result').html(suc);
	$('#eagamodal').css('display','block');
	interval = setInterval(doModal, 4000);
};

/*******************************************************************************
 * END ADD PRODUCT
 ******************************************************************************/

$(document).ready(function () {
    hasImage = false;
    cont=0;
    imgcnt=1;
    img_ready = true;
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
