// BootStrap
// NOT_STARTED -> STARTED -> RUNNING -> CLOSED -> NOT_STARTED

var HOME_STATE = 'CLOSED';
var homeTab = "";
var homeWindow = "";

chrome.storage.local.get(null, function(db){
	// The extension has been restarted.
	// Reset all
	chrome.storage.local.set({stats: []});
	chrome.storage.local.set({state: false});
	chrome.storage.local.set({settings: {
			'domss_empty_values': false
		}
	});

	chrome.browserAction.setBadgeBackgroundColor({color: '#45c89f'});

	// Called when the user clicks on the browser action.
	chrome.browserAction.onClicked.addListener(function(tab) {
		if(HOME_STATE == 'CLOSED'){
			chrome.tabs.create({url: chrome.extension.getURL('index.html')}, function(tab){
				HOME_STATE = 'OPENED';
				homeTab = tab.id;
				homeWindow = tab.windowId;
				chrome.tabs.onRemoved.addListener(function(closedTab){
					if(homeTab == closedTab){
						HOME_STATE = 'CLOSED';}
				});
			});
		} else {
			chrome.windows.update(homeWindow, {focused: true});
			chrome.tabs.update(homeTab, {selected: true});
		}
	});

});