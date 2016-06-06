/*******************************************************************************
 * START REGISTRATION
 ******************************************************************************/
var regSubmit = function(){
	
	$(".reg-problems").hide();
	var msg = "";
	if($('#reg-username').val() == '' ){
		msg = "Devi inserire un nome";
		$(".reg-alert-msg").html(msg);
		$(".reg-problems").show();
	} else if ($('#reg-password').val() != $('#reg-password2').val()){
		msg = "Verifica che le password indicate siano uguali e riprova";
		if($('#reg-password').val() == "" || $('#reg-password2').val() == ""){
			msg = "Inserisci la password.<br>Verifica che le password indicate siano uguali e riprova" 
		}
		$(".reg-alert-msg").html(msg);
		$(".reg-problems").show();
	} else if ($('#reg-email').val() == '' ){
		msg = "Indirizzo e-mail mancante. Correggi e riprova";
		$(".reg-alert-msg").html(msg);
		$(".reg-problems").show();
	} else if( ($('#reg-username').val() == '' && $('#reg-email').val() == '') 
			|| $('#reg-password').val() == '' || $('#reg-password2').val() == ''){
		msg = "Verifica che tutti i campi siano compilati e riprova";
		$(".reg-alert-msg").html(msg);
		$(".reg-problems").show();
	} else if($('#reg-password').val().length < 6 && $('#reg-password2').val().length < 6){
		msg = "La password deve essere di almeno 6 caratteri";
		$(".reg-alert-msg").html(msg);
		$(".reg-problems").show();
	} else if($('#reg-email').val() != ''){
		if(!isEmail($('#reg-email').val())){
			msg = "Formato dell'indirizzo e-mail non valido.<br>Correggi e riprova";
			$(".reg-alert-msg").html(msg);
			$(".reg-problems").show();
			$('#reg-email').val('');
			$('#reg-password').val('');
			$('#reg-password2').val('');
		} else {
			$(".reg-problems").hide();
			writeUserInDB();
		}
	} else {
		$(".reg-problems").hide();
		writeUserInDB();
	}	
}


function isEmail(email) {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}



function writeUserInDB() {
    var params = {
	        'j_username': $("input[name=username]").val(),
	        'j_password': $("input[name=password]").val()
    	};
    var path = CQ.shared.HTTP.getPath();

    $.ajax({
        type: 'GET',
        url: path + '.loadRegistration.json',
        data: params,
        success: function (data) {
        	console.log('dentro a success! ');
        },
        error: function (data, status) {
            console.log('dentro a procedure failed: ' + status);
        }
    });
};
	
/*******************************************************************************
 * END REGISTRATION
 ******************************************************************************/


$(document).ready(function () {

	
	
});
