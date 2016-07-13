function openMenu(x){
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
