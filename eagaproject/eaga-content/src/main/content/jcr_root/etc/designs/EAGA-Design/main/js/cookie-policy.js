var cookieValueP=false;
function initNotification () {	
	//console.log("cok1: "+cookieValueP);
	$('div.notification').addClass("notification-opened");
}

$("#notification-close").on("click", function () {
	var cookieValueP=true;
//	console.log("cok3: "+cookieValueP);
	$('div.notification').removeClass("notification-opened");
});



