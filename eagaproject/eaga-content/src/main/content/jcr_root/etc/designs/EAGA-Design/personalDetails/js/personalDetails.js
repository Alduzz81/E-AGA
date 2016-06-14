eagaApp.controller("PersonalDetailsController", ['$scope', '$window', function($scope,$window) {	
	
}]);

function loadPD() {

};

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
});

$('#modifiy-personal-details').on('click', function(){
	$('.personalV').hide();
	$('.personalM').show();
});