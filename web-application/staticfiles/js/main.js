!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length, n = oe.type(e);
        return "function" !== n && !oe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        if (oe.isFunction(t))return oe.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType)return oe.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (ge.test(t))return oe.filter(t, e, n);
            t = oe.filter(t, e)
        }
        return oe.grep(e, function (e) {
            return Z.call(t, e) > -1 !== n
        })
    }

    function r(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function o(e) {
        var t = {};
        return oe.each(e.match(we) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        G.removeEventListener("DOMContentLoaded", s), e.removeEventListener("load", s), oe.ready()
    }

    function a() {
        this.expando = oe.expando + a.uid++
    }

    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)if (i = "data-" + t.replace(De, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
            try {
                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : ke.test(n) ? oe.parseJSON(n) : n)
            } catch (r) {
            }
            Se.set(e, t, n)
        } else n = void 0;
        return n
    }

    function u(e, t, n, i) {
        var r, o = 1, s = 20, a = i ? function () {
            return i.cur()
        } : function () {
            return oe.css(e, t, "")
        }, l = a(), u = n && n[3] || (oe.cssNumber[t] ? "" : "px"), c = (oe.cssNumber[t] || "px" !== u && +l) && Ne.exec(oe.css(e, t));
        if (c && c[3] !== u) {
            u = u || c[3], n = n || [], c = +l || 1;
            do o = o || ".5", c /= o, oe.style(e, t, c + u); while (o !== (o = a() / l) && 1 !== o && --s)
        }
        return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r
    }

    function c(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && oe.nodeName(e, t) ? oe.merge([e], n) : n
    }

    function p(e, t) {
        for (var n = 0, i = e.length; n < i; n++)$e.set(e[n], "globalEval", !t || $e.get(t[n], "globalEval"))
    }

    function d(e, t, n, i, r) {
        for (var o, s, a, l, u, d, f = t.createDocumentFragment(), h = [], g = 0, v = e.length; g < v; g++)if (o = e[g], o || 0 === o)if ("object" === oe.type(o)) oe.merge(h, o.nodeType ? [o] : o); else if (Pe.test(o)) {
            for (s = s || f.appendChild(t.createElement("div")), a = (Fe.exec(o) || ["", ""])[1].toLowerCase(), l = _e[a] || _e._default, s.innerHTML = l[1] + oe.htmlPrefilter(o) + l[2], d = l[0]; d--;)s = s.lastChild;
            oe.merge(h, s.childNodes), s = f.firstChild, s.textContent = ""
        } else h.push(t.createTextNode(o));
        for (f.textContent = "", g = 0; o = h[g++];)if (i && oe.inArray(o, i) > -1) r && r.push(o); else if (u = oe.contains(o.ownerDocument, o), s = c(f.appendChild(o), "script"), u && p(s), n)for (d = 0; o = s[d++];)qe.test(o.type || "") && n.push(o);
        return f
    }

    function f() {
        return !0
    }

    function h() {
        return !1
    }

    function g() {
        try {
            return G.activeElement
        } catch (e) {
        }
    }

    function v(e, t, n, i, r, o) {
        var s, a;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t)v(e, a, n, i, t[a], o);
            return e
        }
        if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = h; else if (!r)return e;
        return 1 === o && (s = r, r = function (e) {
            return oe().off(e), s.apply(this, arguments)
        }, r.guid = s.guid || (s.guid = oe.guid++)), e.each(function () {
            oe.event.add(this, t, r, i, n)
        })
    }

    function m(e, t) {
        return oe.nodeName(e, "table") && oe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function y(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function x(e) {
        var t = Be.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function b(e, t) {
        var n, i, r, o, s, a, l, u;
        if (1 === t.nodeType) {
            if ($e.hasData(e) && (o = $e.access(e), s = $e.set(t, o), u = o.events)) {
                delete s.handle, s.events = {};
                for (r in u)for (n = 0, i = u[r].length; n < i; n++)oe.event.add(t, r, u[r][n])
            }
            Se.hasData(e) && (a = Se.access(e), l = oe.extend({}, a), Se.set(t, l))
        }
    }

    function w(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ie.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function C(e, t, n, i) {
        t = Y.apply([], t);
        var r, o, s, a, l, u, p = 0, f = e.length, h = f - 1, g = t[0], v = oe.isFunction(g);
        if (v || f > 1 && "string" == typeof g && !ie.checkClone && We.test(g))return e.each(function (r) {
            var o = e.eq(r);
            v && (t[0] = g.call(this, r, o.html())), C(o, t, n, i)
        });
        if (f && (r = d(t, e[0].ownerDocument, !1, e, i), o = r.firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
            for (s = oe.map(c(r, "script"), y), a = s.length; p < f; p++)l = r, p !== h && (l = oe.clone(l, !0, !0), a && oe.merge(s, c(l, "script"))), n.call(e[p], l, p);
            if (a)for (u = s[s.length - 1].ownerDocument, oe.map(s, x), p = 0; p < a; p++)l = s[p], qe.test(l.type || "") && !$e.access(l, "globalEval") && oe.contains(u, l) && (l.src ? oe._evalUrl && oe._evalUrl(l.src) : oe.globalEval(l.textContent.replace(Ve, "")))
        }
        return e
    }

    function T(e, t, n) {
        for (var i, r = t ? oe.filter(t, e) : e, o = 0; null != (i = r[o]); o++)n || 1 !== i.nodeType || oe.cleanData(c(i)), i.parentNode && (n && oe.contains(i.ownerDocument, i) && p(c(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function O(e, t) {
        var n = oe(t.createElement(e)).appendTo(t.body), i = oe.css(n[0], "display");
        return n.detach(), i
    }

    function $(e) {
        var t = G, n = Ue[e];
        return n || (n = O(e, t), "none" !== n && n || (Ke = (Ke || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ke[0].contentDocument, t.write(), t.close(), n = O(e, t), Ke.detach()), Ue[e] = n), n
    }

    function S(e, t, n) {
        var i, r, o, s, a = e.style;
        return n = n || Qe(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== s && void 0 !== s || oe.contains(e.ownerDocument, e) || (s = oe.style(e, t)), n && !ie.pixelMarginRight() && Ge.test(s) && Xe.test(t) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o), void 0 !== s ? s + "" : s
    }

    function k(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function D(e) {
        if (e in it)return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)if (e = nt[n] + t, e in it)return e
    }

    function A(e, t, n) {
        var i = Ne.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function N(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; o < 4; o += 2)"margin" === n && (s += oe.css(e, n + Ee[o], !0, r)), i ? ("content" === n && (s -= oe.css(e, "padding" + Ee[o], !0, r)), "margin" !== n && (s -= oe.css(e, "border" + Ee[o] + "Width", !0, r))) : (s += oe.css(e, "padding" + Ee[o], !0, r), "padding" !== n && (s += oe.css(e, "border" + Ee[o] + "Width", !0, r)));
        return s
    }

    function E(e, t, n) {
        var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, o = Qe(e), s = "border-box" === oe.css(e, "boxSizing", !1, o);
        if (r <= 0 || null == r) {
            if (r = S(e, t, o), (r < 0 || null == r) && (r = e.style[t]), Ge.test(r))return r;
            i = s && (ie.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + N(e, t, n || (s ? "border" : "content"), i, o) + "px"
    }

    function j(e, t) {
        for (var n, i, r, o = [], s = 0, a = e.length; s < a; s++)i = e[s], i.style && (o[s] = $e.get(i, "olddisplay"), n = i.style.display, t ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && je(i) && (o[s] = $e.access(i, "olddisplay", $(i.nodeName)))) : (r = je(i), "none" === n && r || $e.set(i, "olddisplay", r ? n : oe.css(i, "display"))));
        for (s = 0; s < a; s++)i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function I(e, t, n, i, r) {
        return new I.prototype.init(e, t, n, i, r)
    }

    function F() {
        return e.setTimeout(function () {
            rt = void 0
        }), rt = oe.now()
    }

    function q(e, t) {
        var n, i = 0, r = {height: e};
        for (t = t ? 1 : 0; i < 4; i += 2 - t)n = Ee[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function _(e, t, n) {
        for (var i, r = (H.tweeners[t] || []).concat(H.tweeners["*"]), o = 0, s = r.length; o < s; o++)if (i = r[o].call(n, t, e))return i
    }

    function P(e, t, n) {
        var i, r, o, s, a, l, u, c, p = this, d = {}, f = e.style, h = e.nodeType && je(e), g = $e.get(e, "fxshow");
        n.queue || (a = oe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, p.always(function () {
            p.always(function () {
                a.unqueued--, oe.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], u = oe.css(e, "display"), c = "none" === u ? $e.get(e, "olddisplay") || $(e.nodeName) : u, "inline" === c && "none" === oe.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", p.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)if (r = t[i], st.exec(r)) {
            if (delete t[i], o = o || "toggle" === r, r === (h ? "hide" : "show")) {
                if ("show" !== r || !g || void 0 === g[i])continue;
                h = !0
            }
            d[i] = g && g[i] || oe.style(e, i)
        } else u = void 0;
        if (oe.isEmptyObject(d)) "inline" === ("none" === u ? $(e.nodeName) : u) && (f.display = u); else {
            g ? "hidden" in g && (h = g.hidden) : g = $e.access(e, "fxshow", {}), o && (g.hidden = !h), h ? oe(e).show() : p.done(function () {
                oe(e).hide()
            }), p.done(function () {
                var t;
                $e.remove(e, "fxshow");
                for (t in d)oe.style(e, t, d[t])
            });
            for (i in d)s = _(h ? g[i] : 0, i, p), i in g || (g[i] = s.start, h && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function L(e, t) {
        var n, i, r, o, s;
        for (n in e)if (i = oe.camelCase(n), r = t[i], o = e[n], oe.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), s = oe.cssHooks[i], s && "expand" in s) {
            o = s.expand(o), delete e[i];
            for (n in o)n in e || (e[n] = o[n], t[n] = r)
        } else t[i] = r
    }

    function H(e, t, n) {
        var i, r, o = 0, s = H.prefilters.length, a = oe.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (r)return !1;
            for (var t = rt || F(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, s = 0, l = u.tweens.length; s < l; s++)u.tweens[s].run(o);
            return a.notifyWith(e, [u, o, n]), o < 1 && l ? n : (a.resolveWith(e, [u]), !1)
        }, u = a.promise({
            elem: e,
            props: oe.extend({}, t),
            opts: oe.extend(!0, {specialEasing: {}, easing: oe.easing._default}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: rt || F(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var i = oe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (r)return this;
                for (r = !0; n < i; n++)u.tweens[n].run(1);
                return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this
            }
        }), c = u.props;
        for (L(c, u.opts.specialEasing); o < s; o++)if (i = H.prefilters[o].call(u, e, c, u.opts))return oe.isFunction(i.stop) && (oe._queueHooks(u.elem, u.opts.queue).stop = oe.proxy(i.stop, i)), i;
        return oe.map(c, _, u), oe.isFunction(u.opts.start) && u.opts.start.call(e, u), oe.fx.timer(oe.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function R(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function M(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0, o = t.toLowerCase().match(we) || [];
            if (oe.isFunction(n))for (; i = o[r++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function z(e, t, n, i) {
        function r(a) {
            var l;
            return o[a] = !0, oe.each(e[a] || [], function (e, a) {
                var u = a(t, n, i);
                return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }

        var o = {}, s = e === St;
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }

    function W(e, t) {
        var n, i, r = oe.ajaxSettings.flatOptions || {};
        for (n in t)void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
        return i && oe.extend(!0, e, i), e
    }

    function B(e, t, n) {
        for (var i, r, o, s, a = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)for (r in a)if (a[r] && a[r].test(i)) {
            l.unshift(r);
            break
        }
        if (l[0] in n) o = l[0]; else {
            for (r in n) {
                if (!l[0] || e.converters[r + " " + l[0]]) {
                    o = r;
                    break
                }
                s || (s = r)
            }
            o = o || s
        }
        if (o)return o !== l[0] && l.unshift(o), n[o]
    }

    function V(e, t, n, i) {
        var r, o, s, a, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (s in e.converters)u[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())if ("*" === o) o = l; else if ("*" !== l && l !== o) {
            if (s = u[l + " " + o] || u["* " + o], !s)for (r in u)if (a = r.split(" "), a[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                s === !0 ? s = u[r] : u[r] !== !0 && (o = a[0], c.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"]) t = s(t); else try {
                t = s(t)
            } catch (p) {
                return {state: "parsererror", error: s ? p : "No conversion from " + l + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function K(e, t, n, i) {
        var r;
        if (oe.isArray(t)) oe.each(t, function (t, r) {
            n || Nt.test(e) ? i(e, r) : K(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
        }); else if (n || "object" !== oe.type(t)) i(e, t); else for (r in t)K(e + "[" + r + "]", t[r], n, i)
    }

    function U(e) {
        return oe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var X = [], G = e.document, Q = X.slice, Y = X.concat, J = X.push, Z = X.indexOf, ee = {}, te = ee.toString, ne = ee.hasOwnProperty, ie = {}, re = "2.2.4", oe = function (e, t) {
        return new oe.fn.init(e, t)
    }, se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, le = /-([\da-z])/gi, ue = function (e, t) {
        return t.toUpperCase()
    };
    oe.fn = oe.prototype = {
        jquery: re, constructor: oe, selector: "", length: 0, toArray: function () {
            return Q.call(this)
        }, get: function (e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : Q.call(this)
        }, pushStack: function (e) {
            var t = oe.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e) {
            return oe.each(this, e)
        }, map: function (e) {
            return this.pushStack(oe.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(Q.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: J, sort: X.sort, splice: X.splice
    }, oe.extend = oe.fn.extend = function () {
        var e, t, n, i, r, o, s = arguments[0] || {}, a = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || oe.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++)if (null != (e = arguments[a]))for (t in e)n = s[t], i = e[t], s !== i && (u && i && (oe.isPlainObject(i) || (r = oe.isArray(i))) ? (r ? (r = !1, o = n && oe.isArray(n) ? n : []) : o = n && oe.isPlainObject(n) ? n : {}, s[t] = oe.extend(u, o, i)) : void 0 !== i && (s[t] = i));
        return s
    }, oe.extend({
        expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === oe.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            var t = e && e.toString();
            return !oe.isArray(e) && t - parseFloat(t) + 1 >= 0
        }, isPlainObject: function (e) {
            var t;
            if ("object" !== oe.type(e) || e.nodeType || oe.isWindow(e))return !1;
            if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf"))return !1;
            for (t in e);
            return void 0 === t || ne.call(e, t)
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
        }, globalEval: function (e) {
            var t, n = eval;
            e = oe.trim(e), e && (1 === e.indexOf("use strict") ? (t = G.createElement("script"), t.text = e, G.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        }, camelCase: function (e) {
            return e.replace(ae, "ms-").replace(le, ue)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t) {
            var i, r = 0;
            if (n(e))for (i = e.length; r < i && t.call(e[r], r, e[r]) !== !1; r++); else for (r in e)if (t.call(e[r], r, e[r]) === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(se, "")
        }, makeArray: function (e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? oe.merge(i, "string" == typeof e ? [e] : e) : J.call(i, e)), i
        }, inArray: function (e, t, n) {
            return null == t ? -1 : Z.call(t, e, n)
        }, merge: function (e, t) {
            for (var n = +t.length, i = 0, r = e.length; i < n; i++)e[r++] = t[i];
            return e.length = r, e
        }, grep: function (e, t, n) {
            for (var i, r = [], o = 0, s = e.length, a = !n; o < s; o++)i = !t(e[o], o), i !== a && r.push(e[o]);
            return r
        }, map: function (e, t, i) {
            var r, o, s = 0, a = [];
            if (n(e))for (r = e.length; s < r; s++)o = t(e[s], s, i), null != o && a.push(o); else for (s in e)o = t(e[s], s, i), null != o && a.push(o);
            return Y.apply([], a)
        }, guid: 1, proxy: function (e, t) {
            var n, i, r;
            if ("string" == typeof t && (n = e[t], t = e, e = n), oe.isFunction(e))return i = Q.call(arguments, 2), r = function () {
                return e.apply(t || this, i.concat(Q.call(arguments)))
            }, r.guid = e.guid = e.guid || oe.guid++, r
        }, now: Date.now, support: ie
    }), "function" == typeof Symbol && (oe.fn[Symbol.iterator] = X[Symbol.iterator]), oe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    });
    var ce = function (e) {
        function t(e, t, n, i) {
            var r, o, s, a, l, u, p, f, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)return n;
            if (!i && ((t ? t.ownerDocument || t : R) !== j && E(t), t = t || j, F)) {
                if (11 !== g && (u = me.exec(e)))if (r = u[1]) {
                    if (9 === g) {
                        if (!(s = t.getElementById(r)))return n;
                        if (s.id === r)return n.push(s), n
                    } else if (h && (s = h.getElementById(r)) && L(t, s) && s.id === r)return n.push(s), n
                } else {
                    if (u[2])return J.apply(n, t.getElementsByTagName(e)), n;
                    if ((r = u[3]) && w.getElementsByClassName && t.getElementsByClassName)return J.apply(n, t.getElementsByClassName(r)), n
                }
                if (w.qsa && !V[e + " "] && (!q || !q.test(e))) {
                    if (1 !== g) h = t, f = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(xe, "\\$&") : t.setAttribute("id", a = H), p = $(e), o = p.length, l = de.test(a) ? "#" + a : "[id='" + a + "']"; o--;)p[o] = l + " " + d(p[o]);
                        f = p.join(","), h = ye.test(e) && c(t.parentNode) || t
                    }
                    if (f)try {
                        return J.apply(n, h.querySelectorAll(f)), n
                    } catch (v) {
                    } finally {
                        a === H && t.removeAttribute("id")
                    }
                }
            }
            return k(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > C.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[H] = !0, e
        }

        function r(e) {
            var t = j.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), i = n.length; i--;)C.attrHandle[n[i]] = t
        }

        function s(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
            if (i)return i;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function (t) {
                return t = +t, i(function (n, i) {
                    for (var r, o = e([], n.length, t), s = o.length; s--;)n[r = o[s]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function p() {
        }

        function d(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++)i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir, r = n && "parentNode" === i, o = z++;
            return t.first ? function (t, n, o) {
                for (; t = t[i];)if (1 === t.nodeType || r)return e(t, n, o)
            } : function (t, n, s) {
                var a, l, u, c = [M, o];
                if (s) {
                    for (; t = t[i];)if ((1 === t.nodeType || r) && e(t, n, s))return !0
                } else for (; t = t[i];)if (1 === t.nodeType || r) {
                    if (u = t[H] || (t[H] = {}), l = u[t.uniqueID] || (u[t.uniqueID] = {}), (a = l[i]) && a[0] === M && a[1] === o)return c[2] = a[2];
                    if (l[i] = c, c[2] = e(t, n, s))return !0
                }
            }
        }

        function h(e) {
            return e.length > 1 ? function (t, n, i) {
                for (var r = e.length; r--;)if (!e[r](t, n, i))return !1;
                return !0
            } : e[0]
        }

        function g(e, n, i) {
            for (var r = 0, o = n.length; r < o; r++)t(e, n[r], i);
            return i
        }

        function v(e, t, n, i, r) {
            for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)(o = e[a]) && (n && !n(o, i, r) || (s.push(o), u && t.push(a)));
            return s
        }

        function m(e, t, n, r, o, s) {
            return r && !r[H] && (r = m(r)), o && !o[H] && (o = m(o, s)), i(function (i, s, a, l) {
                var u, c, p, d = [], f = [], h = s.length, m = i || g(t || "*", a.nodeType ? [a] : a, []), y = !e || !i && t ? m : v(m, d, e, a, l), x = n ? o || (i ? e : h || r) ? [] : s : y;
                if (n && n(y, x, a, l), r)for (u = v(x, f), r(u, [], a, l), c = u.length; c--;)(p = u[c]) && (x[f[c]] = !(y[f[c]] = p));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = x.length; c--;)(p = x[c]) && u.push(y[c] = p);
                            o(null, x = [], u, l)
                        }
                        for (c = x.length; c--;)(p = x[c]) && (u = o ? ee(i, p) : d[c]) > -1 && (i[u] = !(s[u] = p))
                    }
                } else x = v(x === s ? x.splice(h, x.length) : x), o ? o(null, s, x, l) : J.apply(s, x)
            })
        }

        function y(e) {
            for (var t, n, i, r = e.length, o = C.relative[e[0].type], s = o || C.relative[" "], a = o ? 1 : 0, l = f(function (e) {
                return e === t
            }, s, !0), u = f(function (e) {
                return ee(t, e) > -1
            }, s, !0), c = [function (e, n, i) {
                var r = !o && (i || n !== D) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                return t = null, r
            }]; a < r; a++)if (n = C.relative[e[a].type]) c = [f(h(c), n)]; else {
                if (n = C.filter[e[a].type].apply(null, e[a].matches), n[H]) {
                    for (i = ++a; i < r && !C.relative[e[i].type]; i++);
                    return m(a > 1 && h(c), a > 1 && d(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(ae, "$1"), n, a < i && y(e.slice(a, i)), i < r && y(e = e.slice(i)), i < r && d(e))
                }
                c.push(n)
            }
            return h(c)
        }

        function x(e, n) {
            var r = n.length > 0, o = e.length > 0, s = function (i, s, a, l, u) {
                var c, p, d, f = 0, h = "0", g = i && [], m = [], y = D, x = i || o && C.find.TAG("*", u), b = M += null == y ? 1 : Math.random() || .1, w = x.length;
                for (u && (D = s === j || s || u); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (p = 0, s || c.ownerDocument === j || (E(c), a = !F); d = e[p++];)if (d(c, s || j, a)) {
                            l.push(c);
                            break
                        }
                        u && (M = b)
                    }
                    r && ((c = !d && c) && f--, i && g.push(c))
                }
                if (f += h, r && h !== f) {
                    for (p = 0; d = n[p++];)d(g, m, s, a);
                    if (i) {
                        if (f > 0)for (; h--;)g[h] || m[h] || (m[h] = Q.call(l));
                        m = v(m)
                    }
                    J.apply(l, m), u && !i && m.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return u && (M = b, D = y), g
            };
            return r ? i(s) : s
        }

        var b, w, C, T, O, $, S, k, D, A, N, E, j, I, F, q, _, P, L, H = "sizzle" + 1 * new Date, R = e.document, M = 0, z = 0, W = n(), B = n(), V = n(), K = function (e, t) {
            return e === t && (N = !0), 0
        }, U = 1 << 31, X = {}.hasOwnProperty, G = [], Q = G.pop, Y = G.push, J = G.push, Z = G.slice, ee = function (e, t) {
            for (var n = 0, i = e.length; n < i; n++)if (e[n] === t)return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)", se = new RegExp(ne + "+", "g"), ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), pe = new RegExp(oe), de = new RegExp("^" + ie + "$"), fe = {
            ID: new RegExp("^#(" + ie + ")"),
            CLASS: new RegExp("^\\.(" + ie + ")"),
            TAG: new RegExp("^(" + ie + "|[*])"),
            ATTR: new RegExp("^" + re),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, xe = /'|\\/g, be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), we = function (e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        }, Ce = function () {
            E()
        };
        try {
            J.apply(G = Z.call(R.childNodes), R.childNodes), G[R.childNodes.length].nodeType
        } catch (Te) {
            J = {
                apply: G.length ? function (e, t) {
                    Y.apply(e, Z.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, O = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, E = t.setDocument = function (e) {
            var t, n, i = e ? e.ownerDocument || e : R;
            return i !== j && 9 === i.nodeType && i.documentElement ? (j = i, I = j.documentElement, F = !O(j), (n = j.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), w.attributes = r(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = r(function (e) {
                return e.appendChild(j.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = ve.test(j.getElementsByClassName), w.getById = r(function (e) {
                return I.appendChild(e).id = H, !j.getElementsByName || !j.getElementsByName(H).length
            }), w.getById ? (C.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && F) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, C.filter.ID = function (e) {
                var t = e.replace(be, we);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete C.find.ID, C.filter.ID = function (e) {
                var t = e.replace(be, we);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), C.find.TAG = w.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, i = [], r = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[r++];)1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, C.find.CLASS = w.getElementsByClassName && function (e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && F)return t.getElementsByClassName(e)
                }, _ = [], q = [], (w.qsa = ve.test(j.querySelectorAll)) && (r(function (e) {
                I.appendChild(e).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || q.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + H + "-]").length || q.push("~="), e.querySelectorAll(":checked").length || q.push(":checked"), e.querySelectorAll("a#" + H + "+*").length || q.push(".#.+[+~]")
            }), r(function (e) {
                var t = j.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
            })), (w.matchesSelector = ve.test(P = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function (e) {
                w.disconnectedMatch = P.call(e, "div"), P.call(e, "[s!='']:x"), _.push("!=", oe)
            }), q = q.length && new RegExp(q.join("|")), _ = _.length && new RegExp(_.join("|")), t = ve.test(I.compareDocumentPosition), L = t || ve.test(I.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, K = t ? function (e, t) {
                if (e === t)return N = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === j || e.ownerDocument === R && L(R, e) ? -1 : t === j || t.ownerDocument === R && L(R, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t)return N = !0, 0;
                var n, i = 0, r = e.parentNode, o = t.parentNode, a = [e], l = [t];
                if (!r || !o)return e === j ? -1 : t === j ? 1 : r ? -1 : o ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (r === o)return s(e, t);
                for (n = e; n = n.parentNode;)a.unshift(n);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (; a[i] === l[i];)i++;
                return i ? s(a[i], l[i]) : a[i] === R ? -1 : l[i] === R ? 1 : 0
            }, j) : j
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== j && E(e), n = n.replace(ce, "='$1']"), w.matchesSelector && F && !V[n + " "] && (!_ || !_.test(n)) && (!q || !q.test(n)))try {
                var i = P.call(e, n);
                if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
            } catch (r) {
            }
            return t(n, j, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== j && E(e), L(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== j && E(e);
            var n = C.attrHandle[t.toLowerCase()], i = n && X.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !F) : void 0;
            return void 0 !== i ? i : w.attributes || !F ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, r = 0;
            if (N = !w.detectDuplicates, A = !w.sortStable && e.slice(0), e.sort(K), N) {
                for (; t = e[r++];)t === e[r] && (i = n.push(r));
                for (; i--;)e.splice(n[i], 1)
            }
            return A = null, e
        }, T = t.getText = function (e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += T(e)
                } else if (3 === r || 4 === r)return e.nodeValue
            } else for (; t = e[i++];)n += T(t);
            return n
        }, C = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = $(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(be, we).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, i) {
                    return function (r) {
                        var o = t.attr(r, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                }, CHILD: function (e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === i && 0 === r ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, c, p, d, f, h, g = o !== s ? "nextSibling" : "previousSibling", v = t.parentNode, m = a && t.nodeName.toLowerCase(), y = !l && !a, x = !1;
                        if (v) {
                            if (o) {
                                for (; g;) {
                                    for (d = t; d = d[g];)if (a ? d.nodeName.toLowerCase() === m : 1 === d.nodeType)return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [s ? v.firstChild : v.lastChild], s && y) {
                                for (d = v, p = d[H] || (d[H] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), u = c[e] || [], f = u[0] === M && u[1], x = f && u[2], d = f && v.childNodes[f]; d = ++f && d && d[g] || (x = f = 0) || h.pop();)if (1 === d.nodeType && ++x && d === t) {
                                    c[e] = [M, f, x];
                                    break
                                }
                            } else if (y && (d = t, p = d[H] || (d[H] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), u = c[e] || [], f = u[0] === M && u[1], x = f), x === !1)for (; (d = ++f && d && d[g] || (x = f = 0) || h.pop()) && ((a ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++x || (y && (p = d[H] || (d[H] = {}), c = p[d.uniqueID] || (p[d.uniqueID] = {}), c[e] = [M, x]), d !== t)););
                            return x -= r, x === i || x % i === 0 && x / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var r, o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[H] ? o(n) : o.length > 1 ? (r = [e, e, "", n], C.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, r = o(e, n), s = r.length; s--;)i = ee(e, r[s]), e[i] = !(t[i] = r[s])
                    }) : function (e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], r = S(e.replace(ae, "$1"));
                    return r[H] ? i(function (e, t, n, i) {
                        for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return e = e.replace(be, we), function (t) {
                        return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(), function (t) {
                        var n;
                        do if (n = F ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === I
                }, focus: function (e) {
                    return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !C.pseudos.empty(e)
                }, header: function (e) {
                    return ge.test(e.nodeName)
                }, input: function (e) {
                    return he.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [n < 0 ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; n < t; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; n < t; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0;)e.push(i);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;)e.push(i);
                    return e
                })
            }
        }, C.pseudos.nth = C.pseudos.eq;
        for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})C.pseudos[b] = a(b);
        for (b in{submit: !0, reset: !0})C.pseudos[b] = l(b);
        return p.prototype = C.filters = C.pseudos, C.setFilters = new p, $ = t.tokenize = function (e, n) {
            var i, r, o, s, a, l, u, c = B[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (a = e, l = [], u = C.preFilter; a;) {
                i && !(r = le.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(o = [])), i = !1, (r = ue.exec(a)) && (i = r.shift(), o.push({
                    value: i,
                    type: r[0].replace(ae, " ")
                }), a = a.slice(i.length));
                for (s in C.filter)!(r = fe[s].exec(a)) || u[s] && !(r = u[s](r)) || (i = r.shift(), o.push({
                    value: i,
                    type: s,
                    matches: r
                }), a = a.slice(i.length));
                if (!i)break
            }
            return n ? a.length : a ? t.error(e) : B(e, l).slice(0)
        }, S = t.compile = function (e, t) {
            var n, i = [], r = [], o = V[e + " "];
            if (!o) {
                for (t || (t = $(e)), n = t.length; n--;)o = y(t[n]), o[H] ? i.push(o) : r.push(o);
                o = V(e, x(r, i)), o.selector = e
            }
            return o
        }, k = t.select = function (e, t, n, i) {
            var r, o, s, a, l, u = "function" == typeof e && e, p = !i && $(e = u.selector || e);
            if (n = n || [], 1 === p.length) {
                if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === t.nodeType && F && C.relative[o[1].type]) {
                    if (t = (C.find.ID(s.matches[0].replace(be, we), t) || [])[0], !t)return n;
                    u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (r = fe.needsContext.test(e) ? 0 : o.length; r-- && (s = o[r], !C.relative[a = s.type]);)if ((l = C.find[a]) && (i = l(s.matches[0].replace(be, we), ye.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(r, 1), e = i.length && d(o), !e)return J.apply(n, i), n;
                    break
                }
            }
            return (u || S(e, p))(i, t, !F, n, !t || ye.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = H.split("").sort(K).join("") === H, w.detectDuplicates = !!N, E(), w.sortDetached = r(function (e) {
            return 1 & e.compareDocumentPosition(j.createElement("div"))
        }), r(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            if (!n)return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && r(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())return e.defaultValue
        }), r(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(te, function (e, t, n) {
            var i;
            if (!n)return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.uniqueSort = oe.unique = ce.uniqueSort, oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
    var pe = function (e, t, n) {
        for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
            if (r && oe(e).is(n))break;
            i.push(e)
        }
        return i
    }, de = function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }, fe = oe.expr.match.needsContext, he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, ge = /^.[^:#\[\.,]*$/;
    oe.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? oe.find.matchesSelector(i, e) ? [i] : [] : oe.find.matches(e, oe.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, oe.fn.extend({
        find: function (e) {
            var t, n = this.length, i = [], r = this;
            if ("string" != typeof e)return this.pushStack(oe(e).filter(function () {
                for (t = 0; t < n; t++)if (oe.contains(r[t], this))return !0
            }));
            for (t = 0; t < n; t++)oe.find(e, r[t], i);
            return i = this.pushStack(n > 1 ? oe.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && fe.test(e) ? oe(e) : e || [], !1).length
        }
    });
    var ve, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ye = oe.fn.init = function (e, t, n) {
        var i, r;
        if (!e)return this;
        if (n = n || ve, "string" == typeof e) {
            if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : me.exec(e), !i || !i[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof oe ? t[0] : t, oe.merge(this, oe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : G, !0)), he.test(i[1]) && oe.isPlainObject(t))for (i in t)oe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return r = G.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = G, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : oe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(oe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), oe.makeArray(e, this))
    };
    ye.prototype = oe.fn, ve = oe(G);
    var xe = /^(?:parents|prev(?:Until|All))/, be = {children: !0, contents: !0, next: !0, prev: !0};
    oe.fn.extend({
        has: function (e) {
            var t = oe(e, this), n = t.length;
            return this.filter(function () {
                for (var e = 0; e < n; e++)if (oe.contains(this, t[e]))return !0
            })
        }, closest: function (e, t) {
            for (var n, i = 0, r = this.length, o = [], s = fe.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; i < r; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? oe.uniqueSort(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? Z.call(oe(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(oe.uniqueSort(oe.merge(this.get(), oe(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), oe.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return pe(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return pe(e, "parentNode", n)
        }, next: function (e) {
            return r(e, "nextSibling")
        }, prev: function (e) {
            return r(e, "previousSibling")
        }, nextAll: function (e) {
            return pe(e, "nextSibling")
        }, prevAll: function (e) {
            return pe(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return pe(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return pe(e, "previousSibling", n)
        }, siblings: function (e) {
            return de((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return de(e.firstChild)
        }, contents: function (e) {
            return e.contentDocument || oe.merge([], e.childNodes)
        }
    }, function (e, t) {
        oe.fn[e] = function (n, i) {
            var r = oe.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = oe.filter(i, r)), this.length > 1 && (be[e] || oe.uniqueSort(r), xe.test(e) && r.reverse()), this.pushStack(r)
        }
    });
    var we = /\S+/g;
    oe.Callbacks = function (e) {
        e = "string" == typeof e ? o(e) : oe.extend({}, e);
        var t, n, i, r, s = [], a = [], l = -1, u = function () {
            for (r = e.once, i = t = !0; a.length; l = -1)for (n = a.shift(); ++l < s.length;)s[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = s.length, n = !1);
            e.memory || (n = !1), t = !1, r && (s = n ? [] : "")
        }, c = {
            add: function () {
                return s && (n && !t && (l = s.length - 1, a.push(n)), function i(t) {
                    oe.each(t, function (t, n) {
                        oe.isFunction(n) ? e.unique && c.has(n) || s.push(n) : n && n.length && "string" !== oe.type(n) && i(n)
                    })
                }(arguments), n && !t && u()), this
            }, remove: function () {
                return oe.each(arguments, function (e, t) {
                    for (var n; (n = oe.inArray(t, s, n)) > -1;)s.splice(n, 1), n <= l && l--
                }), this
            }, has: function (e) {
                return e ? oe.inArray(e, s) > -1 : s.length > 0
            }, empty: function () {
                return s && (s = []), this
            }, disable: function () {
                return r = a = [], s = n = "", this
            }, disabled: function () {
                return !s
            }, lock: function () {
                return r = a = [], n || (s = n = ""), this
            }, locked: function () {
                return !!r
            }, fireWith: function (e, n) {
                return r || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || u()), this
            }, fire: function () {
                return c.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return c
    }, oe.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", oe.Callbacks("once memory"), "resolved"], ["reject", "fail", oe.Callbacks("once memory"), "rejected"], ["notify", "progress", oe.Callbacks("memory")]], n = "pending", i = {
                state: function () {
                    return n
                }, always: function () {
                    return r.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return oe.Deferred(function (n) {
                        oe.each(t, function (t, o) {
                            var s = oe.isFunction(e[t]) && e[t];
                            r[o[1]](function () {
                                var e = s && s.apply(this, arguments);
                                e && oe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? oe.extend(e, i) : i
                }
            }, r = {};
            return i.pipe = i.then, oe.each(t, function (e, o) {
                var s = o[2], a = o[3];
                i[o[1]] = s.add, a && s.add(function () {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function () {
                    return r[o[0] + "With"](this === r ? i : this, arguments), this
                }, r[o[0] + "With"] = s.fireWith
            }), i.promise(r), e && e.call(r, r), r
        }, when: function (e) {
            var t, n, i, r = 0, o = Q.call(arguments), s = o.length, a = 1 !== s || e && oe.isFunction(e.promise) ? s : 0, l = 1 === a ? e : oe.Deferred(), u = function (e, n, i) {
                return function (r) {
                    n[e] = this, i[e] = arguments.length > 1 ? Q.call(arguments) : r, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                }
            };
            if (s > 1)for (t = new Array(s), n = new Array(s), i = new Array(s); r < s; r++)o[r] && oe.isFunction(o[r].promise) ? o[r].promise().progress(u(r, n, t)).done(u(r, i, o)).fail(l.reject) : --a;
            return a || l.resolveWith(i, o), l.promise()
        }
    });
    var Ce;
    oe.fn.ready = function (e) {
        return oe.ready.promise().done(e), this
    }, oe.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? oe.readyWait++ : oe.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --oe.readyWait : oe.isReady) || (oe.isReady = !0, e !== !0 && --oe.readyWait > 0 || (Ce.resolveWith(G, [oe]), oe.fn.triggerHandler && (oe(G).triggerHandler("ready"), oe(G).off("ready"))))
        }
    }), oe.ready.promise = function (t) {
        return Ce || (Ce = oe.Deferred(), "complete" === G.readyState || "loading" !== G.readyState && !G.documentElement.doScroll ? e.setTimeout(oe.ready) : (G.addEventListener("DOMContentLoaded", s), e.addEventListener("load", s))), Ce.promise(t)
    }, oe.ready.promise();
    var Te = function (e, t, n, i, r, o, s) {
        var a = 0, l = e.length, u = null == n;
        if ("object" === oe.type(n)) {
            r = !0;
            for (a in n)Te(e, t, a, n[a], !0, o, s)
        } else if (void 0 !== i && (r = !0, oe.isFunction(i) || (s = !0), u && (s ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(oe(e), n)
            })), t))for (; a < l; a++)t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
        return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
    }, Oe = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    a.uid = 1, a.prototype = {
        register: function (e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        }, cache: function (e) {
            if (!Oe(e))return {};
            var t = e[this.expando];
            return t || (t = {}, Oe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        }, set: function (e, t, n) {
            var i, r = this.cache(e);
            if ("string" == typeof t) r[t] = n; else for (i in t)r[i] = t[i];
            return r
        }, get: function (e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        }, access: function (e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, oe.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        }, remove: function (e, t) {
            var n, i, r, o = e[this.expando];
            if (void 0 !== o) {
                if (void 0 === t) this.register(e); else {
                    oe.isArray(t) ? i = t.concat(t.map(oe.camelCase)) : (r = oe.camelCase(t), t in o ? i = [t, r] : (i = r, i = i in o ? [i] : i.match(we) || [])), n = i.length;
                    for (; n--;)delete o[i[n]]
                }
                (void 0 === t || oe.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        }, hasData: function (e) {
            var t = e[this.expando];
            return void 0 !== t && !oe.isEmptyObject(t)
        }
    };
    var $e = new a, Se = new a, ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, De = /[A-Z]/g;
    oe.extend({
        hasData: function (e) {
            return Se.hasData(e) || $e.hasData(e)
        }, data: function (e, t, n) {
            return Se.access(e, t, n)
        }, removeData: function (e, t) {
            Se.remove(e, t)
        }, _data: function (e, t, n) {
            return $e.access(e, t, n)
        }, _removeData: function (e, t) {
            $e.remove(e, t)
        }
    }), oe.fn.extend({
        data: function (e, t) {
            var n, i, r, o = this[0], s = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (r = Se.get(o), 1 === o.nodeType && !$e.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;)s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), l(o, i, r[i])));
                    $e.set(o, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function () {
                Se.set(this, e)
            }) : Te(this, function (t) {
                var n, i;
                if (o && void 0 === t) {
                    if (n = Se.get(o, e) || Se.get(o, e.replace(De, "-$&").toLowerCase()), void 0 !== n)return n;
                    if (i = oe.camelCase(e), n = Se.get(o, i), void 0 !== n)return n;
                    if (n = l(o, i, void 0), void 0 !== n)return n
                } else i = oe.camelCase(e), this.each(function () {
                    var n = Se.get(this, i);
                    Se.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && Se.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                Se.remove(this, e)
            })
        }
    }), oe.extend({
        queue: function (e, t, n) {
            var i;
            if (e)return t = (t || "fx") + "queue", i = $e.get(e, t), n && (!i || oe.isArray(n) ? i = $e.access(e, t, oe.makeArray(n)) : i.push(n)), i || []
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = oe.queue(e, t), i = n.length, r = n.shift(), o = oe._queueHooks(e, t), s = function () {
                oe.dequeue(e, t)
            };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, s, o)), !i && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return $e.get(e, n) || $e.access(e, n, {
                    empty: oe.Callbacks("once memory").add(function () {
                        $e.remove(e, [t + "queue", n])
                    })
                })
        }
    }), oe.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? oe.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = oe.queue(this, e, t);
                oe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && oe.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                oe.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, i = 1, r = oe.Deferred(), o = this, s = this.length, a = function () {
                --i || r.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)n = $e.get(o[s], e + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
            return a(), r.promise(t)
        }
    });
    var Ae = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ne = new RegExp("^(?:([+-])=|)(" + Ae + ")([a-z%]*)$", "i"), Ee = ["Top", "Right", "Bottom", "Left"], je = function (e, t) {
        return e = t || e, "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
    }, Ie = /^(?:checkbox|radio)$/i, Fe = /<([\w:-]+)/, qe = /^$|\/(?:java|ecma)script/i, _e = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    _e.optgroup = _e.option, _e.tbody = _e.tfoot = _e.colgroup = _e.caption = _e.thead, _e.th = _e.td;
    var Pe = /<|&#?\w+;/;
    !function () {
        var e = G.createDocumentFragment(), t = e.appendChild(G.createElement("div")), n = G.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Le = /^key/, He = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Re = /^([^.]*)(?:\.(.+)|)/;
    oe.event = {
        global: {},
        add: function (e, t, n, i, r) {
            var o, s, a, l, u, c, p, d, f, h, g, v = $e.get(e);
            if (v)for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = oe.guid++), (l = v.events) || (l = v.events = {}), (s = v.handle) || (s = v.handle = function (t) {
                return "undefined" != typeof oe && oe.event.triggered !== t.type ? oe.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(we) || [""], u = t.length; u--;)a = Re.exec(t[u]) || [], f = g = a[1], h = (a[2] || "").split(".").sort(), f && (p = oe.event.special[f] || {}, f = (r ? p.delegateType : p.bindType) || f, p = oe.event.special[f] || {}, c = oe.extend({
                type: f,
                origType: g,
                data: i,
                handler: n,
                guid: n.guid,
                selector: r,
                needsContext: r && oe.expr.match.needsContext.test(r),
                namespace: h.join(".")
            }, o), (d = l[f]) || (d = l[f] = [], d.delegateCount = 0, p.setup && p.setup.call(e, i, h, s) !== !1 || e.addEventListener && e.addEventListener(f, s)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), oe.event.global[f] = !0)
        },
        remove: function (e, t, n, i, r) {
            var o, s, a, l, u, c, p, d, f, h, g, v = $e.hasData(e) && $e.get(e);
            if (v && (l = v.events)) {
                for (t = (t || "").match(we) || [""], u = t.length; u--;)if (a = Re.exec(t[u]) || [], f = g = a[1], h = (a[2] || "").split(".").sort(), f) {
                    for (p = oe.event.special[f] || {}, f = (i ? p.delegateType : p.bindType) || f, d = l[f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;)c = d[o], !r && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, p.remove && p.remove.call(e, c));
                    s && !d.length && (p.teardown && p.teardown.call(e, h, v.handle) !== !1 || oe.removeEvent(e, f, v.handle), delete l[f])
                } else for (f in l)oe.event.remove(e, f + t[u], n, i, !0);
                oe.isEmptyObject(l) && $e.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            e = oe.event.fix(e);
            var t, n, i, r, o, s = [], a = Q.call(arguments), l = ($e.get(this, "events") || {})[e.type] || [], u = oe.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (s = oe.event.handlers.call(this, e, l), t = 0; (r = s[t++]) && !e.isPropagationStopped();)for (e.currentTarget = r.elem, n = 0; (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();)e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, i = ((oe.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, r, o, s = [], a = t.delegateCount, l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (i = [], n = 0; n < a; n++)o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? oe(r, this).index(l) > -1 : oe.find(r, this, null, [l]).length), i[r] && i.push(o);
                i.length && s.push({elem: l, handlers: i})
            }
            return a < t.length && s.push({elem: this, handlers: t.slice(a)}), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, r, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || G, i = n.documentElement, r = n.body, e.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[oe.expando])return e;
            var t, n, i, r = e.type, o = e, s = this.fixHooks[r];
            for (s || (this.fixHooks[r] = s = He.test(r) ? this.mouseHooks : Le.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new oe.Event(o), t = i.length; t--;)n = i[t], e[n] = o[n];
            return e.target || (e.target = G), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, o) : e
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== g() && this.focus)return this.focus(), !1
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === g() && this.blur)return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && oe.nodeName(this, "input"))return this.click(), !1
                }, _default: function (e) {
                    return oe.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, oe.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, oe.Event = function (e, t) {
        return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : h) : this.type = e, t && oe.extend(this, t), this.timeStamp = e && e.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(e, t)
    }, oe.Event.prototype = {
        constructor: oe.Event,
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = f, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = f, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, oe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        oe.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, i = this, r = e.relatedTarget, o = e.handleObj;
                return r && (r === i || oe.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), oe.fn.extend({
        on: function (e, t, n, i) {
            return v(this, e, t, n, i)
        }, one: function (e, t, n, i) {
            return v(this, e, t, n, i, 1)
        }, off: function (e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj)return i = e.handleObj, oe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (r in e)this.off(r, t, e[r]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = h), this.each(function () {
                oe.event.remove(this, e, n, t)
            })
        }
    });
    var Me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, ze = /<script|<style|<link/i, We = /checked\s*(?:[^=]|=\s*.checked.)/i, Be = /^true\/(.*)/, Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    oe.extend({
        htmlPrefilter: function (e) {
            return e.replace(Me, "<$1></$2>")
        }, clone: function (e, t, n) {
            var i, r, o, s, a = e.cloneNode(!0), l = oe.contains(e.ownerDocument, e);
            if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))for (s = c(a), o = c(e), i = 0, r = o.length; i < r; i++)w(o[i], s[i]);
            if (t)if (n)for (o = o || c(e), s = s || c(a), i = 0, r = o.length; i < r; i++)b(o[i], s[i]); else b(e, a);
            return s = c(a, "script"), s.length > 0 && p(s, !l && c(e, "script")), a
        }, cleanData: function (e) {
            for (var t, n, i, r = oe.event.special, o = 0; void 0 !== (n = e[o]); o++)if (Oe(n)) {
                if (t = n[$e.expando]) {
                    if (t.events)for (i in t.events)r[i] ? oe.event.remove(n, i) : oe.removeEvent(n, i, t.handle);
                    n[$e.expando] = void 0
                }
                n[Se.expando] && (n[Se.expando] = void 0)
            }
        }
    }), oe.fn.extend({
        domManip: C, detach: function (e) {
            return T(this, e, !0)
        }, remove: function (e) {
            return T(this, e)
        }, text: function (e) {
            return Te(this, function (e) {
                return void 0 === e ? oe.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        }, append: function () {
            return C(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return C(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return C(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return C(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (oe.cleanData(c(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return oe.clone(this, e, t)
            })
        }, html: function (e) {
            return Te(this, function (e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                if ("string" == typeof e && !ze.test(e) && !_e[(Fe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = oe.htmlPrefilter(e);
                    try {
                        for (; n < i; n++)t = this[n] || {}, 1 === t.nodeType && (oe.cleanData(c(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (r) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = [];
            return C(this, arguments, function (t) {
                var n = this.parentNode;
                oe.inArray(this, e) < 0 && (oe.cleanData(c(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), oe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        oe.fn[e] = function (e) {
            for (var n, i = [], r = oe(e), o = r.length - 1, s = 0; s <= o; s++)n = s === o ? this : this.clone(!0), oe(r[s])[t](n), J.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Ke, Ue = {
        HTML: "block",
        BODY: "block"
    }, Xe = /^margin/, Ge = new RegExp("^(" + Ae + ")(?!px)[a-z%]+$", "i"), Qe = function (t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e), n.getComputedStyle(t)
    }, Ye = function (e, t, n, i) {
        var r, o, s = {};
        for (o in t)s[o] = e.style[o], e.style[o] = t[o];
        r = n.apply(e, i || []);
        for (o in t)e.style[o] = s[o];
        return r
    }, Je = G.documentElement;
    !function () {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Je.appendChild(s);
            var t = e.getComputedStyle(a);
            n = "1%" !== t.top, o = "2px" === t.marginLeft, i = "4px" === t.width, a.style.marginRight = "50%", r = "4px" === t.marginRight, Je.removeChild(s)
        }

        var n, i, r, o, s = G.createElement("div"), a = G.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", s.appendChild(a), oe.extend(ie, {
            pixelPosition: function () {
                return t(), n
            }, boxSizingReliable: function () {
                return null == i && t(), i
            }, pixelMarginRight: function () {
                return null == i && t(), r
            }, reliableMarginLeft: function () {
                return null == i && t(), o
            }, reliableMarginRight: function () {
                var t, n = a.appendChild(G.createElement("div"));
                return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", Je.appendChild(s), t = !parseFloat(e.getComputedStyle(n).marginRight), Je.removeChild(s), a.removeChild(n), t
            }
        }))
    }();
    var Ze = /^(none|table(?!-c[ea]).+)/, et = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, tt = {
        letterSpacing: "0",
        fontWeight: "400"
    }, nt = ["Webkit", "O", "Moz", "ms"], it = G.createElement("div").style;
    oe.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = S(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, s, a = oe.camelCase(t), l = e.style;
                return t = oe.cssProps[a] || (oe.cssProps[a] = D(a) || a), s = oe.cssHooks[t] || oe.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (r = s.get(e, !1, i)) ? r : l[t] : (o = typeof n, "string" === o && (r = Ne.exec(n)) && r[1] && (n = u(e, t, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (oe.cssNumber[a] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l[t] = n)), void 0)
            }
        },
        css: function (e, t, n, i) {
            var r, o, s, a = oe.camelCase(t);
            return t = oe.cssProps[a] || (oe.cssProps[a] = D(a) || a), s = oe.cssHooks[t] || oe.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = S(e, t, i)), "normal" === r && t in tt && (r = tt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }), oe.each(["height", "width"], function (e, t) {
        oe.cssHooks[t] = {
            get: function (e, n, i) {
                if (n)return Ze.test(oe.css(e, "display")) && 0 === e.offsetWidth ? Ye(e, et, function () {
                    return E(e, t, i)
                }) : E(e, t, i)
            }, set: function (e, n, i) {
                var r, o = i && Qe(e), s = i && N(e, t, i, "border-box" === oe.css(e, "boxSizing", !1, o), o);
                return s && (r = Ne.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = oe.css(e, t)), A(e, n, s)
            }
        }
    }), oe.cssHooks.marginLeft = k(ie.reliableMarginLeft, function (e, t) {
        if (t)return (parseFloat(S(e, "marginLeft")) || e.getBoundingClientRect().left - Ye(e, {marginLeft: 0}, function () {
                return e.getBoundingClientRect().left
            })) + "px"
    }), oe.cssHooks.marginRight = k(ie.reliableMarginRight, function (e, t) {
        if (t)return Ye(e, {display: "inline-block"}, S, [e, "marginRight"])
    }), oe.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        oe.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)r[e + Ee[i] + t] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, Xe.test(e) || (oe.cssHooks[e + t].set = A)
    }), oe.fn.extend({
        css: function (e, t) {
            return Te(this, function (e, t, n) {
                var i, r, o = {}, s = 0;
                if (oe.isArray(t)) {
                    for (i = Qe(e), r = t.length; s < r; s++)o[t[s]] = oe.css(e, t[s], !1, i);
                    return o
                }
                return void 0 !== n ? oe.style(e, t, n) : oe.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return j(this, !0)
        }, hide: function () {
            return j(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                je(this) ? oe(this).show() : oe(this).hide()
            })
        }
    }), oe.Tween = I, I.prototype = {
        constructor: I, init: function (e, t, n, i, r, o) {
            this.elem = e, this.prop = n, this.easing = r || oe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (oe.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = I.propHooks[this.prop];
            return this.options.duration ? this.pos = t = oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = oe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            }, set: function (e) {
                oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[oe.cssProps[e.prop]] && !oe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : oe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, oe.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, _default: "swing"
    }, oe.fx = I.prototype.init, oe.fx.step = {};
    var rt, ot, st = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    oe.Animation = oe.extend(H, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return u(n.elem, e, Ne.exec(t), n), n
            }]
        }, tweener: function (e, t) {
            oe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(we);
            for (var n, i = 0, r = e.length; i < r; i++)n = e[i], H.tweeners[n] = H.tweeners[n] || [], H.tweeners[n].unshift(t)
        }, prefilters: [P], prefilter: function (e, t) {
            t ? H.prefilters.unshift(e) : H.prefilters.push(e)
        }
    }), oe.speed = function (e, t, n) {
        var i = e && "object" == typeof e ? oe.extend({}, e) : {
            complete: n || !n && t || oe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !oe.isFunction(t) && t
        };
        return i.duration = oe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in oe.fx.speeds ? oe.fx.speeds[i.duration] : oe.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            oe.isFunction(i.old) && i.old.call(this), i.queue && oe.dequeue(this, i.queue)
        }, i
    }, oe.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(je).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var r = oe.isEmptyObject(e), o = oe.speed(t, n, i), s = function () {
                var t = H(this, oe.extend({}, e), o);
                (r || $e.get(this, "finish")) && t.stop(!0)
            };
            return s.finish = s, r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, r = null != e && e + "queueHooks", o = oe.timers, s = $e.get(this);
                if (r) s[r] && s[r].stop && i(s[r]); else for (r in s)s[r] && s[r].stop && at.test(r) && i(s[r]);
                for (r = o.length; r--;)o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                !t && n || oe.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = $e.get(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = oe.timers, s = i ? i.length : 0;
                for (n.finish = !0, oe.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < s; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), oe.each(["toggle", "show", "hide"], function (e, t) {
        var n = oe.fn[t];
        oe.fn[t] = function (e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, i, r)
        }
    }), oe.each({
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        oe.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), oe.timers = [], oe.fx.tick = function () {
        var e, t = 0, n = oe.timers;
        for (rt = oe.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || oe.fx.stop(), rt = void 0
    }, oe.fx.timer = function (e) {
        oe.timers.push(e), e() ? oe.fx.start() : oe.timers.pop()
    }, oe.fx.interval = 13, oe.fx.start = function () {
        ot || (ot = e.setInterval(oe.fx.tick, oe.fx.interval))
    }, oe.fx.stop = function () {
        e.clearInterval(ot), ot = null
    }, oe.fx.speeds = {slow: 600, fast: 200, _default: 400}, oe.fn.delay = function (t, n) {
        return t = oe.fx ? oe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, i) {
            var r = e.setTimeout(n, t);
            i.stop = function () {
                e.clearTimeout(r)
            }
        })
    }, function () {
        var e = G.createElement("input"), t = G.createElement("select"), n = t.appendChild(G.createElement("option"));
        e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected = n.selected, t.disabled = !0, ie.optDisabled = !n.disabled, e = G.createElement("input"), e.value = "t", e.type = "radio", ie.radioValue = "t" === e.value
    }();
    var lt, ut = oe.expr.attrHandle;
    oe.fn.extend({
        attr: function (e, t) {
            return Te(this, oe.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                oe.removeAttr(this, e)
            })
        }
    }), oe.extend({
        attr: function (e, t, n) {
            var i, r, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)return "undefined" == typeof e.getAttribute ? oe.prop(e, t, n) : (1 === o && oe.isXMLDoc(e) || (t = t.toLowerCase(), r = oe.attrHooks[t] || (oe.expr.match.bool.test(t) ? lt : void 0)), void 0 !== n ? null === n ? void oe.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = oe.find.attr(e, t), null == i ? void 0 : i))
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ie.radioValue && "radio" === t && oe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }, removeAttr: function (e, t) {
            var n, i, r = 0, o = t && t.match(we);
            if (o && 1 === e.nodeType)for (; n = o[r++];)i = oe.propFix[n] || n, oe.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
        }
    }), lt = {
        set: function (e, t, n) {
            return t === !1 ? oe.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, oe.each(oe.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = ut[t] || oe.find.attr;
        ut[t] = function (e, t, i) {
            var r, o;
            return i || (o = ut[t], ut[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, ut[t] = o), r
        }
    });
    var ct = /^(?:input|select|textarea|button)$/i, pt = /^(?:a|area)$/i;
    oe.fn.extend({
        prop: function (e, t) {
            return Te(this, oe.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[oe.propFix[e] || e]
            })
        }
    }), oe.extend({
        prop: function (e, t, n) {
            var i, r, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)return 1 === o && oe.isXMLDoc(e) || (t = oe.propFix[t] || t, r = oe.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = oe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) || pt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), ie.optSelected || (oe.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }, set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        oe.propFix[this.toLowerCase()] = this
    });
    var dt = /[\t\r\n\f]/g;
    oe.fn.extend({
        addClass: function (e) {
            var t, n, i, r, o, s, a, l = 0;
            if (oe.isFunction(e))return this.each(function (t) {
                oe(this).addClass(e.call(this, t, R(this)))
            });
            if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (r = R(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                for (s = 0; o = t[s++];)i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                a = oe.trim(i), r !== a && n.setAttribute("class", a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, r, o, s, a, l = 0;
            if (oe.isFunction(e))return this.each(function (t) {
                oe(this).removeClass(e.call(this, t, R(this)))
            });
            if (!arguments.length)return this.attr("class", "");
            if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (r = R(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                for (s = 0; o = t[s++];)for (; i.indexOf(" " + o + " ") > -1;)i = i.replace(" " + o + " ", " ");
                a = oe.trim(i), r !== a && n.setAttribute("class", a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : oe.isFunction(e) ? this.each(function (n) {
                oe(this).toggleClass(e.call(this, n, R(this), t), t)
            }) : this.each(function () {
                var t, i, r, o;
                if ("string" === n)for (i = 0, r = oe(this), o = e.match(we) || []; t = o[i++];)r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else void 0 !== e && "boolean" !== n || (t = R(this), t && $e.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : $e.get(this, "__className__") || ""))
            })
        }, hasClass: function (e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)if (1 === n.nodeType && (" " + R(n) + " ").replace(dt, " ").indexOf(t) > -1)return !0;
            return !1
        }
    });
    var ft = /\r/g, ht = /[\x20\t\r\n\f]+/g;
    oe.fn.extend({
        val: function (e) {
            var t, n, i, r = this[0];
            {
                if (arguments.length)return i = oe.isFunction(e), this.each(function (n) {
                    var r;
                    1 === this.nodeType && (r = i ? e.call(this, n, oe(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : oe.isArray(r) && (r = oe.map(r, function (e) {
                        return null == e ? "" : e + ""
                    })), t = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                });
                if (r)return t = oe.valHooks[r.type] || oe.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(ft, "") : null == n ? "" : n)
            }
        }
    }), oe.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = oe.find.attr(e, "value");
                    return null != t ? t : oe.trim(oe.text(e)).replace(ht, " ")
                }
            }, select: {
                get: function (e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, s = o ? null : [], a = o ? r + 1 : i.length, l = r < 0 ? a : o ? r : 0; l < a; l++)if (n = i[l], (n.selected || l === r) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !oe.nodeName(n.parentNode, "optgroup"))) {
                        if (t = oe(n).val(), o)return t;
                        s.push(t)
                    }
                    return s
                }, set: function (e, t) {
                    for (var n, i, r = e.options, o = oe.makeArray(t), s = r.length; s--;)i = r[s], (i.selected = oe.inArray(oe.valHooks.option.get(i), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), oe.each(["radio", "checkbox"], function () {
        oe.valHooks[this] = {
            set: function (e, t) {
                if (oe.isArray(t))return e.checked = oe.inArray(oe(e).val(), t) > -1
            }
        }, ie.checkOn || (oe.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    oe.extend(oe.event, {
        trigger: function (t, n, i, r) {
            var o, s, a, l, u, c, p, d = [i || G], f = ne.call(t, "type") ? t.type : t, h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = a = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !gt.test(f + oe.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), u = f.indexOf(":") < 0 && "on" + f, t = t[oe.expando] ? t : new oe.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : oe.makeArray(n, [t]), p = oe.event.special[f] || {}, r || !p.trigger || p.trigger.apply(i, n) !== !1)) {
                if (!r && !p.noBubble && !oe.isWindow(i)) {
                    for (l = p.delegateType || f, gt.test(l + f) || (s = s.parentNode); s; s = s.parentNode)d.push(s), a = s;
                    a === (i.ownerDocument || G) && d.push(a.defaultView || a.parentWindow || e)
                }
                for (o = 0; (s = d[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? l : p.bindType || f, c = ($e.get(s, "events") || {})[t.type] && $e.get(s, "handle"), c && c.apply(s, n), c = u && s[u], c && c.apply && Oe(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault());
                return t.type = f, r || t.isDefaultPrevented() || p._default && p._default.apply(d.pop(), n) !== !1 || !Oe(i) || u && oe.isFunction(i[f]) && !oe.isWindow(i) && (a = i[u], a && (i[u] = null), oe.event.triggered = f, i[f](), oe.event.triggered = void 0, a && (i[u] = a)), t.result
            }
        }, simulate: function (e, t, n) {
            var i = oe.extend(new oe.Event, n, {type: e, isSimulated: !0});
            oe.event.trigger(i, null, t)
        }
    }), oe.fn.extend({
        trigger: function (e, t) {
            return this.each(function () {
                oe.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            if (n)return oe.event.trigger(e, t, n, !0)
        }
    }), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        oe.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), oe.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), ie.focusin = "onfocusin" in e, ie.focusin || oe.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            oe.event.simulate(t, e.target, oe.event.fix(e))
        };
        oe.event.special[t] = {
            setup: function () {
                var i = this.ownerDocument || this, r = $e.access(i, t);
                r || i.addEventListener(e, n, !0), $e.access(i, t, (r || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, r = $e.access(i, t) - 1;
                r ? $e.access(i, t, r) : (i.removeEventListener(e, n, !0), $e.remove(i, t))
            }
        }
    });
    var vt = e.location, mt = oe.now(), yt = /\?/;
    oe.parseJSON = function (e) {
        return JSON.parse(e + "")
    }, oe.parseXML = function (t) {
        var n;
        if (!t || "string" != typeof t)return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (i) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + t), n
    };
    var xt = /#.*$/, bt = /([?&])_=[^&]*/, wt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ct = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Tt = /^(?:GET|HEAD)$/, Ot = /^\/\//, $t = {}, St = {}, kt = "*/".concat("*"), Dt = G.createElement("a");
    Dt.href = vt.href, oe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vt.href,
            type: "GET",
            isLocal: Ct.test(vt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": kt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": oe.parseJSON, "text xml": oe.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? W(W(e, oe.ajaxSettings), t) : W(oe.ajaxSettings, e)
        },
        ajaxPrefilter: M($t),
        ajaxTransport: M(St),
        ajax: function (t, n) {
            function i(t, n, i, a) {
                var u, p, y, x, w, T = n;
                2 !== b && (b = 2, l && e.clearTimeout(l), r = void 0, s = a || "", C.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (x = B(d, C, i)), x = V(d, x, C, u), u ? (d.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (oe.lastModified[o] = w), w = C.getResponseHeader("etag"), w && (oe.etag[o] = w)), 204 === t || "HEAD" === d.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = x.state, p = x.data, y = x.error, u = !y)) : (y = T, !t && T || (T = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || T) + "", u ? g.resolveWith(f, [p, T, C]) : g.rejectWith(f, [C, T, y]), C.statusCode(m), m = void 0, c && h.trigger(u ? "ajaxSuccess" : "ajaxError", [C, d, u ? p : y]), v.fireWith(f, [C, T]), c && (h.trigger("ajaxComplete", [C, d]), --oe.active || oe.event.trigger("ajaxStop")))
            }

            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var r, o, s, a, l, u, c, p, d = oe.ajaxSetup({}, n), f = d.context || d, h = d.context && (f.nodeType || f.jquery) ? oe(f) : oe.event, g = oe.Deferred(), v = oe.Callbacks("once memory"), m = d.statusCode || {}, y = {}, x = {}, b = 0, w = "canceled", C = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === b) {
                        if (!a)for (a = {}; t = wt.exec(s);)a[t[1].toLowerCase()] = t[2];
                        t = a[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? s : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return b || (e = x[n] = x[n] || e, y[e] = t), this
                },
                overrideMimeType: function (e) {
                    return b || (d.mimeType = e), this
                },
                statusCode: function (e) {
                    var t;
                    if (e)if (b < 2)for (t in e)m[t] = [m[t], e[t]]; else C.always(e[C.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || w;
                    return r && r.abort(t), i(0, t), this
                }
            };
            if (g.promise(C).complete = v.add, C.success = C.done, C.error = C.fail, d.url = ((t || d.url || vt.href) + "").replace(xt, "").replace(Ot, vt.protocol + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = oe.trim(d.dataType || "*").toLowerCase().match(we) || [""], null == d.crossDomain) {
                u = G.createElement("a");
                try {
                    u.href = d.url, u.href = u.href, d.crossDomain = Dt.protocol + "//" + Dt.host != u.protocol + "//" + u.host
                } catch (T) {
                    d.crossDomain = !0
                }
            }
            if (d.data && d.processData && "string" != typeof d.data && (d.data = oe.param(d.data, d.traditional)), z($t, d, n, C), 2 === b)return C;
            c = oe.event && d.global, c && 0 === oe.active++ && oe.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Tt.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (yt.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = bt.test(o) ? o.replace(bt, "$1_=" + mt++) : o + (yt.test(o) ? "&" : "?") + "_=" + mt++)), d.ifModified && (oe.lastModified[o] && C.setRequestHeader("If-Modified-Since", oe.lastModified[o]), oe.etag[o] && C.setRequestHeader("If-None-Match", oe.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", d.contentType), C.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + kt + "; q=0.01" : "") : d.accepts["*"]);
            for (p in d.headers)C.setRequestHeader(p, d.headers[p]);
            if (d.beforeSend && (d.beforeSend.call(f, C, d) === !1 || 2 === b))return C.abort();
            w = "abort";
            for (p in{success: 1, error: 1, complete: 1})C[p](d[p]);
            if (r = z(St, d, n, C)) {
                if (C.readyState = 1, c && h.trigger("ajaxSend", [C, d]), 2 === b)return C;
                d.async && d.timeout > 0 && (l = e.setTimeout(function () {
                    C.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, r.send(y, i)
                } catch (T) {
                    if (!(b < 2))throw T;
                    i(-1, T)
                }
            } else i(-1, "No Transport");
            return C
        },
        getJSON: function (e, t, n) {
            return oe.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return oe.get(e, void 0, t, "script")
        }
    }), oe.each(["get", "post"], function (e, t) {
        oe[t] = function (e, n, i, r) {
            return oe.isFunction(n) && (r = r || i, i = n, n = void 0), oe.ajax(oe.extend({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            }, oe.isPlainObject(e) && e))
        }
    }), oe._evalUrl = function (e) {
        return oe.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, oe.fn.extend({
        wrapAll: function (e) {
            var t;
            return oe.isFunction(e) ? this.each(function (t) {
                oe(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = oe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                return e
            }).append(this)), this)
        }, wrapInner: function (e) {
            return oe.isFunction(e) ? this.each(function (t) {
                oe(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = oe(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = oe.isFunction(e);
            return this.each(function (n) {
                oe(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
            }).end()
        }
    }), oe.expr.filters.hidden = function (e) {
        return !oe.expr.filters.visible(e)
    }, oe.expr.filters.visible = function (e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var At = /%20/g, Nt = /\[\]$/, Et = /\r?\n/g, jt = /^(?:submit|button|image|reset|file)$/i, It = /^(?:input|select|textarea|keygen)/i;
    oe.param = function (e, t) {
        var n, i = [], r = function (e, t) {
            t = oe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function () {
            r(this.name, this.value)
        }); else for (n in e)K(n, e[n], t, r);
        return i.join("&").replace(At, "+")
    }, oe.fn.extend({
        serialize: function () {
            return oe.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = oe.prop(this, "elements");
                return e ? oe.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !oe(this).is(":disabled") && It.test(this.nodeName) && !jt.test(e) && (this.checked || !Ie.test(e))
            }).map(function (e, t) {
                var n = oe(this).val();
                return null == n ? null : oe.isArray(n) ? oe.map(n, function (e) {
                    return {name: t.name, value: e.replace(Et, "\r\n")}
                }) : {name: t.name, value: n.replace(Et, "\r\n")}
            }).get()
        }
    }), oe.ajaxSettings.xhr = function () {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    };
    var Ft = {0: 200, 1223: 204}, qt = oe.ajaxSettings.xhr();
    ie.cors = !!qt && "withCredentials" in qt, ie.ajax = qt = !!qt, oe.ajaxTransport(function (t) {
        var n, i;
        if (ie.cors || qt && !t.crossDomain)return {
            send: function (r, o) {
                var s, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (s in t.xhrFields)a[s] = t.xhrFields[s];
                t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                for (s in r)a.setRequestHeader(s, r[s]);
                n = function (e) {
                    return function () {
                        n && (n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Ft[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {binary: a.response} : {text: a.responseText}, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), i = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function () {
                    4 === a.readyState && e.setTimeout(function () {
                        n && i()
                    })
                }, n = n("abort");
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (l) {
                    if (n)throw l
                }
            }, abort: function () {
                n && n()
            }
        }
    }), oe.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (e) {
                return oe.globalEval(e), e
            }
        }
    }), oe.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), oe.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (i, r) {
                    t = oe("<script>").prop({charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                        t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                    }), G.head.appendChild(t[0])
                }, abort: function () {
                    n && n()
                }
            }
        }
    });
    var _t = [], Pt = /(=)\?(?=&|$)|\?\?/;
    oe.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = _t.pop() || oe.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), oe.ajaxPrefilter("json jsonp", function (t, n, i) {
        var r, o, s, a = t.jsonp !== !1 && (Pt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Pt.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0])return r = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Pt, "$1" + r) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
            return s || oe.error(r + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[r], e[r] = function () {
            s = arguments
        }, i.always(function () {
            void 0 === o ? oe(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, _t.push(r)), s && oe.isFunction(o) && o(s[0]), s = o = void 0
        }), "script"
    }), oe.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || G;
        var i = he.exec(e), r = !n && [];
        return i ? [t.createElement(i[1])] : (i = d([e], t, r), r && r.length && oe(r).remove(), oe.merge([], i.childNodes))
    };
    var Lt = oe.fn.load;
    oe.fn.load = function (e, t, n) {
        if ("string" != typeof e && Lt)return Lt.apply(this, arguments);
        var i, r, o, s = this, a = e.indexOf(" ");
        return a > -1 && (i = oe.trim(e.slice(a)), e = e.slice(0, a)), oe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), s.length > 0 && oe.ajax({
            url: e,
            type: r || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, s.html(i ? oe("<div>").append(oe.parseHTML(e)).find(i) : e)
        }).always(n && function (e, t) {
                s.each(function () {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
    }, oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        oe.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), oe.expr.filters.animated = function (e) {
        return oe.grep(oe.timers, function (t) {
            return e === t.elem
        }).length
    }, oe.offset = {
        setOffset: function (e, t, n) {
            var i, r, o, s, a, l, u, c = oe.css(e, "position"), p = oe(e), d = {};
            "static" === c && (e.style.position = "relative"), a = p.offset(), o = oe.css(e, "top"), l = oe.css(e, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (i = p.position(), s = i.top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), oe.isFunction(t) && (t = t.call(e, n, oe.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + r), "using" in t ? t.using.call(e, d) : p.css(d)
        }
    }, oe.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                oe.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0], r = {top: 0, left: 0}, o = i && i.ownerDocument;
            if (o)return t = o.documentElement, oe.contains(t, i) ? (r = i.getBoundingClientRect(), n = U(o), {
                top: r.top + n.pageYOffset - t.clientTop,
                left: r.left + n.pageXOffset - t.clientLeft
            }) : r
        }, position: function () {
            if (this[0]) {
                var e, t, n = this[0], i = {top: 0, left: 0};
                return "fixed" === oe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), oe.nodeName(e[0], "html") || (i = e.offset()), i.top += oe.css(e[0], "borderTopWidth", !0), i.left += oe.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - oe.css(n, "marginTop", !0),
                    left: t.left - i.left - oe.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent; e && "static" === oe.css(e, "position");)e = e.offsetParent;
                return e || Je
            })
        }
    }), oe.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        oe.fn[e] = function (i) {
            return Te(this, function (e, i, r) {
                var o = U(e);
                return void 0 === r ? o ? o[t] : e[i] : void(o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r)
            }, e, i, arguments.length)
        }
    }), oe.each(["top", "left"], function (e, t) {
        oe.cssHooks[t] = k(ie.pixelPosition, function (e, n) {
            if (n)return n = S(e, t), Ge.test(n) ? oe(e).position()[t] + "px" : n
        })
    }), oe.each({Height: "height", Width: "width"}, function (e, t) {
        oe.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
            oe.fn[i] = function (i, r) {
                var o = arguments.length && (n || "boolean" != typeof i), s = n || (i === !0 || r === !0 ? "margin" : "border");
                return Te(this, function (t, n, i) {
                    var r;
                    return oe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? oe.css(t, n, s) : oe.style(t, n, i, s)
                }, t, o ? i : void 0, o, null)
            }
        })
    }), oe.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }, size: function () {
            return this.length
        }
    }), oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return oe
    });
    var Ht = e.jQuery, Rt = e.$;
    return oe.noConflict = function (t) {
        return e.$ === oe && (e.$ = Rt), t && e.jQuery === oe && (e.jQuery = Ht), oe
    }, t || (e.jQuery = e.$ = oe), oe
}), function (e, t) {
    "function" == typeof define && define.amd ? define("sifter", t) : "object" == typeof exports ? module.exports = t() : e.Sifter = t()
}(this, function () {
    var e = function (e, t) {
        this.items = e, this.settings = t || {diacritics: !0}
    };
    e.prototype.tokenize = function (e) {
        if (e = r(String(e || "").toLowerCase()), !e || !e.length)return [];
        var t, n, i, s, l = [], u = e.split(/ +/);
        for (t = 0, n = u.length; t < n; t++) {
            if (i = o(u[t]), this.settings.diacritics)for (s in a)a.hasOwnProperty(s) && (i = i.replace(new RegExp(s, "g"), a[s]));
            l.push({string: u[t], regex: new RegExp(i, "i")})
        }
        return l
    }, e.prototype.iterator = function (e, t) {
        var n;
        n = s(e) ? Array.prototype.forEach || function (e) {
            for (var t = 0, n = this.length; t < n; t++)e(this[t], t, this)
        } : function (e) {
            for (var t in this)this.hasOwnProperty(t) && e(this[t], t, this)
        }, n.apply(e, [t])
    }, e.prototype.getScoreFunction = function (e, t) {
        var n, r, o, s, a;
        n = this, e = n.prepareSearch(e, t), o = e.tokens, r = e.options.fields, s = o.length, a = e.options.nesting;
        var l = function (e, t) {
            var n, i;
            return e ? (e = String(e || ""), i = e.search(t.regex), i === -1 ? 0 : (n = t.string.length / e.length, 0 === i && (n += .5), n)) : 0
        }, u = function () {
            var e = r.length;
            return e ? 1 === e ? function (e, t) {
                return l(i(t, r[0], a), e)
            } : function (t, n) {
                for (var o = 0, s = 0; o < e; o++)s += l(i(n, r[o], a), t);
                return s / e
            } : function () {
                return 0
            }
        }();
        return s ? 1 === s ? function (e) {
            return u(o[0], e)
        } : "and" === e.options.conjunction ? function (e) {
            for (var t, n = 0, i = 0; n < s; n++) {
                if (t = u(o[n], e), t <= 0)return 0;
                i += t
            }
            return i / s
        } : function (e) {
            for (var t = 0, n = 0; t < s; t++)n += u(o[t], e);
            return n / s
        } : function () {
            return 0
        }
    }, e.prototype.getSortFunction = function (e, n) {
        var r, o, s, a, l, u, c, p, d, f, h;
        if (s = this, e = s.prepareSearch(e, n), h = !e.query && n.sort_empty || n.sort, d = function (e, t) {
                return "$score" === e ? t.score : i(s.items[t.id], e, n.nesting)
            }, l = [], h)for (r = 0, o = h.length; r < o; r++)(e.query || "$score" !== h[r].field) && l.push(h[r]);
        if (e.query) {
            for (f = !0, r = 0, o = l.length; r < o; r++)if ("$score" === l[r].field) {
                f = !1;
                break
            }
            f && l.unshift({field: "$score", direction: "desc"})
        } else for (r = 0, o = l.length; r < o; r++)if ("$score" === l[r].field) {
            l.splice(r, 1);
            break
        }
        for (p = [], r = 0, o = l.length; r < o; r++)p.push("desc" === l[r].direction ? -1 : 1);
        return u = l.length, u ? 1 === u ? (a = l[0].field, c = p[0], function (e, n) {
            return c * t(d(a, e), d(a, n))
        }) : function (e, n) {
            var i, r, o;
            for (i = 0; i < u; i++)if (o = l[i].field, r = p[i] * t(d(o, e), d(o, n)))return r;
            return 0
        } : null
    }, e.prototype.prepareSearch = function (e, t) {
        if ("object" == typeof e)return e;
        t = n({}, t);
        var i = t.fields, r = t.sort, o = t.sort_empty;
        return i && !s(i) && (t.fields = [i]), r && !s(r) && (t.sort = [r]), o && !s(o) && (t.sort_empty = [o]), {
            options: t,
            query: String(e || "").toLowerCase(),
            tokens: this.tokenize(e),
            total: 0,
            items: []
        }
    }, e.prototype.search = function (e, t) {
        var n, i, r, o, s = this;
        return i = this.prepareSearch(e, t), t = i.options, e = i.query, o = t.score || s.getScoreFunction(i), e.length ? s.iterator(s.items, function (e, r) {
            n = o(e), (t.filter === !1 || n > 0) && i.items.push({score: n, id: r})
        }) : s.iterator(s.items, function (e, t) {
            i.items.push({score: 1, id: t})
        }), r = s.getSortFunction(i, t), r && i.items.sort(r), i.total = i.items.length, "number" == typeof t.limit && (i.items = i.items.slice(0, t.limit)), i
    };
    var t = function (e, t) {
        return "number" == typeof e && "number" == typeof t ? e > t ? 1 : e < t ? -1 : 0 : (e = l(String(e || "")), t = l(String(t || "")), e > t ? 1 : t > e ? -1 : 0)
    }, n = function (e, t) {
        var n, i, r, o;
        for (n = 1, i = arguments.length; n < i; n++)if (o = arguments[n])for (r in o)o.hasOwnProperty(r) && (e[r] = o[r]);
        return e
    }, i = function (e, t, n) {
        if (e && t) {
            if (!n)return e[t];
            for (var i = t.split("."); i.length && (e = e[i.shift()]););
            return e
        }
    }, r = function (e) {
        return (e + "").replace(/^\s+|\s+$|/g, "")
    }, o = function (e) {
        return (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }, s = Array.isArray || "undefined" != typeof $ && $.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, a = {
        a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
        b: "[b␢βΒB฿𐌁ᛒ]",
        c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
        d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
        e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
        f: "[fƑƒḞḟ]",
        g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
        h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
        i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
        j: "[jȷĴĵɈɉʝɟʲ]",
        k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
        l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
        n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
        o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
        p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
        q: "[qꝖꝗʠɊɋꝘꝙq̃]",
        r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
        s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
        t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
        u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
        v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
        w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
        x: "[xẌẍẊẋχ]",
        y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
        z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
    }, l = function () {
        var e, t, n, i, r = "", o = {};
        for (n in a)if (a.hasOwnProperty(n))for (i = a[n].substring(2, a[n].length - 1), r += i, e = 0, t = i.length; e < t; e++)o[i.charAt(e)] = n;
        var s = new RegExp("[" + r + "]", "g");
        return function (e) {
            return e.replace(s, function (e) {
                return o[e]
            }).toLowerCase()
        }
    }();
    return e
}), function (e, t) {
    "function" == typeof define && define.amd ? define("microplugin", t) : "object" == typeof exports ? module.exports = t() : e.MicroPlugin = t()
}(this, function () {
    var e = {};
    e.mixin = function (e) {
        e.plugins = {}, e.prototype.initializePlugins = function (e) {
            var n, i, r, o = this, s = [];
            if (o.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                }, t.isArray(e))for (n = 0, i = e.length; n < i; n++)"string" == typeof e[n] ? s.push(e[n]) : (o.plugins.settings[e[n].name] = e[n].options, s.push(e[n].name)); else if (e)for (r in e)e.hasOwnProperty(r) && (o.plugins.settings[r] = e[r], s.push(r));
            for (; s.length;)o.require(s.shift())
        }, e.prototype.loadPlugin = function (t) {
            var n = this, i = n.plugins, r = e.plugins[t];
            if (!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "' + t + '" plugin');
            i.requested[t] = !0, i.loaded[t] = r.fn.apply(n, [n.plugins.settings[t] || {}]), i.names.push(t)
        }, e.prototype.require = function (e) {
            var t = this, n = t.plugins;
            if (!t.plugins.loaded.hasOwnProperty(e)) {
                if (n.requested[e])throw new Error('Plugin has circular dependency ("' + e + '")');
                t.loadPlugin(e)
            }
            return n.loaded[e]
        }, e.define = function (t, n) {
            e.plugins[t] = {name: t, fn: n}
        }
    };
    var t = {
        isArray: Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    };
    return e
}), function (e, t) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("sifter"), require("microplugin")) : e.Selectize = t(e.jQuery, e.Sifter, e.MicroPlugin)
}(this, function (e, t, n) {
    "use strict";
    var i = function (e, t) {
        if ("string" != typeof t || t.length) {
            var n = "string" == typeof t ? new RegExp(t, "i") : t, i = function (e) {
                var t = 0;
                if (3 === e.nodeType) {
                    var r = e.data.search(n);
                    if (r >= 0 && e.data.length > 0) {
                        var o = e.data.match(n), s = document.createElement("span");
                        s.className = "highlight";
                        var a = e.splitText(r), l = (a.splitText(o[0].length), a.cloneNode(!0));
                        s.appendChild(l), a.parentNode.replaceChild(s, a), t = 1
                    }
                } else if (1 === e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName))for (var u = 0; u < e.childNodes.length; ++u)u += i(e.childNodes[u]);
                return t
            };
            return e.each(function () {
                i(this)
            })
        }
    };
    e.fn.removeHighlight = function () {
        return this.find("span.highlight").each(function () {
            this.parentNode.firstChild.nodeName;
            var e = this.parentNode;
            e.replaceChild(this.firstChild, this), e.normalize()
        }).end()
    };
    var r = function () {
    };
    r.prototype = {
        on: function (e, t) {
            this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(t)
        }, off: function (e, t) {
            var n = arguments.length;
            return 0 === n ? delete this._events : 1 === n ? delete this._events[e] : (this._events = this._events || {}, void(e in this._events != !1 && this._events[e].splice(this._events[e].indexOf(t), 1)))
        }, trigger: function (e) {
            if (this._events = this._events || {}, e in this._events != !1)for (var t = 0; t < this._events[e].length; t++)this._events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }, r.mixin = function (e) {
        for (var t = ["on", "off", "trigger"], n = 0; n < t.length; n++)e.prototype[t[n]] = r.prototype[t[n]]
    };
    var o = /Mac/.test(navigator.userAgent), s = 65, a = 13, l = 27, u = 37, c = 38, p = 80, d = 39, f = 40, h = 78, g = 8, v = 46, m = 16, y = o ? 91 : 17, x = o ? 18 : 17, b = 9, w = 1, C = 2, T = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity, O = function (e) {
        return "undefined" != typeof e
    }, $ = function (e) {
        return "undefined" == typeof e || null === e ? null : "boolean" == typeof e ? e ? "1" : "0" : e + ""
    }, S = function (e) {
        return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }, k = {};
    k.before = function (e, t, n) {
        var i = e[t];
        e[t] = function () {
            return n.apply(e, arguments), i.apply(e, arguments)
        }
    }, k.after = function (e, t, n) {
        var i = e[t];
        e[t] = function () {
            var t = i.apply(e, arguments);
            return n.apply(e, arguments), t
        }
    };
    var D = function (e) {
        var t = !1;
        return function () {
            t || (t = !0, e.apply(this, arguments))
        }
    }, A = function (e, t) {
        var n;
        return function () {
            var i = this, r = arguments;
            window.clearTimeout(n), n = window.setTimeout(function () {
                e.apply(i, r)
            }, t)
        }
    }, N = function (e, t, n) {
        var i, r = e.trigger, o = {};
        e.trigger = function () {
            var n = arguments[0];
            return t.indexOf(n) === -1 ? r.apply(e, arguments) : void(o[n] = arguments)
        }, n.apply(e, []), e.trigger = r;
        for (i in o)o.hasOwnProperty(i) && r.apply(e, o[i])
    }, E = function (e, t, n, i) {
        e.on(t, n, function (t) {
            for (var n = t.target; n && n.parentNode !== e[0];)n = n.parentNode;
            return t.currentTarget = n, i.apply(this, [t])
        })
    }, j = function (e) {
        var t = {};
        if ("selectionStart" in e) t.start = e.selectionStart, t.length = e.selectionEnd - t.start; else if (document.selection) {
            e.focus();
            var n = document.selection.createRange(), i = document.selection.createRange().text.length;
            n.moveStart("character", -e.value.length), t.start = n.text.length - i, t.length = i
        }
        return t
    }, I = function (e, t, n) {
        var i, r, o = {};
        if (n)for (i = 0, r = n.length; i < r; i++)o[n[i]] = e.css(n[i]); else o = e.css();
        t.css(o)
    }, F = function (t, n) {
        if (!t)return 0;
        var i = e("<test>").css({
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre"
        }).text(t).appendTo("body");
        I(n, i, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
        var r = i.width();
        return i.remove(), r
    }, q = function (e) {
        var t = null, n = function (n, i) {
            var r, o, s, a, l, u, c, p;
            n = n || window.event || {}, i = i || {}, n.metaKey || n.altKey || (i.force || e.data("grow") !== !1) && (r = e.val(), n.type && "keydown" === n.type.toLowerCase() && (o = n.keyCode, s = o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || 32 === o, o === v || o === g ? (p = j(e[0]), p.length ? r = r.substring(0, p.start) + r.substring(p.start + p.length) : o === g && p.start ? r = r.substring(0, p.start - 1) + r.substring(p.start + 1) : o === v && "undefined" != typeof p.start && (r = r.substring(0, p.start) + r.substring(p.start + 1))) : s && (u = n.shiftKey, c = String.fromCharCode(n.keyCode), c = u ? c.toUpperCase() : c.toLowerCase(),
                r += c)), a = e.attr("placeholder"), !r && a && (r = a), l = F(r, e) + 4, l !== t && (t = l, e.width(l), e.triggerHandler("resize")))
        };
        e.on("keydown keyup update blur", n), n()
    }, _ = function (e) {
        var t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)), t.innerHTML
    }, P = function (e, t) {
        t || (t = {});
        var n = "Selectize";
        console.error(n + ": " + e), t.explanation && (console.group && console.group(), console.error(t.explanation), console.group && console.groupEnd())
    }, L = function (n, i) {
        var r, o, s, a, l = this;
        a = n[0], a.selectize = l;
        var u = window.getComputedStyle && window.getComputedStyle(a, null);
        if (s = u ? u.getPropertyValue("direction") : a.currentStyle && a.currentStyle.direction, s = s || n.parents("[dir]:first").attr("dir") || "", e.extend(l, {
                order: 0,
                settings: i,
                $input: n,
                tabIndex: n.attr("tabindex") || "",
                tagType: "select" === a.tagName.toLowerCase() ? w : C,
                rtl: /rtl/i.test(s),
                eventNS: ".selectize" + ++L.count,
                highlightedValue: null,
                isOpen: !1,
                isDisabled: !1,
                isRequired: n.is("[required]"),
                isInvalid: !1,
                isLocked: !1,
                isFocused: !1,
                isInputHidden: !1,
                isSetup: !1,
                isShiftDown: !1,
                isCmdDown: !1,
                isCtrlDown: !1,
                ignoreFocus: !1,
                ignoreBlur: !1,
                ignoreHover: !1,
                hasOptions: !1,
                currentResults: null,
                lastValue: "",
                caretPos: 0,
                loading: 0,
                loadedSearches: {},
                $activeOption: null,
                $activeItems: [],
                optgroups: {},
                options: {},
                userOptions: {},
                items: [],
                renderCache: {},
                onSearchChange: null === i.loadThrottle ? l.onSearchChange : A(l.onSearchChange, i.loadThrottle)
            }), l.sifter = new t(this.options, {diacritics: i.diacritics}), l.settings.options) {
            for (r = 0, o = l.settings.options.length; r < o; r++)l.registerOption(l.settings.options[r]);
            delete l.settings.options
        }
        if (l.settings.optgroups) {
            for (r = 0, o = l.settings.optgroups.length; r < o; r++)l.registerOptionGroup(l.settings.optgroups[r]);
            delete l.settings.optgroups
        }
        l.settings.mode = l.settings.mode || (1 === l.settings.maxItems ? "single" : "multi"), "boolean" != typeof l.settings.hideSelected && (l.settings.hideSelected = "multi" === l.settings.mode), l.initializePlugins(l.settings.plugins), l.setupCallbacks(), l.setupTemplates(), l.setup()
    };
    return r.mixin(L), "undefined" != typeof n ? n.mixin(L) : P("Dependency MicroPlugin is missing", {explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'}), e.extend(L.prototype, {
        setup: function () {
            var t, n, i, r, s, a, l, u, c, p, d = this, f = d.settings, h = d.eventNS, g = e(window), v = e(document), b = d.$input;
            if (l = d.settings.mode, u = b.attr("class") || "", t = e("<div>").addClass(f.wrapperClass).addClass(u).addClass(l), n = e("<div>").addClass(f.inputClass).addClass("items").appendTo(t), i = e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex", b.is(":disabled") ? "-1" : d.tabIndex), a = e(f.dropdownParent || t), r = e("<div>").addClass(f.dropdownClass).addClass(l).hide().appendTo(a), s = e("<div>").addClass(f.dropdownContentClass).appendTo(r), (p = b.attr("id")) && (i.attr("id", p + "-selectized"), e("label[for='" + p + "']").attr("for", p + "-selectized")), d.settings.copyClassesToDropdown && r.addClass(u), t.css({width: b[0].style.width}), d.plugins.names.length && (c = "plugin-" + d.plugins.names.join(" plugin-"), t.addClass(c), r.addClass(c)), (null === f.maxItems || f.maxItems > 1) && d.tagType === w && b.attr("multiple", "multiple"), d.settings.placeholder && i.attr("placeholder", f.placeholder), !d.settings.splitOn && d.settings.delimiter) {
                var C = d.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                d.settings.splitOn = new RegExp("\\s*" + C + "+\\s*")
            }
            b.attr("autocorrect") && i.attr("autocorrect", b.attr("autocorrect")), b.attr("autocapitalize") && i.attr("autocapitalize", b.attr("autocapitalize")), d.$wrapper = t, d.$control = n, d.$control_input = i, d.$dropdown = r, d.$dropdown_content = s, r.on("mouseenter", "[data-selectable]", function () {
                return d.onOptionHover.apply(d, arguments)
            }), r.on("mousedown click", "[data-selectable]", function () {
                return d.onOptionSelect.apply(d, arguments)
            }), E(n, "mousedown", "*:not(input)", function () {
                return d.onItemSelect.apply(d, arguments)
            }), q(i), n.on({
                mousedown: function () {
                    return d.onMouseDown.apply(d, arguments)
                }, click: function () {
                    return d.onClick.apply(d, arguments)
                }
            }), i.on({
                mousedown: function (e) {
                    e.stopPropagation()
                }, keydown: function () {
                    return d.onKeyDown.apply(d, arguments)
                }, keyup: function () {
                    return d.onKeyUp.apply(d, arguments)
                }, keypress: function () {
                    return d.onKeyPress.apply(d, arguments)
                }, resize: function () {
                    d.positionDropdown.apply(d, [])
                }, blur: function () {
                    return d.onBlur.apply(d, arguments)
                }, focus: function () {
                    return d.ignoreBlur = !1, d.onFocus.apply(d, arguments)
                }, paste: function () {
                    return d.onPaste.apply(d, arguments)
                }
            }), v.on("keydown" + h, function (e) {
                d.isCmdDown = e[o ? "metaKey" : "ctrlKey"], d.isCtrlDown = e[o ? "altKey" : "ctrlKey"], d.isShiftDown = e.shiftKey
            }), v.on("keyup" + h, function (e) {
                e.keyCode === x && (d.isCtrlDown = !1), e.keyCode === m && (d.isShiftDown = !1), e.keyCode === y && (d.isCmdDown = !1)
            }), v.on("mousedown" + h, function (e) {
                if (d.isFocused) {
                    if (e.target === d.$dropdown[0] || e.target.parentNode === d.$dropdown[0])return !1;
                    d.$control.has(e.target).length || e.target === d.$control[0] || d.blur(e.target)
                }
            }), g.on(["scroll" + h, "resize" + h].join(" "), function () {
                d.isOpen && d.positionDropdown.apply(d, arguments)
            }), g.on("mousemove" + h, function () {
                d.ignoreHover = !1
            }), this.revertSettings = {
                $children: b.children().detach(),
                tabindex: b.attr("tabindex")
            }, b.attr("tabindex", -1).hide().after(d.$wrapper), e.isArray(f.items) && (d.setValue(f.items), delete f.items), T && b.on("invalid" + h, function (e) {
                e.preventDefault(), d.isInvalid = !0, d.refreshState()
            }), d.updateOriginalInput(), d.refreshItems(), d.refreshState(), d.updatePlaceholder(), d.isSetup = !0, b.is(":disabled") && d.disable(), d.on("change", this.onChange), b.data("selectize", d), b.addClass("selectized"), d.trigger("initialize"), f.preload === !0 && d.onSearchChange("")
        }, setupTemplates: function () {
            var t = this, n = t.settings.labelField, i = t.settings.optgroupLabelField, r = {
                optgroup: function (e) {
                    return '<div class="optgroup">' + e.html + "</div>"
                }, optgroup_header: function (e, t) {
                    return '<div class="optgroup-header">' + t(e[i]) + "</div>"
                }, option: function (e, t) {
                    return '<div class="option">' + t(e[n]) + "</div>"
                }, item: function (e, t) {
                    return '<div class="item">' + t(e[n]) + "</div>"
                }, option_create: function (e, t) {
                    return '<div class="create">Add <strong>' + t(e.input) + "</strong>&hellip;</div>"
                }
            };
            t.settings.render = e.extend({}, r, t.settings.render)
        }, setupCallbacks: function () {
            var e, t, n = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (e in n)n.hasOwnProperty(e) && (t = this.settings[n[e]], t && this.on(e, t))
        }, onClick: function (e) {
            var t = this;
            t.isFocused || (t.focus(), e.preventDefault())
        }, onMouseDown: function (t) {
            var n = this, i = t.isDefaultPrevented();
            e(t.target);
            if (n.isFocused) {
                if (t.target !== n.$control_input[0])return "single" === n.settings.mode ? n.isOpen ? n.close() : n.open() : i || n.setActiveItem(null), !1
            } else i || window.setTimeout(function () {
                n.focus()
            }, 0)
        }, onChange: function () {
            this.$input.trigger("change")
        }, onPaste: function (t) {
            var n = this;
            return n.isFull() || n.isInputHidden || n.isLocked ? void t.preventDefault() : void(n.settings.splitOn && setTimeout(function () {
                var t = n.$control_input.val();
                if (t.match(n.settings.splitOn))for (var i = e.trim(t).split(n.settings.splitOn), r = 0, o = i.length; r < o; r++)n.createItem(i[r])
            }, 0))
        }, onKeyPress: function (e) {
            if (this.isLocked)return e && e.preventDefault();
            var t = String.fromCharCode(e.keyCode || e.which);
            return this.settings.create && "multi" === this.settings.mode && t === this.settings.delimiter ? (this.createItem(), e.preventDefault(), !1) : void 0
        }, onKeyDown: function (e) {
            var t = (e.target === this.$control_input[0], this);
            if (t.isLocked)return void(e.keyCode !== b && e.preventDefault());
            switch (e.keyCode) {
                case s:
                    if (t.isCmdDown)return void t.selectAll();
                    break;
                case l:
                    return void(t.isOpen && (e.preventDefault(), e.stopPropagation(), t.close()));
                case h:
                    if (!e.ctrlKey || e.altKey)break;
                case f:
                    if (!t.isOpen && t.hasOptions) t.open(); else if (t.$activeOption) {
                        t.ignoreHover = !0;
                        var n = t.getAdjacentOption(t.$activeOption, 1);
                        n.length && t.setActiveOption(n, !0, !0)
                    }
                    return void e.preventDefault();
                case p:
                    if (!e.ctrlKey || e.altKey)break;
                case c:
                    if (t.$activeOption) {
                        t.ignoreHover = !0;
                        var i = t.getAdjacentOption(t.$activeOption, -1);
                        i.length && t.setActiveOption(i, !0, !0)
                    }
                    return void e.preventDefault();
                case a:
                    return void(t.isOpen && t.$activeOption && (t.onOptionSelect({currentTarget: t.$activeOption}), e.preventDefault()));
                case u:
                    return void t.advanceSelection(-1, e);
                case d:
                    return void t.advanceSelection(1, e);
                case b:
                    return t.settings.selectOnTab && t.isOpen && t.$activeOption && (t.onOptionSelect({currentTarget: t.$activeOption}), t.isFull() || e.preventDefault()), void(t.settings.create && t.createItem() && e.preventDefault());
                case g:
                case v:
                    return void t.deleteSelection(e)
            }
            return !t.isFull() && !t.isInputHidden || (o ? e.metaKey : e.ctrlKey) ? void 0 : void e.preventDefault()
        }, onKeyUp: function (e) {
            var t = this;
            if (t.isLocked)return e && e.preventDefault();
            var n = t.$control_input.val() || "";
            t.lastValue !== n && (t.lastValue = n, t.onSearchChange(n), t.refreshOptions(), t.trigger("type", n))
        }, onSearchChange: function (e) {
            var t = this, n = t.settings.load;
            n && (t.loadedSearches.hasOwnProperty(e) || (t.loadedSearches[e] = !0, t.load(function (i) {
                n.apply(t, [e, i])
            })))
        }, onFocus: function (e) {
            var t = this, n = t.isFocused;
            return t.isDisabled ? (t.blur(), e && e.preventDefault(), !1) : void(t.ignoreFocus || (t.isFocused = !0, "focus" === t.settings.preload && t.onSearchChange(""), n || t.trigger("focus"), t.$activeItems.length || (t.showInput(), t.setActiveItem(null), t.refreshOptions(!!t.settings.openOnFocus)), t.refreshState()))
        }, onBlur: function (e, t) {
            var n = this;
            if (n.isFocused && (n.isFocused = !1, !n.ignoreFocus)) {
                if (!n.ignoreBlur && document.activeElement === n.$dropdown_content[0])return n.ignoreBlur = !0, void n.onFocus(e);
                var i = function () {
                    n.close(), n.setTextboxValue(""), n.setActiveItem(null), n.setActiveOption(null), n.setCaret(n.items.length), n.refreshState(), t && t.focus && t.focus(), n.ignoreFocus = !1, n.trigger("blur")
                };
                n.ignoreFocus = !0, n.settings.create && n.settings.createOnBlur ? n.createItem(null, !1, i) : i()
            }
        }, onOptionHover: function (e) {
            this.ignoreHover || this.setActiveOption(e.currentTarget, !1)
        }, onOptionSelect: function (t) {
            var n, i, r = this;
            t.preventDefault && (t.preventDefault(), t.stopPropagation()), i = e(t.currentTarget), i.hasClass("create") ? r.createItem(null, function () {
                r.settings.closeAfterSelect && r.close()
            }) : (n = i.attr("data-value"), "undefined" != typeof n && (r.lastQuery = null, r.setTextboxValue(""), r.addItem(n), r.settings.closeAfterSelect ? r.close() : !r.settings.hideSelected && t.type && /mouse/.test(t.type) && r.setActiveOption(r.getOption(n))))
        }, onItemSelect: function (e) {
            var t = this;
            t.isLocked || "multi" === t.settings.mode && (e.preventDefault(), t.setActiveItem(e.currentTarget, e))
        }, load: function (e) {
            var t = this, n = t.$wrapper.addClass(t.settings.loadingClass);
            t.loading++, e.apply(t, [function (e) {
                t.loading = Math.max(t.loading - 1, 0), e && e.length && (t.addOption(e), t.refreshOptions(t.isFocused && !t.isInputHidden)), t.loading || n.removeClass(t.settings.loadingClass), t.trigger("load", e)
            }])
        }, setTextboxValue: function (e) {
            var t = this.$control_input, n = t.val() !== e;
            n && (t.val(e).triggerHandler("update"), this.lastValue = e)
        }, getValue: function () {
            return this.tagType === w && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        }, setValue: function (e, t) {
            var n = t ? [] : ["change"];
            N(this, n, function () {
                this.clear(t), this.addItems(e, t)
            })
        }, setActiveItem: function (t, n) {
            var i, r, o, s, a, l, u, c, p = this;
            if ("single" !== p.settings.mode) {
                if (t = e(t), !t.length)return e(p.$activeItems).removeClass("active"), p.$activeItems = [], void(p.isFocused && p.showInput());
                if (i = n && n.type.toLowerCase(), "mousedown" === i && p.isShiftDown && p.$activeItems.length) {
                    for (c = p.$control.children(".active:last"), s = Array.prototype.indexOf.apply(p.$control[0].childNodes, [c[0]]), a = Array.prototype.indexOf.apply(p.$control[0].childNodes, [t[0]]), s > a && (u = s, s = a, a = u), r = s; r <= a; r++)l = p.$control[0].childNodes[r], p.$activeItems.indexOf(l) === -1 && (e(l).addClass("active"), p.$activeItems.push(l));
                    n.preventDefault()
                } else"mousedown" === i && p.isCtrlDown || "keydown" === i && this.isShiftDown ? t.hasClass("active") ? (o = p.$activeItems.indexOf(t[0]), p.$activeItems.splice(o, 1), t.removeClass("active")) : p.$activeItems.push(t.addClass("active")[0]) : (e(p.$activeItems).removeClass("active"), p.$activeItems = [t.addClass("active")[0]]);
                p.hideInput(), this.isFocused || p.focus()
            }
        }, setActiveOption: function (t, n, i) {
            var r, o, s, a, l, u = this;
            u.$activeOption && u.$activeOption.removeClass("active"), u.$activeOption = null, t = e(t), t.length && (u.$activeOption = t.addClass("active"), !n && O(n) || (r = u.$dropdown_content.height(), o = u.$activeOption.outerHeight(!0), n = u.$dropdown_content.scrollTop() || 0, s = u.$activeOption.offset().top - u.$dropdown_content.offset().top + n, a = s, l = s - r + o, s + o > r + n ? u.$dropdown_content.stop().animate({scrollTop: l}, i ? u.settings.scrollDuration : 0) : s < n && u.$dropdown_content.stop().animate({scrollTop: a}, i ? u.settings.scrollDuration : 0)))
        }, selectAll: function () {
            var e = this;
            "single" !== e.settings.mode && (e.$activeItems = Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")), e.$activeItems.length && (e.hideInput(), e.close()), e.focus())
        }, hideInput: function () {
            var e = this;
            e.setTextboxValue(""), e.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: e.rtl ? 1e4 : -1e4
            }), e.isInputHidden = !0
        }, showInput: function () {
            this.$control_input.css({opacity: 1, position: "relative", left: 0}), this.isInputHidden = !1
        }, focus: function () {
            var e = this;
            e.isDisabled || (e.ignoreFocus = !0, e.$control_input[0].focus(), window.setTimeout(function () {
                e.ignoreFocus = !1, e.onFocus()
            }, 0))
        }, blur: function (e) {
            this.$control_input[0].blur(), this.onBlur(null, e)
        }, getScoreFunction: function (e) {
            return this.sifter.getScoreFunction(e, this.getSearchOptions())
        }, getSearchOptions: function () {
            var e = this.settings, t = e.sortField;
            return "string" == typeof t && (t = [{field: t}]), {
                fields: e.searchField,
                conjunction: e.searchConjunction,
                sort: t
            }
        }, search: function (t) {
            var n, i, r, o = this, s = o.settings, a = this.getSearchOptions();
            if (s.score && (r = o.settings.score.apply(this, [t]), "function" != typeof r))throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== o.lastQuery ? (o.lastQuery = t, i = o.sifter.search(t, e.extend(a, {score: r})), o.currentResults = i) : i = e.extend(!0, {}, o.currentResults), s.hideSelected)for (n = i.items.length - 1; n >= 0; n--)o.items.indexOf($(i.items[n].id)) !== -1 && i.items.splice(n, 1);
            return i
        }, refreshOptions: function (t) {
            var n, r, o, s, a, l, u, c, p, d, f, h, g, v, m, y;
            "undefined" == typeof t && (t = !0);
            var x = this, b = e.trim(x.$control_input.val()), w = x.search(b), C = x.$dropdown_content, T = x.$activeOption && $(x.$activeOption.attr("data-value"));
            for (s = w.items.length, "number" == typeof x.settings.maxOptions && (s = Math.min(s, x.settings.maxOptions)), a = {}, l = [], n = 0; n < s; n++)for (u = x.options[w.items[n].id], c = x.render("option", u), p = u[x.settings.optgroupField] || "", d = e.isArray(p) ? p : [p], r = 0, o = d && d.length; r < o; r++)p = d[r], x.optgroups.hasOwnProperty(p) || (p = ""), a.hasOwnProperty(p) || (a[p] = document.createDocumentFragment(), l.push(p)), a[p].appendChild(c);
            for (this.settings.lockOptgroupOrder && l.sort(function (e, t) {
                var n = x.optgroups[e].$order || 0, i = x.optgroups[t].$order || 0;
                return n - i
            }), f = document.createDocumentFragment(), n = 0, s = l.length; n < s; n++)p = l[n], x.optgroups.hasOwnProperty(p) && a[p].childNodes.length ? (h = document.createDocumentFragment(), h.appendChild(x.render("optgroup_header", x.optgroups[p])), h.appendChild(a[p]), f.appendChild(x.render("optgroup", e.extend({}, x.optgroups[p], {
                html: _(h),
                dom: h
            })))) : f.appendChild(a[p]);
            if (C.html(f), x.settings.highlight && w.query.length && w.tokens.length)for (C.removeHighlight(), n = 0, s = w.tokens.length; n < s; n++)i(C, w.tokens[n].regex);
            if (!x.settings.hideSelected)for (n = 0, s = x.items.length; n < s; n++)x.getOption(x.items[n]).addClass("selected");
            g = x.canCreate(b), g && (C.prepend(x.render("option_create", {input: b})), y = e(C[0].childNodes[0])), x.hasOptions = w.items.length > 0 || g, x.hasOptions ? (w.items.length > 0 ? (m = T && x.getOption(T), m && m.length ? v = m : "single" === x.settings.mode && x.items.length && (v = x.getOption(x.items[0])), v && v.length || (v = y && !x.settings.addPrecedence ? x.getAdjacentOption(y, 1) : C.find("[data-selectable]:first"))) : v = y, x.setActiveOption(v), t && !x.isOpen && x.open()) : (x.setActiveOption(null), t && x.isOpen && x.close())
        }, addOption: function (t) {
            var n, i, r, o = this;
            if (e.isArray(t))for (n = 0, i = t.length; n < i; n++)o.addOption(t[n]); else(r = o.registerOption(t)) && (o.userOptions[r] = !0, o.lastQuery = null, o.trigger("option_add", r, t))
        }, registerOption: function (e) {
            var t = $(e[this.settings.valueField]);
            return "undefined" != typeof t && null !== t && !this.options.hasOwnProperty(t) && (e.$order = e.$order || ++this.order, this.options[t] = e, t)
        }, registerOptionGroup: function (e) {
            var t = $(e[this.settings.optgroupValueField]);
            return !!t && (e.$order = e.$order || ++this.order, this.optgroups[t] = e, t)
        }, addOptionGroup: function (e, t) {
            t[this.settings.optgroupValueField] = e, (e = this.registerOptionGroup(t)) && this.trigger("optgroup_add", e, t)
        }, removeOptionGroup: function (e) {
            this.optgroups.hasOwnProperty(e) && (delete this.optgroups[e], this.renderCache = {}, this.trigger("optgroup_remove", e))
        }, clearOptionGroups: function () {
            this.optgroups = {}, this.renderCache = {}, this.trigger("optgroup_clear")
        }, updateOption: function (t, n) {
            var i, r, o, s, a, l, u, c = this;
            if (t = $(t), o = $(n[c.settings.valueField]), null !== t && c.options.hasOwnProperty(t)) {
                if ("string" != typeof o)throw new Error("Value must be set in option data");
                u = c.options[t].$order, o !== t && (delete c.options[t], s = c.items.indexOf(t), s !== -1 && c.items.splice(s, 1, o)), n.$order = n.$order || u, c.options[o] = n, a = c.renderCache.item, l = c.renderCache.option, a && (delete a[t], delete a[o]), l && (delete l[t], delete l[o]), c.items.indexOf(o) !== -1 && (i = c.getItem(t), r = e(c.render("item", n)), i.hasClass("active") && r.addClass("active"), i.replaceWith(r)), c.lastQuery = null, c.isOpen && c.refreshOptions(!1)
            }
        }, removeOption: function (e, t) {
            var n = this;
            e = $(e);
            var i = n.renderCache.item, r = n.renderCache.option;
            i && delete i[e], r && delete r[e], delete n.userOptions[e], delete n.options[e], n.lastQuery = null, n.trigger("option_remove", e), n.removeItem(e, t)
        }, clearOptions: function () {
            var e = this;
            e.loadedSearches = {}, e.userOptions = {}, e.renderCache = {}, e.options = e.sifter.items = {}, e.lastQuery = null, e.trigger("option_clear"), e.clear()
        }, getOption: function (e) {
            return this.getElementWithValue(e, this.$dropdown_content.find("[data-selectable]"))
        }, getAdjacentOption: function (t, n) {
            var i = this.$dropdown.find("[data-selectable]"), r = i.index(t) + n;
            return r >= 0 && r < i.length ? i.eq(r) : e()
        }, getElementWithValue: function (t, n) {
            if (t = $(t), "undefined" != typeof t && null !== t)for (var i = 0, r = n.length; i < r; i++)if (n[i].getAttribute("data-value") === t)return e(n[i]);
            return e()
        }, getItem: function (e) {
            return this.getElementWithValue(e, this.$control.children())
        }, addItems: function (t, n) {
            for (var i = e.isArray(t) ? t : [t], r = 0, o = i.length; r < o; r++)this.isPending = r < o - 1, this.addItem(i[r], n)
        }, addItem: function (t, n) {
            var i = n ? [] : ["change"];
            N(this, i, function () {
                var i, r, o, s, a, l = this, u = l.settings.mode;
                return t = $(t), l.items.indexOf(t) !== -1 ? void("single" === u && l.close()) : void(l.options.hasOwnProperty(t) && ("single" === u && l.clear(n), "multi" === u && l.isFull() || (i = e(l.render("item", l.options[t])), a = l.isFull(), l.items.splice(l.caretPos, 0, t), l.insertAtCaret(i), (!l.isPending || !a && l.isFull()) && l.refreshState(), l.isSetup && (o = l.$dropdown_content.find("[data-selectable]"), l.isPending || (r = l.getOption(t), s = l.getAdjacentOption(r, 1).attr("data-value"), l.refreshOptions(l.isFocused && "single" !== u), s && l.setActiveOption(l.getOption(s))), !o.length || l.isFull() ? l.close() : l.positionDropdown(), l.updatePlaceholder(), l.trigger("item_add", t, i), l.updateOriginalInput({silent: n})))))
            })
        }, removeItem: function (t, n) {
            var i, r, o, s = this;
            i = t instanceof e ? t : s.getItem(t), t = $(i.attr("data-value")), r = s.items.indexOf(t), r !== -1 && (i.remove(), i.hasClass("active") && (o = s.$activeItems.indexOf(i[0]), s.$activeItems.splice(o, 1)), s.items.splice(r, 1), s.lastQuery = null, !s.settings.persist && s.userOptions.hasOwnProperty(t) && s.removeOption(t, n), r < s.caretPos && s.setCaret(s.caretPos - 1), s.refreshState(), s.updatePlaceholder(), s.updateOriginalInput({silent: n}), s.positionDropdown(), s.trigger("item_remove", t, i))
        }, createItem: function (t, n) {
            var i = this, r = i.caretPos;
            t = t || e.trim(i.$control_input.val() || "");
            var o = arguments[arguments.length - 1];
            if ("function" != typeof o && (o = function () {
                }), "boolean" != typeof n && (n = !0), !i.canCreate(t))return o(), !1;
            i.lock();
            var s = "function" == typeof i.settings.create ? this.settings.create : function (e) {
                var t = {};
                return t[i.settings.labelField] = e, t[i.settings.valueField] = e, t
            }, a = D(function (e) {
                if (i.unlock(), !e || "object" != typeof e)return o();
                var t = $(e[i.settings.valueField]);
                return "string" != typeof t ? o() : (i.setTextboxValue(""), i.addOption(e), i.setCaret(r), i.addItem(t), i.refreshOptions(n && "single" !== i.settings.mode), void o(e))
            }), l = s.apply(this, [t, a]);
            return "undefined" != typeof l && a(l), !0
        }, refreshItems: function () {
            this.lastQuery = null, this.isSetup && this.addItem(this.items), this.refreshState(), this.updateOriginalInput()
        }, refreshState: function () {
            this.refreshValidityState(), this.refreshClasses()
        }, refreshValidityState: function () {
            if (!this.isRequired)return !1;
            var e = !this.items.length;
            this.isInvalid = e, this.$control_input.prop("required", e), this.$input.prop("required", !e)
        }, refreshClasses: function () {
            var t = this, n = t.isFull(), i = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl), t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", i).toggleClass("full", n).toggleClass("not-full", !n).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !e.isEmptyObject(t.options)).toggleClass("has-items", t.items.length > 0), t.$control_input.data("grow", !n && !i)
        }, isFull: function () {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        }, updateOriginalInput: function (e) {
            var t, n, i, r, o = this;
            if (e = e || {}, o.tagType === w) {
                for (i = [], t = 0, n = o.items.length; t < n; t++)r = o.options[o.items[t]][o.settings.labelField] || "", i.push('<option value="' + S(o.items[t]) + '" selected="selected">' + S(r) + "</option>");
                i.length || this.$input.attr("multiple") || i.push('<option value="" selected="selected"></option>'), o.$input.html(i.join(""))
            } else o.$input.val(o.getValue()), o.$input.attr("value", o.$input.val());
            o.isSetup && (e.silent || o.trigger("change", o.$input.val()))
        }, updatePlaceholder: function () {
            if (this.settings.placeholder) {
                var e = this.$control_input;
                this.items.length ? e.removeAttr("placeholder") : e.attr("placeholder", this.settings.placeholder), e.triggerHandler("update", {force: !0})
            }
        }, open: function () {
            var e = this;
            e.isLocked || e.isOpen || "multi" === e.settings.mode && e.isFull() || (e.focus(), e.isOpen = !0, e.refreshState(), e.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), e.positionDropdown(), e.$dropdown.css({visibility: "visible"}), e.trigger("dropdown_open", e.$dropdown))
        }, close: function () {
            var e = this, t = e.isOpen;
            "single" === e.settings.mode && e.items.length && (e.hideInput(), e.$control_input.blur()), e.isOpen = !1, e.$dropdown.hide(), e.setActiveOption(null), e.refreshState(), t && e.trigger("dropdown_close", e.$dropdown)
        }, positionDropdown: function () {
            var e = this.$control, t = "body" === this.settings.dropdownParent ? e.offset() : e.position();
            t.top += e.outerHeight(!0), this.$dropdown.css({width: e.outerWidth(), top: t.top, left: t.left})
        }, clear: function (e) {
            var t = this;
            t.items.length && (t.$control.children(":not(input)").remove(), t.items = [], t.lastQuery = null, t.setCaret(0), t.setActiveItem(null), t.updatePlaceholder(), t.updateOriginalInput({silent: e}), t.refreshState(), t.showInput(), t.trigger("clear"))
        }, insertAtCaret: function (t) {
            var n = Math.min(this.caretPos, this.items.length);
            0 === n ? this.$control.prepend(t) : e(this.$control[0].childNodes[n]).before(t), this.setCaret(n + 1)
        }, deleteSelection: function (t) {
            var n, i, r, o, s, a, l, u, c, p = this;
            if (r = t && t.keyCode === g ? -1 : 1, o = j(p.$control_input[0]), p.$activeOption && !p.settings.hideSelected && (l = p.getAdjacentOption(p.$activeOption, -1).attr("data-value")), s = [], p.$activeItems.length) {
                for (c = p.$control.children(".active:" + (r > 0 ? "last" : "first")), a = p.$control.children(":not(input)").index(c), r > 0 && a++, n = 0, i = p.$activeItems.length; n < i; n++)s.push(e(p.$activeItems[n]).attr("data-value"));
                t && (t.preventDefault(), t.stopPropagation())
            } else(p.isFocused || "single" === p.settings.mode) && p.items.length && (r < 0 && 0 === o.start && 0 === o.length ? s.push(p.items[p.caretPos - 1]) : r > 0 && o.start === p.$control_input.val().length && s.push(p.items[p.caretPos]));
            if (!s.length || "function" == typeof p.settings.onDelete && p.settings.onDelete.apply(p, [s]) === !1)return !1;
            for ("undefined" != typeof a && p.setCaret(a); s.length;)p.removeItem(s.pop());
            return p.showInput(), p.positionDropdown(), p.refreshOptions(!0), l && (u = p.getOption(l), u.length && p.setActiveOption(u)), !0
        }, advanceSelection: function (e, t) {
            var n, i, r, o, s, a, l = this;
            0 !== e && (l.rtl && (e *= -1), n = e > 0 ? "last" : "first", i = j(l.$control_input[0]), l.isFocused && !l.isInputHidden ? (o = l.$control_input.val().length, s = e < 0 ? 0 === i.start && 0 === i.length : i.start === o, s && !o && l.advanceCaret(e, t)) : (a = l.$control.children(".active:" + n), a.length && (r = l.$control.children(":not(input)").index(a), l.setActiveItem(null), l.setCaret(e > 0 ? r + 1 : r))))
        }, advanceCaret: function (e, t) {
            var n, i, r = this;
            0 !== e && (n = e > 0 ? "next" : "prev", r.isShiftDown ? (i = r.$control_input[n](), i.length && (r.hideInput(), r.setActiveItem(i), t && t.preventDefault())) : r.setCaret(r.caretPos + e))
        }, setCaret: function (t) {
            var n = this;
            if (t = "single" === n.settings.mode ? n.items.length : Math.max(0, Math.min(n.items.length, t)), !n.isPending) {
                var i, r, o, s;
                for (o = n.$control.children(":not(input)"), i = 0, r = o.length; i < r; i++)s = e(o[i]).detach(), i < t ? n.$control_input.before(s) : n.$control.append(s)
            }
            n.caretPos = t
        }, lock: function () {
            this.close(), this.isLocked = !0, this.refreshState()
        }, unlock: function () {
            this.isLocked = !1, this.refreshState()
        }, disable: function () {
            var e = this;
            e.$input.prop("disabled", !0), e.$control_input.prop("disabled", !0).prop("tabindex", -1), e.isDisabled = !0, e.lock()
        }, enable: function () {
            var e = this;
            e.$input.prop("disabled", !1), e.$control_input.prop("disabled", !1).prop("tabindex", e.tabIndex), e.isDisabled = !1, e.unlock()
        }, destroy: function () {
            var t = this, n = t.eventNS, i = t.revertSettings;
            t.trigger("destroy"), t.off(), t.$wrapper.remove(), t.$dropdown.remove(), t.$input.html("").append(i.$children).removeAttr("tabindex").removeClass("selectized").attr({tabindex: i.tabindex}).show(), t.$control_input.removeData("grow"), t.$input.removeData("selectize"), e(window).off(n), e(document).off(n), e(document.body).off(n), delete t.$input[0].selectize
        }, render: function (t, n) {
            var i, r, o = "", s = !1, a = this;
            return "option" !== t && "item" !== t || (i = $(n[a.settings.valueField]), s = !!i), s && (O(a.renderCache[t]) || (a.renderCache[t] = {}), a.renderCache[t].hasOwnProperty(i)) ? a.renderCache[t][i] : (o = e(a.settings.render[t].apply(this, [n, S])), "option" === t || "option_create" === t ? o.attr("data-selectable", "") : "optgroup" === t && (r = n[a.settings.optgroupValueField] || "", o.attr("data-group", r)), "option" !== t && "item" !== t || o.attr("data-value", i || ""), s && (a.renderCache[t][i] = o[0]), o[0])
        }, clearCache: function (e) {
            var t = this;
            "undefined" == typeof e ? t.renderCache = {} : delete t.renderCache[e]
        }, canCreate: function (e) {
            var t = this;
            if (!t.settings.create)return !1;
            var n = t.settings.createFilter;
            return e.length && ("function" != typeof n || n.apply(t, [e])) && ("string" != typeof n || new RegExp(n).test(e)) && (!(n instanceof RegExp) || n.test(e))
        }
    }), L.count = 0, L.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    }, e.fn.selectize = function (t) {
        var n = e.fn.selectize.defaults, i = e.extend({}, n, t), r = i.dataAttr, o = i.labelField, s = i.valueField, a = i.optgroupField, l = i.optgroupLabelField, u = i.optgroupValueField, c = function (t, n) {
            var a, l, u, c, p = t.attr(r);
            if (p)for (n.options = JSON.parse(p), a = 0, l = n.options.length; a < l; a++)n.items.push(n.options[a][s]); else {
                var d = e.trim(t.val() || "");
                if (!i.allowEmptyOption && !d.length)return;
                for (u = d.split(i.delimiter), a = 0, l = u.length; a < l; a++)c = {}, c[o] = u[a], c[s] = u[a], n.options.push(c);
                n.items = u
            }
        }, p = function (t, n) {
            var c, p, d, f, h = n.options, g = {}, v = function (e) {
                var t = r && e.attr(r);
                return "string" == typeof t && t.length ? JSON.parse(t) : null
            }, m = function (t, r) {
                t = e(t);
                var l = $(t.val());
                if (l || i.allowEmptyOption)if (g.hasOwnProperty(l)) {
                    if (r) {
                        var u = g[l][a];
                        u ? e.isArray(u) ? u.push(r) : g[l][a] = [u, r] : g[l][a] = r
                    }
                } else {
                    var c = v(t) || {};
                    c[o] = c[o] || t.text(), c[s] = c[s] || l, c[a] = c[a] || r, g[l] = c, h.push(c), t.is(":selected") && n.items.push(l)
                }
            }, y = function (t) {
                var i, r, o, s, a;
                for (t = e(t), o = t.attr("label"), o && (s = v(t) || {}, s[l] = o, s[u] = o, n.optgroups.push(s)), a = e("option", t), i = 0, r = a.length; i < r; i++)m(a[i], o)
            };
            for (n.maxItems = t.attr("multiple") ? null : 1, f = t.children(), c = 0, p = f.length; c < p; c++)d = f[c].tagName.toLowerCase(), "optgroup" === d ? y(f[c]) : "option" === d && m(f[c])
        };
        return this.each(function () {
            if (!this.selectize) {
                var r, o = e(this), s = this.tagName.toLowerCase(), a = o.attr("placeholder") || o.attr("data-placeholder");
                a || i.allowEmptyOption || (a = o.children('option[value=""]').text());
                var l = {placeholder: a, options: [], optgroups: [], items: []};
                "select" === s ? p(o, l) : c(o, l), r = new L(o, e.extend(!0, {}, n, l, t))
            }
        })
    }, e.fn.selectize.defaults = L.defaults, e.fn.selectize.support = {validity: T}, L.define("drag_drop", function (t) {
        if (!e.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var n = this;
            n.lock = function () {
                var e = n.lock;
                return function () {
                    var t = n.$control.data("sortable");
                    return t && t.disable(), e.apply(n, arguments)
                }
            }(), n.unlock = function () {
                var e = n.unlock;
                return function () {
                    var t = n.$control.data("sortable");
                    return t && t.enable(), e.apply(n, arguments)
                }
            }(), n.setup = function () {
                var t = n.setup;
                return function () {
                    t.apply(this, arguments);
                    var i = n.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: n.isLocked,
                        start: function (e, t) {
                            t.placeholder.css("width", t.helper.css("width")), i.css({overflow: "visible"})
                        },
                        stop: function () {
                            i.css({overflow: "hidden"});
                            var t = n.$activeItems ? n.$activeItems.slice() : null, r = [];
                            i.children("[data-value]").each(function () {
                                r.push(e(this).attr("data-value"))
                            }), n.setValue(r), n.setActiveItem(t)
                        }
                    })
                }
            }()
        }
    }), L.define("dropdown_header", function (t) {
        var n = this;
        t = e.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function (e) {
                return '<div class="' + e.headerClass + '"><div class="' + e.titleRowClass + '"><span class="' + e.labelClass + '">' + e.title + '</span><a href="javascript:void(0)" class="' + e.closeClass + '">&times;</a></div></div>'
            }
        }, t), n.setup = function () {
            var i = n.setup;
            return function () {
                i.apply(n, arguments), n.$dropdown_header = e(t.html(t)), n.$dropdown.prepend(n.$dropdown_header)
            }
        }()
    }), L.define("optgroup_columns", function (t) {
        var n = this;
        t = e.extend({equalizeWidth: !0, equalizeHeight: !0}, t), this.getAdjacentOption = function (t, n) {
            var i = t.closest("[data-group]").find("[data-selectable]"), r = i.index(t) + n;
            return r >= 0 && r < i.length ? i.eq(r) : e()
        }, this.onKeyDown = function () {
            var e = n.onKeyDown;
            return function (t) {
                var i, r, o, s;
                return !this.isOpen || t.keyCode !== u && t.keyCode !== d ? e.apply(this, arguments) : (n.ignoreHover = !0, s = this.$activeOption.closest("[data-group]"), i = s.find("[data-selectable]").index(this.$activeOption), s = t.keyCode === u ? s.prev("[data-group]") : s.next("[data-group]"), o = s.find("[data-selectable]"), r = o.eq(Math.min(o.length - 1, i)), void(r.length && this.setActiveOption(r)))
            }
        }();
        var i = function () {
            var e, t = i.width, n = document;
            return "undefined" == typeof t && (e = n.createElement("div"), e.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', e = e.firstChild, n.body.appendChild(e), t = i.width = e.offsetWidth - e.clientWidth,
                n.body.removeChild(e)), t
        }, r = function () {
            var r, o, s, a, l, u, c;
            if (c = e("[data-group]", n.$dropdown_content), o = c.length, o && n.$dropdown_content.width()) {
                if (t.equalizeHeight) {
                    for (s = 0, r = 0; r < o; r++)s = Math.max(s, c.eq(r).height());
                    c.css({height: s})
                }
                t.equalizeWidth && (u = n.$dropdown_content.innerWidth() - i(), a = Math.round(u / o), c.css({width: a}), o > 1 && (l = u - a * (o - 1), c.eq(o - 1).css({width: l})))
            }
        };
        (t.equalizeHeight || t.equalizeWidth) && (k.after(this, "positionDropdown", r), k.after(this, "refreshOptions", r))
    }), L.define("remove_button", function (t) {
        t = e.extend({label: "&times;", title: "Remove", className: "remove", append: !0}, t);
        var n = function (t, n) {
            n.className = "remove-single";
            var i = t, r = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + S(n.title) + '">' + n.label + "</a>", o = function (e, t) {
                return e + t
            };
            t.setup = function () {
                var s = i.setup;
                return function () {
                    if (n.append) {
                        var a = e(i.$input.context).attr("id"), l = (e("#" + a), i.settings.render.item);
                        i.settings.render.item = function (e) {
                            return o(l.apply(t, arguments), r)
                        }
                    }
                    s.apply(t, arguments), t.$control.on("click", "." + n.className, function (e) {
                        e.preventDefault(), i.isLocked || i.clear()
                    })
                }
            }()
        }, i = function (t, n) {
            var i = t, r = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + S(n.title) + '">' + n.label + "</a>", o = function (e, t) {
                var n = e.search(/(<\/[^>]+>\s*)$/);
                return e.substring(0, n) + t + e.substring(n)
            };
            t.setup = function () {
                var s = i.setup;
                return function () {
                    if (n.append) {
                        var a = i.settings.render.item;
                        i.settings.render.item = function (e) {
                            return o(a.apply(t, arguments), r)
                        }
                    }
                    s.apply(t, arguments), t.$control.on("click", "." + n.className, function (t) {
                        if (t.preventDefault(), !i.isLocked) {
                            var n = e(t.currentTarget).parent();
                            i.setActiveItem(n), i.deleteSelection() && i.setCaret(i.items.length)
                        }
                    })
                }
            }()
        };
        return "single" === this.settings.mode ? void n(this, t) : void i(this, t)
    }), L.define("restore_on_backspace", function (e) {
        var t = this;
        e.text = e.text || function (e) {
                return e[this.settings.labelField]
            }, this.onKeyDown = function () {
            var n = t.onKeyDown;
            return function (t) {
                var i, r;
                return t.keyCode === g && "" === this.$control_input.val() && !this.$activeItems.length && (i = this.caretPos - 1, i >= 0 && i < this.items.length) ? (r = this.options[this.items[i]], this.deleteSelection(t) && (this.setTextboxValue(e.text.apply(this, [r])), this.refreshOptions(!0)), void t.preventDefault()) : n.apply(this, arguments)
            }
        }()
    }), L
}), $(function () {
    function e() {
        n.value != i.value ? i.setCustomValidity("Пароли не совпадают") : i.setCustomValidity("")
    }

    function t(e) {
        if (e.files && e.files[0]) {
            var t = new FileReader;
            t.onload = function (e) {
                $("#img").attr("src", e.target.result)
            }, t.readAsDataURL(e.files[0])
        }
    }

    $(".authorised_user > li:last-child").click(function (e) {
        e.stopPropagation();
        var t = $(".sub_menu");
        t.is(":hidden") ? t.slideDown(250) : t.slideUp(250)
    }), $(document).click(function () {
        $(".modal").fadeOut(350), $(".blur").css("filter", "none"), $(".registered_person").fadeOut(250), $(".book").fadeOut(250), $(".sub_menu").slideUp(250)
    }), $("#log-in, .r_user").click(function (e) {
        e.stopPropagation(), $(".modal").css("display", "none"), $(".c_modal").fadeIn(350), $(".blur").css("filter", "blur(5px)")
    }), $("#sign-up, .n_user").click(function (e) {
        e.stopPropagation(), $(".modal").fadeIn(350), $(".c_modal").css("display", "none"), $(".logout_modal").css("display", "none"), $(".blur").css("filter", "blur(5px)")
    }), $(".log-out").click(function (e) {
        $(".modal").css("display", "none"), $(".logout_modal").fadeIn(350), $(".blur").css("filter", "blur(5px)")
    }), $(".s_register, .c_register, .registered_person, .book, .logout_modal > div").click(function (e) {
        e.stopPropagation()
    });
    var n = document.getElementById("password"), i = document.getElementById("confirm_password");
    n.onchange = e, i.onkeyup = e, $("#upload").change(function () {
        t(this)
    });
    var r = $(".registered_person");
    $(".dt li.registered").append(r);
    var o = $(".dt li.registered");
    o.each(function (e, t) {
        $(t).on("click", function (e) {
            e.stopPropagation(), $(".book").fadeOut(250), $(".registered_person").fadeOut(250), $(this).children(".registered_person").fadeIn(250)
        })
    });
    var s = $(".book");
    $(".dt li.free").append(s);
    var a = $(".dt li.free");
    a.each(function (e, t) {
        $(t).on("click", function (e) {
            e.stopPropagation(), $(".registered_person").fadeOut(250), $(".book").fadeOut(250), $(this).children(".book").fadeIn(250)
        })
    }), $("#place").selectize({sortField: "text"}), $(".add_block > span").click(function (e) {
        $(this).siblings("div").append('<input type="tel" placeholder="Контактный телефон">')
    }), $(".no").click(function (e) {
        $(".logout_modal").fadeOut(250), $(".blur").css("filter", "none")
    })
});