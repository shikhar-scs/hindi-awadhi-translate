(this.webpackJsonptranlation_app=this.webpackJsonptranlation_app||[]).push([[0],{25:function(e,t,a){e.exports=a(39)},31:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(9),l=a(7),c=a(12),i=a(11),o=a(24),s=a(23),d=a(0),m=a.n(d),u=a(6),h=a.n(u),p=a(5),g=a(42),f=a(41),E=(a(30),a(31),function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={data:null},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("trans_map");null!==e&&this.setState({data:JSON.parse(e)})}},{key:"render",value:function(){var e=this;return null!==this.state.data?m.a.createElement("div",null,m.a.createElement("div",{className:"text-center my-5"},m.a.createElement("h1",null,"Hindi - Awadhi Translation Rules"),m.a.createElement("a",{style:{cursor:"pointer",color:"#f51010"},href:"https://shikhar-scs.github.io/hindi-awadhi-translate/"},"back to home")),m.a.createElement("ul",null,Object.keys(this.state.data).map((function(t,a){return m.a.createElement("li",null,t," -> ",Array.from(e.state.data[t]).join(", "))})))):m.a.createElement("div",{className:"text-center my-5"},m.a.createElement("h1",null,"Hindi - Awadhi Translation Rules"),m.a.createElement("a",{style:{cursor:"pointer",color:"#f51010"},href:"https://shikhar-scs.github.io/hindi-awadhi-translate/"},"back to home"))}}]),a}(m.a.Component)),b=a(20),v=a.n(b),y=function(e,t,a){var n=Array.from(e),r=n.splice(t,1),l=Object(s.a)(r,1)[0];return n.splice(a,0,l),n},N=function(e,t,a){return Object(o.a)({userSelect:"none",padding:8,margin:"0 0 ".concat(8,"px 0"),background:e?"lightgreen":"white",textAlign:a?"right":"left"},t)},_=function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).add_to_localStorage=function(){var e=[];document.querySelectorAll(".hindi-phrase").forEach((function(t){e.push(t.innerText.split(".")[1].trim())}));var t=[];if(document.querySelectorAll(".awadhi-phrase").forEach((function(e){t.push(e.innerText.split(".")[1].trim())})),e.length===t.length){var a=JSON.parse(localStorage.getItem("trans_map"));null===a&&(a={});for(var n=0;n<e.length;n++)e[n]in a?a[e[n]]=Array.from(new Set(a[e[n]]).add(t[n])):a[e[n]]=Array.from([t[n]]);localStorage.setItem("trans_map",JSON.stringify(a)),window.location.reload()}else alert("mappings are not one to one")},r.clear_localStorage=function(){localStorage.setItem("trans_map",null),alert("cleared local storage")},r.copy_to_clipBoard=function(){var e=localStorage.getItem("trans_map");v()(e),alert("copied to clipboard")},r.clean=function(e){return e.replace(/[\u0964"\u201c\u201d'.,/#!$%^&*;:{}=-_`~()]/g,"").replace(/\s{2,}/g," ").trim()},r.prepare=function(e,t){e&&t&&(e=r.clean(e),t=r.clean(t),e=e.split(" ").map((function(e,t){return{id:"hindi-phrase-".concat(t),content:e,className:"hindi-phrase",idNo:t}})),t=t.split(" ").map((function(e,t){return{id:"awadhi-phrase-".concat(t),content:e,className:"awadhi-phrase",idNo:t}})),r.setState({itemsLeft:e,itemsRight:t}))},r.merge=function(e){try{var t=e.target.id.split("_")[0],a=Number(document.getElementById("".concat(t,"_phrase_merge_left")).value)-1,n=Number(document.getElementById("".concat(t,"_phrase_merge_right")).value)-1,r=document.getElementById("".concat(t,"-phrase-").concat(a)),l=document.getElementById("".concat(t,"-phrase-").concat(n));r.innerText=r.innerText+" "+l.innerText.split(" ")[1],l.remove()}catch(e){console.error(e)}},r.state={showRules:!1,itemsLeft:[{id:"empty - 0",content:"empty"}],itemsRight:[{id:"empty - 0",content:"empty"}]},r.onDragEndLeft=r.onDragEndLeft.bind(Object(l.a)(r)),r.onDragEndRight=r.onDragEndRight.bind(Object(l.a)(r)),r}return Object(r.a)(a,[{key:"onDragEndLeft",value:function(e){if(e.destination){var t=y(this.state.itemsLeft,e.source.index,e.destination.index);this.setState({itemsLeft:t})}}},{key:"onDragEndRight",value:function(e){if(e.destination){var t=y(this.state.itemsRight,e.source.index,e.destination.index);this.setState({itemsRight:t})}}},{key:"render",value:function(){var e=this;return this.state.showRules?m.a.createElement(E,null):m.a.createElement("div",{className:"container-fluid"},m.a.createElement("div",{className:"text-center my-5"},m.a.createElement("h1",null,"Hindi - Awadhi Translate"),"click ",m.a.createElement(g.a,{className:"btn-dark",onClick:function(){e.setState({showRules:!0})}},"here")," to view your rules you have created so far"),m.a.createElement("div",{className:"row d-flex justify-content-center"},m.a.createElement("div",{className:"col-5"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Label,{className:"text-danger"},"Hindi Sentence/Phrase"),m.a.createElement(f.a.Control,{id:"hindi_phrase",placeholder:"Enter Hindi sentence/phrase",defaultValue:"\u092f\u093e\u0915\u0942\u092c \u0915\u0947 \u0905\u092a\u0928\u0947 \u0935\u0902\u0936 \u092e\u0947\u0902 \u0938\u0924\u094d\u0924\u0930 \u0932\u094b\u0917 \u0925\u0947\u0964"})))),m.a.createElement("div",{className:"col-5"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Label,{className:"text-danger"},"Awadhi Sentence/Phrase"),m.a.createElement(f.a.Control,{id:"awadhi_phrase",placeholder:"Enter Awadhi sentence/phrase",defaultValue:"\u092f\u093e\u0915\u0942\u092c \u0915 \u0906\u092a\u0928 \u0938\u0928\u094d\u0924\u093e\u0928\u0928 \u092e\u0901 \u0938\u0924\u094d\u0924\u0930 \u0932\u094b\u0917 \u0930\u0939\u0947\u0928\u0964"}))))),m.a.createElement("div",{className:"row d-flex justify-content-center mb-3"},m.a.createElement("div",{className:"col-3 justify-content-center"},m.a.createElement(g.a,{type:"button",className:"btn btn-block ",onClick:function(){e.prepare(document.getElementById("hindi_phrase").value,document.getElementById("awadhi_phrase").value)}},"Generate"))),m.a.createElement("div",{className:"row d-flex justify-content-center"},m.a.createElement("div",{className:" col-2"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Control,{id:"hindi_phrase_merge_left",placeholder:"Enter Index of left word"})))),m.a.createElement("div",{className:"col-2"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Control,{id:"hindi_phrase_merge_right",placeholder:"Enter index of right word"})))),m.a.createElement("div",{className:"col-2"},m.a.createElement(g.a,{className:"btn-dark",id:"hindi_merge",onClick:this.merge},"Merge")),m.a.createElement("div",{className:"col-2"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Control,{id:"awadhi_phrase_merge_left",placeholder:"Enter Index of left word"})))),m.a.createElement("div",{className:"col-2"},m.a.createElement(f.a,null,m.a.createElement(f.a.Group,null,m.a.createElement(f.a.Control,{id:"awadhi_phrase_merge_right",placeholder:"Enter index of right word"})))),m.a.createElement("div",{className:"col-2"},m.a.createElement(g.a,{className:"btn-dark",id:"awadhi_merge",onClick:this.merge},"Merge"))),m.a.createElement("div",{className:"row d-flex mb-5"},m.a.createElement("div",{className:"col-6 d-flex justify-content-end"},m.a.createElement(p.a,{onDragEnd:this.onDragEndLeft},m.a.createElement(p.c,{droppableId:"droppable"},(function(t,a){return m.a.createElement("div",Object.assign({},t.droppableProps,{ref:t.innerRef,style:(a.isDraggingOver,{background:"#192746",padding:8,width:250})}),e.state.itemsLeft.map((function(e,t){return m.a.createElement(p.b,{key:e.id,draggableId:e.id,index:t},(function(t,a){return m.a.createElement("div",Object.assign({ref:t.innerRef,className:e.className,id:e.id},t.draggableProps,t.dragHandleProps,{style:N(a.isDragging,t.draggableProps.style,!0)}),e.idNo+1,".       ",e.content)}))})),t.placeholder)})))),m.a.createElement("div",{className:"col-6 d-flex justify-content-left"},m.a.createElement(p.a,{onDragEnd:this.onDragEndRight},m.a.createElement(p.c,{droppableId:"droppable"},(function(t,a){return m.a.createElement("div",Object.assign({},t.droppableProps,{ref:t.innerRef,style:(a.isDraggingOver,{background:"#192746",padding:8,width:250})}),e.state.itemsRight.map((function(e,t){return m.a.createElement(p.b,{key:e.id,draggableId:e.id,index:t},(function(t,a){return m.a.createElement("div",Object.assign({ref:t.innerRef,className:e.className,id:e.id},t.draggableProps,t.dragHandleProps,{style:N(a.isDragging,t.draggableProps.style)}),e.idNo+1,".    ",e.content)}))})),t.placeholder)}))))),m.a.createElement("div",{className:"row d-flex justify-content-center mb-3"},m.a.createElement("div",{className:"col-3 justify-content-center "},m.a.createElement(g.a,{className:"btn-block",id:"hindi_merge",onClick:this.clear_localStorage},"Clear Localstorage")),m.a.createElement("div",{className:"col-3 justify-content-center "},m.a.createElement(g.a,{className:"btn-block",id:"hindi_merge",onClick:this.add_to_localStorage},"Add To Localstorage")),m.a.createElement("div",{className:"col-3 justify-content-center "},m.a.createElement(g.a,{className:"btn-block",id:"hindi_merge",onClick:this.copy_to_clipBoard},"Copy To Clipboard"))))}}]),a}(d.Component);h.a.render(m.a.createElement(_,null),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.f5aac9c6.chunk.js.map