$("#myaccount").on("click", function () {
	$("#authed-menu").removeClass("hidden");
	$("#authed-menu").toggle('menu-hide');
});

$(document).ready(function () {
	$("#authed-menu").addClass("hidden");
});
