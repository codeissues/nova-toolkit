(function(e) {

    if (e instanceof Element) {
        var path = [];
        while (e.nodeType === Node.ELEMENT_NODE) {
            var selector = e.nodeName.toLowerCase();
            if (e.id) {
                selector += '#' + e.id;
                path.unshift(selector);
                break;
            } else {
                var sib = e, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector) {
                        nth++;
                    }
                }
                if (nth != 1) {
                    selector += ':nth-of-type(' + nth + ')';
                }
            }
            path.unshift(selector);
            e = e.parentNode;
        }
        return path.join('>');
    }
    return;

}(e))
