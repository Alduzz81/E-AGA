function updatePDDB() {
	checkFields();
	var authorizableId = CQ_Analytics.ProfileDataMgr
			.getProperty("authorizableId");
	var params = {
		'j_userMail' : authorizableId,
		'j_password' : $("input[name=password]").val()
	};
	var path = CQ.shared.HTTP.getPath();
	$.ajax({
		type : 'POST',
		url : path + '.UpdatePersonalDetails.json',
		data : params,
		success : function(msg) {
			$('.personalM').hide();
			$('.personalV').show();
			loadPD();
			console.log('Update success!');
		},
		error : function(data, status) {
			console.log('Update failed: ' + status);
		}
	});
};
function loadPD() {
	var authorizableId = CQ_Analytics.ProfileDataMgr
			.getProperty("authorizableId");
	var params = {
		'j_userMail' : authorizableId
	};
	var path = CQ.shared.HTTP.getPath();
	$.ajax({
		type : 'GET',
		url : path + '.LoadPersonalDetails.json',
		data : params,
		success : function(msg) {
			$('.personalM').hide();
			$('.personalV').show();
			$("#nameC").text(msg.Nome);
			$("#emailC").text(msg.Email);
		},
		error : function(data, status) {
			console.log('Load data failed: ' + status);
		}
	});
};
function checkFields() {
	if ($("#nameC") == '' || $("#nameC") == '/[0-9]|!"£$%&()=?^/') {
		$("#nameC").css({
			"borderColor" : "red"
		});
	}
};

$(document).ready(function() {
	$('.personalM').hide();
	$('.personalV').show();
	var path = CQ.shared.HTTP.getPath();
	$("#nameC").css({
		"borderColor" : ""
	});
	if (path == "/content/eaga/personalDetails")
		loadPD();
});

$('#modifiy-personal-details').on('click', function() {
	$('.personalV').hide();
	$('.personalM').show();
});