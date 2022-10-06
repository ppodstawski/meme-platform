exports.id = 906;
exports.ids = [906];
exports.modules = {

/***/ 8943:
/***/ ((module) => {

// Exports
module.exports = {
	"feedItem": "Feed_feedItem__Aiwxo",
	"commentsLoginInfo": "Feed_commentsLoginInfo__i4Vkp"
};


/***/ }),

/***/ 2219:
/***/ ((module) => {

// Exports
module.exports = {
	"flashMessage": "FlashMessage_flashMessage__2D1Ek"
};


/***/ }),

/***/ 7723:
/***/ ((module) => {

// Exports
module.exports = {
	"reactionPanel": "ReactionPanel_reactionPanel__cNIgz"
};


/***/ }),

/***/ 8769:
/***/ ((module) => {

// Exports
module.exports = {
	"reactionSumStar": "ReactionSumStar_reactionSumStar__G5a3y"
};


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

/***/ 3474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Feed_FeedItemContent)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./views/util/dateFormat.ts
var dateFormat = __webpack_require__(4420);
// EXTERNAL MODULE: ./views/store/auth-context.tsx
var auth_context = __webpack_require__(3446);
// EXTERNAL MODULE: ./views/util/constValues.ts
var constValues = __webpack_require__(7688);
// EXTERNAL MODULE: ./views/components/Common/IconSVG.tsx
var IconSVG = __webpack_require__(4502);
;// CONCATENATED MODULE: ./views/components/Reactions/ReactionIcon.tsx



const ReactionIcon = (props)=>{
    const reactButtonHandler = async ()=>{
        if (!props.isButtonActive) {
            return;
        }
        props.setStateForLoading(true);
        try {
            await fetch(constValues/* default.URLS.API_POST */.ZP.URLS.API_POST + "/add-reaction", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    type: props.emoji.number,
                    memeId: props.memeId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error.message);
        } finally{
            props.setStateForLoading(false);
        }
    };
    const dimClass = props.numberOfReactions === 0 ? " dimItem" : "";
    const isActiveClass = props.isButtonActive ? " active" : " inactive";
    const isChosenTypeClass = props.chosenType === props.emoji.number ? " isChosen" : "";
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: "reactionIcon" + dimClass,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: "/images/cheese-emojis/emoji-" + props.emoji.name + ".png",
                alt: props.emoji.name,
                onClick: reactButtonHandler,
                className: isActiveClass
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("b", {
                className: isChosenTypeClass,
                children: props.numberOfReactions
            })
        ]
    });
};
/* harmony default export */ const Reactions_ReactionIcon = (ReactionIcon);

// EXTERNAL MODULE: ./views/components/Reactions/ReactionPanel.module.scss
var ReactionPanel_module = __webpack_require__(7723);
var ReactionPanel_module_default = /*#__PURE__*/__webpack_require__.n(ReactionPanel_module);
;// CONCATENATED MODULE: ./views/components/Reactions/ReactionPanel.tsx







const ReactionPanel = (props)=>{
    const authCtx = (0,auth_context/* useAuthContext */.Eu)();
    const loggedUserId = authCtx.user.userId;
    const isLoggedIn = authCtx.isLoggedIn;
    const { 0: isLoading , 1: setIsLoading  } = (0,external_react_.useState)(false);
    const { 0: hasUserReacted , 1: setHasUserReacted  } = (0,external_react_.useState)(false);
    const { 0: chosenType , 1: setChosenType  } = (0,external_react_.useState)(0);
    const showButtons = props.showReactionButtons;
    const reactRemoveButtonHandler = async ()=>{
        setIsLoading(true);
        try {
            await fetch(constValues/* default.URLS.API_POST */.ZP.URLS.API_POST + "/remove-reaction", {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    memeId: props.memeId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error.message);
        } finally{
            setIsLoading(false);
        }
    };
    const checkIfUserReacted = ()=>{
        let switchHasReacted = false;
        let chosen = 0;
        props.reactions.forEach((reactionType)=>{
            const hasReacted = reactionType.Users.find((user)=>user.id === loggedUserId);
            if (!!hasReacted) {
                chosen = reactionType.type;
                switchHasReacted = true;
            }
        });
        setChosenType(chosen);
        setHasUserReacted(switchHasReacted);
    };
    (0,external_react_.useEffect)(()=>{
        checkIfUserReacted();
    }, [
        checkIfUserReacted
    ]);
    const calculateReactionsByType = (type)=>{
        const reactionByType = props.reactions.find((reaction)=>reaction.type === type);
        if (!!reactionByType) {
            return reactionByType.Users.flat().length;
        }
        return 0;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (ReactionPanel_module_default()).reactionPanel,
        children: [
            showButtons && (hasUserReacted ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "reactBtn remove",
                        onClick: reactRemoveButtonHandler,
                        children: "Remove reaction"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "reactInfo",
                        children: "You reacted already!"
                    })
                ]
            }) : isLoggedIn ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                className: "reactBtn inactive",
                disabled: true,
                children: [
                    "Here you can react ",
                    /*#__PURE__*/ jsx_runtime_.jsx(IconSVG/* default */.Z, {
                        src: "right-arrow-alt",
                        alt: "Arrow right"
                    })
                ]
            }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                className: "reactBtn inactive",
                disabled: true,
                children: "Need to login to react!"
            })),
            isLoading && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                children: "Loading reactions..."
            }),
            !isLoading && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                children: constValues/* Emojis.map */.Ax.map((emoji)=>/*#__PURE__*/ jsx_runtime_.jsx(Reactions_ReactionIcon, {
                        emoji: emoji,
                        numberOfReactions: calculateReactionsByType(emoji.number),
                        setStateForLoading: setIsLoading,
                        memeId: props.memeId,
                        isButtonActive: showButtons && isLoggedIn && !hasUserReacted,
                        chosenType: chosenType
                    }))
            })
        ]
    });
};
/* harmony default export */ const Reactions_ReactionPanel = (ReactionPanel);

// EXTERNAL MODULE: ./views/components/Reactions/ReactionSumStar.module.scss
var ReactionSumStar_module = __webpack_require__(8769);
var ReactionSumStar_module_default = /*#__PURE__*/__webpack_require__.n(ReactionSumStar_module);
;// CONCATENATED MODULE: ./views/components/Reactions/ReactionSumStar.tsx



const ReactionSumStar = (props)=>{
    const calculateAllReactions = ()=>{
        const reactionsByType = props.reactions.map((reactionType)=>reactionType.Users);
        return reactionsByType.flat().length;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: (ReactionSumStar_module_default()).reactionSumStar,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("b", {
                children: calculateAllReactions()
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: "/images/star.png",
                alt: "Star for number of reactions"
            })
        ]
    });
};
/* harmony default export */ const Reactions_ReactionSumStar = (ReactionSumStar);

;// CONCATENATED MODULE: ./views/components/Feed/FeedItemContent.tsx





const FeedItemContent = (props)=>{
    const feedItemCreatedAt = (0,dateFormat/* dateFormat */.v)(props.createdAt);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
        className: "feedItemContent",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        children: props.title
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        children: [
                            "by: ",
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                children: props.User.username
                            }),
                            ", at: ",
                            /*#__PURE__*/ jsx_runtime_.jsx("time", {
                                children: feedItemCreatedAt
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                children: props.description
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Reactions_ReactionSumStar, {
                        reactions: props.reactions
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: props.imageUrl,
                        alt: props.title
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Reactions_ReactionPanel, {
                reactions: props.reactions,
                memeId: props.id,
                showReactionButtons: props.showReactionButtons
            })
        ]
    });
};
/* harmony default export */ const Feed_FeedItemContent = (FeedItemContent);


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

/***/ 4420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ dateFormat)
/* harmony export */ });
const dateFormat = (date)=>new Date(date).toLocaleString("en-GB", {
        timeZone: "UTC"
    });


/***/ })

};
;