define("fastclick/fastclick.js", function(require, exports, module) {
    function c(h, v) {
        "use strict";

        function g(c, a) {
            return function() {
                return c.apply(a, arguments)
            }
        }
        var k;
        if (v = v || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = v.touchBoundary || 10, this.layer = h, this.tapDelay = v.tapDelay || 200, !c.notNeeded(h)) {
            for (var E = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], C = this, i = 0, l = E.length; l > i; i++) C[E[i]] = g(C[E[i]], C);
            a && (h.addEventListener("mouseover", this.onMouse, !0), h.addEventListener("mousedown", this.onMouse, !0), h.addEventListener("mouseup", this.onMouse, !0)), h.addEventListener("click", this.onClick, !0), h.addEventListener("touchstart", this.onTouchStart, !1), h.addEventListener("touchmove", this.onTouchMove, !1), h.addEventListener("touchend", this.onTouchEnd, !1), h.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (h.removeEventListener = function(c, a, v) {
                var g = Node.prototype.removeEventListener;
                "click" === c ? g.call(h, c, a.hijacked || a, v) : g.call(h, c, a, v)
            }, h.addEventListener = function(c, a, v) {
                var g = Node.prototype.addEventListener;
                "click" === c ? g.call(h, c, a.hijacked || (a.hijacked = function(c) {
                    c.propagationStopped || a(c)
                }), v) : g.call(h, c, a, v)
            }), "function" == typeof h.onclick && (k = h.onclick, h.addEventListener("click", function(c) {
                k(c)
            }, !1), h.onclick = null)
        }
    }
    var a = navigator.userAgent.indexOf("Android") > 0,
        h = /iP(ad|hone|od)/.test(navigator.userAgent),
        v = h && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        g = h && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    c.prototype.needsClick = function(c) {
        "use strict";
        switch (c.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (c.disabled) return !0;
                break;
            case "input":
                if (h && "file" === c.type || c.disabled) return !0;
                break;
            case "label":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(c.className)
    }, c.prototype.needsFocus = function(c) {
        "use strict";
        switch (c.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !a;
            case "input":
                switch (c.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !c.disabled && !c.readOnly;
            default:
                return /\bneedsfocus\b/.test(c.className)
        }
    }, c.prototype.sendClick = function(c, a) {
        "use strict";
        var h, v;
        document.activeElement && document.activeElement !== c && document.activeElement.blur(), v = a.changedTouches[0], h = document.createEvent("MouseEvents"), h.initMouseEvent(this.determineEventType(c), !0, !0, window, 1, v.screenX, v.screenY, v.clientX, v.clientY, !1, !1, !1, !1, 0, null), h.forwardedTouchEvent = !0, c.dispatchEvent(h)
    }, c.prototype.determineEventType = function(c) {
        "use strict";
        return a && "select" === c.tagName.toLowerCase() ? "mousedown" : "click"
    }, c.prototype.focus = function(c) {
        "use strict";
        var a;
        h && c.setSelectionRange && 0 !== c.type.indexOf("date") && "time" !== c.type ? (a = c.value.length, c.setSelectionRange(a, a)) : c.focus()
    }, c.prototype.updateScrollParent = function(c) {
        "use strict";
        var a, h;
        if (a = c.fastClickScrollParent, !a || !a.contains(c)) {
            h = c;
            do {
                if (h.scrollHeight > h.offsetHeight) {
                    a = h, c.fastClickScrollParent = h;
                    break
                }
                h = h.parentElement
            } while (h)
        }
        a && (a.fastClickLastScrollTop = a.scrollTop)
    }, c.prototype.getTargetElementFromEventTarget = function(c) {
        "use strict";
        return c.nodeType === Node.TEXT_NODE ? c.parentNode : c
    }, c.prototype.onTouchStart = function(c) {
        "use strict";
        var a, g, k;
        if (c.targetTouches.length > 1) return !0;
        if (a = this.getTargetElementFromEventTarget(c.target), g = c.targetTouches[0], h) {
            if (k = window.getSelection(), k.rangeCount && !k.isCollapsed) return !0;
            if (!v) {
                if (g.identifier === this.lastTouchIdentifier) return c.preventDefault(), !1;
                this.lastTouchIdentifier = g.identifier, this.updateScrollParent(a)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = c.timeStamp, this.targetElement = a, this.touchStartX = g.pageX, this.touchStartY = g.pageY, c.timeStamp - this.lastClickTime < this.tapDelay && c.preventDefault(), !0
    }, c.prototype.touchHasMoved = function(c) {
        "use strict";
        var a = c.changedTouches[0],
            h = this.touchBoundary;
        return Math.abs(a.pageX - this.touchStartX) > h || Math.abs(a.pageY - this.touchStartY) > h ? !0 : !1
    }, c.prototype.onTouchMove = function(c) {
        "use strict";
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(c.target) || this.touchHasMoved(c)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, c.prototype.findControl = function(c) {
        "use strict";
        return void 0 !== c.control ? c.control : c.htmlFor ? document.getElementById(c.htmlFor) : c.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, c.prototype.onTouchEnd = function(c) {
        "use strict";
        var k, E, C, y, T, S = this.targetElement;
        if (!this.trackingClick) return !0;
        if (c.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (this.cancelNextClick = !1, this.lastClickTime = c.timeStamp, E = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, g && (T = c.changedTouches[0], S = document.elementFromPoint(T.pageX - window.pageXOffset, T.pageY - window.pageYOffset) || S, S.fastClickScrollParent = this.targetElement.fastClickScrollParent), C = S.tagName.toLowerCase(), "label" === C) {
            if (k = this.findControl(S)) {
                if (this.focus(S), a) return !1;
                S = k
            }
        } else if (this.needsFocus(S)) return c.timeStamp - E > 100 || h && window.top !== window && "input" === C ? (this.targetElement = null, !1) : (this.focus(S), this.sendClick(S, c), h && "select" === C || (this.targetElement = null, c.preventDefault()), !1);
        return h && !v && (y = S.fastClickScrollParent, y && y.fastClickLastScrollTop !== y.scrollTop) ? !0 : (this.needsClick(S) || (c.preventDefault(), this.sendClick(S, c)), !1)
    }, c.prototype.onTouchCancel = function() {
        "use strict";
        this.trackingClick = !1, this.targetElement = null
    }, c.prototype.onMouse = function(c) {
        "use strict";
        return this.targetElement ? c.forwardedTouchEvent ? !0 : c.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (c.stopImmediatePropagation ? c.stopImmediatePropagation() : c.propagationStopped = !0, c.stopPropagation(), c.preventDefault(), !1) : !0 : !0
    }, c.prototype.onClick = function(c) {
        "use strict";
        var a;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === c.target.type && 0 === c.detail ? !0 : (a = this.onMouse(c), a || (this.targetElement = null), a)
    }, c.prototype.destroy = function() {
        "use strict";
        var c = this.layer;
        a && (c.removeEventListener("mouseover", this.onMouse, !0), c.removeEventListener("mousedown", this.onMouse, !0), c.removeEventListener("mouseup", this.onMouse, !0)), c.removeEventListener("click", this.onClick, !0), c.removeEventListener("touchstart", this.onTouchStart, !1), c.removeEventListener("touchmove", this.onTouchMove, !1), c.removeEventListener("touchend", this.onTouchEnd, !1), c.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, c.notNeeded = function(c) {
        "use strict";
        var h, v;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (v = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!a) return !0;
            if (h = document.querySelector("meta[name=viewport]")) {
                if (-1 !== h.content.indexOf("user-scalable=no")) return !0;
                if (v > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        return "none" === c.style.msTouchAction ? !0 : !1
    }, c.attach = function(a, h) {
        "use strict";
        return new c(a, h)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        "use strict";
        return c
    }) : "undefined" != typeof module && module.exports ? (module.exports = c.attach, module.exports.FastClick = c) : window.FastClick = c
});
