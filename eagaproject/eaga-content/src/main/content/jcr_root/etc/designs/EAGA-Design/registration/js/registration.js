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
	        'j_email': $("input[name=email]").val(),
	        'j_password': $("input[name=password]").val()
    	};
    var path = CQ.shared.HTTP.getPath();

    $.ajax({
        type: 'GET',
        url: path + '.loadRegistration.json',
        data: params,
        success: function (msg) {
        	console.log('Registration success! - \n\tusername: ' + msg.j_username 
        			+ ',\n\temail: '+ msg.j_email
        			+ ',\n\tpassword: '+ msg.j_password
        			+ ',\n\tresult: '+ msg.j_result
        			+ ',\n\tstatus: '+ msg.j_status);
        	
        	if(msg.j_status){
        		window.location.href = '/content/eaga/login.html';
        		$('#reg-username').val('');
        		$('#reg-email').val('');
    			$('#reg-password').val('');
    			$('#reg-password2').val('');
        	} else {
        		var newMsg = "Un utente con questo indirizzo email è già stato registrato.<br> Inserire un nuovo indirizzo";
        		$(".reg-alert-msg").html(newMsg);
        		$(".reg-problems").show();
        		$('#reg-email').val('');
    			$('#reg-password').val('');
    			$('#reg-password2').val('');
        	}
        },
        error: function (data, status) {
            console.log('Procedure failed: ' + status);
        }
    });
};
	
/*******************************************************************************
 * END REGISTRATION
 ******************************************************************************/


$(document).ready(function () {

	
});
