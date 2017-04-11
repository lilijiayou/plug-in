(function (dom, win) {
    var docEl = dom.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
        };

    if (!dom.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    dom.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);