(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{172:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(190),i=a.n(s);t.a=function(e){return r.a.createElement(i.a,{transitionName:"animated-section",transitionAppear:!0,transitionAppearTimeout:500,transitionEnter:!1,transitionLeave:!1},e.children)}},518:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a(25),s=a(27),i=a(26),o=a(28),c=a(58),l=a(0),d=a.n(l),p=(a(220),a(19)),h=a(5),u=a(9),m=a(59),g=a(192),f=a(292),v=a(301),b=a(229),y=a(6),E=a.n(y);function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var L=function(e){var t,a;function n(){var t;return(t=e.call(this)||this).handleExpired=t.handleExpired.bind(O(t)),t.handleErrored=t.handleErrored.bind(O(t)),t.handleRecaptchaRef=t.handleRecaptchaRef.bind(O(t)),t}a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r=n.prototype;return r.getValue=function(){return this.props.grecaptcha&&void 0!==this._widgetId?this.props.grecaptcha.getResponse(this._widgetId):null},r.getWidgetId=function(){return this.props.grecaptcha&&void 0!==this._widgetId?this._widgetId:null},r.execute=function(){var e=this.props.grecaptcha;if(e&&void 0!==this._widgetId)return e.execute(this._widgetId);this._executeRequested=!0},r.reset=function(){this.props.grecaptcha&&void 0!==this._widgetId&&this.props.grecaptcha.reset(this._widgetId)},r.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.props.onChange&&this.props.onChange(null)},r.handleErrored=function(){this.props.onErrored&&this.props.onErrored()},r.explicitRender=function(){if(this.props.grecaptcha&&this.props.grecaptcha.render&&void 0===this._widgetId){var e=document.createElement("div");this._widgetId=this.props.grecaptcha.render(e,{sitekey:this.props.sitekey,callback:this.props.onChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge}),this.captcha.appendChild(e)}this._executeRequested&&this.props.grecaptcha&&void 0!==this._widgetId&&(this._executeRequested=!1,this.execute())},r.componentDidMount=function(){this.explicitRender()},r.componentDidUpdate=function(){this.explicitRender()},r.componentWillUnmount=function(){void 0!==this._widgetId&&(this.delayOfCaptchaIframeRemoving(),this.reset())},r.delayOfCaptchaIframeRemoving=function(){var e=document.createElement("div");for(document.body.appendChild(e),e.style.display="none";this.captcha.firstChild;)e.appendChild(this.captcha.firstChild);setTimeout(function(){document.body.removeChild(e)},5e3)},r.handleRecaptchaRef=function(e){this.captcha=e},r.render=function(){var e=this.props,t=(e.sitekey,e.onChange,e.theme,e.type,e.tabindex,e.onExpired,e.onErrored,e.size,e.stoken,e.grecaptcha,e.badge,e.hl,function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl"]));return d.a.createElement("div",w({},t,{ref:this.handleRecaptchaRef}))},n}(d.a.Component);L.displayName="ReCAPTCHA",L.propTypes={sitekey:E.a.string.isRequired,onChange:E.a.func,grecaptcha:E.a.object,theme:E.a.oneOf(["dark","light"]),type:E.a.oneOf(["image","audio"]),tabindex:E.a.number,onExpired:E.a.func,onErrored:E.a.func,size:E.a.oneOf(["compact","normal","invisible"]),stoken:E.a.string,hl:E.a.string,badge:E.a.oneOf(["bottomright","bottomleft","inline"])},L.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};var S=a(32),j=a.n(S);function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var _={},k=0;function C(){return"undefined"!==typeof window&&window.recaptchaOptions||{}}var R,x,A="onloadcallback",I=C(),G=(R=function(){var e=C(),t=e.lang?"&hl="+e.lang:"";return"https://"+(e.useRecaptchaNet?"recaptcha.net":"www.google.com")+"/recaptcha/api.js?onload="+A+"&render=explicit"+t},x=(x={callbackName:A,globalName:"grecaptcha",removeOnUnmount:I.removeOnUnmount||!1})||{},function(e){var t=e.displayName||e.name||"Component",a=function(t){var a,n;function r(e,a){var n;return(n=t.call(this,e,a)||this).state={},n.__scriptURL="",n}n=t,(a=r).prototype=Object.create(n.prototype),a.prototype.constructor=a,a.__proto__=n;var s=r.prototype;return s.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+k++),this.__scriptLoaderID},s.setupScriptURL=function(){return this.__scriptURL="function"===typeof R?R():R,this.__scriptURL},s.asyncScriptLoaderHandleLoad=function(e){var t=this;this.setState(e,function(){return t.props.asyncScriptOnLoad&&t.props.asyncScriptOnLoad(t.state)})},s.asyncScriptLoaderTriggerOnScriptLoaded=function(){var e=_[this.__scriptURL];if(!e||!e.loaded)throw new Error("Script is not loaded.");for(var t in e.observers)e.observers[t](e);delete window[x.callbackName]},s.componentDidMount=function(){var e=this,t=this.setupScriptURL(),a=this.asyncScriptLoaderGetScriptLoaderID(),n=x,r=n.globalName,s=n.callbackName,i=n.scriptId;if(r&&"undefined"!==typeof window[r]&&(_[t]={loaded:!0,observers:{}}),_[t]){var o=_[t];return o&&(o.loaded||o.errored)?void this.asyncScriptLoaderHandleLoad(o):void(o.observers[a]=function(t){return e.asyncScriptLoaderHandleLoad(t)})}var c={};c[a]=function(t){return e.asyncScriptLoaderHandleLoad(t)},_[t]={loaded:!1,observers:c};var l=document.createElement("script");l.src=t,l.async=!0,i&&(l.id=i);var d=function(e){if(_[t]){var a=_[t].observers;for(var n in a)e(a[n])&&delete a[n]}};s&&"undefined"!==typeof window&&(window[s]=function(){return e.asyncScriptLoaderTriggerOnScriptLoaded()}),l.onload=function(){var e=_[t];e&&(e.loaded=!0,d(function(t){return!s&&(t(e),!0)}))},l.onerror=function(){var e=_[t];e&&(e.errored=!0,d(function(t){return t(e),!0}))},document.body.appendChild(l)},s.componentWillUnmount=function(){var e=this.__scriptURL;if(!0===x.removeOnUnmount)for(var t=document.getElementsByTagName("script"),a=0;a<t.length;a+=1)t[a].src.indexOf(e)>-1&&t[a].parentNode&&t[a].parentNode.removeChild(t[a]);var n=_[e];n&&(delete n.observers[this.asyncScriptLoaderGetScriptLoaderID()],!0===x.removeOnUnmount&&delete _[e])},s.render=function(){var t=x.globalName,a=this.props,n=(a.asyncScriptOnLoad,a.forwardedRef),r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(a,["asyncScriptOnLoad","forwardedRef"]);return t&&"undefined"!==typeof window&&(r[t]="undefined"!==typeof window[t]?window[t]:void 0),r.ref=n,Object(l.createElement)(e,r)},r}(l.Component),n=Object(l.forwardRef)(function(e,t){return Object(l.createElement)(a,N({},e,{forwardedRef:t}))});return n.displayName="AsyncScriptLoader("+t+")",n.propTypes={asyncScriptOnLoad:E.a.func},j()(n,e)})(L),P=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={name:"",email:"",subject:"",message:"",captchaResponse:"",errors:[],response:{},isLoading:!1},a.handleChange=a.handleChange.bind(Object(c.a)(Object(c.a)(a))),a.resetErrors=a.resetErrors.bind(Object(c.a)(Object(c.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(c.a)(Object(c.a)(a))),a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.props.match.params.slug!==e.match.params.slug&&this.bootstrap(e.match.params.slug)}},{key:"componentDidMount",value:function(){this.bootstrap(this.props.match.params.slug)}},{key:"bootstrap",value:function(e){var t=this;this.setState({isLoading:!0}),this.props.page[e]||this.props.makeRequest(p.a.Pages.show,{slug:e},{message:h.a.LOGGING}).then(function(e){e.data&&(t.props.setPage(e),t.setState({isLoading:!1}))},function(e){})}},{key:"handleChange",value:function(e){"string"!==typeof e?this.setState(Object(m.a)({},e.target.name,e.target.value)):this.setState({captchaResponse:e})}},{key:"handleSubmit",value:function(e,t,a){var n=this;if(this.state.captchaResponse||t.push("captchaResponse"),t.length>0)this.setState({errors:t});else{var r={name:this.state.name,email:this.state.email,subject:this.state.subject,message:this.state.message,captcha_response:this.state.captchaResponse};this.setState({isLoading:!0}),this.props.makeRequest(p.a.ContactFormEntry.create,r,{message:h.a.LOGGING}).then(function(e){n.setState({response:e}),n.form.reset(),n.reCaptcha.reset(),n.resetErrors()},function(e){n.setState({response:e}),n.reCaptcha.reset()})}}},{key:"resetErrors",value:function(){this.setState({errors:[]})}},{key:"render",value:function(){var e=this,t=this.state,a=t.name,n=t.email,r=t.subject,s=t.message,i=t.response,o=t.errors;return d.a.createElement("div",{className:"section-bottom"},d.a.createElement("div",{className:"container"},d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-sm-12"},d.a.createElement("div",{className:"inner-content-wrap"},d.a.createElement("h2",null,"Contact Us"),d.a.createElement("div",{className:"content"},d.a.createElement("div",null,i.errors&&d.a.createElement("p",{className:"text-danger"},"Something went wrong. Try Again!"),i.success&&d.a.createElement("p",{className:"text-success"},"Form was submitted successfully."),d.a.createElement("div",null,d.a.createElement(g.AvForm,{onSubmit:this.handleSubmit,ref:function(t){return e.form=t}},d.a.createElement(f.a,{form:!0},d.a.createElement(v.a,null,d.a.createElement(g.AvGroup,null,d.a.createElement(g.AvField,{name:"name",type:"text",placeholder:"Full Name ...",onChange:this.handleChange,value:a,validate:{required:{value:!0,errorMessage:"Please enter your name"}}}),d.a.createElement(g.AvFeedback,null))),d.a.createElement(v.a,null,d.a.createElement(g.AvGroup,null,d.a.createElement(g.AvField,{name:"email",type:"email",placeholder:"Email ...",onChange:this.handleChange,value:n,validate:{email:{value:!0,errorMessage:"Please enter a valid email address"},required:{value:!0,errorMessage:"Please enter an email address"}}}),d.a.createElement(g.AvFeedback,null))),d.a.createElement(v.a,null,d.a.createElement(g.AvGroup,null,d.a.createElement(g.AvField,{name:"subject",type:"text",placeholder:"Subject ...",onChange:this.handleChange,value:r,validate:{required:{value:!0,errorMessage:"Please enter your subject ..."}}}),d.a.createElement(g.AvFeedback,null))),d.a.createElement(v.a,null,d.a.createElement(g.AvGroup,null,d.a.createElement(g.AvField,{name:"message",type:"textarea",placeholder:"Message ...",onChange:this.handleChange,value:s,rows:10,validate:{required:{value:!0,errorMessage:"Please enter your message ..."}}}),d.a.createElement(g.AvFeedback,null))),d.a.createElement(v.a,null,d.a.createElement(g.AvGroup,null,d.a.createElement("div",{className:"form-group re-captcha"},d.a.createElement(G,{sitekey:"6LdGP7AUAAAAAGy1mZYvgSR5tSAgV9SMdD5J89Dh",onChange:this.handleChange,ref:function(t){return e.reCaptcha=t}}),-1!==o.indexOf("captchaResponse")&&d.a.createElement("span",{className:"text-danger"},"Re-captcha must be solved."))))),d.a.createElement(b.a,{className:"popup-btn"},"Contact Us"))))))))))}}]),t}(l.Component),D=a(257),U=a(199),F=a(172),q=a(189),M=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={data:[],pages:1,perPage:10,reactTableState:{},isLoading:!1},a.fetchData=a.fetchData.bind(Object(c.a)(Object(c.a)(a))),a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"fetchData",value:function(e){var t=this,a=(arguments.length>1&&void 0!==arguments[1]&&arguments[1],"");this.setState({reactTableState:e}),this.state.isLoading||(e.page&&(a+="&page="+(e.page+1)),e.sorted.length>0&&(a+="&orderBy="+e.sorted[0].id,a+="&ascending="+(e.sorted[0].desc?"false":"true")),e.pageSize&&(a+="&limit="+e.pageSize),e.filtered.length>0&&e.filtered[0].value.length<2||(e.filtered.length>0&&e.filtered[0].value.length>1&&(a+="&"+e.filtered[0].id+"="+e.filtered[0].value),this.setState({isLoading:!0}),this.props.makeRequest(p.a.Lottery.slots.winners,{query:a},{message:h.a.LOGGING}).then(function(e){e.data?t.setState({data:e.data,pages:e.meta.last_page,isLoading:!1,selectedIds:[]}):t.setState({data:[],pages:0,isLoading:!1,selectedIds:[]})},function(e){t.setState({isLoading:!1})})))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.pages,n=e.isLoading;return d.a.createElement(l.Fragment,null,d.a.createElement(F.a,null,d.a.createElement("div",{className:"section-bottom"},d.a.createElement("div",{className:"container"},d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-sm-12"},d.a.createElement("div",{className:"inner-content-wrap"},d.a.createElement("h2",null,"Past Winners"),d.a.createElement("div",{className:"content"},t?d.a.createElement("div",{className:"content"},d.a.createElement(U.a,{data:t,columns:[{columns:[{Header:"Name",accessor:"full_name"},{Header:"Lottery Number",accessor:"lottery_number",Cell:function(e){return d.a.createElement("div",{className:"d-block w-100 text-center"},d.a.createElement(q.a,{ulClass:"number-in-column",numbers:e.original.lottery_number}))}},{Header:"Won Amount",accessor:"won_amount",Cell:function(e){return d.a.createElement("div",{className:"d-block w-100 text-center"},Object(u.i)(1*e.original.won_amount+1*e.original.service_charge))}},{Header:"Date",accessor:"updated_at"}]}],defaultPageSize:15,showPagination:!0,className:"-striped -highlight",manual:!0,pages:a,loading:n,onFetchData:this.fetchData,filterable:!1,sortable:!1})):d.a.createElement("div",{className:"card-body"},"Winners not found.")))))))))}}]),t}(d.a.Component),T=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={isLoading:!1},a.playLottery=a.playLottery.bind(Object(c.a)(Object(c.a)(a))),a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.props.match.params.slug!==e.match.params.slug&&this.bootstrap(e.match.params.slug)}},{key:"componentDidMount",value:function(){this.bootstrap(this.props.match.params.slug)}},{key:"bootstrap",value:function(e){var t=this;this.setState({isLoading:!0}),"contact"!==e&&"winners"!==e&&(this.props.page[e]||this.props.makeRequest(p.a.Pages.show,{slug:e},{message:h.a.LOGGING}).then(function(e){e.data&&(t.props.setPage(e),t.setState({isLoading:!1}))},function(e){}))}},{key:"playLottery",value:function(){this.props.auth.isAuthenticated?(this.props.setModal("playLottery"),this.props.history.push("/")):this.props.setModal("login")}},{key:"render",value:function(){var e=this.props.match.params.slug,t=this.props.page.pages,a=Object(u.c)(t,e);return d.a.createElement(l.Fragment,null,"contact"===e&&d.a.createElement(P,this.props),"winners"===e&&d.a.createElement(M,this.props),"contact"!==e&&"winners"!==e&&d.a.createElement("div",{className:"section-bottom"},d.a.createElement("div",{className:"container"},d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"col-sm-12"},d.a.createElement("div",{className:"inner-content-wrap"},d.a.createElement("h2",null,a.title),d.a.createElement("div",{className:"content"},a.content)))))))}}]),t}(d.a.Component);t.default=Object(D.a)(T)}}]);
//# sourceMappingURL=8.414a8777.chunk.js.map