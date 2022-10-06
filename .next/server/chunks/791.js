"use strict";
exports.id = 791;
exports.ids = [791];
exports.modules = {

/***/ 4034:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const inputChangeHandler = (stateSetterFunction, input, value)=>{
    stateSetterFunction((previousState)=>{
        let isValid = true;
        let validationMessage = "";
        let additionalInfo = {
            passwordStrength: 0
        };
        const previousStateFormInput = previousState.form[input];
        for (const validator of previousStateFormInput.validators){
            if (input === "password") {
                const validationResult = validator(value);
                additionalInfo.passwordStrength = validationResult.passwordStrength;
                isValid = isValid && validationResult.isValid;
                validationMessage = validationMessage ? validationMessage : validationResult.validationError;
            } else {
                const validationResult1 = validator(value);
                isValid = isValid && validationResult1.isValid;
                validationMessage = validationMessage ? validationMessage : validationResult1.validationError;
            }
        }
        const updatedForm = {
            ...previousState.form,
            [input]: {
                ...previousStateFormInput,
                valid: isValid,
                value,
                validationMessage
            }
        };
        if (input === "password" && additionalInfo.passwordStrength > 0) {
            updatedForm.password.additionalInfo.passwordStrength = additionalInfo.passwordStrength;
        }
        let formIsValid = true;
        for(const inputName in updatedForm){
            formIsValid = formIsValid && updatedForm[inputName].valid;
        }
        return {
            ...previousState,
            form: updatedForm,
            formIsValid: formIsValid
        };
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inputChangeHandler);


/***/ }),

/***/ 7752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_constValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7688);

const submitHandler = async (setStateForLoading, data)=>{
    setStateForLoading(true);
    const url = data.isLogin ? _util_constValues__WEBPACK_IMPORTED_MODULE_0__/* ["default"].URLS.LOGIN */ .ZP.URLS.LOGIN : _util_constValues__WEBPACK_IMPORTED_MODULE_0__/* ["default"].URLS.SIGNUP */ .ZP.URLS.SIGNUP;
    try {
        const response = await fetch(_util_constValues__WEBPACK_IMPORTED_MODULE_0__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + url, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                ...data
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        setStateForLoading(false);
        return await response.json();
    } catch (error) {
        console.log(error.message);
    } finally{
        setStateForLoading(false);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (submitHandler);


/***/ })

};
;