chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {file: "content_script.js"});
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    statusRequest();
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
    statusRequest();
});
chrome.tabs.onAttached.addListener(function (tabId, attachInfo) {
    statusRequest();
});
chrome.windows.onFocusChanged.addListener(function (windowId) {
    statusRequest();
});

function statusRequest() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {novariabletosend: 0}, function handler(response) {
            if (response.contenteditable == "true" || response.contenteditable == true || response.contenteditable == 1) {
                chrome.browserAction.setIcon({path: "pressed.png", tabId: tab.id});
                chrome.browserAction.setBadgeText({text: "edit", tabId: tab.id});
            } else {
                chrome.browserAction.setIcon({path: "icon.png", tabId: tab.id});
                chrome.browserAction.setBadgeText({text: "", tabId: tab.id});
            }
        });
    });
}

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.contenteditable == "true" || request.contenteditable == true || request.contenteditable == 1) {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.browserAction.setIcon({path: "pressed.png", tabId: tab.id});
                chrome.browserAction.setBadgeText({text: "edit", tabId: tab.id});
            });
        } else {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.browserAction.setIcon({path: "icon.png", tabId: tab.id});
                chrome.browserAction.setBadgeText({text: "", tabId: tab.id});
            });
        }
    }
);