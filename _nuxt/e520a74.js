(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{173:function(t,e,n){var content=n(179);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(25).default)("f21775ea",content,!0,{sourceMap:!1})},177:function(t,e,n){t.exports=n.p+"img/drop_the_quote.115ff75.svg"},178:function(t,e,n){"use strict";n(173)},179:function(t,e,n){(e=n(24)(!1)).push([t.i,".quote{max-width:60%;display:flex;flex-direction:row;margin:120px auto 0}.quote .sentence{width:60%;padding-right:32px}.quote img{width:40%}.sentence p{text-align:right}",""]),t.exports=e},180:function(t,e,n){"use strict";n.r(e);n(18);var r=n(2),o={asyncData:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/fd9c289c2ee41a844cfbe99ba531aca3b483bf42/quotes.json").then((function(t){return t.json()}));case 2:return e=t.sent,t.abrupt("return",{quote:e[Math.round(Math.random()*(e.length-1))]});case 4:case"end":return t.stop()}}),t)})))()}},c=(n(178),n(8)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"quote"},[r("div",{staticClass:"sentence"},[r("h1",[t._v('"'+t._s(t.quote.quote)+'"')]),t._v(" "),r("p",[t._v(t._s(t.quote.author))])]),t._v(" "),r("img",{attrs:{src:n(177),alt:"Drop the quuote"}})])}),[],!1,null,null,null);e.default=component.exports}}]);