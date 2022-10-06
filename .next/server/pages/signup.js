"use strict";
(() => {
var exports = {};
exports.id = 616;
exports.ids = [616];
exports.modules = {

/***/ 8593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ signup),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./views/components/Form/Input.tsx
var Input = __webpack_require__(4530);
// EXTERNAL MODULE: ./views/components/Form/FlashMessage.tsx
var FlashMessage = __webpack_require__(6675);
// EXTERNAL MODULE: ./views/components/Form/Form.module.scss
var Form_module = __webpack_require__(8036);
var Form_module_default = /*#__PURE__*/__webpack_require__.n(Form_module);
// EXTERNAL MODULE: ./views/helpers/inputChangeHandler.ts
var helpers_inputChangeHandler = __webpack_require__(4034);
// EXTERNAL MODULE: ./views/helpers/inputBlurHandler.ts
var helpers_inputBlurHandler = __webpack_require__(1400);
// EXTERNAL MODULE: ./views/helpers/submitHandler.ts
var helpers_submitHandler = __webpack_require__(7752);
// EXTERNAL MODULE: ./views/util/validators.ts
var validators = __webpack_require__(4214);
;// CONCATENATED MODULE: ./views/components/Auth/RegisterForm.tsx









const RegisterForm = (props)=>{
    const signupConfig = {
        form: {
            email: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    validators/* required */.C1,
                    validators/* email */.Do
                ],
                validationMessage: ""
            },
            username: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    validators/* required */.C1,
                    (0,validators/* length */.kE)({
                        min: 3
                    })
                ],
                validationMessage: ""
            },
            password: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    validators/* required */.C1,
                    validators/* password */.Bj
                ],
                validationMessage: "",
                additionalInfo: {
                    passwordStrength: 0
                }
            }
        },
        formIsValid: false
    };
    const { 0: signupForm , 1: setSignupForm  } = (0,external_react_.useState)(signupConfig);
    const { 0: isLoading , 1: setIsLoading  } = (0,external_react_.useState)(false);
    const { 0: formMessage , 1: setFormMessage  } = (0,external_react_.useState)({
        result: "",
        message: ""
    });
    const csrfInputRef = (0,external_react_.useRef)();
    const inputChangeHandler = (input, value)=>{
        (0,helpers_inputChangeHandler/* default */.Z)(setSignupForm, input, value);
    };
    const inputBlurHandler = (input)=>{
        (0,helpers_inputBlurHandler/* default */.Z)(setSignupForm, input);
    };
    const submitHandler = async (event)=>{
        event.preventDefault();
        if (typeof csrfInputRef === "undefined") {
            setFormMessage({
                result: "error",
                message: "CSRF Token not acquired."
            });
            return;
        }
        const dataToPost = {
            email: signupForm.form.email.value,
            username: signupForm.form.username.value,
            password: signupForm.form.password.value,
            _csrf: csrfInputRef.current.value,
            isLogin: false
        };
        const response = await (0,helpers_submitHandler/* default */.Z)(setIsLoading, dataToPost);
        if (response) {
            setFormMessage(response);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: (Form_module_default()).mainForm,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: "Sign Up"
            }),
            formMessage.message && /*#__PURE__*/ jsx_runtime_.jsx(FlashMessage/* default */.Z, {
                result: formMessage.result,
                message: formMessage.message
            }),
            !props.csrfToken && /*#__PURE__*/ jsx_runtime_.jsx(FlashMessage/* default */.Z, {
                result: "error",
                message: "Error: token not received! Submission is not possible."
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: submitHandler,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                            id: "email",
                            label: "Your email",
                            placeholder: "Type your email",
                            required: true,
                            type: "email",
                            control: "input",
                            onChange: inputChangeHandler,
                            onBlur: inputBlurHandler.bind(undefined, "email"),
                            value: signupForm.form["email"].value,
                            valid: signupForm.form["email"].valid,
                            validationMessage: signupForm.form["email"].validationMessage,
                            touched: signupForm.form["email"].touched
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                            id: "username",
                            label: "Your username",
                            placeholder: "Type your username",
                            required: true,
                            type: "text",
                            control: "input",
                            onChange: inputChangeHandler,
                            onBlur: inputBlurHandler.bind(undefined, "username"),
                            value: signupForm.form["username"].value,
                            valid: signupForm.form["username"].valid,
                            validationMessage: signupForm.form["username"].validationMessage,
                            touched: signupForm.form["username"].touched
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                            id: "password",
                            label: "Your password",
                            placeholder: "Enter your password",
                            required: true,
                            type: "password",
                            control: "input",
                            onChange: inputChangeHandler,
                            onBlur: inputBlurHandler.bind(undefined, "password"),
                            value: signupForm.form["password"].value,
                            valid: signupForm.form["password"].valid,
                            validationMessage: signupForm.form["password"].validationMessage,
                            touched: signupForm.form["password"].touched,
                            additionalInfo: signupForm.form["password"].additionalInfo
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (Form_module_default()).actionsField,
                        children: [
                            !isLoading && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                disabled: !props.csrfToken,
                                children: "Create Account"
                            }),
                            isLoading && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "Sending request..."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: "/login",
                                children: "Login with existing account"
                            }),
                            props.csrfToken && /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "_csrf",
                                type: "hidden",
                                value: props.csrfToken,
                                ref: csrfInputRef
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Auth_RegisterForm = (RegisterForm);

;// CONCATENATED MODULE: ./pages/signup.tsx



const SignupPage = ({ csrfToken  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Auth_RegisterForm, {
            csrfToken: csrfToken
        })
    });
};
const getServerSideProps = async ({ res  })=>{
    const csrfToken = res.locals.csrfToken;
    return {
        props: {
            csrfToken
        }
    };
};
/* harmony default export */ const signup = (SignupPage);


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [688,691,791], () => (__webpack_exec__(8593)));
module.exports = __webpack_exports__;

})();