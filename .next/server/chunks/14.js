"use strict";
exports.id = 14;
exports.ids = [14];
exports.modules = {

/***/ 6642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 7630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_constValues__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7688);
/* harmony import */ var _Common_UserProfilePicture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6642);
/* harmony import */ var _Form_FlashMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6675);
/* harmony import */ var _FeedItemCommentForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3749);






const FeedItemComment = (props)=>{
    const { 0: editMode , 1: setEditMode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: message , 1: setMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.message);
    const { 0: formMessage , 1: setFormMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        result: "",
        message: ""
    });
    const deleteHandler = async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch(_util_constValues__WEBPACK_IMPORTED_MODULE_2__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/delete-comment", {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    commentId: props.id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseJSON = await response.json();
            if (responseJSON.ok && props.removeHandler) {
                props.removeHandler(props.id);
            }
        } catch (error) {
            console.log(error.message);
        } finally{
            setIsLoading(false);
        }
    };
    const editHandler = ()=>{
        setEditMode((previousState)=>!previousState);
    };
    const onUpdateMessage = (newMessage)=>{
        setMessage(newMessage);
        setEditMode(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMessage(props.message);
    }, [
        props.message
    ]);
    const showControlsClass = props.showControls ? " controls" : "";
    const hideProfilePictureClass = props.hideProfilePicture ? " hideProfilePicture" : "";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [
            isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: "Loading..."
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "commentField" + showControlsClass + hideProfilePictureClass,
                children: [
                    !isLoading && !editMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    !props.hideProfilePicture && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Common_UserProfilePicture__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                        src: props.creator.profileImage,
                                        alt: props.creator.username,
                                        place: "COMMENTS"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                        children: [
                                            props.creator.username,
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    message
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                children: props.creationDate
                            })
                        ]
                    }),
                    !isLoading && editMode && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FeedItemCommentForm__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        messageStateHandler: setFormMessage,
                        loadingStateHandler: setIsLoading,
                        memeId: props.memeId,
                        commentId: props.id,
                        action: "UPDATE",
                        filledMessage: message,
                        onUpdateHandler: onUpdateMessage
                    }),
                    editMode && formMessage.message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Form_FlashMessage__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        result: formMessage.result,
                        message: formMessage.message
                    }),
                    props.showControls && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "commentControls",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: editHandler,
                                className: editMode ? "actionButton editing" : "actionButton",
                                children: editMode ? "Stop editing" : "Edit"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: deleteHandler,
                                className: "actionButton",
                                children: "Delete"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedItemComment);


/***/ }),

/***/ 3749:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_constValues__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7688);



const FeedItemCommentForm = (props)=>{
    const feedItemIdRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { 0: message , 1: setMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.filledMessage ? props.filledMessage : "");
    const commentHandler = async (event)=>{
        event.preventDefault();
        if (message.length > 0) {
            props.loadingStateHandler(true);
            try {
                let url = _util_constValues__WEBPACK_IMPORTED_MODULE_2__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/post-comment";
                let method = "POST";
                if (props.action === "UPDATE") {
                    url = _util_constValues__WEBPACK_IMPORTED_MODULE_2__/* ["default"].URLS.API_POST */ .ZP.URLS.API_POST + "/update-comment";
                    method = "PATCH";
                }
                const commentData = {
                    memeId: props.memeId,
                    message
                };
                if (props.commentId) {
                    // @ts-ignore
                    commentData.commentId = props.commentId;
                }
                const response = await fetch(url, {
                    method,
                    credentials: "include",
                    body: JSON.stringify({
                        ...commentData
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const responseJSON = await response.json();
                if (!responseJSON.ok && responseJSON.flash) {
                    props.messageStateHandler(responseJSON.flash);
                }
                if (responseJSON.ok && props.onUpdateHandler) {
                    props.onUpdateHandler(message);
                }
            } catch (error) {
                console.log(error.message);
            } finally{
                props.loadingStateHandler(false);
            }
        } else {
            props.messageStateHandler({
                result: "error",
                message: "Please provide some message if you want to comment."
            });
        }
    };
    const onUpdateMessage = (event)=>{
        setMessage(event.target.value);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "comments",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                onSubmit: commentHandler,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "hidden",
                        ref: feedItemIdRef,
                        value: props.memeId
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "text",
                        onChange: onUpdateMessage,
                        placeholder: "Type your comment here",
                        value: message
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        children: "Submit comment"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedItemCommentForm);


/***/ })

};
;