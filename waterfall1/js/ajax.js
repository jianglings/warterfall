function ajax(method, url, cbs, data, flag) {
    var xml = null;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject('Microsoft.XMLHttp');
    }

    method.toUpperCase();
    if (method == 'GET') {
        var date = new Date();
        timer = date.getTime();
        xml.open(method, url + '?' + data + '&timer=' + timer, flag);
        xml.send();
    } else if (method == 'POST') {
        xml.open();
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
        xml.send(data);
    }
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                cbs(xml.responseText)
            }
        }

    }
}


