/*******************************************************************************
 * START LOAD CATEGORIES
 ******************************************************************************/
var dd_flag=false;
var categories = [];
function setMenuCategories(){
    $('select[multiple] option').each(function(){
        var c = $(this).text();
        var newcategory = "<div class='item-cat' data-value='"+c+"'>"+c+"</div>";
		$('.menu-categories').append(newcategory);
    });
};
function deleteItem(cat){
	console.log(cat);
};
function addCategory(cat){
    var addCat = "<a class='selected-item' data-value='"+cat+"'>"+cat+"&nbsp;<i class='del-icon'>&times</i></a>";
	$('.list-sel-items').append(addCat);
};
var dropdownActivate = function(){
    if(!dd_flag){
		$('.menu-categories').removeClass('hidden');
        $('.list-sel-items').removeClass('hidden');
        setMenuCategories();
        dd_flag = true;
        $('.item-cat').on('click', function(){
            var val = $(this).attr('data-value');
    		categories.push(val);
            $(this).css('display','none');
            if(categories.length >= 0){
                $('.cat-list').css('display','block');
            }
            addCategory(val);
        });
        $('.list-sel-items').on('click', function(){
            	$
			// var val = $(this).attr('data-value');
            	console.log("hello");
        });
    }else{
		$('.menu-categories').addClass('hidden');
        $('.list-sel-items').addClass('hidden');
        dd_flag = false;
    }
};

/*******************************************************************************
 * END LOAD CATEGORIES
 ******************************************************************************/
/*******************************************************************************
 * START ADD PRODUCT
 ******************************************************************************/
var notready, interval, hasImage, cont, img_ready, suc;
var done = false, images = [], index=0, deleted=0, img_indx = [];
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
        reader.readAsDataURL(e.files[0]);
        reader.onload = imageIsLoaded;
		$('.myimage').css('display','block');
        $('.del-img-btn').css('display','block');
        images[images.length] = e.files[0];
        img_ready = true;
     }
};
function initImageUpload(id) {
	var formData = new FormData();
   for(var i = 0; i<cont; i++){
	   if(images[i] != null){
		   formData.append(id, images[i]);
	   }
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
           $('.image-list').empty();
           $('.submit-img').removeAttr('id');
           $('.submit-prod').removeClass('move-add-btn');
           $('.sbmt-btn-addprod').addClass('col-sm-10');
           cont = 0;
           images = [];
   	   }
   });
};
function controlImageType(sel){
	var fName = $(sel).val().toString().split('\\fakepath\\')[1];
	var v= fName.split('.');
    var img_type = v[v.length-1];
    if(img_type==='jpeg' || img_type==='jpg' || img_type==='png' || img_type==='bmp' || img_type==='gif'){
        for(var i=0; i<images.length; i++){
            if(images[i].name === fName){
                $('#add-product-result').html("L'immagine e' gia' inserita!!");
                return false;
            }
        }
		return true;
    }
	$('#add-product-result').html("Il file inserito non � valido.");
    return false;
};
function showModal(){
	$('#add-product-result').html(suc);
	$('#eagamodal').css('display','block');
};
var deleteImage = function(par){
    $('.pimage'+par).empty();
    $('.pimage'+par).remove();
    for(var i=0; i<img_indx.length; i++){
        if(par === img_indx[i]){
			par = i;
            img_indx.splice(i, 1);
        }
    }
    if(par >= cont)
    {
        index++;
		par=par-index;
        if(par >= cont){
            par=cont-1;
        }
    }
	images.splice(par,1);
    img_ready = true;
    deleted++;
};
var addImage = function(){
    $('.sbmt-btn-addprod').removeClass('col-sm-10');
    $('.submit-prod').addClass('move-add-btn');
	var newimage = "<li class='pimage"+cont+"'><input type='file' class='productimage' id='prodimg-"+cont+
        "'/><img class='myimage' src='#' id='imgid-"+cont+"'/><input class='del-img-btn' id='delimg"+cont+
            "'type='submit' value='X' onclick='deleteImage("+cont+")'/></li>";
    if(img_ready || (img_ready && cont === 0)){
		$('.image-list').append(newimage);
        $('#prodimg-'+cont).css('display','block');
    	$('.submit-img').attr('id', 'prod-img');
        img_ready=false;
        $(":file").change(function () {
			var stat = controlImageType(this);
            if(stat){
                img_indx[img_indx.length] = cont;
				loadImage(this);
            }else{
				$('#eagamodal').css('display','block');
                $(this).val('');
            }
    	});
	} img_ready = false;
};
var productSubmit = function(){
	notready=false;
	if($('#productname').val() == '' ){
        formEmpty('#productname', '-- Inserisci un nome. --');
	}if($('#productcategory').val() == '' ){
        formEmpty('#productcategory', '-- Inserisci una categoria.-- ');
		$('.categories-dropdown').attr('id','catempty');
	}if($('#productprice').val() == '' ){
		formEmpty('#productprice', '--prezzo-- ');
	}if($('#productquantity').val() == '' ){
		formEmpty('#productquantity', '--quantita-- ');
	} if(notready === false){
		addProductInDB();
	}
};
function addProductInDB() {
    suc = "Sta caricando...."
    var params = {
	        'j_nomeProdotto': $("input[name=productname]").val(),
	        'j_categoriaProdotto': $("select[name=productcategory]").val(),
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
        	}else if(msg.J_RESULT === "Success"){
        		if(hasImage){
					initImageUpload(msg.J_IdProdotto + ","+ $("input[name=productcategory]").val() + "," + $("input[name=productname]").val());
                }
        		suc = "Prodotto "+ $("input[name=productname]").val() +" aggiunto!";
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
    setTimeout(showModal(), 5000);
	interval = setInterval(doModal, 4000);
};
/*******************************************************************************
 * END ADD PRODUCT
 ******************************************************************************/
/*******************************************************************************
 * START LOAD CATEGORIES CONTROLLER
 ******************************************************************************/
eagaApp.controller("CategoriesController", ['$scope','$http', function($scope,$http) {
	$scope.categorie = [];
    $scope.loadCategoriesOptions = function loadCategoriesOptions(){
		$http({
			method : 'GET',
			url : CQ.shared.HTTP.getPath() + '.LoadCategorie.json'
		}).success(function(data) {
            delete data['IdCategoria_0'];
			$scope.categorie = data;
		}).error(function(data) {
			console.log("Error in Loading Categories");
		});
    };
}]);
/*******************************************************************************
 * END LOAD CATEGORIES CONTROLLER
 ******************************************************************************/
$(document).ready(function () {
    hasImage = false, dd_flag=false;;
    cont=0;
    imgcnt=1;
    img_ready = true;
    $('input').on('click',function() {
		var compare = $(this).val().indexOf("--") > -1;
    	if(compare)
    	{
            if($(this).val().indexOf("categoria") > -1){
				$('.categories-dropdown').removeAttr('id');
            }
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
