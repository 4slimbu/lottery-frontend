(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{189:function(e,a,t){"use strict";var n=t(0),r=t.n(n),s=t(4),l=t(44);a.a=function(e){var a=e.ulClass,t=e.liClass,n=e.numbers,o=e.activeNumbers,i=e.handleClick;return r.a.createElement("ul",{className:l(a)},s.map(n,function(e,a){var n=o&&-1!==o.indexOf(e);return r.a.createElement("li",{key:a,className:l(t,{active:n})},i?r.a.createElement("a",{href:"javascript:void(0);",onClick:function(a){return i(e)}},e):r.a.createElement("span",null,e))}))}},257:function(e,a,t){"use strict";var n=t(24),r=t(25),s=t(27),l=t(26),o=t(28),i=t(58),c=t(0),u=t.n(c),m=t(190),d=t.n(m),p=t(18),h=t(15),v=t(16),g=t(45),b=t(22),E=t(264),f=t(265),y=t(223),k=t(269),N=t(270),O=t(191),j=t(271),w=t(272),S=t(273),C=t(263),A=t(335),M=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={pageNavDropdownOpen:!1,authNavDropdownOpen:!1},t.showLoginModal=t.showLoginModal.bind(Object(i.a)(Object(i.a)(t))),t.showRegisterModal=t.showRegisterModal.bind(Object(i.a)(Object(i.a)(t))),t.logoutHandler=t.logoutHandler.bind(Object(i.a)(Object(i.a)(t))),t.toggleAuthNav=t.toggleAuthNav.bind(Object(i.a)(Object(i.a)(t))),t.togglePageNav=t.togglePageNav.bind(Object(i.a)(Object(i.a)(t))),t.navigate=t.navigate.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"showLoginModal",value:function(){this.props.setModal("login")}},{key:"showRegisterModal",value:function(){this.props.setModal("register")}},{key:"logoutHandler",value:function(){var e=this.props,a=e.logout;e.history;a()}},{key:"toggleAuthNav",value:function(){this.setState(function(e){return{authNavDropdownOpen:!e.authNavDropdownOpen}})}},{key:"togglePageNav",value:function(){this.setState(function(e){return{pageNavDropdownOpen:!e.pageNavDropdownOpen}})}},{key:"navigate",value:function(e){this.props.history.push(e),this.setState({pageNavDropdownOpen:!1})}},{key:"render",value:function(){var e=this,a=this.state.pageNavDropdownOpen,t=this.props.auth,n=t.isAuthenticated,r=t.user;return u.a.createElement(c.Fragment,null,u.a.createElement(d.a,{component:"div",transitionName:"HeaderAnimation",transitionAppear:!0,transitionAppearTimeout:1500,transitionEnter:!1,transitionLeave:!1},u.a.createElement("header",null,u.a.createElement("div",{className:"container nav-container"},u.a.createElement(E.a,{expand:"md",className:""},u.a.createElement(f.a,{onClick:this.togglePageNav},u.a.createElement(C.a,{icon:A.a})),u.a.createElement(y.a,{isOpen:a,navbar:!0},u.a.createElement(k.a,{className:"mr-auto",navbar:!0},u.a.createElement(N.a,null,u.a.createElement(g.b,{onClick:function(){return e.navigate("/about")},className:"nav-link",to:"/about"},"About ")),u.a.createElement(N.a,null,u.a.createElement(g.b,{onClick:function(){return e.navigate("/faq")},className:"nav-link",to:"/faq"},"Faq ")),u.a.createElement(N.a,null,u.a.createElement(g.b,{onClick:function(){return e.navigate("/contact")},className:"nav-link",to:"/contact"},"Contact ")),u.a.createElement(N.a,null,u.a.createElement(g.b,{onClick:function(){return e.navigate("/winners")},className:"nav-link",to:"/winners"},"Winners"))))),u.a.createElement(k.a,null,!n&&u.a.createElement("ul",{className:"nav-items-link"},u.a.createElement("li",{className:"nav-item"},u.a.createElement("button",{className:"nav-link",onClick:this.showLoginModal},"Login")),u.a.createElement("li",{className:"nav-item"},u.a.createElement("button",{className:"nav-link",onClick:this.showRegisterModal},"Register"))),n&&u.a.createElement(O.a,{isOpen:this.state.authNavDropdownOpen,toggle:this.toggleAuthNav,className:"top-dropdown"},u.a.createElement(j.a,{caret:!0},u.a.createElement("img",{className:"img-profile",src:r.profile_pic,alt:"profile picture"})),u.a.createElement(w.a,null,u.a.createElement(S.a,{onClick:function(){return e.props.history.push("/my/dashboard")}},"Dashboard"),u.a.createElement(S.a,{onClick:function(){return e.props.history.push("/my/profile")}},"My Profile"),u.a.createElement(S.a,{onClick:this.logoutHandler},"Logout"))))))))}}]),a}(c.Component);Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{setModal:h.f,logout:v.a})(M));var R=t(347),L=t(59),P=t(322),G=t(304),F=t(305),I=t(301),B=t(306),D=t(229),T=t(34),Q=t(19),Y=t(5),H=t(192),W=(t(60),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={modal:!1,backdrop:!0,email:"",guestEmail:"",password:"",recoveryEmail:"",passwordResetCode:"",newPassword:"",confirmNewPassword:"",error:"",activeScreen:"login",isLoading:!0},t.closeModal=t.closeModal.bind(Object(i.a)(Object(i.a)(t))),t.changeBackdrop=t.changeBackdrop.bind(Object(i.a)(Object(i.a)(t))),t.handleChange=t.handleChange.bind(Object(i.a)(Object(i.a)(t))),t.handleLogin=t.handleLogin.bind(Object(i.a)(Object(i.a)(t))),t.handleLoginAsGuest=t.handleLoginAsGuest.bind(Object(i.a)(Object(i.a)(t))),t.handleSendRecoveryEmail=t.handleSendRecoveryEmail.bind(Object(i.a)(Object(i.a)(t))),t.handleResetPassword=t.handleResetPassword.bind(Object(i.a)(Object(i.a)(t))),t.activateScreen=t.activateScreen.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"componentWillUnmount",value:function(){this.setState({activeScreen:"login"})}},{key:"closeModal",value:function(){this.activateScreen("login"),this.resetFields(),this.props.updateBrowseHistory({autoTasks:[]}),this.props.setModal()}},{key:"changeBackdrop",value:function(e){var a=e.target.value;"static"!==a&&(a=JSON.parse(a)),this.setState({backdrop:a})}},{key:"activateScreen",value:function(e){this.setState({error:"",activeScreen:e})}},{key:"resetFields",value:function(){this.setState({email:"",guestEmail:"",password:"",recoveryEmail:"",passwordResetCode:"",newPassword:"",confirmNewPassword:""})}},{key:"handleChange",value:function(e){this.setState(Object(L.a)({},e.target.name,e.target.value))}},{key:"handleLogin",value:function(e,a,t){var n=this;if(!(a.length>0)){var r={email:this.state.email,password:this.state.password};this.setState({isLoading:!0}),this.props.makeRequest(Q.a.Auth.login,r,{message:Y.a.LOGGING}).then(function(e){n.props.auth.isVerified?n.props.setModal():n.props.setModal("verify"),n.props.history.push("/")},function(e){n.setState({error:e.message}),n.setState({isLoading:!1})})}}},{key:"handleLoginAsGuest",value:function(e,a,t){var n=this;if(!(a.length>0)){var r={email:this.state.guestEmail};this.setState({isLoading:!0}),this.props.makeRequest(Q.a.Auth.loginAsGuest,r,{message:Y.a.LOGGING}).then(function(e){n.props.setModal(),n.props.history.push("/")},function(e){n.setState({error:e.message}),n.setState({isLoading:!1})})}}},{key:"handleSendRecoveryEmail",value:function(e,a,t){var n=this;if(!(a.length>0)){var r={email:this.state.recoveryEmail};this.setState({isLoading:!0}),this.props.makeRequest(Q.a.Auth.forgotPassword,r,{message:Y.a.LOGGING}).then(function(e){n.setState({activeScreen:"resetPassword",isLoading:!1})},function(e){setTimeout(function(){this.setState({activeScreen:"resetPassword",isLoading:!1})}.bind(n),300)})}}},{key:"handleResetPassword",value:function(e,a,t){var n=this;if(!(a.length>0)){var r={email:this.state.recoveryEmail,token:this.state.passwordResetCode,password:this.state.newPassword};this.setState({isLoading:!0}),this.props.makeRequest(Q.a.Auth.resetPassword,r,{message:Y.a.LOGGING}).then(function(e){n.resetFields(),n.setState({activeScreen:"login",isLoading:!1})},function(e){n.setState({error:e.message}),n.setState({isLoading:!1})})}}},{key:"render",value:function(){var e=this,a="login"===this.props.appStatus.modal,t=this.state,n=t.error,r=t.email,s=t.guestEmail,l=t.password,o=t.recoveryEmail,i=t.passwordResetCode,m=t.newPassword,d=t.confirmNewPassword,p=(t.isLoading,t.activeScreen);return u.a.createElement(c.Fragment,null,u.a.createElement("div",null,u.a.createElement(P.a,{isOpen:a,toggle:this.closeModal,className:this.props.className,backdrop:this.state.backdrop},"login"===p&&u.a.createElement(G.a,{toggle:this.closeModal},"Sign In"),"loginAsGuest"===p&&u.a.createElement(G.a,{toggle:this.closeModal},"Sign In As Guest"),"sendRecoveryEmail"===p&&u.a.createElement(G.a,{toggle:this.closeModal},"Recover Password"),"resetPassword"===p&&u.a.createElement(G.a,{toggle:this.closeModal},"Reset Password"),u.a.createElement(F.a,null,n&&u.a.createElement("p",{className:"text-danger"},n),"login"===p&&u.a.createElement("div",null,u.a.createElement("div",{className:"login-as-user popup-form-wrap"},u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"Please sign in to your account.")),u.a.createElement(H.AvForm,{onSubmit:this.handleLogin},u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"email",type:"email",placeholder:"Email here...",onChange:this.handleChange,value:r,validate:{email:{value:!0,errorMessage:"Please enter a valid email address"},required:{value:!0,errorMessage:"Please enter an email address"}}}),u.a.createElement(H.AvFeedback,null))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"password",type:"password",placeholder:"Enter your password...",onChange:this.handleChange,value:l,validate:{required:{value:!0,errorMessage:"Please enter your password"},minLength:{value:6,errorMessage:"Your name must be at least 6 characters"}}})))),u.a.createElement(D.a,{className:"popup-btn"},"Sign In"),u.a.createElement("div",{className:"optional-links"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("sendRecoveryEmail")},className:"btn-link"},"Recover Password")," "," ",u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("loginAsGuest")},className:"btn-link"},"Sign in as Guest")," "," ")))),"loginAsGuest"===p&&u.a.createElement("div",{className:"login-as-guest popup-form-wrap"},u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"Only email is required to sign in as guest.")),u.a.createElement(H.AvForm,{onSubmit:this.handleLoginAsGuest},u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"guestEmail",type:"email",placeholder:"Email here...",onChange:this.handleChange,value:s,validate:{email:{value:!0,errorMessage:"Please enter a valid email address"},required:{value:!0,errorMessage:"Please enter an email address"}}}),u.a.createElement(H.AvFeedback,null)))),u.a.createElement(D.a,{className:"popup-btn"},"Sign in as Guest"),u.a.createElement("div",{className:"optional-links"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("login")},className:"btn-lg btn btn-link"},"Go Back")))),"sendRecoveryEmail"===p&&u.a.createElement("div",{className:"popup-form-wrap"},n&&u.a.createElement("p",{className:"text-danger"},n),u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"Please enter your email address to recover your password")),u.a.createElement("div",null,u.a.createElement(H.AvForm,{onSubmit:this.handleSendRecoveryEmail},u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"recoveryEmail",type:"email",placeholder:"Recovery Email here...",onChange:this.handleChange,value:o,validate:{email:{value:!0,errorMessage:"Please enter a valid email address"},required:{value:!0,errorMessage:"Please enter an email address"}}}),u.a.createElement(H.AvFeedback,null)))),u.a.createElement(D.a,{className:"popup-btn"},"Send Recovery Email"),u.a.createElement("div",{className:"optional-links"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("login")},className:"btn-lg btn btn-link"},"Go Back")," "," ")))),"resetPassword"===p&&u.a.createElement("div",{className:"popup-form-wrap"},n&&u.a.createElement("p",{className:"text-danger"},n),u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"A password reset code has been sent to your email. Please use it to reset your password.")),u.a.createElement(I.a,{className:"divider"}),u.a.createElement("div",null,u.a.createElement(H.AvForm,{onSubmit:this.handleResetPassword},u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"passwordResetCode",type:"text",placeholder:"Enter your reset code...",onChange:this.handleChange,value:i,validate:{required:{value:!0,errorMessage:"Please enter your password reset code"},minLength:{value:8,errorMessage:"Invalid code"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"newPassword",type:"password",placeholder:"Enter your password...",onChange:this.handleChange,value:m,validate:{required:{value:!0,errorMessage:"Please enter your password"},minLength:{value:6,errorMessage:"Your name must be at least 6 characters"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"confirmPassword",type:"password",placeholder:"Confirm your password...",onChange:this.handleChange,value:d,validate:{required:{value:!0,errorMessage:"Please enter your password"},match:{value:"newPassword",errorMessage:"Password and Confirm Password must match"}}})))),u.a.createElement("div",{className:"link-btn"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("sendRecoveryEmail")},className:"btn-lg btn btn-link"},"Go Back")," "," ",u.a.createElement(D.a,{className:"popup-btn"},"Reset Password")))))))))}}]),a}(c.Component));var x=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{setModal:h.f,makeRequest:T.a,updateBrowseHistory:h.h})(W)),J=t(255),U=t.n(J),V=t(256),q=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={modal:!1,backdrop:!0,username:"",email:"",password:"",confirmPassword:"",firstName:"",lastName:"",contactNumber:"",error:"",isLoading:!1},t.handleChange=t.handleChange.bind(Object(i.a)(Object(i.a)(t))),t.handleSubmit=t.handleSubmit.bind(Object(i.a)(Object(i.a)(t))),t.handleClick=t.handleClick.bind(Object(i.a)(Object(i.a)(t))),t.closeModal=t.closeModal.bind(Object(i.a)(Object(i.a)(t))),t.changeBackdrop=t.changeBackdrop.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"closeModal",value:function(){this.props.setModal()}},{key:"changeBackdrop",value:function(e){var a=e.target.value;"static"!==a&&(a=JSON.parse(a)),this.setState({backdrop:a})}},{key:"componentDidMount",value:function(){var e=Object(V.a)(U.a.mark(function e(){return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this._isMounted=!0,this.setState({isLoading:!0});case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"resetFields",value:function(){this.setState({username:"",email:"",password:"",confirmPassword:"",firstName:"",lastName:"",contactNumber:""})}},{key:"handleChange",value:function(e){e.target&&e.target.name&&this.setState(Object(L.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e,a,t){var n=this;if(!(a.length>0)){var r=this.state,s={username:r.username,email:r.email,password:r.password,first_name:r.firstName,last_name:r.lastName,contact_number:r.contactNumber};this.setState({isLoading:!0}),this.props.makeRequest(Q.a.Auth.register,s,{message:Y.a.LOGGING}).then(function(e){n.props.setModal(),n.props.history.push("/")},function(e){n.setState({error:e.message}),n.setState({isLoading:!1})})}}},{key:"handleClick",value:function(e){var a=this[e];this.setState({profilePicture:a.crop(),editMode:"done"})}},{key:"render",value:function(){var e="register"===this.props.appStatus.modal,a=this.state,t=a.username,n=a.email,r=a.password,s=a.confirmPassword,l=a.firstName,o=a.lastName,i=a.contactNumber,m=a.error;return u.a.createElement(c.Fragment,null,u.a.createElement("div",null,u.a.createElement(P.a,{isOpen:e,toggle:this.closeModal,className:this.props.className,backdrop:this.state.backdrop},u.a.createElement(G.a,{toggle:this.closeModal},"Register"),u.a.createElement(F.a,null,u.a.createElement(H.AvForm,{onSubmit:this.handleSubmit,model:this.state},m&&u.a.createElement("p",{className:"text-danger"},m),u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"username",type:"text",placeholder:"Username...",onChange:this.handleChange,value:t,validate:{required:{value:!0,errorMessage:"Please enter a username"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"firstName",type:"text",placeholder:"First Name ...",onChange:this.handleChange,value:l,validate:{required:{value:!0,errorMessage:"Please enter your first name"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"lastName",type:"text",placeholder:"Last Name ...",onChange:this.handleChange,value:o,validate:{required:{value:!0,errorMessage:"Please enter your last name"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"email",type:"email",placeholder:"Email here...",onChange:this.handleChange,value:n,validate:{email:{value:!0,errorMessage:"Please enter a valid email address"},required:{value:!0,errorMessage:"Please enter an email address"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"password",type:"password",placeholder:"Enter your password...",onChange:this.handleChange,value:r,validate:{required:{value:!0,errorMessage:"Please enter your password"},minLength:{value:6,errorMessage:"Your name must be at least 6 characters"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"confirmPassword",type:"password",placeholder:"Confirm your password...",onChange:this.handleChange,value:s,validate:{required:{value:!0,errorMessage:"Please confirm your password"},match:{value:"password",errorMessage:"Password and Confirm Password must match"}}}))),u.a.createElement(B.a,null,u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"contactNumber",type:"text",placeholder:"Contact Number ...",onChange:this.handleChange,value:i,validate:{required:{value:!0,errorMessage:"Please enter your contact number"}}})))),u.a.createElement(D.a,{className:"popup-btn register-btn"},"Register"))))))}}]),a}(c.Component);var Z=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{setModal:h.f,makeRequest:T.a})(q)),z=t(258),X=t(9),_=t(12),K=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={isLoading:!0,charge:{}},t.createCharge=t.createCharge.bind(Object(i.a)(Object(i.a)(t))),t.openPopUp=t.openPopUp.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.unlisten=this.props.history.listen(function(a,t){var n=e.props.browseHistory.autoTasks,r=n.indexOf("createCharge");-1!==r&&(e.createCharge(),e.props.updateBrowseHistory({autoTasks:Object(_.a)(n.splice(r,1))}))})}},{key:"componentWillUnmount",value:function(){this.unlisten()}},{key:"createCharge",value:function(){var e=this;if(!this.props.auth.isAuthenticated)return this.props.updateBrowseHistory({autoTasks:["createCharge"]}),void this.props.setModal("login");this.props.makeRequest(Q.a.Coinbase.createCharge,{},{message:Y.a.LOGGING}).then(function(a){e.setState({charge:a.data,isLoading:!1}),e.openPopUp()},function(a){e.setState({isLoading:!1})})}},{key:"openPopUp",value:function(){var e=this.state.charge,a=e&&e.hosted_url,t=window.open(a,"name","height=600,width=800");return window.focus&&t.focus(),!1}},{key:"render",value:function(){return u.a.createElement(c.Fragment,null,u.a.createElement(D.a,{onClick:this.createCharge},"Deposit"))}}]),a}(c.Component);var $=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,browseHistory:e.appStatusReducer.browseHistory}},{setUser:v.c,setModal:h.f,makeRequest:T.a,updateBrowseHistory:h.h})(K)),ee=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={modal:!1,backdrop:!0,isLoading:!0,activeScreen:"play",message:""},t.closeModal=t.closeModal.bind(Object(i.a)(Object(i.a)(t))),t.changeBackdrop=t.changeBackdrop.bind(Object(i.a)(Object(i.a)(t))),t.play=t.play.bind(Object(i.a)(Object(i.a)(t))),t.handleNumberClick=t.handleNumberClick.bind(Object(i.a)(Object(i.a)(t))),t.activateScreen=t.activateScreen.bind(Object(i.a)(Object(i.a)(t))),t.reset=t.reset.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"reset",value:function(){this.setState({modal:!1,backdrop:!0,isLoading:!0,activeScreen:"play",message:""})}},{key:"activateScreen",value:function(e){this.setState({activeScreen:e})}},{key:"play",value:function(){var e=this,a={lottery_number:this.props.lottery.pickedNumbers};this.props.makeRequest(Q.a.Me.play,a,{message:Y.a.LOGGING}).then(function(a){e.props.makeRequest(Q.a.Me.get,{},{message:Y.a.LOGGING}).then(function(a){e.props.setUser(a.data),e.setState({isLoading:!1,message:"You have joined the game. Good Luck!"}),e.activateScreen("success")},function(a){e.setState({isLoading:!1}),e.setState({isLoading:!1,message:"Unable to update info!"}),e.activateScreen("error")})},function(a){"duplicateEntry"===a.error?e.setState({message:"You have already joined the game. Please wait for next game."}):e.setState({message:"Unable to join the game. Try again!"}),e.setState({isLoading:!1}),e.activateScreen("error")})}},{key:"closeModal",value:function(){this.reset(),this.props.setModal()}},{key:"changeBackdrop",value:function(e){var a=e.target.value;"static"!==a&&(a=JSON.parse(a)),this.setState({backdrop:a})}},{key:"handleNumberClick",value:function(){}},{key:"showVerificationModal",value:function(){this.props.setModal("verify")}},{key:"render",value:function(){var e=this,a=this.state,t=a.activeScreen,n=a.message,r=this.props.appStatus,s=r.modal,l=r.settings,o=this.props.auth,i=o.user,m=o.isVerified,d=i.wallet,p=this.props.lottery.pickedNumbers,h="playLottery"===s,v=Object(X.a)(l,"lottery_slot_entry_fee"),g=d&&v&&d.deposit>v.value,b=!m&&i.free_games>3,E=m&&i.free_games>0,f=!m&&i.free_games>0,y=g||b||E;return u.a.createElement(c.Fragment,null,u.a.createElement("div",null,u.a.createElement(P.a,{isOpen:h,toggle:this.closeModal,className:this.props.className,backdrop:this.state.backdrop},u.a.createElement(G.a,{toggle:this.closeModal},"Play Lottery"),u.a.createElement(F.a,null,u.a.createElement(z.a,{ulClass:"lottery-table-numbers",liClass:"lottery-table-number",numbers:p,handleClick:this.handleNumberClick}),"play"===t&&(Object(X.k)(p)?u.a.createElement("div",null,E||b||f?u.a.createElement("h3",{className:"play-title"},"Free Games Left: ",i.free_games):u.a.createElement("h3",{className:"play-title"},"Entry Fee: ",Object(X.h)(v&&v.value)),y?u.a.createElement("div",null,u.a.createElement("button",{className:"play-btn",onClick:this.play},"Play")):f?u.a.createElement("div",{className:"text-center"},u.a.createElement("span",null,"Please verify your account to use your remaining free games.")," ",u.a.createElement("br",null),u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.showVerificationModal()},className:"btn-link"},"Verify Now")):u.a.createElement("div",null,u.a.createElement("span",null,"You don't have enough balance."),u.a.createElement($,null))):u.a.createElement("div",null,u.a.createElement("span",{className:"short-note"},"Please pick your lucky numbers to play game."))),"error"===t&&u.a.createElement("div",null,u.a.createElement("span",{className:"text-error"},n)),"success"===t&&u.a.createElement("div",null,u.a.createElement("span",{className:"text-success"},n))))))}}]),a}(c.Component);var ae=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer,lottery:e.lotteryReducer}},{setUser:v.c,setModal:h.f,makeRequest:T.a})(ee)),te=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).state={modal:!1,backdrop:!0,verificationCode:"",email:"",error:"",isLoading:!1,activeScreen:"verify"},t.handleChange=t.handleChange.bind(Object(i.a)(Object(i.a)(t))),t.handleSubmit=t.handleSubmit.bind(Object(i.a)(Object(i.a)(t))),t.handleClick=t.handleClick.bind(Object(i.a)(Object(i.a)(t))),t.closeModal=t.closeModal.bind(Object(i.a)(Object(i.a)(t))),t.changeBackdrop=t.changeBackdrop.bind(Object(i.a)(Object(i.a)(t))),t.activateScreen=t.activateScreen.bind(Object(i.a)(Object(i.a)(t))),t}return Object(o.a)(a,e),Object(r.a)(a,[{key:"closeModal",value:function(){this.props.setModal()}},{key:"changeBackdrop",value:function(e){var a=e.target.value;"static"!==a&&(a=JSON.parse(a)),this.setState({backdrop:a})}},{key:"componentDidMount",value:function(){var e=Object(V.a)(U.a.mark(function e(){return U.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this._isMounted=!0,this.setState({isLoading:!0});case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"resetFields",value:function(){this.setState({verificationCode:"",email:""})}},{key:"handleChange",value:function(e){e.target&&e.target.name&&this.setState(Object(L.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e,a,t){var n=this;if(!(a.length>0)){var r=this.state,s=r.verificationCode,l=(r.email,r.activeScreen);this.setState({isLoading:!0}),"verify"===l&&this.props.makeRequest(Q.a.Auth.verifyEmail,{verificationCode:s},{message:Y.a.LOGGING}).then(function(e){n.props.setModal(),n.props.history.push("/")},function(e){n.setState({error:"Verification failed"}),n.setState({isLoading:!1})}),"resendVerificationCode"===l&&this.props.makeRequest(Q.a.Auth.resendVerificationCode,{verificationCode:s},{message:Y.a.LOGGING}).then(function(e){n.activateScreen("verify"),n.props.history.push("/")},function(e){n.setState({error:"Sending verification code failed"}),n.setState({isLoading:!1})})}}},{key:"handleClick",value:function(e){var a=this[e];this.setState({profilePicture:a.crop(),editMode:"done"})}},{key:"activateScreen",value:function(e){this.setState({error:"",activeScreen:e})}},{key:"render",value:function(){var e=this,a="verify"===this.props.appStatus.modal,t=this.state,n=t.verificationCode,r=(t.email,t.activeScreen),s=t.error;return u.a.createElement(c.Fragment,null,u.a.createElement("div",null,u.a.createElement(P.a,{isOpen:a,toggle:this.closeModal,className:this.props.className,backdrop:this.state.backdrop},u.a.createElement(G.a,{toggle:this.closeModal},"Verify your account"),"verify"===r&&u.a.createElement(F.a,null,u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"Please use the verification code sent to your email.")),u.a.createElement(H.AvForm,{onSubmit:this.handleSubmit,model:this.state},u.a.createElement(I.a,{form:!0},u.a.createElement(B.a,null,s&&u.a.createElement("p",{className:"text-danger"},s),u.a.createElement(H.AvGroup,null,u.a.createElement(H.AvField,{name:"verificationCode",type:"text",placeholder:"Verification code...",onChange:this.handleChange,value:n,validate:{required:{value:!0,errorMessage:"Please enter your verification code"}}})))),u.a.createElement(D.a,{className:"popup-btn register-btn"},"Verify Email"),u.a.createElement("div",{className:"optional-links"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("resendVerificationCode")},className:"btn-link"},"Re-send Verification Code")," "," ",u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.closeModal()},className:"btn-link"},"Skip")," "," "))),"resendVerificationCode"===r&&u.a.createElement(F.a,null,u.a.createElement("h4",{className:"popup-title"},u.a.createElement("span",null,"Click below to re-send verification code to your email.")),u.a.createElement(H.AvForm,{onSubmit:this.handleSubmit,model:this.state},s&&u.a.createElement("p",{className:"text-danger"},s),u.a.createElement(D.a,{className:"popup-btn register-btn"},"Re-send Verification Code"),u.a.createElement("div",{className:"optional-links"},u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.activateScreen("verify")},className:"btn-link"},"Verify Email")," "," ",u.a.createElement("a",{href:"javascript:void(0);",onClick:function(){return e.closeModal()},className:"btn-link"},"Skip")," "," "))))))}}]),a}(c.Component);var ne=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{setModal:h.f,makeRequest:T.a})(te)),re=function(e){function a(){return Object(n.a)(this,a),Object(s.a)(this,Object(l.a)(a).apply(this,arguments))}return Object(o.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this.props.appStatus.settings;return u.a.createElement(c.Fragment,null,u.a.createElement("footer",null,u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-sm-12 col-md-6 col-lg-6 footer-left"},u.a.createElement("ul",{className:"footer-items"},u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/about",className:"footer-link"},"About")),u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/winners",className:"footer-link"},"Winners")),u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/privacy-policy",className:"footer-link"},"Privacy Policy")),u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/terms",className:"footer-link"},"Terms")),u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/faq",className:"footer-link"},"Faq")),u.a.createElement("li",{className:"footer-item"},u.a.createElement(g.b,{to:"/contact",className:"footer-link"},"Contact Us"))),u.a.createElement("p",null,"\xa9 ",(new Date).getFullYear()," ",Object(X.a)(e,"app_name").value,". All rights reserved.")),u.a.createElement("div",{className:"col-sm-12 col-md-6 col-lg-6 footer-right"},u.a.createElement("ul",{className:"social-icons"},u.a.createElement("li",null,u.a.createElement("a",{href:Object(X.a)(e,"app_facebook_url").value},u.a.createElement(C.a,{icon:R.a}))),u.a.createElement("li",null,u.a.createElement("a",{href:Object(X.a)(e,"app_twitter_url").value},u.a.createElement(C.a,{icon:R.b})))))))),u.a.createElement(x,null),u.a.createElement(Z,null),u.a.createElement(ne,null),u.a.createElement(ae,null))}}]),a}(c.Component);var se=Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{makeRequest:T.a})(re)),le=t(517),oe=t.n(le),ie=function(e){function a(){return Object(n.a)(this,a),Object(s.a)(this,Object(l.a)(a).apply(this,arguments))}return Object(o.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){return u.a.createElement(c.Fragment,null,u.a.createElement("a",{href:"#",className:"navbar-brand"},u.a.createElement("img",{src:oe.a,alt:"Bitlot logo"})))}}]),a}(u.a.Component),ce=Object(p.b)(function(e){return{}},function(e){return{}})(ie),ue=function(e){var a=e.amount;return u.a.createElement(c.Fragment,null,a&&u.a.createElement("div",{className:"prizepool-head"},u.a.createElement("h6",null,"Prize Pool"),u.a.createElement("div",{className:"prizepool-amount"},u.a.createElement("span",null,Object(X.j)(a)),u.a.createElement("span",null))))},me=t(14),de=t(1);function pe(e){return{type:de.s,payload:e}}var he=t(321);a.a=function(e){var a=function(a){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(l.a)(t).call(this,e))).state={authNavDropdownOpen:!1},a.showLoginModal=a.showLoginModal.bind(Object(i.a)(Object(i.a)(a))),a.showRegisterModal=a.showRegisterModal.bind(Object(i.a)(Object(i.a)(a))),a.logoutHandler=a.logoutHandler.bind(Object(i.a)(Object(i.a)(a))),a.toggleAuthNav=a.toggleAuthNav.bind(Object(i.a)(Object(i.a)(a))),a.playLottery=a.playLottery.bind(Object(i.a)(Object(i.a)(a))),a}return Object(o.a)(t,a),Object(r.a)(t,[{key:"playLottery",value:function(){this.props.addToRootCssClassList("focus-on"),this.props.history.push("/"),setTimeout(function(){this.props.removeFromRootCssClassList("focus-on")}.bind(this),2e3)}},{key:"showLoginModal",value:function(){this.props.setModal("login")}},{key:"showRegisterModal",value:function(){this.props.setModal("register")}},{key:"logoutHandler",value:function(){var e=this.props,a=e.logout;e.history,a()}},{key:"toggleAuthNav",value:function(){this.setState(function(e){return{authNavDropdownOpen:!e.authNavDropdownOpen}})}},{key:"render",value:function(){var a=this,t=this.props.lottery.slot,n=this.props.auth,r=n.isAuthenticated,s=n.user,l=t&&t.total_amount;return u.a.createElement(c.Fragment,null,u.a.createElement(d.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},u.a.createElement("section",{className:"main focus-in"},u.a.createElement("div",{className:"section-top"},u.a.createElement("div",{className:"container"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-sm-12 col-md-5 col-lg-4"},u.a.createElement(ce,null)),u.a.createElement("div",{className:"col-sm-12 col-md-7 col-lg-5"},u.a.createElement(ue,{amount:l})),u.a.createElement("div",{className:"col-sm-12 col-md-12 col-lg-3"},u.a.createElement("div",{className:"buttons"},u.a.createElement($,null),!r&&u.a.createElement("button",{onClick:this.showLoginModal,className:"btn btn-primary"},"Sign In"),r&&u.a.createElement(k.a,null,u.a.createElement(O.a,{isOpen:this.state.authNavDropdownOpen,toggle:this.toggleAuthNav,className:"top-dropdown"},u.a.createElement(j.a,{caret:!0},u.a.createElement("img",{className:"img-profile",src:s.profile_pic,alt:"profile picture"})),u.a.createElement(w.a,null,u.a.createElement(S.a,{onClick:function(){return a.props.history.push("/my/dashboard")}},"Dashboard"),u.a.createElement(S.a,{onClick:function(){return a.props.history.push("/my/profile")}},"My Profile"),u.a.createElement(S.a,{onClick:this.logoutHandler},"Logout"))))))))),u.a.createElement(e,Object.assign({},this.props,{playLottery:this.playLottery}))),u.a.createElement(se,null)))}}]),t}(c.Component),t={makeRequest:T.a,setLotteryWinners:me.g,setLotterySlot:me.f,setLotteryPlayers:me.e,setSettings:h.g,setCurrencies:h.d,setLastSlot:me.b,setModal:h.f,setPage:pe,setTransactions:he.b,setPlayedGames:he.a,addToRootCssClassList:h.a,removeFromRootCssClassList:h.b,logout:v.a};return Object(b.e)(Object(p.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer,lottery:e.lotteryReducer,my:e.myReducer,page:e.pageReducer}},t)(a))}},258:function(e,a,t){"use strict";var n=t(0),r=t.n(n),s=t(4),l=t(44);a.a=function(e){var a=e.ulClass,t=e.liClass,n=e.numbers,o=e.activeNumbers,i=e.handleClick;return r.a.createElement("ul",{className:l(a)},s.map(n,function(e,a){var n=o&&-1!==o.indexOf(e);return r.a.createElement("li",{key:a,className:l(t,{active:n,empty:!e})},r.a.createElement("a",{href:"javascript:void(0)",onClick:function(a){return i(e)}},e))}))}},321:function(e,a,t){"use strict";t.d(a,"a",function(){return r}),t.d(a,"b",function(){return s}),t.d(a,"c",function(){return l});var n=t(1);function r(e){return{type:n.t,payload:e}}function s(e){return{type:n.v,payload:e}}function l(e){return{type:n.x,payload:e}}},517:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAbCAYAAAC0n4dLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExREJGQ0NFQzM0MzExRTlCRDRDRjkzQTNBRUNEQjQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExREJGQ0NGQzM0MzExRTlCRDRDRjkzQTNBRUNEQjQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTFEQkZDQ0NDMzQzMTFFOUJENENGOTNBM0FFQ0RCNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTFEQkZDQ0RDMzQzMTFFOUJENENGOTNBM0FFQ0RCNDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5NXw46AAADY0lEQVR42uxa/bGbMAx3ubeAOwIdgY5ARyAjhBHICGEEMgKMACO8jBBGeIzAi3uipdSWJWPnJSG/O/3BGdmyJesLxDiO7WiGGhMaSkYaUgP/s5I0nMM+EN9qigQf8ZVawnuHK3ViW9jfmG81uAYgQfmSoPxSbA/pjflubgA1eAAMp40qXzoqUj6KAVQEQZXLzw0WPmpomrPWjClDKwx8ij406yTI++0shOnGaxhXa14QWXXnYpJn+c5cDlc+Ydi3SW5F7zD+/+UlJoEFIeF7h2RGl2ykBp4PZL4YCEOyWAeTM4N3YkSWD8I+j4s1q5GHdiXfnGKL/nSo53qieIDsSkfLO/2VdlcaHNyfbd7GItvyJugwWOaZZJEEmQugr8aUjHPDRzbP4yLCIrXlnQGU3wfaaMNInlIkL/GJgmgsIVER8jEsZPy+1G8EA7BBKf8ccKMNGFds2IgEI0wQpXDL0RLWyyyJWwNz9/CcIns4zy6MWMEnLDzT3B3InyClZykcYsgSFaHhkBJjXDEjSYztU7PkaBi/aOLmSMgVsDl1uQBFRh258FUMuWrk3SLycEP3HsoY1Tf4BTdvooEZBny4//NircbiRr8KicV7Yc//zBN5jEeuMXEg9A2wZDCFtROHHEJnANjzPfUcTGc5MPYgfRlAvCIzpsbnBjmMApm7F9sBtwoTkcfFC0e3ODAMYEDWXnv7dTdLPpgBSG6pHTEO/zvBJdaBN1gyDYtrAOniwFKft80jekZbOcPmoRjAYdbkOQQMBWt7AhyPgd2gepZTHBn5gi1Rdk2wuWFz3rK2NfE64fA/AKWFmTDKwIr5Dbtd+S9CPPoBpw2NnakLnyS2rTFcXP8HOBBuVhXQC5yILjLkvwidxgP0nt352sqJokcnA6AsngQMBRTX3gRUvlo791hxuPKVhJBsQj6dkWsVUBKEPopw37nLQAZwJijrp2Hvrt9E1nxLKaGBRt3vCeT/40XfxN9+NjfT3TEU3CPW6rtO71Y0cM5wQHtN+dQQZFX8P8ADpobxziPftN9uljRKTiPtm0oEHgyZwDuPuSVPUJXKBbkh+YYaR9avgfcAdSNahqc5iRfIiJ5sP7uXSrdrALm43483LwMIiDNkwi/X/6Q5QAcZcmYo91zKrltVJHePTwEGAOpA/TCaIOp/AAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=1.2c106dee.chunk.js.map