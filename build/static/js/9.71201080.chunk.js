(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{522:function(e,t,a){"use strict";a.r(t);var n=a(24),l=a(25),r=a(27),s=a(26),c=a(28),i=a(0),o=a.n(i),m=a(18),u=a(34),d=a(45),b=a(22),p=a(4),h=a(44),v=a(9),E=function(e){var t=e.ulClass,a=e.liClass,n=e.winners;return o.a.createElement("ol",{className:h("list-group list-group-flush",t)},p.map(n,function(e,t){return o.a.createElement("li",{key:t,className:h("list-group-item",a)},e?o.a.createElement("div",null,o.a.createElement("span",{className:"player-name"},Object(v.g)(e)),o.a.createElement("span",{className:"player-lottery-amount"},Object(v.j)(1*e.won_amount+1*e.service_charge))):o.a.createElement("div",{className:"placeholder-div"}))}))},y=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(r.a)(this,Object(s.a)(t).call(this))).state={isLoading:!0,winners:[]},e}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.lottery.winners;return o.a.createElement(i.Fragment,null,o.a.createElement("div",{className:"winners-table card"},o.a.createElement("h4",{className:"card-header"},"Recent Winners"),o.a.createElement(E,{winners:e.data}),o.a.createElement("div",{className:"card-body"},o.a.createElement(d.c,{exact:!0,className:"card-link",to:"/winners"},"View Past Winners"))))}}]),t}(i.Component);var N=Object(b.e)(Object(m.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer,lottery:e.lotteryReducer}},{makeRequest:u.a})(y)),k=a(58),f=a(189),j=a(258),O=a(15),g=a(16),C=a(14),w=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={numbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],pickedNumbers:[]},a.randomPick=a.randomPick.bind(Object(k.a)(Object(k.a)(a))),a.handleNumberClick=a.handleNumberClick.bind(Object(k.a)(Object(k.a)(a))),a.playLottery=a.playLottery.bind(Object(k.a)(Object(k.a)(a))),a.handleSlotCloseEvent=a.handleSlotCloseEvent.bind(Object(k.a)(Object(k.a)(a))),a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;window.Echo.channel("lottery").listen("LotterySlotClosedEvent",function(t){e.handleSlotCloseEvent()})}},{key:"componentDidMount",value:function(){this.randomPick(!1)}},{key:"componentWillUnmount",value:function(){}},{key:"handleSlotCloseEvent",value:function(){console.log("handle slotclose event");var e=[void 0,void 0,void 0,void 0,void 0,void 0];this.setState({pickedNumbers:e}),this.props.setLotteryPickedNumbers(e)}},{key:"handleNumberClick",value:function(e){var t=this.state.pickedNumbers,a=t.indexOf(e);if(-1!==a)delete t[a];else{var n=Object(v.f)(t);"number"===typeof n&&(t[n]=e)}this.setState({pickedNumbers:t}),this.props.setLotteryPickedNumbers(t)}},{key:"randomPick",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this;!function a(n){setTimeout(function(){var l=Object(v.b)();if(t.setState({pickedNumbers:l}),t.props.setLotteryPickedNumbers(l),--n)a(n);else if(!e){var r=[void 0,void 0,void 0,void 0,void 0,void 0];t.setState({pickedNumbers:r}),t.props.setLotteryPickedNumbers(r)}},150)}(10)}},{key:"playLottery",value:function(){this.props.auth.isAuthenticated?this.props.setModal("playLottery"):this.props.setModal("login")}},{key:"render",value:function(){var e=this.state,t=e.numbers,a=e.pickedNumbers,n=Object(v.f)(a);return o.a.createElement(i.Fragment,null,o.a.createElement("div",{className:"lottery-table card focusable"},o.a.createElement("h4",{className:"card-header"},o.a.createElement("span",null,"undefined"!==typeof n?"Pick Numbers":"Picked Numbers"),o.a.createElement(j.a,{liClass:"picked-number",numbers:a,handleClick:this.handleNumberClick})),o.a.createElement("div",{className:"card-body"},o.a.createElement(f.a,{ulClass:"lottery-table-numbers",liClass:"lottery-table-number",numbers:t,activeNumbers:a,handleClick:this.handleNumberClick}),o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{className:"btn btn-info",onClick:this.randomPick},"Random Pick"),o.a.createElement("button",{className:"btn btn-primary",onClick:this.playLottery},"Play Now")))))}}]),t}(o.a.Component);var S=Object(b.e)(Object(m.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{setModal:O.f,makeRequest:u.a,setUser:g.c,setLotteryPickedNumbers:C.d})(w)),P=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={isLoading:!0,gameStatus:"",result:null,timer:{days:"00",hours:"00",minutes:"00",seconds:"00",miliSeconds:"000",deciSeconds:"00"}},a.handleNumberClick=a.handleNumberClick.bind(Object(k.a)(Object(k.a)(a))),a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(){var e=this.props.lottery,t=e.slot,a=e.result;this.setState({slot:t,result:a}),t&&t.id&&this.setTimer()}},{key:"setTimer",value:function(){var e=this,t=this.props.lottery.slot,a=new Date(t.end_time).getTime(),n=setInterval(function(){var t=(new Date).getTime(),l=a-t,r=Math.floor(l/864e5),s=Math.floor(l%864e5/36e5),c=Math.floor(l%36e5/6e4),i=Math.floor(l%6e4/1e3),o=Math.floor(l%1e3),m=Math.floor(l%10);e.setState({timer:{days:r<10?"0"+r:r,hours:s<10?"0"+s:s,minutes:c<10?"0"+c:c,seconds:i<10?"0"+i:i,miliSeconds:o<10?"00"+o:o<100?"0"+o:o,deciSeconds:m<10?"0"+m:m}}),l<0?(clearInterval(n),e.setState({gameStatus:"processing"})):e.setState({gameStatus:"running"})},1)}},{key:"handleNumberClick",value:function(){}},{key:"render",value:function(){this.props.auth.user;var e=this.props.lottery.lastSlot,t=this.state,a=t.gameStatus,n=t.timer;t.result;return o.a.createElement(i.Fragment,null,o.a.createElement("div",{className:"count-down-table card"},"running"===a&&o.a.createElement("div",{className:"card-body"},o.a.createElement("h4",null,"Next Game On"),o.a.createElement("div",{className:"countdown"},o.a.createElement("h3",{className:"countdown-text"},o.a.createElement("span",null,n.minutes)," : ",o.a.createElement("span",null,n.seconds)," : ",o.a.createElement("span",null,n.deciSeconds)))),"processing"===a&&o.a.createElement("div",{className:"card-body"},o.a.createElement("h4",null,"Result Processing ..."),o.a.createElement("div",{className:"countdown"},o.a.createElement("h3",{className:"countdown-text"},o.a.createElement("span",null,"00")," : ",o.a.createElement("span",null,"00")," : ",o.a.createElement("span",null,"00")))),e&&e.id&&o.a.createElement("div",{className:"card-body"},e.winners.length>0?o.a.createElement("div",{className:"congratulation-note"},o.a.createElement("div",{className:"text-center"},o.a.createElement("strong",null,"Congratulation to Winners")),p.map(e.winners,function(e,t){return o.a.createElement("div",{key:t,className:"winner-sec text-center"},e.full_name," : ",Object(v.j)(1*e.pivot.won_amount+1*e.pivot.service_charge))})):o.a.createElement("div",null),o.a.createElement("div",{className:"countdown"},o.a.createElement("h5",{className:"counter-title text-center"},"Last Winning Numbers"),o.a.createElement(f.a,{ulClass:"lottery-table-numbers result",liClass:"lottery-table-number",numbers:e.result,activeNumbers:e.result,handleClick:this.handleNumberClick})),o.a.createElement("div",{className:"text-center no-winners"},"No Winners so pool prize has been added to next game."))))}}]),t}(i.Component),L=function(e){var t=e.ulClass,a=e.liClass,n=e.players;return o.a.createElement("ul",{className:h("players-list",t)},p.map(n,function(e,t){return o.a.createElement("li",{key:t,className:h(a)},e?o.a.createElement("div",null,o.a.createElement("span",{className:"player-name"},Object(v.g)(e)," ",o.a.createElement("small",null,"joined the Game."))):o.a.createElement("div",{className:"placeholder-div-sm"}))}))},M=function(e){var t=e.players,a=e.total;return o.a.createElement(i.Fragment,null,o.a.createElement("div",{className:"wining-numbers-table card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h4",null,"Active Players : ",a),o.a.createElement(L,{players:t}))))},R=a(257),x=function(e){function t(e){return Object(n.a)(this,t),Object(r.a)(this,Object(s.a)(t).call(this,e))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.lottery,t=e.slot,a=e.players,n=t&&t.total_participants;return o.a.createElement("div",{className:"section-bottom"},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-sm-12 col-md-5 col-lg-4"},o.a.createElement(N,null)),o.a.createElement("div",{className:"col-sm-12 col-md-7 col-lg-5"},o.a.createElement(S,null)),o.a.createElement("div",{className:"col-sm-12 col-md-12 col-lg-3"},o.a.createElement(P,{lottery:this.props.lottery,auth:this.props.auth}),o.a.createElement(M,{players:a.data,total:n})))))}}]),t}(i.Component);t.default=Object(R.a)(x)}}]);
//# sourceMappingURL=9.71201080.chunk.js.map