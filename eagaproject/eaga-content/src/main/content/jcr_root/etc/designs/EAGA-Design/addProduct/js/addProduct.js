/*******************************************************************************
 * GLOBAL VARIABLES AND COMMON FUNCTIONS
 ******************************************************************************/
var notready, interval, hasImage, cont, img_ready, suc,
	dd_flag=false, catloaded=false, done=false, search_flag=false,
	categories = [], images = [], img_indx = [], 
	index=0, deleted=0;
function unhide(sel){
	$(sel).removeClass('hidden');
};
function hide(sel){
	$(sel).addClass('hidden');
};
/*******************************************************************************
 * START LOAD CATEGORIES
 ******************************************************************************/
function setMenuCategories(){
    $('.categories-dropdown-sel option').each(function(){
        var c = $(this).text();
        var newcategory = "<div class='item-cat' data-value='"+(c.toLowerCase())+"'>"+c+"</div>";
		$('.menu-categories').append(newcategory);
    });
    $('.menu-categories').append("<div class='search_none hidden' data-value='nessun resultato'>Nessun resultato.</div>");
};
function reLoadCat(){
	$(".categories-dropdown-sel option[selected = 'selected']").each(function(){
		hide(".item-cat[data-value='"+$(this).attr('value')+"']");
	});
};
function deleteItem(sel){
    var s = $(sel).attr('data-value'),
    	index = categories.indexOf($(sel).text().substr(0,s.length)),
        search = s.indexOf($('#productcategory').val());
    if($('#productcategory').val() ==='' && $('.item-cat').not('.hidden').length==0){
		unhide('.item-cat');
        reLoadCat();
    }
    $(sel).remove();
	$(".categories-dropdown-sel option[value='"+s.toLowerCase()+"']").removeAttr('selected');
    if(!search_flag || search===0 || s[search-1] === ' '){
    	unhide(".item-cat[data-value='"+s.toLowerCase()+"']");
		hide('.search_none');
    }
    if (index > -1) {
    	categories.splice(index, 1);
    }
};
function addItem(sel, e){
	e.stopImmediatePropagation();
    var val = $(sel).text();
    categories.push(val);
    hide(sel);
    addCategory(val);
    $(".categories-dropdown-sel option[value='"+val.toLowerCase()+"']").attr('selected', 'true');
    $('.cat-list').css('display','block');
	unhide('.all');
    if($('.item-cat').not('.hidden').length === 0){
		$('#productcategory').val('');
    }
};
function addCategory(cat){
    var addCat = "<a class='selected-item' data-value='"+cat.toLowerCase()+"'>"+cat+"&nbsp;<i class='del-icon'>&times</i></a>";
	$('.list-sel-items').append(addCat);
};
function closeDropdown(){
	$('.menu-categories').addClass('hidden');
    $('.list-sel-items').addClass('hidden');
    dd_flag = false;
    var l = categories.length;
	var sel = '#productcategory';
    if(l === 0){
		formEmpty(sel, '');
    } else if(l === 1){
		formEmpty(sel, categories[0]);
    } else if(l >1){
        formEmpty(sel, (l)+' Categorie selezionate');
    }
	$('.categories-dropdown').removeAttr('id');

};
function initCategories(searchload,e){
	var l = categories.length;
    if(!catloaded){
		setMenuCategories();
	    catloaded=true;
	}
    if((!search_flag && searchload !== '')|| l>0){
		unhide('.item-cat');
    }console.log(e.type);
    if(l>0 && e.type !== 'dblclick'){
		reLoadCat();
        if((l>1 && searchload.indexOf("selezionate")>-1) || (l === 1 &&  searchload === categories[0])) {
			$('#productcategory').val('');
    	}
    }
	hide('.search_none');
};
var dropdownActivate = function(event){
    var searchload = $('#productcategory').val();
    initCategories(searchload,event);
	if(!dd_flag){
        unhide('.menu-categories');
        unhide('.list-sel-items');
        dd_flag = true;
        $('#productcategory').on('dblclick', function(e){
        	$(this).val('');
            search_flag=false;
            initCategories(false,e);
        });
		$('.item-cat').on('click', function(e){
			addItem(this, e);
        });
    	$('.list-sel-items').on('click', '.selected-item', function(){
            deleteItem(this);
    	});
		$('.categories-dropdown').click(function(e){
    		e.stopPropagation();
		});
        $('.addProduct').on('click', function() {
            closeDropdown();
		});
    }else if(event.type !== 'keyup'){
        if(event.toElement.id !== 'productcategory'){
            closeDropdown();
        }
    }
};
var deleteAll = function(){
	categories = [];
    $('.selected-item').remove();
    hide('.all');
    $(".categories-dropdown-sel option").removeAttr('selected');
    if(($('#productcategory').val()) !== ''){
		searchCat();
    } else{
		unhide('.item-cat');
    }
};
var searchCat = function(e){
    var input_cat = $('#productcategory').val().toLowerCase();
    var l = input_cat.length;
    if(l === 0){
        $('.categories-dropdown-sel option').not("[selected='selected']").each(function(){
			unhide(".item-cat[data-value='"+$(this).val().toLowerCase() +"']");
        });
        search_flag=false;
    } else if(l >= 1){
        if(l === 1){
			unhide('.list-sel-items');
    		unhide('.menu-categories');
		}
        search_flag=true;
		dropdownActivate(e);
    	$('.categories-dropdown-sel option').not("[selected='selected']").each(function(){
			opt = $(this).attr('value').toLowerCase(),
            index = opt.indexOf(input_cat),
            f = ".item-cat[data-value='"+$(this).val().toLowerCase() +"']";
    		hide(f);
            if( index > -1 ){
                if(index === 0 || (opt[index-1] === ' ')){
					unhide(f);
                }
            }
    	});
        if($('.item-cat').not('.hidden').length === 0){
			unhide('.search_none');
        }
    } 
};
/*******************************************************************************
 * END LOAD CATEGORIES
 ******************************************************************************/
/*******************************************************************************
 * START ADD PRODUCT
 ******************************************************************************/
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
function emptyForm(sel){
	var compare = $(sel).val().indexOf("--") > -1;
	if(compare)
	{	if($(sel).val().indexOf("categoria") > -1 ){
			$('.categories-dropdown').removeAttr('id');
	    }
		$(sel).val('');
		$(sel).removeClass('product-form-empty');
 	}
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
var productSubmit = function(e){
	e.stopImmediatePropagation();
	if($('#productname').val() == '' ){
        formEmpty('#productname', '-- Inserisci un nome. --');
    } if(categories.length === 0){
    //if($('#productcategory').val() == '' ){
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
    hasImage = false, dd_flag=false, notready=false, img_ready = true,
    cont=0, imgcnt=1;
    $('input').on('click',function(e) {
    	emptyForm(this);
	});
    $('.close-modal').on('click',function() {
    	$('#eagamodal').css('display','none');
	});
	$('#eagamodal').on('click', function(){
		 $('this').css('display','none');
    });
});
