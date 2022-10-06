(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5078:
/***/ ((module) => {

// Exports
module.exports = {
	"mainFooter": "Footer_mainFooter__g_VtH",
	"copyrights": "Footer_copyrights__BYHav"
};


/***/ }),

/***/ 3989:
/***/ ((module) => {

// Exports
module.exports = {
	"header": "MainNavigation_header__BSiXz",
	"logo": "MainNavigation_logo__b_03K",
	"userInfo": "MainNavigation_userInfo__wglI2"
};


/***/ }),

/***/ 9299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./views/components/Layout/Footer.module.scss
var Footer_module = __webpack_require__(5078);
var Footer_module_default = /*#__PURE__*/__webpack_require__.n(Footer_module);
;// CONCATENATED MODULE: ./views/components/Layout/Footer.tsx



const Footer = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
        className: (Footer_module_default()).mainFooter,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: "navButton",
                            href: "/privacy-policy",
                            children: "Privacy Policy"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: "navButton",
                            href: "/about",
                            children: "About"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (Footer_module_default()).copyrights,
                children: [
                    "Copyright \xa9 ",
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#github",
                        children: "Piotr Podstawski"
                    }),
                    " 2022"
                ]
            })
        ]
    });
};
/* harmony default export */ const Layout_Footer = (Footer);

// EXTERNAL MODULE: ./views/store/auth-context.tsx
var auth_context = __webpack_require__(3446);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./views/components/Layout/MainNavigation.module.scss
var MainNavigation_module = __webpack_require__(3989);
var MainNavigation_module_default = /*#__PURE__*/__webpack_require__.n(MainNavigation_module);
// EXTERNAL MODULE: ./views/util/constValues.ts
var constValues = __webpack_require__(7688);
// EXTERNAL MODULE: ./views/components/Layout/NavLink.tsx
var NavLink = __webpack_require__(2315);
// EXTERNAL MODULE: ./views/components/Common/UserProfilePicture.tsx
var UserProfilePicture = __webpack_require__(6642);
// EXTERNAL MODULE: ./views/components/Common/IconSVG.tsx
var IconSVG = __webpack_require__(4502);
;// CONCATENATED MODULE: ./views/components/Layout/MainNavigation.tsx










const MainNavigation = ()=>{
    const authCtx = (0,auth_context/* useAuthContext */.Eu)();
    const router = (0,router_.useRouter)();
    const isLoggedIn = authCtx.isLoggedIn;
    const user = authCtx.user;
    const logoutHandler = async ()=>{
        try {
            const response = await fetch(constValues/* default.URLS.API_POST */.ZP.URLS.API_POST + constValues/* default.URLS.LOGOUT */.ZP.URLS.LOGOUT, {
                method: "POST",
                credentials: "include"
            });
            const responseJSON = await response.json();
            if (responseJSON.ok) {
                authCtx.logout();
                router.push("/");
            } else {
                console.log({
                    status: "error",
                    message: "Encountered server error while trying to logout."
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: (MainNavigation_module_default()).header,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: (MainNavigation_module_default()).logo,
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/images/kitty_white_rotated.png",
                        alt: "Meme Platform Logo"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                children: [
                    isLoggedIn ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: (MainNavigation_module_default()).userInfo,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(UserProfilePicture/* default */.Z, {
                                src: user.profileImage,
                                alt: user.username,
                                place: "MAIN_MENU"
                            }),
                            " Hi! ",
                            user.username,
                            "!"
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: (MainNavigation_module_default()).userInfo,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(UserProfilePicture/* default */.Z, {
                                src: "images/unknown.jpg",
                                alt: "Not logged in",
                                place: "MAIN_MENU"
                            }),
                            "You are not logged in"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(NavLink/* NavLink */.O, {
                                    href: "/",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        className: "navButton",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                                src: "home",
                                                alt: "Feed"
                                            }),
                                            "Feed"
                                        ]
                                    })
                                })
                            }),
                            !isLoggedIn && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(NavLink/* NavLink */.O, {
                                    href: "/login",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        className: "navButton",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                                src: "user",
                                                alt: "Login"
                                            }),
                                            "Login"
                                        ]
                                    })
                                })
                            }),
                            !isLoggedIn && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(NavLink/* NavLink */.O, {
                                    href: "/signup",
                                    shallow: false,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        className: "navButton",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                                src: "user-plus",
                                                alt: "Signup"
                                            }),
                                            "Signup"
                                        ]
                                    })
                                })
                            }),
                            isLoggedIn && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(NavLink/* NavLink */.O, {
                                    href: "/admin",
                                    hasSubcategories: true,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        className: "navButton",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                                src: "edit",
                                                alt: "Manage memes"
                                            }),
                                            "Manage memes"
                                        ]
                                    })
                                })
                            }),
                            isLoggedIn && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(NavLink/* NavLink */.O, {
                                    href: "/profile",
                                    shallow: false,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                        className: "navButton",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                                src: "user-detail",
                                                alt: "Profile"
                                            }),
                                            "Profile"
                                        ]
                                    })
                                })
                            }),
                            isLoggedIn && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                    className: "navButton",
                                    onClick: logoutHandler,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                                            src: "user-minus",
                                            alt: "Logout"
                                        }),
                                        "Logout"
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Layout_MainNavigation = (MainNavigation);

;// CONCATENATED MODULE: ./views/components/Layout/Layout.tsx




const Layout = (props)=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Layout_MainNavigation, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                children: props.children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Layout_Footer, {})
        ]
    });
};
/* harmony default export */ const Layout_Layout = (Layout);

;// CONCATENATED MODULE: ./pages/_app.tsx







const MyApp = ({ Component , pageProps  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(auth_context/* default */.ZP, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Layout_Layout, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
};
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 4502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const IconSVG = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
        className: "iconSVG",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: "/icons/" + props.src + ".svg",
            alt: props.alt
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconSVG);


/***/ }),

/***/ 6642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const UserProfilePicture = (props)=>{
    let additionalClasses = "";
    if (props.place === "MAIN_MENU") {
        additionalClasses += " mainMenu";
    }
    if (props.place === "COMMENTS") {
        additionalClasses += " comments";
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: "userProfilePicture" + additionalClasses,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: "/" + props.src,
            alt: props.alt
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserProfilePicture);


/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,664,688,315,446], () => (__webpack_exec__(9299)));
module.exports = __webpack_exports__;

})();