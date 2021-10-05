chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        sendResponse({contenteditable: document.body.getAttribute("contenteditable")});
    });