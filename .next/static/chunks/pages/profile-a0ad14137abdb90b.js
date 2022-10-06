(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{6896:function(e,a,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return r(7246)}])},7246:function(e,a,r){"use strict";r.r(a),r.d(a,{default:function(){return b}});var n=r(5893),i=r(7294),t=r(7568),o=r(6042),s=r(9396),l=r(4051),u=r.n(l),d=r(4214),c=r(4530),m=r(388),f=r(6675),v=r(8742),h=r.n(v),p=r(4637),g=r.n(p),x=r(7688),Z=r(1912),w=r(1400),j=void 0,_=function(){var e={form:{email:{value:"",valid:!1,touched:!1,validators:[d.C1,d.Do],validationMessage:""},username:{value:"",valid:!1,touched:!1,validators:[d.C1,(0,d.kE)({min:3})],validationMessage:""},description:{value:"",valid:!1,touched:!1,validators:[],validationMessage:""},profileImage:{value:"",valid:!1,touched:!1,validators:[],validationMessage:""}},formIsValid:!1},a=(0,i.useState)(e),r=a[0],l=a[1],v=(0,i.useState)(!1),p=v[0],_=v[1],b=(0,i.useState)({result:"",message:""}),y=b[0],M=b[1],I=(0,i.useState)(""),P=I[0],E=I[1],F=!1,N=!0,S=function(e,a,r){(0,Z.Z)(l,E,e,a,r)},C=function(e){(0,w.Z)(l,e)},k=function(){var e=(0,t.Z)(u().mark((function e(a){var n,i,t,o;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n={username:r.form.username.value,description:r.form.description.value,profileImage:r.form.profileImage.value},_(!0),(i=new FormData).append("username",n.username),i.append("description",n.description),n.profileImage&&i.append("image",n.profileImage),e.prev=7,e.next=10,fetch(x.ZP.URLS.API_POST+"/update-profile",{method:"PATCH",credentials:"include",body:i});case 10:return t=e.sent,e.next=13,t.json();case 13:o=e.sent,M(o.flash),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(7),console.log(e.t0.message);case 20:return e.prev=20,_(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[7,17,20,23]])})));return function(a){return e.apply(this,arguments)}}(),z=function(){var e=(0,t.Z)(u().mark((function e(){var a,r,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _(!0),e.prev=1,e.next=4,fetch(x.ZP.URLS.API_POST+"/get-profile-info",{method:"GET",credentials:"include"});case 4:return a=e.sent,e.next=7,a.json();case 7:r=e.sent,n=r.body,l((function(e){var a=e.form,r={email:(0,s.Z)((0,o.Z)({},a.email),{value:n.email,valid:!0,touched:!0}),username:(0,s.Z)((0,o.Z)({},a.username),{value:n.username,valid:!0,touched:!0}),description:(0,s.Z)((0,o.Z)({},a.description),{value:n.description,valid:!0,touched:!0}),profileImage:(0,o.Z)({},a.profileImage)};return E(x.ZP.URLS.APP+"/"+n.profileImage),(0,s.Z)((0,o.Z)({},e),{form:r})})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0.message);case 15:return e.prev=15,_(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[1,12,15,18]])})));return function(){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){z()}),[]),(0,n.jsxs)("section",{className:g().mainForm,children:[(0,n.jsx)("h2",{children:"Edit your profile:"}),y.message&&(0,n.jsx)(f.Z,{result:y.result,message:y.message}),(0,n.jsxs)("form",{onSubmit:k,children:[(0,n.jsx)(c.Z,{id:"email",label:"Here in the future you will be able to change your email",placeholder:"Enter your email",required:!0,type:"email",control:"input",onChange:S,onBlur:C.bind(j,"email"),value:r.form.email.value,valid:r.form.email.valid,validationMessage:r.form.email.validationMessage,touched:r.form.email.touched}),(0,n.jsx)(c.Z,{id:"username",label:"Here you can change your username",placeholder:"Enter your username",required:!0,type:"text",control:"input",onChange:S,onBlur:C.bind(j,"username"),value:r.form.username.value,valid:r.form.username.valid,validationMessage:r.form.username.validationMessage,touched:r.form.username.touched}),(0,n.jsx)(c.Z,{id:"description",label:"Profile description, you can write something cool",placeholder:"Your profile description",required:!0,type:"text",control:"textarea",onChange:S,onBlur:C.bind(j,"description"),value:r.form.description.value,valid:r.form.description.valid,validationMessage:r.form.description.validationMessage,touched:r.form.description.touched}),(0,n.jsx)(m.Z,{id:"profileImage",label:"Profile pic, this is how others will portray you",onChange:S,onBlur:C.bind(j,"profileImage"),valid:r.form.profileImage.valid,touched:r.form.profileImage.touched}),(0,n.jsxs)("div",{className:h().imagePreview,children:[!P&&(0,n.jsx)("p",{children:"Please choose an image."}),P&&(0,n.jsx)("figure",{style:{backgroundImage:"url('".concat(P,"')"),backgroundSize:F?"contain":"cover",backgroundPosition:N?"left":"center"}})]}),(0,n.jsxs)("div",{className:g().actionsField,children:[!p&&(0,n.jsx)("button",{children:"Update profile!"}),p&&(0,n.jsx)("p",{children:"Sending request..."})]})]})]})},b=function(){return(0,n.jsx)(i.Fragment,{children:(0,n.jsx)(_,{})})}},388:function(e,a,r){"use strict";var n=r(5893),i=(r(7294),r(2883)),t=r.n(i);a.Z=function(e){return(0,n.jsxs)("div",{className:t().inputField,children:[(0,n.jsx)("label",{htmlFor:e.id,children:e.label}),(0,n.jsx)("input",{className:[e.valid?"valid":"invalid",e.touched?"touched":"untouched"].join(" "),type:"file",id:e.id,onChange:function(a){return e.onChange(e.id,a.target.value,a.target.files)},onBlur:e.onBlur})]})}},6675:function(e,a,r){"use strict";var n=r(5893),i=(r(7294),r(9537)),t=r.n(i);a.Z=function(e){return(0,n.jsx)("div",{className:t().flashMessage,children:(0,n.jsx)("span",{className:"messageText "+e.result+"Msg",children:e.message})})}},4530:function(e,a,r){"use strict";var n=r(5893),i=(r(7294),r(2883)),t=r.n(i);a.Z=function(e){var a=0;return e.additionalInfo&&e.additionalInfo.passwordStrength&&(a=e.additionalInfo.passwordStrength),(0,n.jsxs)("div",{className:t().inputField,children:[e.label&&(0,n.jsx)("label",{htmlFor:e.id,children:e.label}),"input"===e.control&&(0,n.jsx)("input",{className:[e.valid?"valid":"invalid",e.touched?"touched":"untouched"].join(" "),type:e.type,id:e.id,required:e.required,value:e.value,placeholder:e.placeholder,onChange:function(a){return e.onChange(e.id,a.target.value,a.target.files)},onBlur:e.onBlur}),"textarea"===e.control&&(0,n.jsx)("textarea",{className:[e.valid?"valid":"invalid",e.touched?"touched":"untouched"].join(" "),id:e.id,rows:e.textareaRows,required:e.required,value:e.value,placeholder:e.placeholder,onChange:function(a){return e.onChange(e.id,a.target.value)},onBlur:e.onBlur}),3===a&&(0,n.jsx)("div",{className:"pass-result-strong",children:"Strong password"}),2===a&&(0,n.jsx)("div",{className:"pass-result-medium",children:"Medium password"}),1===a&&(0,n.jsx)("div",{className:"pass-result-weak",children:"Weak password"}),e.validationMessage&&(0,n.jsx)("div",{className:"validation-error-msg",children:e.validationMessage})]})}},1400:function(e,a,r){"use strict";var n=r(4924),i=r(6042),t=r(9396);a.Z=function(e,a){e((function(e){return(0,t.Z)((0,i.Z)({},e),{form:(0,t.Z)((0,i.Z)({},e.form),(0,n.Z)({},a,(0,t.Z)((0,i.Z)({},e.form[a]),{touched:!0})))})}))}},1912:function(e,a,r){"use strict";r.d(a,{Z:function(){return o}});var n=r(4924),i=r(6042),t=r(9396),o=function(e,a,r,o,s){s&&function(e){var a=new FileReader,r=new Promise((function(e,r){a.onload=function(a){return e(a.target.result)},a.onerror=function(e){return r(e)}}));return a.readAsDataURL(e),r}(s[0]).then((function(e){a(e)})).catch((function(e){a("")})),e((function(e){var a=!0,l="",u=e.form[r],d=!0,c=!1,m=void 0;try{for(var f,v=u.validators[Symbol.iterator]();!(d=(f=v.next()).done);d=!0){var h=(0,f.value)(o);a=a&&h.isValid,l=l||h.validationError}}catch(Z){c=!0,m=Z}finally{try{d||null==v.return||v.return()}finally{if(c)throw m}}var p=(0,t.Z)((0,i.Z)({},e.form),(0,n.Z)({},r,(0,t.Z)((0,i.Z)({},u),{valid:a,value:s?s[0]:o,validationMessage:l}))),g=!0;for(var x in p)g=g&&p[x].valid;return(0,t.Z)((0,i.Z)({},e),{form:p,formIsValid:g})}))}},4214:function(e,a,r){"use strict";r.d(a,{Bj:function(){return o},C1:function(){return n},Do:function(){return t},kE:function(){return i}});var n=function(e){var a=""!==e.trim();return{isValid:a,validationError:a?"":"This field is required."}},i=function(e){return function(a){var r=!0,n="";return e.min&&(n=(r=r&&a.trim().length>=e.min)?"":"This field requires at least ".concat(e.min," characters.")),e.max&&(n=(r=r&&a.trim().length<=e.max)?"":"This field can only be ".concat(e.max," characters long.")),{isValid:r,validationError:n}}},t=function(e){var a=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e);return{isValid:a,validationError:a?"":"This field requires valid email."}},o=function(e){var a={strongHintMsg:"Hint: strong level password needs to have at least two special characters, at least one digit and 8 characters long.",mediumHintMsg:"Valid password requires lower and uppercase letters with at least one special character, and must be at least six characters long.",strongRegex:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,mediumRegex:/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,twoSpecialCharRegex:/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/},r=!1,n="",i=0;return a.strongRegex.test(e)&&a.twoSpecialCharRegex.test(e)?(r=!0,n="",i=3):a.mediumRegex.test(e)?(r=!0,n=a.strongHintMsg,i=2):(r=!1,n=a.mediumHintMsg,i=1),{isValid:r,validationError:n,passwordStrength:i}}},8742:function(e){e.exports={imagePreview:"EditMeme_imagePreview__HFvhv"}},9537:function(e){e.exports={flashMessage:"FlashMessage_flashMessage__2D1Ek"}},4637:function(e){e.exports={mainForm:"Form_mainForm__hu6sw",actionsField:"Form_actionsField__O5__w"}},2883:function(e){e.exports={inputField:"Input_inputField__A17yQ"}}},function(e){e.O(0,[774,888,179],(function(){return a=6896,e(e.s=a);var a}));var a=e.O();_N_E=a}]);