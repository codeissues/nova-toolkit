(function(x, y, D) {

    var n = document.getElementById('mouse__pointer');

    if (n == null) {
        n = document.createElement('div');
        document.body.appendChild(n);
        n.id = 'mouse__pointer';
        n.style.position = 'fixed';
        n.style.width = D + 'px';
        n.style.height = D + 'px';
        n.style.background = '#fff';
        n.style.borderRadius = '50px';
        n.style.border = '3px solid #384c8c';
        n.style.zIndex = 2147483647;
    }

    n.style.top = (parseInt(y) - D / 2) + 'px';
    n.style.left = (parseInt(x) - D / 2) + 'px';

    dispatchEvent(new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
        view: window,
        bubbles: true
    }));

}($clientX, $clientY, 16))
