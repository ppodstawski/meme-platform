"use strict";
exports.id = 987;
exports.ids = [987];
exports.modules = {

/***/ 3987:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4214);
/* harmony import */ var _Form_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4530);
/* harmony import */ var _EditMeme_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6054);
/* harmony import */ var _EditMeme_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_EditMeme_module_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Form_Form_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8036);
/* harmony import */ var _Form_Form_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Form_Form_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Form_FilePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(388);
/* harmony import */ var _util_constValues__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7688);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Form_FlashMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6675);
/* harmony import */ var _helpers_inputChangeEditHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1912);
/* harmony import */ var _helpers_inputBlurHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1400);












const EditMeme = (props)=>{
    const addMemeConfig = {
        form: {
            title: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    _util_validators__WEBPACK_IMPORTED_MODULE_7__/* .required */ .C1,
                    (0,_util_validators__WEBPACK_IMPORTED_MODULE_7__/* .length */ .kE)({
                        min: 5
                    })
                ],
                validationMessage: ""
            },
            description: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    _util_validators__WEBPACK_IMPORTED_MODULE_7__/* .required */ .C1,
                    (0,_util_validators__WEBPACK_IMPORTED_MODULE_7__/* .length */ .kE)({
                        min: 10
                    })
                ],
                validationMessage: ""
            },
            image: {
                value: "",
                valid: false,
                touched: false,
                validators: [
                    _util_validators__WEBPACK_IMPORTED_MODULE_7__/* .required */ .C1
                ],
                validationMessage: ""
            }
        },
        formIsValid: false
    };
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const { 0: addMemeForm , 1: setAddMemeForm  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(addMemeConfig);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: statusMessage , 1: setStatusMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        result: "",
        message: ""
    });
    const { 0: imagePreview , 1: setImagePreview  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { memeId  } = router.query;
    const editMode = props.mode === "EDIT";
    const imgSettings = {
        contain: false,
        left: true
    };
    const inputChangeHandler = (input, value, files)=>{
        (0,_helpers_inputChangeEditHandler__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(setAddMemeForm, setImagePreview, input, value, files);
    };
    const inputBlurHandler = (input)=>{
        (0,_helpers_inputBlurHandler__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(setAddMemeForm, input);
    };
    const submitHandler = async (event)=>{
        event.preventDefault();
        const dataToPost = {
            title: addMemeForm.form.title.value,
            description: addMemeForm.form.description.value,
            image: addMemeForm.form.image.value
        };
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", dataToPost.title);
        formData.append("description", dataToPost.description);
        if (dataToPost.image) {
            formData.append("image", dataToPost.image);
        }
        try {
            let url = _util_constValues__WEBPACK_IMPORTED_MODULE_4__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/add-meme";
            let method = "POST";
            if (editMode && typeof memeId === "string") {
                url = _util_constValues__WEBPACK_IMPORTED_MODULE_4__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/update-meme";
                method = "PATCH";
                formData.append("memeId", memeId);
            }
            const response = await fetch(url, {
                method,
                credentials: "include",
                body: formData
            });
            const responseJSON = await response.json();
            setStatusMessage(responseJSON.flash);
            if (responseJSON.ok) {
                router.push("/admin");
            }
        } catch (error) {
            console.log(error.message);
        } finally{
            setIsLoading(false);
        }
    };
    const getMemeForEdit = async (memeId)=>{
        setIsLoading(true);
        try {
            const response = await fetch(_util_constValues__WEBPACK_IMPORTED_MODULE_4__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/get-meme", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    memeId: memeId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseJSON = await response.json();
            setStatusMessage(responseJSON.flash);
            const editMemeData = responseJSON.body[0];
            setAddMemeForm((previousState)=>{
                const prevForm = previousState.form;
                const updatedForm = {
                    title: {
                        ...prevForm.title,
                        value: editMemeData.title,
                        valid: true,
                        touched: true
                    },
                    description: {
                        ...prevForm.description,
                        value: editMemeData.description,
                        valid: true,
                        touched: true
                    },
                    image: {
                        ...prevForm.image
                    }
                };
                setImagePreview(_util_constValues__WEBPACK_IMPORTED_MODULE_4__/* ["default"].URLS.APP */ .ZP.URLS.APP + "/" + editMemeData.imageUrl);
                return {
                    ...previousState,
                    form: updatedForm
                };
            });
        } catch (error) {
            console.log(error.message);
        } finally{
            setIsLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.mode === "EDIT" && memeId) {
            getMemeForEdit(memeId);
        }
    }, [
        memeId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: (_Form_Form_module_scss__WEBPACK_IMPORTED_MODULE_10___default().mainForm),
        children: [
            editMode ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Edit your Meme:"
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Add Meme right here:"
            }),
            statusMessage.message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Form_FlashMessage__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                result: statusMessage.result,
                message: statusMessage.message
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                onSubmit: submitHandler,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Form_Input__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        id: "title",
                        label: "Meme title",
                        placeholder: "Enter Meme title",
                        required: true,
                        type: "text",
                        control: "input",
                        onChange: inputChangeHandler,
                        onBlur: inputBlurHandler.bind(undefined, "title"),
                        value: addMemeForm.form["title"].value,
                        valid: addMemeForm.form["title"].valid,
                        validationMessage: addMemeForm.form["title"].validationMessage,
                        touched: addMemeForm.form["title"].touched
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Form_Input__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        id: "description",
                        label: "Meme description",
                        placeholder: "Type Meme description",
                        required: true,
                        type: "text",
                        control: "textarea",
                        onChange: inputChangeHandler,
                        onBlur: inputBlurHandler.bind(undefined, "description"),
                        value: addMemeForm.form["description"].value,
                        valid: addMemeForm.form["description"].valid,
                        validationMessage: addMemeForm.form["description"].validationMessage,
                        touched: addMemeForm.form["description"].touched
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Form_FilePicker__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        id: "image",
                        label: "The image, most vital part of Meme, don't screw it!",
                        onChange: inputChangeHandler,
                        onBlur: inputBlurHandler.bind(undefined, "image"),
                        valid: addMemeForm.form["image"].valid,
                        touched: addMemeForm.form["image"].touched
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_EditMeme_module_scss__WEBPACK_IMPORTED_MODULE_11___default().imagePreview),
                        children: [
                            !imagePreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Please choose an image."
                            }),
                            imagePreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("figure", {
                                style: {
                                    backgroundImage: `url('${imagePreview}')`,
                                    backgroundSize: imgSettings.contain ? "contain" : "cover",
                                    backgroundPosition: imgSettings.left ? "left" : "center"
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_Form_Form_module_scss__WEBPACK_IMPORTED_MODULE_10___default().actionsField),
                        children: [
                            !isLoading && !editMode && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                children: "Create Meme!"
                            }),
                            !isLoading && editMode && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                children: "Update Meme!"
                            }),
                            isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Sending request..."
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditMeme);


/***/ })

};
;