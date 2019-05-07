(function(v) {

    v = v.match(/(.*?);(.*);(.*)/);
    if (v == null || v.length < 3) {
        return;
    } else {
        var path = v[1], code = v[2], char = v[3];
    }

    try {
        var e = document.evaluate(path, document, null, 9, null).singleNodeValue;
        if (!e) return;
    } catch (e) {
        return;
    }

    var k = String.fromCharCode(char);
    if (/Key[A-Z]$|Digit[0-9]$|Minus|Equal|BracketLeft|BracketRight|Semicolon|Quote|Backquote|Backslash|Comma|Period|Slash|Space/.test(code)) {
        e.value += k;
    } else if (code == 'Backspace') {
        var s = e.value.split('');
        s.pop();
        e.value = s.join('');
    } else if (code == 'Enter' && e.tagName == 'INPUT' && e.form) e.form.submit();

    dispatchEvent(new KeyboardEvent('keydown', {
        key: k,
        view: window,
        bubbles: true
    }));

}('$data'))
