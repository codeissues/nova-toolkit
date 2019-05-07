(function(x, y) {

    var n = document.getElementById('mouse__pointer'), e;

    if (n) {
        var w = n.style.width;
        var h = n.style.height;
        n.style.width = (n.offsetWidth - 0.1 * n.offsetWidth) + 'px';
        n.style.height = (n.offsetHeight - 0.1 * n.offsetHeight) + 'px';
        setTimeout(function () {
            n.style.width = w;
            n.style.height = h;
        }, 250);
        n.style.display = 'none';
        e = document.elementFromPoint(x, y);
        n.style.display = 'block';
    }

    if (e instanceof Element) e.click();

    dispatchEvent(new MouseEvent('mousedown', {
        clientX: x,
        clientY: y,
        view: window,
        bubbles: true
    }));

}($clientX, $clientY))
