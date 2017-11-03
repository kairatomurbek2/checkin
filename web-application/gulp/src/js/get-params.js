function getParameter(variable) {
    var param = [];

    var query = window.location.href;
    if (query.indexOf("?") !== -1) {
        query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                param.push(pair[1]);
            }
        }
        return (param);
    } else {
        query = window.location.pathname.split('/')[2];
        param.push(query);
        return (param);
    }
}
