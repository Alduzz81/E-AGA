$("#myaccount").on("click", function () {
	console.log('gjf');
	$("#authed-menu").removeClass('hidden');
	//$("#authed-menu").addClass('menu-hide');
	console.log('2');
	$("#authed-menu").toggle('menu-hide');
	console.log('3');
});



$(document).ready(function () {
	$("#authed-menu").addClass("hidden");
});
