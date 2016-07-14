function openMenu(x){
    $('div .container-menu').removeClass("hidden");
    $('.container-menu').show();
}

function closeMenu(x){
    $('.container-menu').hide();
}

function redirectLogin(){
	window.location.href = '/content/eaga/login.html';
}

$(document).ready(function (){
	$('.container-menu').hide();
});
