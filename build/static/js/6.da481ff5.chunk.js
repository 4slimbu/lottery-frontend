(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{513:function(t,e,i){"use strict";var n=i(514);t.exports={Cropper:n}},514:function(t,e,i){"use strict";var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var o=i(0),r=o.Component,a=i(35),s=i(515),l=i(6),d=a.findDOMNode,c=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t)),n=t.originX,o=t.originY,r=t.width,a=t.height,l=t.fixedRatio,d=t.ratio,c=t.styles,h=t.src;return i.state={src:h,imgWidth:"100%",imgHeight:"auto",frameWidth4Style:r,frameHeight4Style:l?r/d:a,toImgTop4Style:0,toImgLeft4Style:0,originX:n,originY:o,startPageX:0,startPageY:0,frameWidth:r,frameHeight:l?r/d:a,dragging:!1,maxLeft:0,maxTop:0,action:null,imgLoaded:!1,styles:s({},g,c)},i}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),n(e,[{key:"initStyles",value:function(){var t=this,e=d(this.container);this.setState({imgWidth:e.offsetWidth},function(){var e=t.props,i=e.originX,n=e.originY;if(!e.disabled){var o=t.state,r=o.imgWidth,a=o.imgHeight,s=t.state,l=s.frameWidth,d=s.frameHeight,c=r-l,g=a-d;i+l>=r&&(i=r-l,t.setState({originX:i})),n+d>=a&&(n=a-d,t.setState({originY:n})),t.setState({maxLeft:c,maxTop:g}),t.calcPosition(l,d,i,n,function(){var e=t.state,i=e.frameWidth4Style,n=e.frameHeight4Style,o=e.toImgTop4Style,r=e.toImgLeft4Style;t.setState({frameWidth:i,frameHeight:n,originX:r,originY:o})})}})}},{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.handleDrag.bind(this)),document.addEventListener("touchmove",this.handleDrag.bind(this)),document.addEventListener("mouseup",this.handleDragStop.bind(this)),document.addEventListener("touchend",this.handleDragStop.bind(this)),this.imgGetSizeBeforeLoad()}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousemove",this.handleDrag.bind(this)),document.removeEventListener("touchmove",this.handleDrag.bind(this)),document.removeEventListener("mouseup",this.handleDragStop.bind(this)),document.removeEventListener("touchend",this.handleDragStop.bind(this))}},{key:"componentWillReceiveProps",value:function(t){var e=this,i=this.props,n=i.width,o=i.height,r=i.originX,a=i.originY;if(this.props.src!==t.src)return this.setState({src:t.src},this.imgGetSizeBeforeLoad);n===t.width&&o===t.height&&r===t.originX&&a===t.originY||this.setState({frameWidth:t.width,frameHeight:t.height,originX:t.originX,originY:t.originY},function(){return e.initStyles()})}},{key:"imgOnLoad",value:function(){this.props.onImgLoad()}},{key:"imgGetSizeBeforeLoad",value:function(){var t=this;setTimeout(function(){var e=d(t.img);if(e&&e.naturalWidth){var i=parseInt(e.offsetWidth/e.naturalWidth*e.naturalHeight);t.setState({imgHeight:i,imgLoaded:!0},t.initStyles),t.props.beforeImgLoad()}else e&&t.imgGetSizeBeforeLoad()},0)}},{key:"calcPosition",value:function(t,e,i,n,o){var r=this.state,a=r.imgWidth,s=r.imgHeight,l=this.props,d=l.ratio,c=l.fixedRatio;if(t<0||e<0)return!1;c&&(t/a>e/s?t>a&&(i=0,e=(t=a)/d):e>s&&(n=0,t=(e=s)*d)),t+i>a&&(c?i=a-t:t-=t+i-a),e+n>s&&(c?n=s-e:e-=e+n-s),i<0&&(i=0),n<0&&(n=0),t>a&&(t=a),e>s&&(e=s),this.setState({toImgLeft4Style:i,toImgTop4Style:n,frameWidth4Style:t,frameHeight4Style:e},function(){o&&o()})}},{key:"createNewFrame",value:function(t){if(this.state.dragging){var e=t.pageX?t:t.targetTouches[0],i=e.pageX,n=e.pageY,o=this.props,r=o.ratio,a=o.fixedRatio,s=this.state,l=s.frameWidth,d=s.frameHeight,c=s.startPageX,g=s.startPageY,h=s.originX,f=s.originY,u=i-c,m=n-g,p=l+Math.abs(u),y=a?(l+Math.abs(u))/r:d+Math.abs(m),b=h,v=f;return m<0&&(v=a?f-Math.abs(u)/r:f-Math.abs(m)),u<0&&(b=h+u),this.calcPosition(p,y,b,v)}}},{key:"frameMove",value:function(t){var e=this.state,i=e.originX,n=e.originY,o=e.startPageX,r=e.startPageY,a=e.frameWidth,s=e.frameHeight,l=e.maxLeft,d=e.maxTop,c=t.pageX?t:t.targetTouches[0],g=c.pageX,h=c.pageY,f=g-o+i,u=h-r+n;if(g<0||h<0)return!1;f>l&&(f=l),u>d&&(u=d),this.calcPosition(a,s,f,u)}},{key:"frameDotMove",value:function(t,e){var i=e.pageX?e:e.targetTouches[0],n=i.pageX,o=i.pageY,r=this.props,a=r.ratio,s=r.fixedRatio,l=this.state,d=l.startPageX,c=l.startPageY,g=l.originX,h=l.originY,f=l.frameWidth4Style,u=l.frameHeight4Style,m=l.frameWidth,p=l.frameHeight,y=l.imgWidth,b=l.imgHeight;if(0!==o&&0!==n){var v=n-d,S=o-c,E=0,w=0,W=0,I=0;switch(t){case"ne":E=m+v,w=s?E/a:p-S,I=g,W=s?h-v/a:h+S;break;case"e":E=m+v,w=s?E/a:p,I=g,W=s?h-v/a*.5:h;break;case"se":E=m+v,w=s?E/a:p+S,I=g,W=h;break;case"n":w=p-S,E=s?w*a:m,I=s?g+S*a*.5:g,W=h+S;break;case"nw":E=m-v,w=s?E/a:p-S,I=g+v,W=s?h+v/a:h+S;break;case"w":E=m-v,w=s?E/a:p,I=g+v,W=s?h+v/a*.5:h;break;case"sw":E=m-v,w=s?E/a:p+S,I=g+v,W=h;break;case"s":w=p+S,E=s?w*a:m,I=s?g-S*a*.5:g,W=h}return(!(E>y||w>b)||!(f>=y||u>=b))&&this.calcPosition(E,w,I,W)}}},{key:"handleDrag",value:function(t){if(this.state.dragging){t.preventDefault();var e=this.state.action;if(!e)return this.createNewFrame(t);if("move"===e)return this.frameMove(t);this.frameDotMove(e,t)}}},{key:"handleDragStart",value:function(t){var e=this,i=this.props.allowNewSelection,n=t.target.getAttribute("data-action")?t.target.getAttribute("data-action"):t.target.parentNode.getAttribute("data-action"),o=t.pageX?t:t.targetTouches[0],r=o.pageX,a=o.pageY;if((n||i)&&(t.preventDefault(),this.setState({startPageX:r,startPageY:a,dragging:!0,action:n})),!n&&i){var s=d(this.container),l=s.offsetLeft,c=s.offsetTop;this.setState({originX:r-l,originY:a-c,frameWidth:2,frameHeight:2},function(){return e.calcPosition(2,2,r-l,a-c)})}}},{key:"crop",value:function(){var t=d(this.img),e=document.createElement("canvas"),i=this.values().original,n=i.x,o=i.y,r=i.width,a=i.height;return e.width=r,e.height=a,e.getContext("2d").drawImage(t,n,o,r,a,0,0,r,a),e.toDataURL()}},{key:"values",value:function(){var t=d(this.img),e=this.state,i=e.frameWidth,n=e.frameHeight,o=e.originX,r=e.originY,a=e.imgWidth,s=e.imgHeight,l=t.naturalWidth/a;return{display:{width:i,height:n,x:o,y:r,imgWidth:a,imgHeight:s},original:{width:i*l,height:n*l,x:o*l,y:r*l,imgWidth:t.naturalWidth,imgHeight:t.naturalHeight}}}},{key:"handleDragStop",value:function(t){var e=this;if(this.state.dragging){t.preventDefault();var i=d(this.frameNode),n=i.offsetLeft,o=i.offsetTop,r=i.offsetWidth,a=i.offsetHeight,s=this.state,l=s.imgWidth,c=s.imgHeight;this.setState({originX:n,originY:o,dragging:!1,frameWidth:r,frameHeight:a,maxLeft:l-r,maxTop:c-a,action:null},function(){var t=e.props.onChange;t&&t(e.values())})}}},{key:"render",value:function(){var t=this,e=this.state,i=e.dragging,n=e.imgHeight,r=e.imgWidth,a=e.imgLoaded,l=e.styles,d=e.src,c=this.props.disabled,g=o.createElement("div",{style:l.source,ref:function(e){t.sourceNode=e}},o.createElement("img",{crossOrigin:"anonymous",src:d,width:r,height:n,ref:function(e){t.img=e},style:s({},l.img,l.source_img),onLoad:this.imgOnLoad.bind(this)}));return c?o.createElement("div",{style:s({},l.container,{position:"relative",height:n}),ref:function(e){t.container=e}},g,o.createElement("div",{style:s({},l.modal,l.modal_disabled)})):o.createElement("div",{onMouseDown:this.handleDragStart.bind(this),onTouchStart:this.handleDragStart.bind(this),style:s({},l.container,{position:"relative",height:n}),ref:function(e){t.container=e}},g,a?o.createElement("div",null,o.createElement("div",{style:l.modal}),o.createElement("div",{style:s({},l.frame,i?l.dragging_frame:{},{display:"block",left:this.state.toImgLeft4Style,top:this.state.toImgTop4Style,width:this.state.frameWidth4Style,height:this.state.frameHeight4Style}),ref:function(e){t.frameNode=e}},o.createElement("div",{style:l.clone},o.createElement("img",{src:d,crossOrigin:"anonymous",width:r,height:n,style:s({},l.img,{marginLeft:-1*this.state.toImgLeft4Style,marginTop:-1*this.state.toImgTop4Style}),ref:function(e){t.cloneImg=e}})),o.createElement("span",{"data-action":"move",style:l.move}),o.createElement("span",{"data-action":"move",style:s({},l.dot,l.dotCenter)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerCenterVertical)}),o.createElement("span",{style:s({},l.dotInner,l.dotInnerCenterHorizontal)})),o.createElement("span",{"data-action":"ne",style:s({},l.dot,l.dotNE)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerNE)})),o.createElement("span",{"data-action":"n",style:s({},l.dot,l.dotN)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerN)})),o.createElement("span",{"data-action":"nw",style:s({},l.dot,l.dotNW)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerNW)})),o.createElement("span",{"data-action":"e",style:s({},l.dot,l.dotE)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerE)})),o.createElement("span",{"data-action":"w",style:s({},l.dot,l.dotW)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerW)})),o.createElement("span",{"data-action":"se",style:s({},l.dot,l.dotSE)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerSE)})),o.createElement("span",{"data-action":"s",style:s({},l.dot,l.dotS)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerS)})),o.createElement("span",{"data-action":"sw",style:s({},l.dot,l.dotSW)},o.createElement("span",{style:s({},l.dotInner,l.dotInnerSW)})),o.createElement("span",{"data-action":"n",style:s({},l.line,l.lineN)}),o.createElement("span",{"data-action":"s",style:s({},l.line,l.lineS)}),o.createElement("span",{"data-action":"w",style:s({},l.line,l.lineW)}),o.createElement("span",{"data-action":"e",style:s({},l.line,l.lineE)}))):null)}}]),e}();c.propTypes={src:l.string.isRequired,originX:l.number,originY:l.number,ratio:l.number,width:l.number,height:l.number,fixedRatio:l.bool,allowNewSelection:l.bool,disabled:l.bool,styles:l.object,onImgLoad:l.func,beforeImgLoad:l.func,onChange:l.func},c.defaultProps={width:200,height:200,fixedRatio:!0,allowNewSelection:!0,ratio:1,originX:0,originY:0,styles:{},onImgLoad:function(){},beforeImgLoad:function(){}};var g={container:{},img:{userDrag:"none",userSelect:"none",MozUserSelect:"none",WebkitUserDrag:"none",WebkitUserSelect:"none",WebkitTransform:"translateZ(0)",WebkitPerspective:1e3,WebkitBackfaceVisibility:"hidden"},clone:{width:"100%",height:"100%",overflow:"hidden",position:"absolute",left:0,top:0},frame:{position:"absolute",left:0,top:0,bottom:0,right:0,display:"none"},dragging_frame:{opacity:.8},source:{overflow:"hidden"},source_img:{float:"left"},modal:{position:"absolute",left:0,top:0,bottom:0,right:0,opacity:.4,backgroundColor:"#000"},modal_disabled:{backgroundColor:"#666",opacity:.7,cursor:"not-allowed"},move:{position:"absolute",left:0,top:0,bottom:0,right:0,cursor:"move",outline:"1px dashed #88f",backgroundColor:"transparent"},dot:{zIndex:10},dotN:{cursor:"n-resize"},dotS:{cursor:"s-resize"},dotE:{cursor:"e-resize"},dotW:{cursor:"w-resize"},dotNW:{cursor:"nw-resize"},dotNE:{cursor:"ne-resize"},dotSW:{cursor:"sw-resize"},dotSE:{cursor:"se-resize"},dotCenter:{backgroundColor:"transparent",cursor:"move"},dotInner:{border:"1px solid #88f",background:"#fff",display:"block",width:6,height:6,padding:0,margin:0,position:"absolute"},dotInnerN:{top:-4,left:"50%",marginLeft:-4},dotInnerS:{bottom:-4,left:"50%",marginLeft:-4},dotInnerE:{right:-4,top:"50%",marginTop:-4},dotInnerW:{left:-4,top:"50%",marginTop:-4},dotInnerNE:{top:-4,right:-4},dotInnerSE:{bottom:-4,right:-4},dotInnerNW:{top:-4,left:-4},dotInnerSW:{bottom:-4,left:-4},dotInnerCenterVertical:{position:"absolute",border:"none",width:2,height:8,backgroundColor:"#88f",top:"50%",left:"50%",marginLeft:-1,marginTop:-4},dotInnerCenterHorizontal:{position:"absolute",border:"none",width:8,height:2,backgroundColor:"#88f",top:"50%",left:"50%",marginLeft:-4,marginTop:-1},line:{position:"absolute",display:"block",zIndex:100},lineS:{cursor:"s-resize",bottom:0,left:0,width:"100%",height:4,background:"transparent"},lineN:{cursor:"n-resize",top:0,left:0,width:"100%",height:4,background:"transparent"},lineE:{cursor:"e-resize",right:0,top:0,width:4,height:"100%",background:"transparent"},lineW:{cursor:"w-resize",left:0,top:0,width:4,height:"100%",background:"transparent"}};t.exports=c},515:function(t,e,i){"use strict";(function(e){function i(t){return t instanceof e||t instanceof Date||t instanceof RegExp}function n(t){if(t instanceof e){var i=new e(t.length);return t.copy(i),i}if(t instanceof Date)return new Date(t.getTime());if(t instanceof RegExp)return new RegExp(t);throw new Error("Unexpected situation")}var o=t.exports=function(){if(arguments.length<1||"object"!==typeof arguments[0])return!1;if(arguments.length<2)return arguments[0];var t,e,r=arguments[0];return Array.prototype.slice.call(arguments,1).forEach(function(a){"object"!==typeof a||null===a||Array.isArray(a)||Object.keys(a).forEach(function(s){return e=r[s],(t=a[s])===r?void 0:"object"!==typeof t||null===t?void(r[s]=t):Array.isArray(t)?void(r[s]=function t(e){var r=[];return e.forEach(function(e,a){"object"===typeof e&&null!==e?Array.isArray(e)?r[a]=t(e):i(e)?r[a]=n(e):r[a]=o({},e):r[a]=e}),r}(t)):i(t)?void(r[s]=n(t)):"object"!==typeof e||null===e||Array.isArray(e)?void(r[s]=o({},t)):void(r[s]=o(e,t))})}),r}}).call(this,i(47).Buffer)}}]);
//# sourceMappingURL=6.da481ff5.chunk.js.map