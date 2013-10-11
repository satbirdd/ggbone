// change request header host of testx.wanliu.com
var rule_caramel = {
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

var rule_account = {
	conditions: [
		new chrome.declarativeWebRequest.RequestMatcher({
			url: { hostSuffix: 'wanliuaccount.com' } })
	],
	actions: [
		new chrome.declarativeWebRequest.SetRequestHeader({
			name: "host",
			value: "accounts.wanliu.biz"
		})
	]};

var rules = [rule_caramel, rule_account];

for (var i = 1; i < 99; i ++ ) {
	var caramel_rule = get_caramel_rule(i);
	rules.push(caramel_rule);

	var direct_rul = get_redirect_rule(i);
	rules.push(direct_rul);
}

function get_caramel_rule(index) {
	var hostSuffix = "caramel" + index + ".wanliu.com";
	var locaction = "http://accountl" + index + ".wanliuaccount.com/auth/wanliu_id/authorize?response_type=code&redirect_uri=http%3A%2F%2Fcaramel" + i + ".wanliu.com%2Fauth%2Fwanliu%2Fcallback&state=oAnDibNqrHwkYACC19Zy27TS&client_id=E69q57VS6SEmvfMpVSDCYQ&type=web_server"
	return {
		conditions: [
			new chrome.declarativeWebRequest.RequestMatcher({
				url: { hostSuffix: hostSuffix, pathSuffix: "auth/wanliu" } })
		],
		actions: [
			new chrome.declarativeWebRequest.RemoveResponseHeader({
				name: "location"
			}),
			new chrome.declarativeWebRequest.AddResponseHeader({
				name: "location",
				value: locaction
			})
		]};
};

function get_redirect_rule(index) {
	var referers = "http://caramel" + index + ".wanliu.com/";
	var direction_to = "http://accountl" + index + "/accounts/login?callback_redirect_uri=$1";
	// http://accounts.wanliu.biz/accounts/login?callback_redirect_uri=6c70a16972f3
	return {
		conditions: [
			new chrome.declarativeWebRequest.RequestMatcher({
				url: { hostSuffix: "accounts.wanliu.biz", pathPrefix: "accounts/login?callback_redirect_uri=" }
			  , requestHeaders: [{ valueContains: [referers] }]
			})
		],
		actions: [
			new chrome.declarativeWebRequest.RedirectByRegEx({
				from: "http://accounts.wanliu.biz/accounts/login?callback_redirect_uri=(.*)"
			  , to: direction_to
			})
		]};
};

chrome.declarativeWebRequest.onRequest.addRules(rules);

 //------------------------------------------------------

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	var begin = request.begin;
//   	var end = request.end;
//   	var task_type = request.task_type;
//   	var result = do_task(task_type, begin, end)

//     var response = {};
//     response[task_type] = result;
//     sendResponse(response);
//   });

// function do_task(task_type, begin, end) {
// 	if (task_type == "login_and_get_cookie") {
// 		return login_and_get_cookie_for(begin, end);
// 	} else if (task_type == "chat") {
// 		return do_chat(begin, end)
// 	} else {
// 		return false;
// 	}
// };

// function login_and_get_cookie_for(begin, end) {
// 	return login_caramal_example(begin, end);
// };

// function do_chat(begin, end) {
// 	return true;
// };

// function login_caramal_example(bengin, end) {
// 	var query_options = {
// 		url: "http://caramal-example.wanliu.biz/#/sign"
// 	}
// 	chrome.tabs.query(query_options, function(tabs) {
// 		if (tabs.length == 0) {
// 			var tab = tabs[0];
// 			login(tab, begin, end)
// 		} else {
// 			var tab_options = {
// 				url: "http://caramal-example.wanliu.biz/#/sign",
// 				active: false
// 			}
// 			chrome.tabs.create(tab_options, function(tab){
// 				login(tab, begin, end)
// 			})
// 		}
// 	})
// };

// function login(tab, begin, end) {

// }

