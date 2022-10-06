"use strict";
exports.id = 446;
exports.ids = [446];
exports.modules = {

/***/ 3446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Eu": () => (/* binding */ useAuthContext),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_constValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7688);




let logoutTimer;
const AuthContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext({
    token: "",
    isLoggedIn: false,
    user: {
        userId: 0,
        email: "",
        username: "",
        profileImage: "images/no_profile_picture.png"
    },
    login: (token, expirationTime)=>{},
    logout: ()=>{}
});
const calculateRemainingTime = (expirationTime)=>{
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};
const retrieveStoredToken = ()=>{
    if (false) {}
};
const AuthContextProvider = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const tokenData = retrieveStoredToken();
    const { 0: token , 1: setToken  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tokenData);
    const [isLoggedIn, setIsLoggedIn] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const [userState, setUser] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
        userId: 0,
        email: "",
        username: "",
        profileImage: "images/no_profile_picture.png"
    });
    const getUser = async ()=>{
        try {
            const response = await fetch(_util_constValues__WEBPACK_IMPORTED_MODULE_3__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + _util_constValues__WEBPACK_IMPORTED_MODULE_3__/* ["default"].URLS.IS_LOGGED_IN */ .ZP.URLS.IS_LOGGED_IN, {
                method: "GET",
                credentials: "include"
            });
            const responseJSON = await response.json();
            if (responseJSON.ok) {
                setUser(responseJSON.body);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const logoutHandler = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (false) {}
    }, []);
    const loginHandler = (updateToken, expirationTime, user)=>{
        if (false) {}
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getUser();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [
        tokenData,
        logoutHandler
    ]);
    const state = {
        token: token,
        user: userState,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: state,
        children: props.children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthContextProvider);
const useAuthContext = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);


/***/ })

};
;