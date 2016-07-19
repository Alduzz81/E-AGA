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
function setName(){
	var nome = CQ.shared.HTTP.getCookie('XTOKEN');
	$('.text-clientname').contents().remove();
	if(nome !== null){
		$('.text-clientname').addClass('colored-attr');
		$('.text-clientname').append(" "+nome+"!");
	} else{
		$('.text-clientname').removeClass('colored-attr');
		$('.text-clientname').append("! Accedi");
	}
};
$(document).ready(function (){
	$('.container-menu').hide();
	setName();
});
