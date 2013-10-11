// change request header host of testx.wanliu.com
var rule = {
	conditions: [
		new chrome.declarativeWebRequest.RequestMatcher({
			url: { hostSuffix: 'wanliu.com' } })
	],
	actions: [
		new chrome.declarativeWebRequest.SetRequestHeader({
			name: "host",
			value: "caramal-example.wanliu.biz"
		})
	]};

chrome.declarativeWebRequest.onRequest.addRules([rule]);

 //------------------------------------------------------

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var begin = request.begin;
  	var end = request.end;
  	var task_type = request.task_type;
  	var result = do_task(task_type, begin, end)

    var response = {};
    response[task_type] = result;
    sendResponse(response);
  });

function do_task(task_type, begin, end) {
	if (task_type == "login_and_get_cookie") {
		return login_and_get_cookie_for(begin, end);
	} else if (task_type == "chat") {
		return do_chat(begin, end)
	} else {
		return false;
	}
};

function login_and_get_cookie_for(begin, end) {
	return login_caramal_example(begin, end);
};

function do_chat(begin, end) {
	return true;
};

function login_caramal_example(bengin, end) {
	var query_options = {
		url: "http://caramal-example.wanliu.biz/#/sign"
	}
	chrome.tabs.query(query_options, function(tabs) {
		if (tabs.length == 0) {
			var tab = tabs[0];
			login(tab, begin, end)
		} else {
			var tab_options = {
				url: "http://caramal-example.wanliu.biz/#/sign",
				active: false
			}
			chrome.tabs.create(tab_options, function(tab){
				login(tab, begin, end)
			})
		}
	})
};

function login(tab, begin, end) {

}

