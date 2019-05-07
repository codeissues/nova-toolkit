(function(e) {

    var target = e.target;
    var xpath = [];

    function buildXPath() {
        var p = xpath.join('/');
        return '//*' + (p.substr(0, 1).match(/[a-zA-Z]/) == null ? '' : '/') + p;
    }

    function isTargetXPath() {
        if (xpath.length > 0) {
            var p = buildXPath();
            return target === document.evaluate(p, document, null, 9, null).singleNodeValue;
        }
        return false;
    }

    function getXPath(e) {
        if (e.id) {
            xpath.unshift(e.tagName + '[@id="' + e.id + '"]');
            if (isTargetXPath()) {
                return buildXPath();
            }
            return getXPath(e.parentNode);
        }
        if (e === document.body) {
            xpath.unshift(e.tagName);
            return buildXPath();
        }
        var k = 0, cn = e.parentNode.childNodes;
        for (var i = 0; i < cn.length; i++) {
            var s = cn[i];
            if (s === e) {
                xpath.unshift(e.tagName + '[' + (k + 1) + ']');
                return getXPath(e.parentNode);
            } else if (s.nodeType === 1 && s.tagName === e.tagName) {
                k++;
            }
        }
    }

    return getXPath(e.target) + ';' + (e.code ? e.code : '') + ';' + (e.key ? e.key.toString().charCodeAt(0) : '');

}(e))
