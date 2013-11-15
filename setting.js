$(function(){
	$(".settingForm").submit(function(event){
		var begin = parseInt($("#machineNumber_begin").val());
		var end = parseInt($("#machineNumber_end").val());
		if (isNaN(begin) || isNaN(end) || (begin > end)) {
			if ($(".error").length > 0) {
				$(".error").show();
			} else {
				$("body").append("<span class='error' style='color: red;'>what do you want?</span>");
			}
		} else {
			$(".error").hide();
			show_notifer_for(begin, end);
			login_and_get_cookie_for(begin, end);
			open_page_and_chat_for(begin, end);
		}
		return false;
	});

	function show_notifer_for(begin, end) {
		$(".notifer").html("readying..")
	};

	function login_and_get_cookie_for(begin, end) {
		chrome.runtime.sendMessage({begin: begin, end: end, task_type: "login_and_get_cookie"}, function(response) {
			if (response.login_and_get_cookie == true) {
				$(".notifer ." + index + "st_machine").html(index + "th machine cookie got!");
			}
		});
	};
	function open_page_and_chat_for(begin, end) {};
});
