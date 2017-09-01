webpackJsonp([1],[,,,,,,function(t,e,s){"use strict";var n=s(2),a=s.n(n),o=s(66),i=s(54),r=s.n(i),d=s(53),c=s.n(d);a.a.use(o.a),e.a=new o.a({routes:[{path:"/",name:"Boards",component:r.a},{path:"/boards/:id",name:"Board",component:c.a}]})},,,,,,function(t,e,s){"use strict";var n=s(14),a=s.n(n),o=s(2),i=s.n(o),r=s(68),d=s(6),c=!window.location.host.includes("localhost"),l=c?"https://super-kanban.herokuapp.com:3000/":"http//localhost:3000/",u=a.a.create({baseURL:l+"api/",timeout:2e3,withCredentials:!0}),m=a.a.create({baseURL:l,timeout:2e3,withCredentials:!0});i.a.use(r.a);var h=new r.a.Store({state:{boards:[],activeBoard:{},error:{},loggedIn:!1,name:"",lists:[],tasks:{},comments:{}},mutations:{setBoards:function(t,e){t.boards=e},setComments:function(t,e){i.a.set(t.comments,e.taskId,e.comments)},setActiveBoard:function(t,e){t.activeBoard=e},setListsWithSort:function(t,e){e.sort(function(t,e){return t.index-e.index}),t.lists=e},setLists:function(t,e){t.lists=e},setTasks:function(t,e){t.tasks[e.listId]=e.tasks},setAllTasks:function(t,e){t.lists.forEach(function(s){var n=e.filter(function(t){return t.listId==s._id});n.sort(function(t,e){return t.index-e.index}),i.a.set(t.tasks,s._id,n)})},handleError:function(t,e){t.error=e},setUser:function(t,e){t.name=e.name,t.loggedIn=e.loggedIn},clearState:function(t){t.boards=[],t.activeBoard={},t.error={},t.loggedIn=!1,t.name="",t.lists=[],t.tasks={},t.comments={}}},actions:{getBoards:function(t){var e=t.commit;t.dispatch;u("userboards").then(function(t){e("setBoards",t.data.data)}).catch(function(t){e("handleError",t)})},getBoard:function(t,e){var s=t.commit;t.dispatch;u("boards/"+e).then(function(t){s("setActiveBoard",t.data.data)}).catch(function(t){s("handleError",t)})},getLists:function(t,e){var s=t.commit,n=t.dispatch;u("/boards/"+e+"/lists").then(function(t){n("getTasksByBoard",e),s("setListsWithSort",t.data.data)}).catch(function(t){s("handleError",t)})},getTasks:function(t,e){var s=t.commit;t.dispatch;u("/lists/"+e+"/tasks").then(function(t){s("setTasks",{tasks:t.data.data,listId:e})}).catch(function(t){s("handleError",t)})},getTasksByBoard:function(t,e){var s=t.commit;t.dispatch;u("/boards/"+e+"/tasks").then(function(t){s("setAllTasks",t.data.data)}).catch(function(t){s("handleError",t)})},getComments:function(t,e){var s=t.commit;t.dispatch;u("tasks/"+e+"/comments").then(function(t){s("setComments",{taskId:e,comments:t.data.data})}).catch(function(t){s("handleError",t)})},createBoard:function(t,e){var s=t.commit,n=t.dispatch;u.post("boards/",e).then(function(t){n("getBoards")}).catch(function(t){s("handleError",t)})},createList:function(t,e){var s=t.commit,n=t.dispatch;u.post("lists/",e).then(function(t){n("getLists",e.boardId)}).catch(function(t){s("handleError",t)})},createTask:function(t,e){var s=t.commit,n=t.dispatch;u.post("tasks/",e).then(function(t){n("getTasks",e.listId)}).catch(function(t){s("handleError",t)})},createComment:function(t,e){var s=t.commit,n=t.dispatch;u.post("comments/",e).then(function(t){n("getComments",e.taskId)}).catch(function(t){s("handleError",t)})},addCollaborator:function(t,e){t.commit,t.dispatch},removeBoard:function(t,e){var s=t.commit,n=t.dispatch;u.delete("boards/"+e._id).then(function(t){n("getBoards")}).catch(function(t){s("handleError",t)})},removeList:function(t,e){var s=t.commit,n=t.dispatch;u.delete("lists/"+e._id).then(function(t){n("getLists",e.boardId)}).catch(function(t){s("handleError",t)})},removeTask:function(t,e){var s=t.commit,n=t.dispatch;u.delete("tasks/"+e._id).then(function(t){n("getTasks",e.listId)}).catch(function(t){s("handleError",t)})},removeComment:function(t,e){var s=t.commit,n=t.dispatch;u.delete("comments/"+e._id).then(function(t){n("getComments",e.taskId)}).catch(function(t){s("handleError",t)})},setTaskIndexes:function(t,e){for(var s=t.commit,n=(t.dispatch,e.listId,e.tasks),a=[],o=0;o<n.length;o++)n[o].index!=o&&(n[o].index=o,a.push(n[o]));a.forEach(function(t){u.put("tasks/"+t._id,t).then(function(t){}).catch(function(t){s("handleError",t)})},this)},setListIndexes:function(t,e){for(var s=t.commit,n=(t.dispatch,e.boardId,e.lists),a=[],o=0;o<n.length;o++){var i=n[o];i.index!=o&&(i.index=o,a.push(i))}a.forEach(function(t){u.put("lists/"+t._id,t).then(function(t){}).catch(function(t){s("handleError",t)})},this)},login:function(t,e){var s=t.commit,n=t.dispatch;m.post("login/",e).then(function(t){t.data.data.loggedIn=!0,s("setUser",t.data.data),n("getBoards")}).catch(function(t){alert("Invalid email or password")})},register:function(t,e){var s=t.commit;t.dispatch;m.post("register/",e).then(function(t){t.data.data.loggedIn=!0,s("setUser",t.data.data),console.log(t)}).catch(function(t){s("handleError",t)})},logout:function(t){var e=t.commit;t.dispatch;m.delete("logout").then(function(t){e("setUser",{name:"",loggedIn:!1}),e("clearState"),d.a.push({name:"Boards"})}).catch(function(t){return e("handleError",t)})},checkForSession:function(t){var e=t.commit;t.dispatch;m("authenticate").then(function(t){t.data.data&&e("setUser",{name:t.data.data.name,loggedIn:!0})})},handleError:function(t,e){var s=t.commit;t.dispatch;s("handleError",e)}}});e.a=h},function(t,e,s){s(44),s(45);var n=s(1)(s(32),s(60),"data-v-0ced6bc0",null);t.exports=n.exports},,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(55),a=s.n(n),o=s(57),i=s.n(o),r=s(3);s.n(r);e.default={name:"app",components:{Error:a.a,Login:i.a},data:function(){return{showLogin:!1,eventHandled:!1}},mounted:function(){this.$store.dispatch("checkForSession")},methods:{logout:function(){this.$store.dispatch("logout"),this.showLogin=!1},closeFormListener:function(){var t=this;if(this.eventHandled)return void(this.eventHandled=!1);this.showLogin=!0,this.outsideClickOrEscapeListener("login-parent",function(){t.showLogin=!1},"login-button",function(e){t.eventHandled=e})}},computed:{loggedIn:function(){return this.$store.state.loggedIn},name:function(){return this.$store.state.name}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(3),a=(s.n(n),s(56)),o=s.n(a),i=s(2),r=s.n(i),d=s(4),c=s.n(d);e.default={name:"board",components:{List:o.a,Draggable:c.a},data:function(){return{newList:{},newCollaborator:"",showListForm:!1,eventHandled:!1}},mounted:function(){this.$store.dispatch("getBoard",this.$route.params.id),this.$store.dispatch("getLists",this.$route.params.id)},methods:{createList:function(){this.newList.name=this.newList.name.trim(),this.newList.name&&(this.newList.boardId=this.$route.params.id,this.newList.index=this.$store.state.lists.length,this.$store.dispatch("createList",this.newList),this.showListForm=!1,this.newList={})},addCollaborator:function(){this.newCollaborator=this.newCollaborator.trim(),this.newCollaborator&&(this.$store.dispatch("addCollaborator",{collaborator:this.newCollaborator,boardId:this.$route.params.id}),this.newCollaborator="")},closeFormListener:function(){var t=this;if(this.eventHandled)return void(this.eventHandled=!1);this.showListForm=!0,r.a.nextTick(function(){t.$refs.newListName.focus()}),this.outsideClickOrEscapeListener("create-list-parent",function(){t.showListForm=!1},"open-form-btn",function(e){t.eventHandled=e})},hideListForm:function(){this.showListForm=!1,this.unbindListeners()},onEnd:function(t){this.$store.dispatch("setListIndexes",{boardId:this.$route.params.id,lists:this.lists})}},computed:{board:function(){return this.$store.state.activeBoard},lists:{get:function(){return this.$store.state.lists},set:function(t){this.$store.commit("setLists",t)}}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(3),a=(s.n(n),s(2)),o=s.n(a);e.default={name:"boards",data:function(){return{newBoard:{},showBoardForm:!1,eventHandled:!1}},mounted:function(){this.$store.dispatch("getBoards")},methods:{createBoard:function(){this.newBoard.name=this.newBoard.name.trim(),this.newBoard.name&&(this.$store.dispatch("createBoard",this.newBoard),this.showBoardForm=!1,this.newBoard={})},removeBoard:function(t){this.$store.dispatch("removeBoard",t)},closeFormListener:function(){var t=this;if(this.eventHandled)return void(this.eventHandled=!1);this.showBoardForm=!0,o.a.nextTick(function(){t.$refs.newBoardName.focus()}),this.outsideClickOrEscapeListener("create-board-parent",function(){t.showBoardForm=!1},"open-board-form-btn",function(e){t.eventHandled=e})},hideBoardForm:function(){this.showBoardForm=!1,this.unbindListeners()}},computed:{boards:function(){return this.$store.state.boards},loggedIn:function(){return this.$store.state.loggedIn}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"error",computed:{error:function(){return this.$store.state.error}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(58),a=s.n(n),o=s(4),i=s.n(o);e.default={components:{Task:a.a,Draggable:i.a},props:["list"],data:function(){return{newTask:{},dragStartListId:"",dragEndListId:""}},methods:{removeList:function(t){this.$store.dispatch("removeList",t)},createTask:function(t){this.newTask.name=this.newTask.name.trim(),this.newTask.name&&(this.newTask.listId=t,this.newTask.boardId=this.$route.params.id,this.newTask.index=this.$store.state.tasks[t].length,this.$store.dispatch("createTask",this.newTask),this.newTask={})},onMove:function(t,e){t.relatedContext&&t.relatedContext.element&&(this.dragStartListId||(this.dragStartListId=t.draggedContext.element.listId),t.draggedContext.element.listId=t.relatedContext.element.listId,this.dragEndListId=t.relatedContext.element.listId)},onEnd:function(t){(this.dragEndListId||this.dragStartListId)&&(this.$store.dispatch("setTaskIndexes",{listId:this.dragStartListId,tasks:this.$store.state.tasks[this.dragStartListId]}),this.dragStartListId!=this.dragEndListId&&this.$store.dispatch("setTaskIndexes",{listId:this.dragEndListId,tasks:this.$store.state.tasks[this.dragEndListId]}),this.dragStartListId="",this.dragEndListId="")}},computed:{tasks:{get:function(){return this.$store.state.tasks[this.list._id]},set:function(t){this.$store.commit("setTasks",{listId:this.list._id,tasks:t})}}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(40),a=s.n(n),o=s(2),i=s.n(o);e.default={name:"login",data:function(){return{loginInfo:{name:"",password:""},registerInfo:{name:"",password:"",passwordVerif:"",email:""}}},mounted:function(){var t=this;i.a.nextTick(function(){t.$refs.loginName.focus()})},methods:{login:function(){this.trimInputs(this.loginInfo),this.loginInfo.name?this.loginInfo.password.length<8?alert("password must be at least 8 characters"):this.$store.dispatch("login",JSON.parse(a()(this.loginInfo))):alert("must enter user name to login"),this.clearInputs()},register:function(){if(this.trimInputs(this.registerInfo),this.registerInfo.name&&this.registerInfo.email&&this.registerInfo.password&&this.registerInfo.passwordVerif){if(this.registerInfo.password.length<8)return void alert("password must be at least 8 characters");this.registerInfo.password==this.registerInfo.passwordVerif?this.$store.dispatch("register",JSON.parse(a()(this.registerInfo))):alert("passwords must match")}else alert("please fill out all fields in the registration form");this.clearInputs()},trimInputs:function(t){for(var e in t)t[e]=t[e].trim()},clearInputs:function(){this.loginInfo.name="",this.loginInfo.password="",this.registerInfo.name="",this.registerInfo.email="",this.registerInfo.password="",this.registerInfo.passwordVerif=""}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["task"],data:function(){return{showComments:!1,newComment:""}},methods:{removeTask:function(){this.$store.dispatch("removeTask",this.task)},toggleComments:function(){this.task.comments||this.$store.dispatch("getComments",this.task._id),this.showComments=!this.showComments},createComment:function(){this.newComment=this.newComment.trim(),this.newComment&&(this.$store.dispatch("createComment",{taskId:this.task._id,body:this.newComment}),this.newComment="")},removeComment:function(t){this.$store.dispatch("removeComment",t)}},computed:{comments:function(){return this.$store.state.comments[this.task._id]}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(2),a=s.n(n),o=s(13),i=s.n(o),r=s(6),d=s(12),c=s(3),l=s.n(c),u=s(4),m=s.n(u);a.a.mixin({methods:{outsideClickOrEscapeListener:function(t,e,s,n){var a=this;l()(document).mouseup(function(o){var i=l()("#"+t);if(!i.is(o.target)&&0===i.has(o.target).length){if(n){var r=l()("#"+s),d=r.is(o.target)||r.has(o.target).length>0;n(d)}a.unbindListeners(),e()}}),l()(document).on("keyup",function(t){27==t.keyCode&&(a.unbindListeners(),e())})},unbindListeners:function(){l()(document).unbind("mouseup"),l()(document).unbind("keyup")}}}),new a.a({el:"#app",store:d.a,router:r.a,draggable:m.a,template:"<App/>",components:{App:i.a}})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,s){s(48);var n=s(1)(s(33),s(63),"data-v-5337eb44",null);t.exports=n.exports},function(t,e,s){s(43);var n=s(1)(s(34),s(59),"data-v-0c6e3af6",null);t.exports=n.exports},function(t,e,s){s(47);var n=s(1)(s(35),s(62),"data-v-49c58c80",null);t.exports=n.exports},function(t,e,s){s(46);var n=s(1)(s(36),s(61),"data-v-32eec754",null);t.exports=n.exports},function(t,e,s){s(49);var n=s(1)(s(37),s(64),"data-v-60b1dd3e",null);t.exports=n.exports},function(t,e,s){s(50);var n=s(1)(s(38),s(65),"data-v-7de155bd",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container boards"},[s("div",{staticClass:"row"},[t._l(t.boards,function(e){return s("div",{staticClass:"col-xs-12 col-md-6 col-lg-3"},[s("router-link",{attrs:{to:"/boards/"+e._id}},[s("div",{staticClass:"panel panel-default hidden-children board-card"},[s("h4",[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"glyphicon glyphicon-trash hidden-child",on:{click:function(s){s.preventDefault(),s.stopPropagation(),t.removeBoard(e)}}})])])],1)}),t._v(" "),t.loggedIn?s("div",{staticClass:"col-xs-12 col-md-6 col-lg-3"},[s("div",{staticClass:"panel panel-default action muted board-card",attrs:{id:"open-board-form-btn"},on:{click:t.closeFormListener}},[s("h4",[t._v("Create new board")])])]):s("div",[s("h1",[t._v("Please login to continue.")])])],2),t._v(" "),t.showBoardForm?s("div",{staticClass:"panel panel-default",attrs:{id:"create-board-parent"}},[s("div",{staticClass:"panel-heading"},[t._v("Create Board "),s("span",{staticClass:"action muted",on:{click:t.hideBoardForm}},[t._v("x")])]),t._v(" "),s("form",{staticClass:"panel-body",attrs:{id:"create-board-form"},on:{submit:function(e){e.preventDefault(),t.createBoard(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],ref:"newBoardName",attrs:{type:"text",maxlength:"50",placeholder:"board name",required:""},domProps:{value:t.newBoard.name},on:{input:function(e){e.target.composing||(t.newBoard.name=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],attrs:{type:"text",maxlength:"140",placeholder:"description"},domProps:{value:t.newBoard.description},on:{input:function(e){e.target.composing||(t.newBoard.description=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Create Board")])])]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("nav",{staticClass:"navbar navbar-default navbar-fixed-top"},[s("div",{staticClass:"container"},[s("div",{staticClass:"navbar-header"},[t._m(0),t._v(" "),s("a",{staticClass:"navbar-brand action",on:{click:function(t){}}},[s("p",[t._v("Kanban")])])]),t._v(" "),s("div",{staticClass:"collapse navbar-collapse navbar-right",attrs:{id:"navbar-header-collapse"}},[s("ul",{staticClass:"nav navbar-nav"},[s("li",{staticClass:"active"},[s("a",{staticClass:"action",on:{click:function(t){}}},[s("router-link",{attrs:{to:{name:"Boards"}}},[t._v("Home")]),s("span",{staticClass:"sr-only"},[t._v("(current)")])],1)]),t._v(" "),t.loggedIn?t._e():s("li",{attrs:{id:"login-button"}},[s("a",{staticClass:"action",on:{click:t.closeFormListener}},[t._v("Login/Register")])]),t._v(" "),t.loggedIn?s("li",[s("a",{staticClass:"action"},[t._v(t._s(t.name))])]):t._e(),t._v(" "),t.loggedIn?s("li",[s("a",{staticClass:"action",on:{click:t.logout}},[t._v("Logout")])]):t._e()])])])]),t._v(" "),s("error"),t._v(" "),s("router-view"),t._v(" "),t.showLogin&&!t.loggedIn?s("Login"):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"navbar-toggle collapsed",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbar-header-collapse"}},[s("span",{staticClass:"sr-only"},[t._v("Toggle navigation")]),t._v(" "),s("span",{staticClass:"icon-bar"}),t._v(" "),s("span",{staticClass:"icon-bar"}),t._v(" "),s("span",{staticClass:"icon-bar"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"panel panel-default list-card hidden-children"},[s("h4",{staticClass:"panel-header"},[s("strong",[t._v(t._s(t.list.name)+":")]),t._v(" "+t._s(t.list.description))]),t._v(" "),s("Draggable",{staticClass:"dragArea",attrs:{options:{draggable:".task-item",group:"tasks"},move:t.onMove},on:{end:t.onEnd},model:{value:t.tasks,callback:function(e){t.tasks=e},expression:"tasks"}},t._l(t.tasks,function(t){return s("div",{staticClass:"task-item"},[s("Task",{attrs:{task:t}})],1)})),t._v(" "),s("div",{staticClass:"panel-body"},[s("div",{staticClass:"panel panel-default"},[s("form",{on:{submit:function(e){e.preventDefault(),t.createTask(t.list._id)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.name,expression:"newTask.name"}],attrs:{type:"text",placeholder:"task"},domProps:{value:t.newTask.name},on:{input:function(e){e.target.composing||(t.newTask.name=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn btn-default"},[t._v("Create Task")])])])]),t._v(" "),s("span",{staticClass:"glyphicon glyphicon-trash hidden-child",on:{click:function(e){t.removeList(t.list)}}})],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.error.message?s("div",[t._v(" \n  Error: "+t._s(t.error)+"\n")]):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h3",[t._v(t._s(t.board.name))]),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("form",{attrs:{id:"add-collaborator-form"},on:{submit:function(e){e.preventDefault(),t.addCollaborator(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newCollaborator,expression:"newCollaborator"}],attrs:{type:"text",maxlength:"16",placeholder:"Add Collaborator",required:""},domProps:{value:t.newCollaborator},on:{input:function(e){e.target.composing||(t.newCollaborator=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Add")])])])])]),t._v(" "),s("div",{staticClass:"jumbotron"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("Draggable",{staticClass:"moveable dragArea",attrs:{options:{draggable:".list-item",group:"lists"}},on:{end:t.onEnd},model:{value:t.lists,callback:function(e){t.lists=e},expression:"lists"}},t._l(t.lists,function(t){return s("div",{staticClass:"col-xs-12 col-md-6 col-lg-3 list-item"},[s("List",{attrs:{list:t}})],1)})),t._v(" "),s("div",{staticClass:"col-xs-12 col-md-6 col-lg-3"},[s("div",{staticClass:"panel panel-default action muted list-card",attrs:{id:"open-form-btn"},on:{click:t.closeFormListener}},[s("h4",[t._v("Create new list")])])])],1)])]),t._v(" "),t.showListForm?s("div",{staticClass:"panel panel-default",attrs:{id:"create-list-parent"}},[s("div",{staticClass:"panel-heading"},[t._v("Create List "),s("span",{staticClass:"action muted",attrs:{id:"exit-form-btn"},on:{click:t.hideListForm}},[t._v("x")])]),t._v(" "),s("form",{staticClass:"panel-body",attrs:{id:"create-list-form"},on:{submit:function(e){e.preventDefault(),t.createList(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.name,expression:"newList.name"}],ref:"newListName",attrs:{type:"text",maxlength:"50",placeholder:"list name",required:""},domProps:{value:t.newList.name},on:{input:function(e){e.target.composing||(t.newList.name=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.description,expression:"newList.description"}],attrs:{type:"text",maxlength:"140",placeholder:"description"},domProps:{value:t.newList.description},on:{input:function(e){e.target.composing||(t.newList.description=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Create List")])])]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"panel panel-default",attrs:{id:"login-parent"}},[s("h3",[t._v("Login ")]),t._v(" "),s("form",{attrs:{id:"login-form"},on:{submit:function(e){e.preventDefault(),t.login(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginInfo.name,expression:"loginInfo.name"}],ref:"loginName",attrs:{type:"text",maxlength:"16",placeholder:"name",required:""},domProps:{value:t.loginInfo.name},on:{input:function(e){e.target.composing||(t.loginInfo.name=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginInfo.password,expression:"loginInfo.password"}],attrs:{type:"password",maxlength:"16",placeholder:"password",required:""},domProps:{value:t.loginInfo.password},on:{input:function(e){e.target.composing||(t.loginInfo.password=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Login")])]),t._v(" "),s("h3",[t._v("Register")]),t._v(" "),s("form",{attrs:{id:"register-form"},on:{submit:function(e){e.preventDefault(),t.register(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerInfo.name,expression:"registerInfo.name"}],attrs:{type:"text",maxlength:"16",placeholder:"name",required:""},domProps:{value:t.registerInfo.name},on:{input:function(e){e.target.composing||(t.registerInfo.name=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerInfo.email,expression:"registerInfo.email"}],attrs:{type:"email",placeholder:"email",required:""},domProps:{value:t.registerInfo.email},on:{input:function(e){e.target.composing||(t.registerInfo.email=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerInfo.password,expression:"registerInfo.password"}],attrs:{type:"password",maxlength:"16",placeholder:"password",required:""},domProps:{value:t.registerInfo.password},on:{input:function(e){e.target.composing||(t.registerInfo.password=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.registerInfo.passwordVerif,expression:"registerInfo.passwordVerif"}],attrs:{type:"password",maxlength:"16",placeholder:"re-enter password",required:""},domProps:{value:t.registerInfo.passwordVerif},on:{input:function(e){e.target.composing||(t.registerInfo.passwordVerif=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Register")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"task"},[s("p",{staticClass:"task-hidden-children"},[s("span",{staticClass:"action",on:{click:t.toggleComments}},[t._v(t._s(t.task.name))]),t._v(" "),s("span",{staticClass:"glyphicon glyphicon-trash task-hidden-child",on:{click:t.removeTask}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showComments,expression:"showComments"}]},[s("ul",t._l(t.comments,function(e){return s("li",{staticClass:"comment-hidden-children"},[t._v(t._s(e.body)+" - "+t._s(e.creatorName||"unknown")+"\n\t\t\t\t"),s("span",{staticClass:"glyphicon glyphicon-trash comment-hidden-child",on:{click:function(s){s.preventDefault(),s.stopPropagation(),t.removeComment(e)}}})])})),t._v(" "),s("div",{staticClass:"panel panel-default",attrs:{id:"create-board-parent"}},[s("div",{staticClass:"panel-heading"},[t._v("comments")]),t._v(" "),s("form",{staticClass:"panel-body",attrs:{id:"create-board-form"},on:{submit:function(e){e.preventDefault(),t.createComment(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment,expression:"newComment"}],attrs:{type:"text",maxlength:"50",placeholder:"comment"},domProps:{value:t.newComment},on:{input:function(e){e.target.composing||(t.newComment=e.target.value)}}}),t._v(" "),s("button",{staticClass:"btn"},[t._v("Create Comment")])])])])])},staticRenderFns:[]}}],[39]);
//# sourceMappingURL=app.d63bec8121b37d0d38eb.js.map