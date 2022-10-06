exports.id = 691;
exports.ids = [691];
exports.modules = {

/***/ 2219:
/***/ ((module) => {

// Exports
module.exports = {
	"flashMessage": "FlashMessage_flashMessage__2D1Ek"
};


/***/ }),

/***/ 8036:
/***/ ((module) => {

// Exports
module.exports = {
	"mainForm": "Form_mainForm__hu6sw",
	"actionsField": "Form_actionsField__O5__w"
};


/***/ }),

/***/ 2384:
/***/ ((module) => {

// Exports
module.exports = {
	"inputField": "Input_inputField__A17yQ"
};


/***/ }),

/***/ 6675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FlashMessage_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2219);
/* harmony import */ var _FlashMessage_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FlashMessage_module_scss__WEBPACK_IMPORTED_MODULE_2__);



const FlashMessage = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_FlashMessage_module_scss__WEBPACK_IMPORTED_MODULE_2___default().flashMessage),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: "messageText " + props.result + "Msg",
            children: props.message
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlashMessage);


/***/ }),

/***/ 4530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2384);
/* harmony import */ var _Input_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Input_module_scss__WEBPACK_IMPORTED_MODULE_2__);



const Input = (props)=>{
    let passPower = 0;
    if (props.additionalInfo && props.additionalInfo.passwordStrength) {
        passPower = props.additionalInfo.passwordStrength;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_Input_module_scss__WEBPACK_IMPORTED_MODULE_2___default().inputField),
        children: [
            props.label && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: props.id,
                children: props.label
            }),
            props.control === "input" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                className: [
                    !props.valid ? "invalid" : "valid",
                    props.touched ? "touched" : "untouched"
                ].join(" "),
                type: props.type,
                id: props.id,
                required: props.required,
                value: props.value,
                placeholder: props.placeholder,
                onChange: (e)=>props.onChange(props.id, e.target.value, e.target.files),
                onBlur: props.onBlur
            }),
            props.control === "textarea" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                className: [
                    !props.valid ? "invalid" : "valid",
                    props.touched ? "touched" : "untouched"
                ].join(" "),
                id: props.id,
                rows: props.textareaRows,
                required: props.required,
                value: props.value,
                placeholder: props.placeholder,
                onChange: (e)=>props.onChange(props.id, e.target.value),
                onBlur: props.onBlur
            }),
            passPower === 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "pass-result-strong",
                children: "Strong password"
            }),
            passPower === 2 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "pass-result-medium",
                children: "Medium password"
            }),
            passPower === 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "pass-result-weak",
                children: "Weak password"
            }),
            props.validationMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "validation-error-msg",
                children: props.validationMessage
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);


/***/ }),

/***/ 1400:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const inputBlurHandler = (stateSetterFunction, input)=>{
    stateSetterFunction((previousState)=>{
        return {
            ...previousState,
            form: {
                ...previousState.form,
                [input]: {
                    ...previousState.form[input],
                    touched: true
                }
            }
        };
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inputBlurHandler);


/***/ }),

/***/ 4214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bj": () => (/* binding */ password),
/* harmony export */   "C1": () => (/* binding */ required),
/* harmony export */   "Do": () => (/* binding */ email),
/* harmony export */   "kE": () => (/* binding */ length)
/* harmony export */ });
const required = (value)=>{
    const isValid = value.trim() !== "";
    const validationError = isValid ? "" : "This field is required.";
    return {
        isValid,
        validationError
    };
};
const length = (config)=>(value)=>{
        let isValid = true;
        let validationError = "";
        if (config.min) {
            isValid = isValid && value.trim().length >= config.min;
            validationError = isValid ? "" : `This field requires at least ${config.min} characters.`;
        }
        if (config.max) {
            isValid = isValid && value.trim().length <= config.max;
            validationError = isValid ? "" : `This field can only be ${config.max} characters long.`;
        }
        return {
            isValid,
            validationError
        };
    };
const email = (value)=>{
    const isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
    const validationError = isValid ? "" : "This field requires valid email.";
    return {
        isValid,
        validationError
    };
};
const password = (value)=>{
    const passwordSettings = {
        strongHintMsg: "Hint: strong level password needs to have at least two special characters, at least one digit and 8 characters long.",
        mediumHintMsg: "Valid password requires lower and uppercase letters with at least one special character, and must be at least six characters long.",
        strongRegex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        mediumRegex: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
        twoSpecialCharRegex: /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/
    };
    let isValid = false;
    let validationError = "";
    let passwordStrength = 0;
    if (passwordSettings.strongRegex.test(value) && passwordSettings.twoSpecialCharRegex.test(value)) {
        isValid = true;
        validationError = "";
        passwordStrength = 3;
    } else if (passwordSettings.mediumRegex.test(value)) {
        isValid = true;
        validationError = passwordSettings.strongHintMsg;
        passwordStrength = 2;
    } else {
        isValid = false;
        validationError = passwordSettings.mediumHintMsg;
        passwordStrength = 1;
    }
    return {
        isValid,
        validationError,
        passwordStrength
    };
};


/***/ })

};
;