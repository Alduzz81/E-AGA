function updatePDDB() {
    var params = {
    		'j_id': $("input[name=id]").val(),
	        'j_password': $("input[name=password]").val()
    	};
    var path = CQ.shared.HTTP.getPath();
    $.ajax({
        type: 'POST',
        url: path + '.UpdatePersonalDetails.json',
        data: params,
        success: function (msg) {
        	$('.personalM').hide();
        	$('.personalV').show();
        	console.log('Update success! - \n\tid: ' + msg.j_id 
        			+ ',\n\tpassword: '+ msg.j_password
        			+ ',\n\tresult: '+ msg.j_result
        			+ ',\n\tstatus: '+ msg.j_status);
        },
        error: function (data, status) {
            console.log('Update failed: ' + status);
        }
    });
};
	
$(document).ready(function () {
	$('.personalM').hide();
	$('.personalV').show();
	var authorizableId = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
    console.log('ID: ' + authorizableId);
    var params = {
    		'j_id': authorizableId
    	};
    var path = CQ.shared.HTTP.getPath();
    $.ajax({
        type: 'GET',
        url: path + '.LoadPersonalDetails.json',
        data: params,
        success: function (msg) {
        	$('.personalM').hide();
        	$('.personalV').show();
        	console.log('Load data success! - \n\tid: ' + msg.IdUtente 
        			+ ',\n\tnome: '+ msg.Nome
        			+ ',\n\temail: '+ msg.Email
        			+ ',\n\tpassword: '+ msg.Password
        			+ ',\n\tresult: '+ msg.j_result
        			+ ',\n\tstatus: '+ msg.j_status);
        	$("#nameC").text(msg.Nome);
        	$("#emailC").text(msg.Email);
        	$("#passwordC").text(msg.Password);
        },
        error: function (data, status) {
            console.log('Load data failed: ' + status);
        }
    });
});

$('#modifiy-personal-details').on('click', function(){
	$('.personalV').hide();
	$('.personalM').show();
});