function updatePDDB() {
    var params = {
    		'j_id': $("input[name=id]").val(),
	        'j_username': $("input[name=name]").val(),
	        'j_email': $("input[name=email]").val(),
	        'j_password': $("input[name=password]").val()
    	};
    var path = CQ.shared.HTTP.getPath();

    $.ajax({
        type: 'GET',
        url: path + '.loadPersonalDetails.json',
        data: params,
        success: function (msg) {
        	console.log('Update success! - \n\tid: ' + msg.j_id 
        			+ ',\n\tname: '+ msg.j_name
        			+ ',\n\temail: '+ msg.j_email
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

	
});
