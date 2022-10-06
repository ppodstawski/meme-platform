exports.id = 614;
exports.ids = [614];
exports.modules = {

/***/ 6054:
/***/ ((module) => {

// Exports
module.exports = {
	"imagePreview": "EditMeme_imagePreview__HFvhv"
};


/***/ }),

/***/ 388:
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



const FilePicker = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_Input_module_scss__WEBPACK_IMPORTED_MODULE_2___default().inputField),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: props.id,
                children: props.label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                className: [
                    !props.valid ? "invalid" : "valid",
                    props.touched ? "touched" : "untouched"
                ].join(" "),
                type: "file",
                id: props.id,
                onChange: (e)=>props.onChange(props.id, e.target.value, e.target.files),
                onBlur: props.onBlur
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilePicker);


/***/ }),

/***/ 1912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ helpers_inputChangeEditHandler)
});

;// CONCATENATED MODULE: ./views/util/image.ts
const generateBase64FromImage = (imageFile)=>{
    const reader = new FileReader();
    const promise = new Promise((resolve, reject)=>{
        reader.onload = (e)=>resolve(e.target.result);
        reader.onerror = (err)=>reject(err);
    });
    reader.readAsDataURL(imageFile);
    return promise;
};

;// CONCATENATED MODULE: ./views/helpers/inputChangeEditHandler.ts

const inputChangeEditHandler = (stateSetterFunction, stateImagePreviewSetter, input, value, files)=>{
    if (files) {
        generateBase64FromImage(files[0]).then((b64)=>{
            stateImagePreviewSetter(b64);
        }).catch((error)=>{
            stateImagePreviewSetter("");
        });
    }
    stateSetterFunction((previousState)=>{
        let isValid = true;
        let validationMessage = "";
        const previousStateFormInput = previousState.form[input];
        for (const validator of previousStateFormInput.validators){
            const validationResult = validator(value);
            isValid = isValid && validationResult.isValid;
            validationMessage = validationMessage ? validationMessage : validationResult.validationError;
        }
        const updatedForm = {
            ...previousState.form,
            [input]: {
                ...previousStateFormInput,
                valid: isValid,
                value: files ? files[0] : value,
                validationMessage
            }
        };
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
/* harmony default export */ const helpers_inputChangeEditHandler = (inputChangeEditHandler);


/***/ })

};
;