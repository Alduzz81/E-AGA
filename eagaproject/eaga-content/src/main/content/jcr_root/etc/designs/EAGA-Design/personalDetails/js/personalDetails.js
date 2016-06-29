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
        	loadPD();
        	console.log('Update success!');
        },
        error: function (data, status) {
            console.log('Update failed: ' + status);
        }
    });
};
function loadPD(){
	var authorizableId = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
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
        	$("#nameC").text(msg.Nome);
        	$("#emailC").text(msg.Email);
        	$("#passwordC").text(msg.Password);
               },
               error: function (data, status) {
                   console.log('Load data failed: ' + status);
               }
           });
};

$(document).ready(function () {
	$('.personalM').hide();
	$('.personalV').show();
    var path = CQ.shared.HTTP.getPath();
    if(path=="/content/eaga/personalDetails")
		loadPD();
});

$('#modifiy-personal-details').on('click', function(){
	$('.personalV').hide();
	$('.personalM').show();
});