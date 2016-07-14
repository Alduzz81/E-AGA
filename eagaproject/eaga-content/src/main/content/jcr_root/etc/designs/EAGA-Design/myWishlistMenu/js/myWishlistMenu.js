function openMenuWishlist(x){
    $('div .container-menu-wishlist').removeClass("hidden");
    $('.container-menu-wishlist').show();
}

function closeMenuWishlist(x){
    $('.container-menu-wishlist').hide();
}

$(document).ready(function (){
	$('.container-menu-wishlist').hide();
});
