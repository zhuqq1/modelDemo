"use strict";
! function() {
    void 0 === Object.assign && (Object.assign = function(e) {
        if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
        for (var t = Object(e), a = 1; a < arguments.length; a++) {
            var n = arguments[a];
            if (void 0 !== n && null !== n)
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
    });
    var e = Object.freeze({ Release: "Debug", Debug: "Debug", Mobile: "Mobile" }),
        t = Object.freeze({ BIMFACE: "BIMFACE", Local: "Local" }),
        a = function() {
            var kk = {
                staticHost: "https://static.bimface.com",
                APIHost: "https://api.bimface.com",
                viewToken: null,
                configuration: e.Release,
                dataEnvType: t.BIMFACE,
                dataPath: null
            }
            return kk;
        },
        n = function e(t, a, n) {
            var s = t.length;
            i(t[a], function(i) { a++, a == s ? n(i) : e(t, a, n) })
        },
        i = function(e, t) { var a, n = document.getElementsByTagName("head")[0]; return e.indexOf(".css") > -1 ? (a = document.createElement("link"), a.setAttribute("href", e), a.setAttribute("rel", "stylesheet")) : (a = document.createElement("script"), a.setAttribute("src", e)), a.isLoaded = !1, a.addEventListener("load", function() { a.isLoaded = !0, t && t({ message: "success" }) }), a.addEventListener("error", function() { a.isLoaded = !1, t && t({ element: e, message: "error" }) }), n.appendChild(a), a },
        s = function(e) {
            var t, a = { type: "get", data: null, success: null, failure: null },
                n = Object.assign(a, e);
            t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), t.onreadystatechange = function() {
                if (4 == t.readyState) {
                    var e = t.status;
                    e >= 200 && e < 300 ? n.success && n.success(t.responseText, t.responseXML) : n.failure && n.failure(e)
                }
            }, t.open(n.type, n.url, n.async), t.send(n.data)
        },
        o = {
            load: function(a, i, o) {
                a.dataPath = a.path || a.dataPath, a.dataEnvType = a.env || a.dataEnvType;
                var r = a.configuration == e.Debug ? "-debug" : "",
                    c = a.device == e.Mobile ? "-mobile" : "",
                    d = function(e, t) {
                        n(t, 0, function(t) {
                            if ("success" == t.message) {
                                var n = e.renderType;
                                "bimView" == n && (n = "3DView");
                                var s = { dataEnvType: a.dataEnvType, dataPath: a.dataPath, databagId: e.databagId, isSupportComponentProperty: e.isSupportComponentProperty, isSupportFamilyTypeList: e.isSupportFamilyTypeList, isSupportMiniMap: e.isSupportMiniMap, isSupportModelTree: e.isSupportModelTree, jsSDKVersion: e.jsSDKVersion, viewType: n, renderVersion: e.renderVersion, viewToken: a.viewToken };
                                i && i(s)
                            } else o && o(t)
                        })
                    };
                a.dataEnvType == t.Local && a.dataPath ? (a.dataPath = a.dataPath.replace("viewToken.json", ""), s({
                    url: a.dataPath + "/viewToken.json",
                    success: function(e) {
                        var t = JSON.parse(e),
                            n = [a.dataPath + "/jssdk/Bimface.css", a.dataPath + "/jssdk/Bimface" + c + r + ".js"];
                        t.databagId = a.dataPath + "/" + t.databagId, t.dataPath = a.dataPath, d(t, n)
                    },
                    failure: function(e) { o && o(e) }
                })) : s({
                    url: a.APIHost + "/inside/databag?viewToken=" + a.viewToken,
                    success: function(e) {
                        var t = JSON.parse(e);
                        if ("success" == t.code) {
                            var n = t.data,
                                i = [a.staticHost + "/api/Glodon/" + n.jsSDKVersion + "/Bimface.css", a.staticHost + "/api/Glodon/" + n.jsSDKVersion + "/Bimface" + c + r + ".js"];
                            d(n, i)
                        } else o && o(t)
                    },
                    failure: function(e) { o && o(e) }
                })
            }
        };
    window.BimfaceConfigrationOption = e,
        window.BimfaceSDKLoaderConfig = a,
        window.BimfaceEnvOption = t,
        window.BimfaceSDKLoader = o
}();