var toggle_editable = function () {
    if (document.body.getAttribute("contenteditable") == "true") {
        document.body.setAttribute("contenteditable", "false");
        chrome.extension.sendRequest({contenteditable: false});
    } else {
        document.body.setAttribute("contenteditable", "true");
        chrome.extension.sendRequest({contenteditable: true});
    }
}
toggle_editable();