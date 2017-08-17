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
        if (void 0 === n && 1 === e.nodeType)if (i = "data-" + t.replace(Ae, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
            try {
                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : De.test(n) ? oe.parseJSON(n) : n)
            } catch (r) {
            }
            Ee.set(e, t, n)
        } else n = void 0;
        return n
    }

    function u(e, t, n, i) {
        var r, o = 1, s = 20, a = i ? function () {
            return i.cur()
        } : function () {
            return oe.css(e, t, "")
        }, l = a(), u = n && n[3] || (oe.cssNumber[t] ? "" : "px"), c = (oe.cssNumber[t] || "px" !== u && +l) && je.exec(oe.css(e, t));
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

    function f(e, t) {
        for (var n = 0, i = e.length; n < i; n++)Se.set(e[n], "globalEval", !t || Se.get(t[n], "globalEval"))
    }

    function d(e, t, n, i, r) {
        for (var o, s, a, l, u, d, p = t.createDocumentFragment(), h = [], g = 0, v = e.length; g < v; g++)if (o = e[g], o || 0 === o)if ("object" === oe.type(o)) oe.merge(h, o.nodeType ? [o] : o); else if (Fe.test(o)) {
            for (s = s || p.appendChild(t.createElement("div")), a = (He.exec(o) || ["", ""])[1].toLowerCase(), l = Pe[a] || Pe._default, s.innerHTML = l[1] + oe.htmlPrefilter(o) + l[2], d = l[0]; d--;)s = s.lastChild;
            oe.merge(h, s.childNodes), s = p.firstChild, s.textContent = ""
        } else h.push(t.createTextNode(o));
        for (p.textContent = "", g = 0; o = h[g++];)if (i && oe.inArray(o, i) > -1) r && r.push(o); else if (u = oe.contains(o.ownerDocument, o), s = c(p.appendChild(o), "script"), u && f(s), n)for (d = 0; o = s[d++];)$e.test(o.type || "") && n.push(o);
        return p
    }

    function p() {
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
        var t = ze.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function b(e, t) {
        var n, i, r, o, s, a, l, u;
        if (1 === t.nodeType) {
            if (Se.hasData(e) && (o = Se.access(e), s = Se.set(t, o), u = o.events)) {
                delete s.handle, s.events = {};
                for (r in u)for (n = 0, i = u[r].length; n < i; n++)oe.event.add(t, r, u[r][n])
            }
            Ee.hasData(e) && (a = Ee.access(e), l = oe.extend({}, a), Ee.set(t, l))
        }
    }

    function w(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Oe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function C(e, t, n, i) {
        t = J.apply([], t);
        var r, o, s, a, l, u, f = 0, p = e.length, h = p - 1, g = t[0], v = oe.isFunction(g);
        if (v || p > 1 && "string" == typeof g && !ie.checkClone && Be.test(g))return e.each(function (r) {
            var o = e.eq(r);
            v && (t[0] = g.call(this, r, o.html())), C(o, t, n, i)
        });
        if (p && (r = d(t, e[0].ownerDocument, !1, e, i), o = r.firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
            for (s = oe.map(c(r, "script"), y), a = s.length; f < p; f++)l = r, f !== h && (l = oe.clone(l, !0, !0), a && oe.merge(s, c(l, "script"))), n.call(e[f], l, f);
            if (a)for (u = s[s.length - 1].ownerDocument, oe.map(s, x), f = 0; f < a; f++)l = s[f], $e.test(l.type || "") && !Se.access(l, "globalEval") && oe.contains(u, l) && (l.src ? oe._evalUrl && oe._evalUrl(l.src) : oe.globalEval(l.textContent.replace(Xe, "")))
        }
        return e
    }

    function T(e, t, n) {
        for (var i, r = t ? oe.filter(t, e) : e, o = 0; null != (i = r[o]); o++)n || 1 !== i.nodeType || oe.cleanData(c(i)), i.parentNode && (n && oe.contains(i.ownerDocument, i) && f(c(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function k(e, t) {
        var n = oe(t.createElement(e)).appendTo(t.body), i = oe.css(n[0], "display");
        return n.detach(), i
    }

    function S(e) {
        var t = G, n = Ve[e];
        return n || (n = k(e, t), "none" !== n && n || (Ue = (Ue || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ue[0].contentDocument, t.write(), t.close(), n = k(e, t), Ue.detach()), Ve[e] = n), n
    }

    function E(e, t, n) {
        var i, r, o, s, a = e.style;
        return n = n || Qe(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== s && void 0 !== s || oe.contains(e.ownerDocument, e) || (s = oe.style(e, t)), n && !ie.pixelMarginRight() && Ge.test(s) && Ye.test(t) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o), void 0 !== s ? s + "" : s
    }

    function D(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function A(e) {
        if (e in it)return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)if (e = nt[n] + t, e in it)return e
    }

    function N(e, t, n) {
        var i = je.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function j(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; o < 4; o += 2)"margin" === n && (s += oe.css(e, n + qe[o], !0, r)), i ? ("content" === n && (s -= oe.css(e, "padding" + qe[o], !0, r)), "margin" !== n && (s -= oe.css(e, "border" + qe[o] + "Width", !0, r))) : (s += oe.css(e, "padding" + qe[o], !0, r), "padding" !== n && (s += oe.css(e, "border" + qe[o] + "Width", !0, r)));
        return s
    }

    function q(e, t, n) {
        var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, o = Qe(e), s = "border-box" === oe.css(e, "boxSizing", !1, o);
        if (r <= 0 || null == r) {
            if (r = E(e, t, o), (r < 0 || null == r) && (r = e.style[t]), Ge.test(r))return r;
            i = s && (ie.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + j(e, t, n || (s ? "border" : "content"), i, o) + "px"
    }

    function L(e, t) {
        for (var n, i, r, o = [], s = 0, a = e.length; s < a; s++)i = e[s], i.style && (o[s] = Se.get(i, "olddisplay"), n = i.style.display, t ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Le(i) && (o[s] = Se.access(i, "olddisplay", S(i.nodeName)))) : (r = Le(i), "none" === n && r || Se.set(i, "olddisplay", r ? n : oe.css(i, "display"))));
        for (s = 0; s < a; s++)i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function O(e, t, n, i, r) {
        return new O.prototype.init(e, t, n, i, r)
    }

    function H() {
        return e.setTimeout(function () {
            rt = void 0
        }), rt = oe.now()
    }

    function $(e, t) {
        var n, i = 0, r = {height: e};
        for (t = t ? 1 : 0; i < 4; i += 2 - t)n = qe[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function P(e, t, n) {
        for (var i, r = (M.tweeners[t] || []).concat(M.tweeners["*"]), o = 0, s = r.length; o < s; o++)if (i = r[o].call(n, t, e))return i
    }

    function F(e, t, n) {
        var i, r, o, s, a, l, u, c, f = this, d = {}, p = e.style, h = e.nodeType && Le(e), g = Se.get(e, "fxshow");
        n.queue || (a = oe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, f.always(function () {
            f.always(function () {
                a.unqueued--, oe.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = oe.css(e, "display"), c = "none" === u ? Se.get(e, "olddisplay") || S(e.nodeName) : u, "inline" === c && "none" === oe.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", f.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (i in t)if (r = t[i], st.exec(r)) {
            if (delete t[i], o = o || "toggle" === r, r === (h ? "hide" : "show")) {
                if ("show" !== r || !g || void 0 === g[i])continue;
                h = !0
            }
            d[i] = g && g[i] || oe.style(e, i)
        } else u = void 0;
        if (oe.isEmptyObject(d)) "inline" === ("none" === u ? S(e.nodeName) : u) && (p.display = u); else {
            g ? "hidden" in g && (h = g.hidden) : g = Se.access(e, "fxshow", {}), o && (g.hidden = !h), h ? oe(e).show() : f.done(function () {
                oe(e).hide()
            }), f.done(function () {
                var t;
                Se.remove(e, "fxshow");
                for (t in d)oe.style(e, t, d[t])
            });
            for (i in d)s = P(h ? g[i] : 0, i, f), i in g || (g[i] = s.start, h && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function _(e, t) {
        var n, i, r, o, s;
        for (n in e)if (i = oe.camelCase(n), r = t[i], o = e[n], oe.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), s = oe.cssHooks[i], s && "expand" in s) {
            o = s.expand(o), delete e[i];
            for (n in o)n in e || (e[n] = o[n], t[n] = r)
        } else t[i] = r
    }

    function M(e, t, n) {
        var i, r, o = 0, s = M.prefilters.length, a = oe.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (r)return !1;
            for (var t = rt || H(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, s = 0, l = u.tweens.length; s < l; s++)u.tweens[s].run(o);
            return a.notifyWith(e, [u, o, n]), o < 1 && l ? n : (a.resolveWith(e, [u]), !1)
        }, u = a.promise({
            elem: e,
            props: oe.extend({}, t),
            opts: oe.extend(!0, {specialEasing: {}, easing: oe.easing._default}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: rt || H(),
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
        for (_(c, u.opts.specialEasing); o < s; o++)if (i = M.prefilters[o].call(u, e, c, u.opts))return oe.isFunction(i.stop) && (oe._queueHooks(u.elem, u.opts.queue).stop = oe.proxy(i.stop, i)), i;
        return oe.map(c, P, u), oe.isFunction(u.opts.start) && u.opts.start.call(e, u), oe.fx.timer(oe.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function I(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function R(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0, o = t.toLowerCase().match(we) || [];
            if (oe.isFunction(n))for (; i = o[r++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function W(e, t, n, i) {
        function r(a) {
            var l;
            return o[a] = !0, oe.each(e[a] || [], function (e, a) {
                var u = a(t, n, i);
                return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }

        var o = {}, s = e === Et;
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }

    function B(e, t) {
        var n, i, r = oe.ajaxSettings.flatOptions || {};
        for (n in t)void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
        return i && oe.extend(!0, e, i), e
    }

    function z(e, t, n) {
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

    function X(e, t, n, i) {
        var r, o, s, a, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (s in e.converters)u[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())if ("*" === o) o = l; else if ("*" !== l && l !== o) {
            if (s = u[l + " " + o] || u["* " + o], !s)for (r in u)if (a = r.split(" "), a[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                s === !0 ? s = u[r] : u[r] !== !0 && (o = a[0], c.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"]) t = s(t); else try {
                t = s(t)
            } catch (f) {
                return {state: "parsererror", error: s ? f : "No conversion from " + l + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function U(e, t, n, i) {
        var r;
        if (oe.isArray(t)) oe.each(t, function (t, r) {
            n || jt.test(e) ? i(e, r) : U(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
        }); else if (n || "object" !== oe.type(t)) i(e, t); else for (r in t)U(e + "[" + r + "]", t[r], n, i)
    }

    function V(e) {
        return oe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var Y = [], G = e.document, Q = Y.slice, J = Y.concat, K = Y.push, Z = Y.indexOf, ee = {}, te = ee.toString, ne = ee.hasOwnProperty, ie = {}, re = "2.2.4", oe = function (e, t) {
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
        }, push: K, sort: Y.sort, splice: Y.splice
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
            return null != e && (n(Object(e)) ? oe.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
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
            return J.apply([], a)
        }, guid: 1, proxy: function (e, t) {
            var n, i, r;
            if ("string" == typeof t && (n = e[t], t = e, e = n), oe.isFunction(e))return i = Q.call(arguments, 2), r = function () {
                return e.apply(t || this, i.concat(Q.call(arguments)))
            }, r.guid = e.guid = e.guid || oe.guid++, r
        }, now: Date.now, support: ie
    }), "function" == typeof Symbol && (oe.fn[Symbol.iterator] = Y[Symbol.iterator]), oe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    });
    var ce = function (e) {
        function t(e, t, n, i) {
            var r, o, s, a, l, u, f, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)return n;
            if (!i && ((t ? t.ownerDocument || t : I) !== L && q(t), t = t || L, H)) {
                if (11 !== g && (u = me.exec(e)))if (r = u[1]) {
                    if (9 === g) {
                        if (!(s = t.getElementById(r)))return n;
                        if (s.id === r)return n.push(s), n
                    } else if (h && (s = h.getElementById(r)) && _(t, s) && s.id === r)return n.push(s), n
                } else {
                    if (u[2])return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((r = u[3]) && w.getElementsByClassName && t.getElementsByClassName)return K.apply(n, t.getElementsByClassName(r)), n
                }
                if (w.qsa && !X[e + " "] && (!$ || !$.test(e))) {
                    if (1 !== g) h = t, p = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(xe, "\\$&") : t.setAttribute("id", a = M), f = S(e), o = f.length, l = de.test(a) ? "#" + a : "[id='" + a + "']"; o--;)f[o] = l + " " + d(f[o]);
                        p = f.join(","), h = ye.test(e) && c(t.parentNode) || t
                    }
                    if (p)try {
                        return K.apply(n, h.querySelectorAll(p)), n
                    } catch (v) {
                    } finally {
                        a === M && t.removeAttribute("id")
                    }
                }
            }
            return D(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > C.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[M] = !0, e
        }

        function r(e) {
            var t = L.createElement("div");
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
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
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

        function f() {
        }

        function d(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++)i += e[t].value;
            return i
        }

        function p(e, t, n) {
            var i = t.dir, r = n && "parentNode" === i, o = W++;
            return t.first ? function (t, n, o) {
                for (; t = t[i];)if (1 === t.nodeType || r)return e(t, n, o)
            } : function (t, n, s) {
                var a, l, u, c = [R, o];
                if (s) {
                    for (; t = t[i];)if ((1 === t.nodeType || r) && e(t, n, s))return !0
                } else for (; t = t[i];)if (1 === t.nodeType || r) {
                    if (u = t[M] || (t[M] = {}), l = u[t.uniqueID] || (u[t.uniqueID] = {}), (a = l[i]) && a[0] === R && a[1] === o)return c[2] = a[2];
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
            return r && !r[M] && (r = m(r)), o && !o[M] && (o = m(o, s)), i(function (i, s, a, l) {
                var u, c, f, d = [], p = [], h = s.length, m = i || g(t || "*", a.nodeType ? [a] : a, []), y = !e || !i && t ? m : v(m, d, e, a, l), x = n ? o || (i ? e : h || r) ? [] : s : y;
                if (n && n(y, x, a, l), r)for (u = v(x, p), r(u, [], a, l), c = u.length; c--;)(f = u[c]) && (x[p[c]] = !(y[p[c]] = f));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = x.length; c--;)(f = x[c]) && u.push(y[c] = f);
                            o(null, x = [], u, l)
                        }
                        for (c = x.length; c--;)(f = x[c]) && (u = o ? ee(i, f) : d[c]) > -1 && (i[u] = !(s[u] = f))
                    }
                } else x = v(x === s ? x.splice(h, x.length) : x), o ? o(null, s, x, l) : K.apply(s, x)
            })
        }

        function y(e) {
            for (var t, n, i, r = e.length, o = C.relative[e[0].type], s = o || C.relative[" "], a = o ? 1 : 0, l = p(function (e) {
                return e === t
            }, s, !0), u = p(function (e) {
                return ee(t, e) > -1
            }, s, !0), c = [function (e, n, i) {
                var r = !o && (i || n !== A) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                return t = null, r
            }]; a < r; a++)if (n = C.relative[e[a].type]) c = [p(h(c), n)]; else {
                if (n = C.filter[e[a].type].apply(null, e[a].matches), n[M]) {
                    for (i = ++a; i < r && !C.relative[e[i].type]; i++);
                    return m(a > 1 && h(c), a > 1 && d(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(ae, "$1"), n, a < i && y(e.slice(a, i)), i < r && y(e = e.slice(i)), i < r && d(e))
                }
                c.push(n)
            }
            return h(c)
        }

        function x(e, n) {
            var r = n.length > 0, o = e.length > 0, s = function (i, s, a, l, u) {
                var c, f, d, p = 0, h = "0", g = i && [], m = [], y = A, x = i || o && C.find.TAG("*", u), b = R += null == y ? 1 : Math.random() || .1, w = x.length;
                for (u && (A = s === L || s || u); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (f = 0, s || c.ownerDocument === L || (q(c), a = !H); d = e[f++];)if (d(c, s || L, a)) {
                            l.push(c);
                            break
                        }
                        u && (R = b)
                    }
                    r && ((c = !d && c) && p--, i && g.push(c))
                }
                if (p += h, r && h !== p) {
                    for (f = 0; d = n[f++];)d(g, m, s, a);
                    if (i) {
                        if (p > 0)for (; h--;)g[h] || m[h] || (m[h] = Q.call(l));
                        m = v(m)
                    }
                    K.apply(l, m), u && !i && m.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return u && (R = b, A = y), g
            };
            return r ? i(s) : s
        }

        var b, w, C, T, k, S, E, D, A, N, j, q, L, O, H, $, P, F, _, M = "sizzle" + 1 * new Date, I = e.document, R = 0, W = 0, B = n(), z = n(), X = n(), U = function (e, t) {
            return e === t && (j = !0), 0
        }, V = 1 << 31, Y = {}.hasOwnProperty, G = [], Q = G.pop, J = G.push, K = G.push, Z = G.slice, ee = function (e, t) {
            for (var n = 0, i = e.length; n < i; n++)if (e[n] === t)return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)", se = new RegExp(ne + "+", "g"), ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), fe = new RegExp(oe), de = new RegExp("^" + ie + "$"), pe = {
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
            q()
        };
        try {
            K.apply(G = Z.call(I.childNodes), I.childNodes), G[I.childNodes.length].nodeType
        } catch (Te) {
            K = {
                apply: G.length ? function (e, t) {
                    J.apply(e, Z.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, k = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, q = t.setDocument = function (e) {
            var t, n, i = e ? e.ownerDocument || e : I;
            return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, O = L.documentElement, H = !k(L), (n = L.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), w.attributes = r(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = r(function (e) {
                return e.appendChild(L.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = ve.test(L.getElementsByClassName), w.getById = r(function (e) {
                return O.appendChild(e).id = M, !L.getElementsByName || !L.getElementsByName(M).length
            }), w.getById ? (C.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && H) {
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
                    if ("undefined" != typeof t.getElementsByClassName && H)return t.getElementsByClassName(e)
                }, P = [], $ = [], (w.qsa = ve.test(L.querySelectorAll)) && (r(function (e) {
                O.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && $.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || $.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + M + "-]").length || $.push("~="), e.querySelectorAll(":checked").length || $.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || $.push(".#.+[+~]")
            }), r(function (e) {
                var t = L.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && $.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || $.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), $.push(",.*:")
            })), (w.matchesSelector = ve.test(F = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && r(function (e) {
                w.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), P.push("!=", oe)
            }), $ = $.length && new RegExp($.join("|")), P = P.length && new RegExp(P.join("|")), t = ve.test(O.compareDocumentPosition), _ = t || ve.test(O.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, U = t ? function (e, t) {
                if (e === t)return j = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === L || e.ownerDocument === I && _(I, e) ? -1 : t === L || t.ownerDocument === I && _(I, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t)return j = !0, 0;
                var n, i = 0, r = e.parentNode, o = t.parentNode, a = [e], l = [t];
                if (!r || !o)return e === L ? -1 : t === L ? 1 : r ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                if (r === o)return s(e, t);
                for (n = e; n = n.parentNode;)a.unshift(n);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (; a[i] === l[i];)i++;
                return i ? s(a[i], l[i]) : a[i] === I ? -1 : l[i] === I ? 1 : 0
            }, L) : L
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== L && q(e), n = n.replace(ce, "='$1']"), w.matchesSelector && H && !X[n + " "] && (!P || !P.test(n)) && (!$ || !$.test(n)))try {
                var i = F.call(e, n);
                if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
            } catch (r) {
            }
            return t(n, L, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== L && q(e), _(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== L && q(e);
            var n = C.attrHandle[t.toLowerCase()], i = n && Y.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
            return void 0 !== i ? i : w.attributes || !H ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, r = 0;
            if (j = !w.detectDuplicates, N = !w.sortStable && e.slice(0), e.sort(U), j) {
                for (; t = e[r++];)t === e[r] && (i = n.push(r));
                for (; i--;)e.splice(n[i], 1)
            }
            return N = null, e
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
            match: pe,
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
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
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
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function (e) {
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
                        var u, c, f, d, p, h, g = o !== s ? "nextSibling" : "previousSibling", v = t.parentNode, m = a && t.nodeName.toLowerCase(), y = !l && !a, x = !1;
                        if (v) {
                            if (o) {
                                for (; g;) {
                                    for (d = t; d = d[g];)if (a ? d.nodeName.toLowerCase() === m : 1 === d.nodeType)return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [s ? v.firstChild : v.lastChild], s && y) {
                                for (d = v, f = d[M] || (d[M] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), u = c[e] || [], p = u[0] === R && u[1], x = p && u[2], d = p && v.childNodes[p]; d = ++p && d && d[g] || (x = p = 0) || h.pop();)if (1 === d.nodeType && ++x && d === t) {
                                    c[e] = [R, p, x];
                                    break
                                }
                            } else if (y && (d = t, f = d[M] || (d[M] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), u = c[e] || [], p = u[0] === R && u[1], x = p), x === !1)for (; (d = ++p && d && d[g] || (x = p = 0) || h.pop()) && ((a ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++x || (y && (f = d[M] || (d[M] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), c[e] = [R, x]), d !== t)););
                            return x -= r, x === i || x % i === 0 && x / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var r, o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[M] ? o(n) : o.length > 1 ? (r = [e, e, "", n], C.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, r = o(e, n), s = r.length; s--;)i = ee(e, r[s]), e[i] = !(t[i] = r[s])
                    }) : function (e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], r = E(e.replace(ae, "$1"));
                    return r[M] ? i(function (e, t, n, i) {
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
                        do if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === O
                }, focus: function (e) {
                    return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
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
        return f.prototype = C.filters = C.pseudos, C.setFilters = new f, S = t.tokenize = function (e, n) {
            var i, r, o, s, a, l, u, c = z[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (a = e, l = [], u = C.preFilter; a;) {
                i && !(r = le.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(o = [])), i = !1, (r = ue.exec(a)) && (i = r.shift(), o.push({
                    value: i,
                    type: r[0].replace(ae, " ")
                }), a = a.slice(i.length));
                for (s in C.filter)!(r = pe[s].exec(a)) || u[s] && !(r = u[s](r)) || (i = r.shift(), o.push({
                    value: i,
                    type: s,
                    matches: r
                }), a = a.slice(i.length));
                if (!i)break
            }
            return n ? a.length : a ? t.error(e) : z(e, l).slice(0)
        }, E = t.compile = function (e, t) {
            var n, i = [], r = [], o = X[e + " "];
            if (!o) {
                for (t || (t = S(e)), n = t.length; n--;)o = y(t[n]), o[M] ? i.push(o) : r.push(o);
                o = X(e, x(r, i)), o.selector = e
            }
            return o
        }, D = t.select = function (e, t, n, i) {
            var r, o, s, a, l, u = "function" == typeof e && e, f = !i && S(e = u.selector || e);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === t.nodeType && H && C.relative[o[1].type]) {
                    if (t = (C.find.ID(s.matches[0].replace(be, we), t) || [])[0], !t)return n;
                    u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (r = pe.needsContext.test(e) ? 0 : o.length; r-- && (s = o[r], !C.relative[a = s.type]);)if ((l = C.find[a]) && (i = l(s.matches[0].replace(be, we), ye.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(r, 1), e = i.length && d(o), !e)return K.apply(n, i), n;
                    break
                }
            }
            return (u || E(e, f))(i, t, !H, n, !t || ye.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = M.split("").sort(U).join("") === M, w.detectDuplicates = !!j, q(), w.sortDetached = r(function (e) {
            return 1 & e.compareDocumentPosition(L.createElement("div"))
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
    var fe = function (e, t, n) {
        for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
            if (r && oe(e).is(n))break;
            i.push(e)
        }
        return i
    }, de = function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }, pe = oe.expr.match.needsContext, he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, ge = /^.[^:#\[\.,]*$/;
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
            return !!i(this, "string" == typeof e && pe.test(e) ? oe(e) : e || [], !1).length
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
            for (var n, i = 0, r = this.length, o = [], s = pe.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; i < r; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
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
            return fe(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return fe(e, "parentNode", n)
        }, next: function (e) {
            return r(e, "nextSibling")
        }, prev: function (e) {
            return r(e, "previousSibling")
        }, nextAll: function (e) {
            return fe(e, "nextSibling")
        }, prevAll: function (e) {
            return fe(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return fe(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return fe(e, "previousSibling", n)
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
    }, ke = function (e) {
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
            if (!ke(e))return {};
            var t = e[this.expando];
            return t || (t = {}, ke(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
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
    var Se = new a, Ee = new a, De = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Ae = /[A-Z]/g;
    oe.extend({
        hasData: function (e) {
            return Ee.hasData(e) || Se.hasData(e)
        }, data: function (e, t, n) {
            return Ee.access(e, t, n)
        }, removeData: function (e, t) {
            Ee.remove(e, t)
        }, _data: function (e, t, n) {
            return Se.access(e, t, n)
        }, _removeData: function (e, t) {
            Se.remove(e, t)
        }
    }), oe.fn.extend({
        data: function (e, t) {
            var n, i, r, o = this[0], s = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (r = Ee.get(o), 1 === o.nodeType && !Se.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;)s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), l(o, i, r[i])));
                    Se.set(o, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function () {
                Ee.set(this, e)
            }) : Te(this, function (t) {
                var n, i;
                if (o && void 0 === t) {
                    if (n = Ee.get(o, e) || Ee.get(o, e.replace(Ae, "-$&").toLowerCase()), void 0 !== n)return n;
                    if (i = oe.camelCase(e), n = Ee.get(o, i), void 0 !== n)return n;
                    if (n = l(o, i, void 0), void 0 !== n)return n
                } else i = oe.camelCase(e), this.each(function () {
                    var n = Ee.get(this, i);
                    Ee.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && Ee.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                Ee.remove(this, e)
            })
        }
    }), oe.extend({
        queue: function (e, t, n) {
            var i;
            if (e)return t = (t || "fx") + "queue", i = Se.get(e, t), n && (!i || oe.isArray(n) ? i = Se.access(e, t, oe.makeArray(n)) : i.push(n)), i || []
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = oe.queue(e, t), i = n.length, r = n.shift(), o = oe._queueHooks(e, t), s = function () {
                oe.dequeue(e, t)
            };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, s, o)), !i && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return Se.get(e, n) || Se.access(e, n, {
                    empty: oe.Callbacks("once memory").add(function () {
                        Se.remove(e, [t + "queue", n])
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
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)n = Se.get(o[s], e + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
            return a(), r.promise(t)
        }
    });
    var Ne = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, je = new RegExp("^(?:([+-])=|)(" + Ne + ")([a-z%]*)$", "i"), qe = ["Top", "Right", "Bottom", "Left"], Le = function (e, t) {
        return e = t || e, "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
    }, Oe = /^(?:checkbox|radio)$/i, He = /<([\w:-]+)/, $e = /^$|\/(?:java|ecma)script/i, Pe = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Pe.optgroup = Pe.option, Pe.tbody = Pe.tfoot = Pe.colgroup = Pe.caption = Pe.thead, Pe.th = Pe.td;
    var Fe = /<|&#?\w+;/;
    !function () {
        var e = G.createDocumentFragment(), t = e.appendChild(G.createElement("div")), n = G.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var _e = /^key/, Me = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ie = /^([^.]*)(?:\.(.+)|)/;
    oe.event = {
        global: {},
        add: function (e, t, n, i, r) {
            var o, s, a, l, u, c, f, d, p, h, g, v = Se.get(e);
            if (v)for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = oe.guid++), (l = v.events) || (l = v.events = {}), (s = v.handle) || (s = v.handle = function (t) {
                return "undefined" != typeof oe && oe.event.triggered !== t.type ? oe.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(we) || [""], u = t.length; u--;)a = Ie.exec(t[u]) || [], p = g = a[1], h = (a[2] || "").split(".").sort(), p && (f = oe.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, f = oe.event.special[p] || {}, c = oe.extend({
                type: p,
                origType: g,
                data: i,
                handler: n,
                guid: n.guid,
                selector: r,
                needsContext: r && oe.expr.match.needsContext.test(r),
                namespace: h.join(".")
            }, o), (d = l[p]) || (d = l[p] = [], d.delegateCount = 0, f.setup && f.setup.call(e, i, h, s) !== !1 || e.addEventListener && e.addEventListener(p, s)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), oe.event.global[p] = !0)
        },
        remove: function (e, t, n, i, r) {
            var o, s, a, l, u, c, f, d, p, h, g, v = Se.hasData(e) && Se.get(e);
            if (v && (l = v.events)) {
                for (t = (t || "").match(we) || [""], u = t.length; u--;)if (a = Ie.exec(t[u]) || [], p = g = a[1], h = (a[2] || "").split(".").sort(), p) {
                    for (f = oe.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, d = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;)c = d[o], !r && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                    s && !d.length && (f.teardown && f.teardown.call(e, h, v.handle) !== !1 || oe.removeEvent(e, p, v.handle), delete l[p])
                } else for (p in l)oe.event.remove(e, p + t[u], n, i, !0);
                oe.isEmptyObject(l) && Se.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            e = oe.event.fix(e);
            var t, n, i, r, o, s = [], a = Q.call(arguments), l = (Se.get(this, "events") || {})[e.type] || [], u = oe.event.special[e.type] || {};
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
            for (s || (this.fixHooks[r] = s = Me.test(r) ? this.mouseHooks : _e.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new oe.Event(o), t = i.length; t--;)n = i[t], e[n] = o[n];
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
        return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : h) : this.type = e, t && oe.extend(this, t), this.timeStamp = e && e.timeStamp || oe.now(), void(this[oe.expando] = !0)) : new oe.Event(e, t)
    }, oe.Event.prototype = {
        constructor: oe.Event,
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = p, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = p, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = p, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
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
    var Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, We = /<script|<style|<link/i, Be = /checked\s*(?:[^=]|=\s*.checked.)/i, ze = /^true\/(.*)/, Xe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    oe.extend({
        htmlPrefilter: function (e) {
            return e.replace(Re, "<$1></$2>")
        }, clone: function (e, t, n) {
            var i, r, o, s, a = e.cloneNode(!0), l = oe.contains(e.ownerDocument, e);
            if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))for (s = c(a), o = c(e), i = 0, r = o.length; i < r; i++)w(o[i], s[i]);
            if (t)if (n)for (o = o || c(e), s = s || c(a), i = 0, r = o.length; i < r; i++)b(o[i], s[i]); else b(e, a);
            return s = c(a, "script"), s.length > 0 && f(s, !l && c(e, "script")), a
        }, cleanData: function (e) {
            for (var t, n, i, r = oe.event.special, o = 0; void 0 !== (n = e[o]); o++)if (ke(n)) {
                if (t = n[Se.expando]) {
                    if (t.events)for (i in t.events)r[i] ? oe.event.remove(n, i) : oe.removeEvent(n, i, t.handle);
                    n[Se.expando] = void 0
                }
                n[Ee.expando] && (n[Ee.expando] = void 0)
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
                if ("string" == typeof e && !We.test(e) && !Pe[(He.exec(e) || ["", ""])[1].toLowerCase()]) {
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
            for (var n, i = [], r = oe(e), o = r.length - 1, s = 0; s <= o; s++)n = s === o ? this : this.clone(!0), oe(r[s])[t](n), K.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Ue, Ve = {
        HTML: "block",
        BODY: "block"
    }, Ye = /^margin/, Ge = new RegExp("^(" + Ne + ")(?!px)[a-z%]+$", "i"), Qe = function (t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e), n.getComputedStyle(t)
    }, Je = function (e, t, n, i) {
        var r, o, s = {};
        for (o in t)s[o] = e.style[o], e.style[o] = t[o];
        r = n.apply(e, i || []);
        for (o in t)e.style[o] = s[o];
        return r
    }, Ke = G.documentElement;
    !function () {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Ke.appendChild(s);
            var t = e.getComputedStyle(a);
            n = "1%" !== t.top, o = "2px" === t.marginLeft, i = "4px" === t.width, a.style.marginRight = "50%", r = "4px" === t.marginRight, Ke.removeChild(s)
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
                return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", Ke.appendChild(s), t = !parseFloat(e.getComputedStyle(n).marginRight), Ke.removeChild(s), a.removeChild(n), t
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
                        var n = E(e, "opacity");
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
                return t = oe.cssProps[a] || (oe.cssProps[a] = A(a) || a), s = oe.cssHooks[t] || oe.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (r = s.get(e, !1, i)) ? r : l[t] : (o = typeof n, "string" === o && (r = je.exec(n)) && r[1] && (n = u(e, t, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (oe.cssNumber[a] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l[t] = n)), void 0)
            }
        },
        css: function (e, t, n, i) {
            var r, o, s, a = oe.camelCase(t);
            return t = oe.cssProps[a] || (oe.cssProps[a] = A(a) || a), s = oe.cssHooks[t] || oe.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = E(e, t, i)), "normal" === r && t in tt && (r = tt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }), oe.each(["height", "width"], function (e, t) {
        oe.cssHooks[t] = {
            get: function (e, n, i) {
                if (n)return Ze.test(oe.css(e, "display")) && 0 === e.offsetWidth ? Je(e, et, function () {
                    return q(e, t, i)
                }) : q(e, t, i)
            }, set: function (e, n, i) {
                var r, o = i && Qe(e), s = i && j(e, t, i, "border-box" === oe.css(e, "boxSizing", !1, o), o);
                return s && (r = je.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = oe.css(e, t)), N(e, n, s)
            }
        }
    }), oe.cssHooks.marginLeft = D(ie.reliableMarginLeft, function (e, t) {
        if (t)return (parseFloat(E(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {marginLeft: 0}, function () {
                return e.getBoundingClientRect().left
            })) + "px"
    }), oe.cssHooks.marginRight = D(ie.reliableMarginRight, function (e, t) {
        if (t)return Je(e, {display: "inline-block"}, E, [e, "marginRight"])
    }), oe.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        oe.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)r[e + qe[i] + t] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, Ye.test(e) || (oe.cssHooks[e + t].set = N)
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
            return L(this, !0)
        }, hide: function () {
            return L(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Le(this) ? oe(this).show() : oe(this).hide()
            })
        }
    }), oe.Tween = O, O.prototype = {
        constructor: O, init: function (e, t, n, i, r, o) {
            this.elem = e, this.prop = n, this.easing = r || oe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (oe.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = O.propHooks[this.prop];
            return this.options.duration ? this.pos = t = oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
        }
    }, O.prototype.init.prototype = O.prototype, O.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = oe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            }, set: function (e) {
                oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[oe.cssProps[e.prop]] && !oe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : oe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, oe.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, _default: "swing"
    }, oe.fx = O.prototype.init, oe.fx.step = {};
    var rt, ot, st = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    oe.Animation = oe.extend(M, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return u(n.elem, e, je.exec(t), n), n
            }]
        }, tweener: function (e, t) {
            oe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(we);
            for (var n, i = 0, r = e.length; i < r; i++)n = e[i], M.tweeners[n] = M.tweeners[n] || [], M.tweeners[n].unshift(t)
        }, prefilters: [F], prefilter: function (e, t) {
            t ? M.prefilters.unshift(e) : M.prefilters.push(e)
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
            return this.filter(Le).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var r = oe.isEmptyObject(e), o = oe.speed(t, n, i), s = function () {
                var t = M(this, oe.extend({}, e), o);
                (r || Se.get(this, "finish")) && t.stop(!0)
            };
            return s.finish = s, r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, r = null != e && e + "queueHooks", o = oe.timers, s = Se.get(this);
                if (r) s[r] && s[r].stop && i(s[r]); else for (r in s)s[r] && s[r].stop && at.test(r) && i(s[r]);
                for (r = o.length; r--;)o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                !t && n || oe.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = Se.get(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = oe.timers, s = i ? i.length : 0;
                for (n.finish = !0, oe.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < s; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), oe.each(["toggle", "show", "hide"], function (e, t) {
        var n = oe.fn[t];
        oe.fn[t] = function (e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate($(t, !0), e, i, r)
        }
    }), oe.each({
        slideDown: $("show"),
        slideUp: $("hide"),
        slideToggle: $("toggle"),
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
    var ct = /^(?:input|select|textarea|button)$/i, ft = /^(?:a|area)$/i;
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
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) || ft.test(e.nodeName) && e.href ? 0 : -1
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
                oe(this).addClass(e.call(this, t, I(this)))
            });
            if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (r = I(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                for (s = 0; o = t[s++];)i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                a = oe.trim(i), r !== a && n.setAttribute("class", a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, r, o, s, a, l = 0;
            if (oe.isFunction(e))return this.each(function (t) {
                oe(this).removeClass(e.call(this, t, I(this)))
            });
            if (!arguments.length)return this.attr("class", "");
            if ("string" == typeof e && e)for (t = e.match(we) || []; n = this[l++];)if (r = I(n), i = 1 === n.nodeType && (" " + r + " ").replace(dt, " ")) {
                for (s = 0; o = t[s++];)for (; i.indexOf(" " + o + " ") > -1;)i = i.replace(" " + o + " ", " ");
                a = oe.trim(i), r !== a && n.setAttribute("class", a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : oe.isFunction(e) ? this.each(function (n) {
                oe(this).toggleClass(e.call(this, n, I(this), t), t)
            }) : this.each(function () {
                var t, i, r, o;
                if ("string" === n)for (i = 0, r = oe(this), o = e.match(we) || []; t = o[i++];)r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else void 0 !== e && "boolean" !== n || (t = I(this), t && Se.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Se.get(this, "__className__") || ""))
            })
        }, hasClass: function (e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)if (1 === n.nodeType && (" " + I(n) + " ").replace(dt, " ").indexOf(t) > -1)return !0;
            return !1
        }
    });
    var pt = /\r/g, ht = /[\x20\t\r\n\f]+/g;
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
                if (r)return t = oe.valHooks[r.type] || oe.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(pt, "") : null == n ? "" : n)
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
            var o, s, a, l, u, c, f, d = [i || G], p = ne.call(t, "type") ? t.type : t, h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = a = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !gt.test(p + oe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), u = p.indexOf(":") < 0 && "on" + p, t = t[oe.expando] ? t : new oe.Event(p, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : oe.makeArray(n, [t]), f = oe.event.special[p] || {}, r || !f.trigger || f.trigger.apply(i, n) !== !1)) {
                if (!r && !f.noBubble && !oe.isWindow(i)) {
                    for (l = f.delegateType || p, gt.test(l + p) || (s = s.parentNode); s; s = s.parentNode)d.push(s), a = s;
                    a === (i.ownerDocument || G) && d.push(a.defaultView || a.parentWindow || e)
                }
                for (o = 0; (s = d[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? l : f.bindType || p, c = (Se.get(s, "events") || {})[t.type] && Se.get(s, "handle"), c && c.apply(s, n), c = u && s[u], c && c.apply && ke(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault());
                return t.type = p, r || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !ke(i) || u && oe.isFunction(i[p]) && !oe.isWindow(i) && (a = i[u], a && (i[u] = null), oe.event.triggered = p, i[p](), oe.event.triggered = void 0, a && (i[u] = a)), t.result
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
                var i = this.ownerDocument || this, r = Se.access(i, t);
                r || i.addEventListener(e, n, !0), Se.access(i, t, (r || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, r = Se.access(i, t) - 1;
                r ? Se.access(i, t, r) : (i.removeEventListener(e, n, !0), Se.remove(i, t))
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
    var xt = /#.*$/, bt = /([?&])_=[^&]*/, wt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ct = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Tt = /^(?:GET|HEAD)$/, kt = /^\/\//, St = {}, Et = {}, Dt = "*/".concat("*"), At = G.createElement("a");
    At.href = vt.href, oe.extend({
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
                "*": Dt,
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
            return t ? B(B(e, oe.ajaxSettings), t) : B(oe.ajaxSettings, e)
        },
        ajaxPrefilter: R(St),
        ajaxTransport: R(Et),
        ajax: function (t, n) {
            function i(t, n, i, a) {
                var u, f, y, x, w, T = n;
                2 !== b && (b = 2, l && e.clearTimeout(l), r = void 0, s = a || "", C.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (x = z(d, C, i)), x = X(d, x, C, u), u ? (d.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (oe.lastModified[o] = w), w = C.getResponseHeader("etag"), w && (oe.etag[o] = w)), 204 === t || "HEAD" === d.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = x.state, f = x.data, y = x.error, u = !y)) : (y = T, !t && T || (T = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || T) + "", u ? g.resolveWith(p, [f, T, C]) : g.rejectWith(p, [C, T, y]), C.statusCode(m), m = void 0, c && h.trigger(u ? "ajaxSuccess" : "ajaxError", [C, d, u ? f : y]), v.fireWith(p, [C, T]), c && (h.trigger("ajaxComplete", [C, d]), --oe.active || oe.event.trigger("ajaxStop")))
            }

            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var r, o, s, a, l, u, c, f, d = oe.ajaxSetup({}, n), p = d.context || d, h = d.context && (p.nodeType || p.jquery) ? oe(p) : oe.event, g = oe.Deferred(), v = oe.Callbacks("once memory"), m = d.statusCode || {}, y = {}, x = {}, b = 0, w = "canceled", C = {
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
            if (g.promise(C).complete = v.add, C.success = C.done, C.error = C.fail, d.url = ((t || d.url || vt.href) + "").replace(xt, "").replace(kt, vt.protocol + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = oe.trim(d.dataType || "*").toLowerCase().match(we) || [""], null == d.crossDomain) {
                u = G.createElement("a");
                try {
                    u.href = d.url, u.href = u.href, d.crossDomain = At.protocol + "//" + At.host != u.protocol + "//" + u.host
                } catch (T) {
                    d.crossDomain = !0
                }
            }
            if (d.data && d.processData && "string" != typeof d.data && (d.data = oe.param(d.data, d.traditional)), W(St, d, n, C), 2 === b)return C;
            c = oe.event && d.global, c && 0 === oe.active++ && oe.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Tt.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (yt.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = bt.test(o) ? o.replace(bt, "$1_=" + mt++) : o + (yt.test(o) ? "&" : "?") + "_=" + mt++)), d.ifModified && (oe.lastModified[o] && C.setRequestHeader("If-Modified-Since", oe.lastModified[o]), oe.etag[o] && C.setRequestHeader("If-None-Match", oe.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", d.contentType), C.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Dt + "; q=0.01" : "") : d.accepts["*"]);
            for (f in d.headers)C.setRequestHeader(f, d.headers[f]);
            if (d.beforeSend && (d.beforeSend.call(p, C, d) === !1 || 2 === b))return C.abort();
            w = "abort";
            for (f in{success: 1, error: 1, complete: 1})C[f](d[f]);
            if (r = W(Et, d, n, C)) {
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
    var Nt = /%20/g, jt = /\[\]$/, qt = /\r?\n/g, Lt = /^(?:submit|button|image|reset|file)$/i, Ot = /^(?:input|select|textarea|keygen)/i;
    oe.param = function (e, t) {
        var n, i = [], r = function (e, t) {
            t = oe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function () {
            r(this.name, this.value)
        }); else for (n in e)U(n, e[n], t, r);
        return i.join("&").replace(Nt, "+")
    }, oe.fn.extend({
        serialize: function () {
            return oe.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = oe.prop(this, "elements");
                return e ? oe.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !oe(this).is(":disabled") && Ot.test(this.nodeName) && !Lt.test(e) && (this.checked || !Oe.test(e))
            }).map(function (e, t) {
                var n = oe(this).val();
                return null == n ? null : oe.isArray(n) ? oe.map(n, function (e) {
                    return {name: t.name, value: e.replace(qt, "\r\n")}
                }) : {name: t.name, value: n.replace(qt, "\r\n")}
            }).get()
        }
    }), oe.ajaxSettings.xhr = function () {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    };
    var Ht = {0: 200, 1223: 204}, $t = oe.ajaxSettings.xhr();
    ie.cors = !!$t && "withCredentials" in $t, ie.ajax = $t = !!$t, oe.ajaxTransport(function (t) {
        var n, i;
        if (ie.cors || $t && !t.crossDomain)return {
            send: function (r, o) {
                var s, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (s in t.xhrFields)a[s] = t.xhrFields[s];
                t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                for (s in r)a.setRequestHeader(s, r[s]);
                n = function (e) {
                    return function () {
                        n && (n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Ht[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {binary: a.response} : {text: a.responseText}, a.getAllResponseHeaders()))
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
    var Pt = [], Ft = /(=)\?(?=&|$)|\?\?/;
    oe.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Pt.pop() || oe.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), oe.ajaxPrefilter("json jsonp", function (t, n, i) {
        var r, o, s, a = t.jsonp !== !1 && (Ft.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ft.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0])return r = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Ft, "$1" + r) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function () {
            return s || oe.error(r + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[r], e[r] = function () {
            s = arguments
        }, i.always(function () {
            void 0 === o ? oe(e).removeProp(r) : e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Pt.push(r)), s && oe.isFunction(o) && o(s[0]), s = o = void 0
        }), "script"
    }), oe.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || G;
        var i = he.exec(e), r = !n && [];
        return i ? [t.createElement(i[1])] : (i = d([e], t, r), r && r.length && oe(r).remove(), oe.merge([], i.childNodes))
    };
    var _t = oe.fn.load;
    oe.fn.load = function (e, t, n) {
        if ("string" != typeof e && _t)return _t.apply(this, arguments);
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
            var i, r, o, s, a, l, u, c = oe.css(e, "position"), f = oe(e), d = {};
            "static" === c && (e.style.position = "relative"), a = f.offset(), o = oe.css(e, "top"), l = oe.css(e, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (i = f.position(), s = i.top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(l) || 0), oe.isFunction(t) && (t = t.call(e, n, oe.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + r), "using" in t ? t.using.call(e, d) : f.css(d)
        }
    }, oe.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                oe.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0], r = {top: 0, left: 0}, o = i && i.ownerDocument;
            if (o)return t = o.documentElement, oe.contains(t, i) ? (r = i.getBoundingClientRect(), n = V(o), {
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
                return e || Ke
            })
        }
    }), oe.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        oe.fn[e] = function (i) {
            return Te(this, function (e, i, r) {
                var o = V(e);
                return void 0 === r ? o ? o[t] : e[i] : void(o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r)
            }, e, i, arguments.length)
        }
    }), oe.each(["top", "left"], function (e, t) {
        oe.cssHooks[t] = D(ie.pixelPosition, function (e, n) {
            if (n)return n = E(e, t), Ge.test(n) ? oe(e).position()[t] + "px" : n
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
    var Mt = e.jQuery, It = e.$;
    return oe.noConflict = function (t) {
        return e.$ === oe && (e.$ = It), t && e.jQuery === oe && (e.jQuery = Mt), oe
    }, t || (e.jQuery = e.$ = oe), oe
}), !function (e) {
    "namespace sumo";
    e.fn.SumoSelect = function (t) {
        var n = e.extend({
            placeholder: "Select Here",
            csvDispCount: 3,
            captionFormat: "{0} Selected",
            captionFormatAllSelected: "{0} all selected!",
            floatWidth: 400,
            forceCustomRendering: !1,
            nativeOnDevice: ["Android", "BlackBerry", "iPhone", "iPad", "iPod", "Opera Mini", "IEMobile", "Silk"],
            outputAsCSV: !1,
            csvSepChar: ",",
            okCancelInMulti: !1,
            triggerChangeCombined: !0,
            selectAll: !1,
            search: !1,
            searchText: "Search...",
            noMatch: 'No matches for "{0}"',
            prefix: "",
            locale: ["OK", "Cancel", "Select All"],
            up: !1
        }, t), r = this.each(function () {
            var t = this;
            !this.sumo && e(this).is("select") && (this.sumo = {
                E: e(t),
                is_multi: e(t).attr("multiple"),
                select: "",
                caption: "",
                placeholder: "",
                optDiv: "",
                CaptionCont: "",
                ul: "",
                is_floating: !1,
                is_opened: !1,
                mob: !1,
                Pstate: [],
                createElems: function () {
                    var t = this;
                    return t.E.wrap('<div class="SumoSelect" tabindex="0">'), t.select = t.E.parent(), t.caption = e("<span>"), t.CaptionCont = e('<p class="CaptionCont"><label><i></i></label></p>').addClass("SelectBox").attr("style", t.E.attr("style")).prepend(t.caption), t.select.append(t.CaptionCont), t.is_multi || (n.okCancelInMulti = !1), t.E.attr("disabled") && t.select.addClass("disabled").removeAttr("tabindex"), n.outputAsCSV && t.is_multi && t.E.attr("name") && (t.select.append(e('<input class="HEMANT123" type="hidden" />').attr("name", t.E.attr("name")).val(t.getSelStr())), t.E.removeAttr("name")), t.isMobile() && !n.forceCustomRendering ? void t.setNativeMobile() : (t.E.attr("name") && t.select.addClass("sumo_" + t.E.attr("name")), t.E.addClass("SumoUnder").attr("tabindex", "-1"), t.optDiv = e('<div class="optWrapper ' + (n.up ? "up" : "") + '">'), t.floatingList(), t.ul = e('<ul class="options">'), t.optDiv.append(t.ul), n.selectAll && t.SelAll(), n.search && t.Search(), t.ul.append(t.prepItems(t.E.children())), t.is_multi && t.multiSelelect(), t.select.append(t.optDiv), t.basicEvents(), void t.selAllState())
                },
                prepItems: function (t, n) {
                    var i = [], r = this;
                    return e(t).each(function (t, o) {
                        o = e(o), i.push(o.is("optgroup") ? e('<li class="group ' + (o[0].disabled ? "disabled" : "") + '"><label>' + o.attr("label") + "</label><ul></ul><li>").find("ul").append(r.prepItems(o.children(), o[0].disabled)).end() : r.createLi(o, n))
                    }), i
                },
                createLi: function (t, n) {
                    var i = this;
                    return t.attr("value") || t.attr("value", t.val()), li = e('<li class="opt"><label>' + t.text() + "</label></li>"), li.data("opt", t), t.data("li", li), i.is_multi && li.prepend("<span><i></i></span>"), (t[0].disabled || n) && (li = li.addClass("disabled")), i.onOptClick(li), t[0].selected && li.addClass("selected"), t.attr("class") && li.addClass(t.attr("class")), li
                },
                getSelStr: function () {
                    return sopt = [], this.E.find("option:selected").each(function () {
                        sopt.push(e(this).val())
                    }), sopt.join(n.csvSepChar)
                },
                multiSelelect: function () {
                    var t = this;
                    t.optDiv.addClass("multiple"), t.okbtn = e('<p class="btnOk">' + n.locale[0] + "</p>").click(function () {
                        n.triggerChangeCombined && (changed = !1, t.E.find("option:selected").length != t.Pstate.length ? changed = !0 : t.E.find("option").each(function (e, n) {
                            n.selected && t.Pstate.indexOf(e) < 0 && (changed = !0)
                        }), changed && (t.callChange(), t.setText())), t.hideOpts()
                    }), t.cancelBtn = e('<p class="btnCancel">' + n.locale[1] + "</p>").click(function () {
                        t._cnbtn(), t.hideOpts()
                    }), t.optDiv.append(e('<div class="MultiControls">').append(t.okbtn).append(t.cancelBtn))
                },
                _cnbtn: function () {
                    var e = this;
                    e.E.find("option:selected").each(function () {
                        this.selected = !1
                    }), e.optDiv.find("li.selected").removeClass("selected");
                    for (var t = 0; t < e.Pstate.length; t++)e.E.find("option")[e.Pstate[t]].selected = !0, e.ul.find("li.opt").eq(e.Pstate[t]).addClass("selected");
                    e.selAllState()
                },
                SelAll: function () {
                    var t = this;
                    t.is_multi && (t.selAll = e('<p class="select-all"><span><i></i></span><label>' + n.locale[2] + "</label></p>"), t.selAll.on("click", function () {
                        t.selAll.toggleClass("selected"), t.optDiv.find("li.opt").not(".hidden").each(function (n, i) {
                            i = e(i), t.selAll.hasClass("selected") ? i.hasClass("selected") || i.trigger("click") : i.hasClass("selected") && i.trigger("click")
                        })
                    }), t.optDiv.prepend(t.selAll))
                },
                Search: function () {
                    var t = this, i = t.CaptionCont.addClass("search"), r = e('<p class="no-match">');
                    t.ftxt = e('<input type="text" class="search-txt" value="" placeholder="' + n.searchText + '">').on("click", function (e) {
                        e.stopPropagation()
                    }), i.append(t.ftxt), t.optDiv.children("ul").after(r), t.ftxt.on("keyup.sumo", function () {
                        var i = t.optDiv.find("ul.options li.opt").each(function (n, i) {
                            i = e(i), i.text().toLowerCase().indexOf(t.ftxt.val().toLowerCase()) > -1 ? i.removeClass("hidden") : i.addClass("hidden")
                        }).not(".hidden");
                        r.html(n.noMatch.replace(/\{0\}/g, t.ftxt.val())).toggle(!i.length), t.selAllState()
                    })
                },
                selAllState: function () {
                    var t = this;
                    if (n.selectAll) {
                        var i = 0, r = 0;
                        t.optDiv.find("li.opt").not(".hidden").each(function (t, n) {
                            e(n).hasClass("selected") && i++, e(n).hasClass("disabled") || r++
                        }), i == r ? t.selAll.removeClass("partial").addClass("selected") : 0 == i ? t.selAll.removeClass("selected partial") : t.selAll.addClass("partial")
                    }
                },
                showOpts: function () {
                    var t = this;
                    t.E.attr("disabled") || (t.is_opened = !0, t.select.addClass("open"), t.ftxt ? t.ftxt.focus() : t.select.focus(), e(document).on("click.sumo", function (e) {
                        if (!t.select.is(e.target) && 0 === t.select.has(e.target).length) {
                            if (!t.is_opened)return;
                            t.hideOpts(), n.okCancelInMulti && t._cnbtn()
                        }
                    }), t.is_floating && (H = t.optDiv.children("ul").outerHeight() + 2, t.is_multi && (H += parseInt(t.optDiv.css("padding-bottom"))), t.optDiv.css("height", H), e("body").addClass("sumoStopScroll")), t.setPstate())
                },
                setPstate: function () {
                    var e = this;
                    e.is_multi && (e.is_floating || n.okCancelInMulti) && (e.Pstate = [], e.E.find("option").each(function (t, n) {
                        n.selected && e.Pstate.push(t)
                    }))
                },
                callChange: function () {
                    this.E.trigger("change").trigger("click")
                },
                hideOpts: function () {
                    var t = this;
                    t.is_opened && (t.is_opened = !1, t.select.removeClass("open").find("ul li.sel").removeClass("sel"), e(document).off("click.sumo"), t.select.focus(), e("body").removeClass("sumoStopScroll"), n.search && (t.ftxt.val(""), t.optDiv.find("ul.options li").removeClass("hidden"), t.optDiv.find(".no-match").toggle(!1)))
                },
                setOnOpen: function () {
                    var e = this, t = e.optDiv.find("li.opt:not(.hidden)").eq(n.search ? 0 : e.E[0].selectedIndex);
                    e.optDiv.find("li.sel").removeClass("sel"), t.addClass("sel"), e.showOpts()
                },
                nav: function (e) {
                    var t, n = this, i = n.ul.find("li.opt:not(.disabled, .hidden)"), r = n.ul.find("li.opt.sel:not(.hidden)"), o = i.index(r);
                    if (n.is_opened && r.length) {
                        if (e && o > 0) t = i.eq(o - 1); else {
                            if (!(!e && o < i.length - 1 && o > -1))return;
                            t = i.eq(o + 1)
                        }
                        r.removeClass("sel"), r = t.addClass("sel");
                        var s = n.ul, a = s.scrollTop(), l = r.position().top + a;
                        l >= a + s.height() - r.outerHeight() && s.scrollTop(l - s.height() + r.outerHeight()), a > l && s.scrollTop(l)
                    } else n.setOnOpen()
                },
                basicEvents: function () {
                    var t = this;
                    t.CaptionCont.click(function (e) {
                        t.E.trigger("click"), t.is_opened ? t.hideOpts() : t.showOpts(), e.stopPropagation()
                    }), t.select.on("keydown.sumo", function (e) {
                        switch (e.which) {
                            case 38:
                                t.nav(!0);
                                break;
                            case 40:
                                t.nav(!1);
                                break;
                            case 32:
                                if (n.search && t.ftxt.is(e.target))return;
                            case 13:
                                t.is_opened ? t.optDiv.find("ul li.sel").trigger("click") : t.setOnOpen();
                                break;
                            case 9:
                            case 27:
                                return n.okCancelInMulti && t._cnbtn(), void t.hideOpts();
                            default:
                                return
                        }
                        e.preventDefault()
                    }), e(window).on("resize.sumo", function () {
                        t.floatingList()
                    })
                },
                onOptClick: function (t) {
                    var i = this;
                    t.click(function () {
                        var t = e(this);
                        t.hasClass("disabled") || (txt = "", i.is_multi ? (t.toggleClass("selected"), t.data("opt")[0].selected = t.hasClass("selected"), i.selAllState()) : (t.parent().find("li.selected").removeClass("selected"), t.toggleClass("selected"), t.data("opt")[0].selected = !0), i.is_multi && n.triggerChangeCombined && (i.is_floating || n.okCancelInMulti) || (i.setText(), i.callChange()), i.is_multi || i.hideOpts())
                    })
                },
                setText: function () {
                    var t = this;
                    if (t.placeholder = "", t.is_multi) {
                        for (sels = t.E.find(":selected").not(":disabled"), i = 0; i < sels.length; i++) {
                            if (i + 1 >= n.csvDispCount && n.csvDispCount) {
                                sels.length == t.E.find("option").length && n.captionFormatAllSelected ? t.placeholder = n.captionFormatAllSelected.replace(/\{0\}/g, sels.length) + "," : t.placeholder = n.captionFormat.replace(/\{0\}/g, sels.length) + ",";
                                break
                            }
                            t.placeholder += e(sels[i]).text() + ", "
                        }
                        t.placeholder = t.placeholder.replace(/,([^,]*)$/, "$1")
                    } else t.placeholder = t.E.find(":selected").not(":disabled").text();
                    return is_placeholder = !1, t.placeholder || (is_placeholder = !0, t.placeholder = t.E.attr("placeholder"), t.placeholder || (t.placeholder = t.E.find("option:disabled:selected").text())), t.placeholder = t.placeholder ? n.prefix + " " + t.placeholder : n.placeholder, t.caption.html(t.placeholder), t.CaptionCont.attr("title", t.placeholder), csvField = t.select.find("input.HEMANT123"), csvField.length && csvField.val(t.getSelStr()), is_placeholder ? t.caption.addClass("placeholder") : t.caption.removeClass("placeholder"), t.placeholder
                },
                isMobile: function () {
                    for (var e = navigator.userAgent || navigator.vendor || window.opera, t = 0; t < n.nativeOnDevice.length; t++)if (e.toString().toLowerCase().indexOf(n.nativeOnDevice[t].toLowerCase()) > 0)return n.nativeOnDevice[t];
                    return !1
                },
                setNativeMobile: function () {
                    var e = this;
                    e.E.addClass("SelectClass"), e.mob = !0, e.E.change(function () {
                        e.setText()
                    })
                },
                floatingList: function () {
                    var t = this;
                    t.is_floating = e(window).width() <= n.floatWidth, t.optDiv.toggleClass("isFloating", t.is_floating), t.is_floating || t.optDiv.css("height", ""), t.optDiv.toggleClass("okCancelInMulti", n.okCancelInMulti && !t.is_floating)
                },
                vRange: function (e) {
                    var t = this;
                    if (opts = t.E.find("option"), opts.length <= e || 0 > e)throw"index out of bounds";
                    return t
                },
                toggSel: function (t, n) {
                    var i = this;
                    "number" == typeof n ? (i.vRange(n), opt = i.E.find("option")[n]) : opt = i.E.find('option[value="' + n + '"]')[0] || 0, opt && !opt.disabled && opt.selected != t && (opt.selected = t, i.mob || e(opt).data("li").toggleClass("selected", t), i.callChange(), i.setPstate(), i.setText(), i.selAllState())
                },
                toggDis: function (e, t) {
                    var n = this.vRange(t);
                    n.E.find("option")[t].disabled = e, e && (n.E.find("option")[t].selected = !1), n.mob || n.optDiv.find("ul.options li").eq(t).toggleClass("disabled", e).removeClass("selected"), n.setText()
                },
                toggSumo: function (e) {
                    var t = this;
                    return t.enabled = e, t.select.toggleClass("disabled", e), e ? (t.E.attr("disabled", "disabled"), t.select.removeAttr("tabindex")) : (t.E.removeAttr("disabled"), t.select.attr("tabindex", "0")), t
                },
                toggSelAll: function (t) {
                    var n = this;
                    n.E.find("option").each(function () {
                        n.E.find("option")[e(this).index()].disabled || (n.E.find("option")[e(this).index()].selected = t,
                        n.mob || n.optDiv.find("ul.options li").eq(e(this).index()).toggleClass("selected", t), n.setText())
                    }), !n.mob && n.selAll && n.selAll.removeClass("partial").toggleClass("selected", t), n.callChange(), n.setPstate()
                },
                reload: function () {
                    var t = this.unload();
                    return e(t).SumoSelect(n)
                },
                unload: function () {
                    var e = this;
                    return e.select.before(e.E), e.E.show(), n.outputAsCSV && e.is_multi && e.select.find("input.HEMANT123").length && e.E.attr("name", e.select.find("input.HEMANT123").attr("name")), e.select.remove(), delete t.sumo, t
                },
                add: function (n, i, r) {
                    if ("undefined" == typeof n)throw"No value to add";
                    var o = this;
                    if (opts = o.E.find("option"), "number" == typeof i && (r = i, i = n), "undefined" == typeof i && (i = n), opt = e("<option></option>").val(n).html(i), opts.length < r)throw"index out of bounds";
                    return "undefined" == typeof r || opts.length == r ? (o.E.append(opt), o.mob || o.ul.append(o.createLi(opt))) : (opts.eq(r).before(opt), o.mob || o.ul.find("li.opt").eq(r).before(o.createLi(opt))), t
                },
                remove: function (e) {
                    var t = this.vRange(e);
                    t.E.find("option").eq(e).remove(), t.mob || t.optDiv.find("ul.options li").eq(e).remove(), t.setText()
                },
                selectItem: function (e) {
                    this.toggSel(!0, e)
                },
                unSelectItem: function (e) {
                    this.toggSel(!1, e)
                },
                selectAll: function () {
                    this.toggSelAll(!0)
                },
                unSelectAll: function () {
                    this.toggSelAll(!1)
                },
                disableItem: function (e) {
                    this.toggDis(!0, e)
                },
                enableItem: function (e) {
                    this.toggDis(!1, e)
                },
                enabled: !0,
                enable: function () {
                    return this.toggSumo(!1)
                },
                disable: function () {
                    return this.toggSumo(!0)
                },
                init: function () {
                    var e = this;
                    return e.createElems(), e.setText(), e
                }
            }, t.sumo.init())
        });
        return 1 == r.length ? r[0] : r
    }
}(jQuery), $(function () {
    function e(e) {
        if (e.files && e.files[0]) {
            var t = new FileReader;
            t.onload = function (e) {
                $("#img").attr("src", e.target.result)
            }, t.readAsDataURL(e.files[0])
        }
    }

    $(".select").SumoSelect({
        search: !0,
        searchText: "",
        noMatch: 'Нет совпадений с "{0}"',
        okCancelInMulti: !0
    }), $(".tabs-stage > div").hide(), $(".tabs-stage > div:nth-child(1)").show(), $(".tabs-nav > li:first-child a").addClass("tab-active"), $(".tabs-nav > li > a").on("click", function (e) {
        e.preventDefault(), $(".tabs-nav > li a").removeClass("tab-active"), $(this).addClass("tab-active"), $(".tabs-stage > div").hide(400), $($(this).attr("href")).show(400)
    }), $(".filter").click(function (e) {
        e.stopPropagation();
        var t = $(".filters");
        t.is(":hidden") ? t.slideDown() : t.slideUp()
    }), $(".filters").click(function (e) {
        e.stopPropagation()
    }), $(document).click(function () {
        $(".filters").slideUp(), $(".modal").fadeOut(350), $(".blur").css("filter", "none"), $(".registered_person").fadeOut(250), $(".book").fadeOut(250)
    }), $(".menu > li:last-child").click(function (e) {
        e.stopPropagation(), $(".modal").fadeIn(350), $(".blur").css("filter", "blur(5px)"), $(".s_modal").css("display", "none"), $(".c_modal").css("display", "none")
    }), $(".m_register").click(function (e) {
        e.stopPropagation()
    }), $(".s_register, .c_register").click(function (e) {
        e.stopPropagation()
    }), $(".r_type > li:first-child").click(function (e) {
        $(".modal").css("display", "none"), $(".s_modal").fadeIn(350)
    }), $(".r_type > li:last-child").click(function (e) {
        $(".modal").css("display", "none"), $(".c_modal").fadeIn(350)
    }), $("#upload").change(function () {
        e(this)
    });
    var t = $(".registered_person");
    $(".dt li.registered").append(t);
    var n = $(".dt li.registered");
    n.each(function (e, t) {
        $(t).on("click", function (e) {
            e.stopPropagation(), $(".book").fadeOut(250), $(".registered_person").fadeOut(250), $(this).children(".registered_person").fadeIn(250)
        })
    });
    var i = $(".book");
    $(".dt li.free").append(i);
    var r = $(".dt li.free");
    r.each(function (e, t) {
        $(t).on("click", function (e) {
            e.stopPropagation(), $(".registered_person").fadeOut(250), $(".book").fadeOut(250), $(this).children(".book").fadeIn(250)
        })
    })
});