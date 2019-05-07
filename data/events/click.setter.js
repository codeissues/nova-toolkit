(function(x, y, d) {

    var e = document.elementFromPoint(x, y), m;
    try {
        void d;
        m = document.querySelector(d);
    } catch (e) {}

    if (e instanceof Element && e.id == 'mouse__pointer' && m instanceof Element) {
        return m.click();
    } else if (e instanceof Element) {
        return e.click();
    } else if (m instanceof Element) {
        return m.click();
    }

}($clientX, $clientY, '$data'))
