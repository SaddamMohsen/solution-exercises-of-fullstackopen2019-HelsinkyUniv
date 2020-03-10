(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(24),c=n.n(l),o=n(10),u=n(58),s=n(110),i=n(104),m=n(102),f=n(12),g=n(22),d=(n(47),n(78),n(66)),p=n(5),E=n.n(p),b=n(6),v=n(21),h=n(106),O=n(107),L=n(19),S=n.n(L),y=null,w={getAll:function(){return S.a.get("/api/blogs").then(function(e){return e.data})},setToken:function(e){y="bearer ".concat(e)},addNewBlog:function(){var e=Object(b.a)(E.a.mark(function e(t){var n,a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:y}},e.next=3,S.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),addLike:function(){var e=Object(b.a)(E.a.mark(function e(t,n){var a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.put("".concat("/api/blogs","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),removeBlog:function(){var e=Object(b.a)(E.a.mark(function e(t){var n;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.delete("".concat("/api/blogs","/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.status);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_BLOGS":return{loading:!0};case"GETBLOG_SUCCESS":return{items:t.blogs};case"ADD_BLOG":return e.concat(t.data.nblog);case"ADD_LIKE":return console.log("states from add like",e),console.log(t.data.likedBlog),e.items.map(function(e){return e.id!==t.data.likedBlog.id?e:t.data.likedBlog});case"DEL_BLOG":return e.items.filter(function(e){return e.id!==t.data.id});case"GETALL_FAILURE":return{failure:!0};default:return e}},N=function(e){return{type:"ADD_NOTIFICATION",message:e}},j=function(e,t){return function(){var n=Object(b.a)(E.a.mark(function n(a){return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a(N(e)),setTimeout(function(){return a({type:"REMOVE_NOTIFICATION",message:""})},1e3*t);case 2:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}()},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_NOTIFICATION":return t.message;case"REMOVE_NOTIFICATION":return null;default:return e}},T=n(103),U=n(108),I=n(67),_=n(105),A=Object(g.i)(function(e){var t=e.blog,n=Object(a.useState)(!0),l=Object(v.a)(n,2),c=(l[0],l[1],Object(g.g)()),o=(Object(g.h)().state||{from:{pathname:"/blogs"}}).from;return r.a.createElement(O.a,{style:{width:"50rem"}},r.a.createElement(O.a.Body,null,r.a.createElement(O.a.Title,null,t.title," "),r.a.createElement(O.a.Subtitle,{className:"mb-2 text-muted"},t.author),r.a.createElement(O.a.Text,null,t.title),r.a.createElement(O.a.Link,{href:t.url},t.url),r.a.createElement("br",null),r.a.createElement(m.a,{onClick:function(){c.push(o),e.handleLikeBtn(t.id)}},"Like"," "),"like ",r.a.createElement(T.a,{variant:"light"},t.likes),e.creatore&&r.a.createElement(m.a,{onClick:function(){c.push(o),e.handleRemoveBtn(t.id)}},"Remove"),r.a.createElement(U.a,{className:"list-group-flush"},t.comments.map(function(e){return r.a.createElement(I.a,{key:e.id},e.comments)})),r.a.createElement(_.a,{inline:!0},r.a.createElement(_.a.Control,{type:"text",placeholder:"add comment",className:"mr-sm-6"}),r.a.createElement(m.a,{variant:"outline-dark",type:"submit"},"comment"))))}),C={addLike:function(e){return function(){var t=Object(b.a)(E.a.mark(function t(n){var a;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.addLike(e.id,e);case 2:a=t.sent,n({type:"ADD_LIKE",data:{likedBlog:a}});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},removeBlog:function(e){return function(){var t=Object(b.a)(E.a.mark(function t(n){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.removeBlog(e);case 2:t.sent,n({type:"DEL_BLOG",data:{id:e}});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},setNotification:j,initializeBlogs:function(){return function(e){e({type:"INIT_BLOGS"}),w.getAll().then(function(t){return e(function(e){return{type:"GETBLOG_SUCCESS",blogs:e}}(t))},function(t){return e(function(e){return{type:"GETALL_FAILURE",error:e}}(t))})}}},B=Object(g.i)(Object(o.b)(function(e,t){return{blogs:e.blogs,user:e.user}},C)(function(e){var t=Object(g.g)(),n=Object(g.h)(),l=Object(a.useState)("0"),c=Object(v.a)(l,2),o=c[0],u=c[1],s=(n.state||{from:{pathname:"/blogs"}}).from,i=e.blogs?e.blogs:{items:[]};Object(a.useEffect)(function(){null!==e.user&&(i.items||function(){var t=Object(b.a)(E.a.mark(function t(){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.initializeBlogs();case 2:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}()())},[]);var m=function(){var n=Object(b.a)(E.a.mark(function n(a){var r,l;return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=i.items.find(function(e){return e.id===a}),console.log("from handle like",r),l=Object(d.a)({},r,{likes:r.likes+1}),n.next=5,e.addLike(l);case 5:e.setNotification("you liked ".concat(r.title),5),t.push(s),e.initializeBlogs();case 8:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}(),p=function(){var n=Object(b.a)(E.a.mark(function n(a){var r;return E.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=i.items.find(function(e){return e.id===a}),console.log(a,"from remove btn"),n.next=4,e.removeBlog(a);case 4:e.setNotification("you remove ".concat(r.title),5),t.push(s),e.initializeBlogs();case 7:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}(),L=function(t){var n=i.items.find(function(e){return e.id===t});return e.user.username===n.user[0].username};return r.a.createElement("div",null,e.blogs.loading&&r.a.createElement("em",null,"loading blogs..."),e.blogs.failur&&r.a.createElement("span",{className:"text-danger"},"ERROR: ",e.blogs.error),e.blogs.items&&r.a.createElement("div",null,r.a.createElement(h.a,{activeKey:o},e.blogs.items.map(function(e,t){return r.a.createElement(O.a,{key:e.id},r.a.createElement(h.a.Toggle,{as:O.a.Header,eventKey:t,onClick:function(){var e;(e=t)===o&&(e=-1),u(e)}},r.a.createElement(f.b,{to:"/blogs/".concat(e.id)},e.title)),r.a.createElement(h.a.Collapse,{eventKey:t},r.a.createElement(O.a.Body,null,r.a.createElement(g.b,{exact:!0,path:"/blogs/:id",render:function(e){var t,n=e.match;return r.a.createElement(A,{blog:(t=n.params.id,console.log(i),i.items.find(function(e){return e.id===t})),handleLikeBtn:m,handleRemoveBtn:p,creatore:L(n.params.id)})}}))))}))))})),G={login:function(){var e=Object(b.a)(E.a.mark(function e(t){var n,a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.post("/api/login",t);case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},R=function(){return S.a.get("/api/users").then(function(e){return e.data})},D={LOGIN_REQUEST:"USERS_LOGIN_REQUEST",LOGIN_SUCCESS:"USERS_LOGIN_SUCCESS",LOGIN_FAILURE:"USERS_LOGIN_FAILURE",LOGOUT:"USERS_LOGOUT",GETALL_REQUEST:"USERS_GETALL_REQUEST",GETALL_SUCCESS:"USERS_GETALL_SUCCESS",GETALL_FAILURE:"USERS_GETALL_FAILURE"},F=JSON.parse(localStorage.getItem("loggedUser")),K=F||null,Q=function(e){return function(){var t=Object(b.a)(E.a.mark(function t(n){var a;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,G.login(e);case 2:a=t.sent,n({type:D.LOGIN_SUCCESS,data:{loggedUser:a}});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.LOGIN_REQUEST:case D.LOGIN_SUCCESS:return console.log("from login success",t.loggedUser),t.data.loggedUser&&window.localStorage.setItem("loggedUser",JSON.stringify(t.data.loggedUser)),t.data.loggedUser;case D.LOGIN_FAILURE:return{};case D.LOGOUT:return t.data;default:return e}},J=r.a.forwardRef(function(e,t){var n=Object(a.useState)(!1),l=Object(v.a)(n,2),c=l[0],o=l[1],u={display:c?"none":""},s={display:c?"":"none"},i=function(){o(!c)};return Object(a.useImperativeHandle)(t,function(){return{toggleVisibility:i}}),r.a.createElement("div",null,r.a.createElement("div",{style:u},r.a.createElement(m.a,{onClick:i},e.buttonLable)),r.a.createElement("div",{style:s,className:"togglableContent"},e.children," ",r.a.createElement(m.a,{onClick:i},"cancel")))}),z={logIn:Q,setNotification:j},V=Object(o.b)(null,z)(function(e){var t=Object(g.g)(),n=(Object(g.h)().state||{from:{pathname:"/"}}).from,a=function(){var a=Object(b.a)(E.a.mark(function a(r){var l,c,o,u;return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r.preventDefault(),a.prev=1,l=r.target.username.value,c=r.target.password.value,a.next=6,e.logIn({username:l,password:c});case 6:(o=window.localStorage.getItem("loggedUser"))&&(u=JSON.parse(o),w.setToken(u.token)),t.replace(n),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(1),e.setNotification("UserName or Password Wrong",10);case 14:case"end":return a.stop()}},a,null,[[1,11]])}));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement(J,{buttonLable:"Log In"},r.a.createElement("h2",null,"Login"),r.a.createElement(_.a,{onSubmit:a},r.a.createElement(_.a.Group,null,r.a.createElement(_.a.Label,null,"username"),r.a.createElement(_.a.Control,{type:"text",name:"username"}),r.a.createElement(_.a.Label,null,"password"),r.a.createElement(_.a.Control,{className:"form-control",type:"password",name:"password"}),r.a.createElement(m.a,{type:"submit"},"login")))))}),M=n(109),P=Object(o.b)(function(e){return{message:e.notification}})(function(e){return null===e.message?null:r.a.createElement("div",null,r.a.createElement(M.a,{variant:"success"},e.message))}),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.GETALL_REQUEST:return{loading:!0};case D.GETALL_SUCCESS:return{items:t.users};case D.GETALL_FAILURE:return{error:t.error};default:return e}},Y=function(e){Object(g.g)();var t=e.user;return r.a.createElement(O.a,null,r.a.createElement(O.a.Header,null," ",t.username," "),r.a.createElement(O.a.Subtitle,{className:"mb-4 text-muted"},r.a.createElement("strong",null,"Blogs of ",t.username)),r.a.createElement(U.a,{className:"list-group-flush"},t.blogs.map(function(e){return r.a.createElement(I.a,{key:e.id},e.title)})),r.a.createElement(O.a.Footer,null,"no. of blogs created:",t.blogs.length))},q={getAll:function(){return function(e){e({type:D.GETALL_REQUEST}),R().then(function(t){return e(function(e){return{type:D.GETALL_SUCCESS,users:e}}(t))},function(t){return e(function(e){return{type:D.GETALL_FAILURE,error:e}}(t.toString()))})}}},X=Object(o.b)(function(e){return{user:e.user,users:e.users}},q)(function(e){var t=e.user,n=e.users,l=Object(a.useState)("0"),c=Object(v.a)(l,2),o=c[0],u=c[1];Object(a.useEffect)(function(){null!==e.user&&function(){var t=Object(b.a)(E.a.mark(function t(){return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getAll();case 2:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}()()},[]);return r.a.createElement("div",{className:"col-bg-6 col-md-offset-3"},r.a.createElement("h1",null,"Hi ",t.name,"!"),r.a.createElement("p",null,"You're logged in with React!!"),r.a.createElement("h3",null,"All registered users:"),n.loading&&r.a.createElement("em",null,"Loading users..."),n.error&&r.a.createElement("span",{className:"text-danger"},"ERROR: ",n.error),n.items&&r.a.createElement("div",null,r.a.createElement(h.a,{activeKey:o},n.items.map(function(e,t){return r.a.createElement(O.a,{key:e.id,eventKey:t,onClick:function(){var e;e=t,console.log(e),e===o&&(e=-1),u(e)}},r.a.createElement(h.a.Toggle,{as:O.a.Header},r.a.createElement(f.b,{to:"/users/".concat(e.id)},e.name," ")," ---------- Blogs:"," ",r.a.createElement(T.a,{varian:"light"},e.blogs.length)),r.a.createElement(h.a.Collapse,{eventKey:t},r.a.createElement(O.a.Body,null,r.a.createElement(g.b,{exact:!0,path:"/users/:id",render:function(e){var t,a=e.match;return r.a.createElement(Y,{user:(t=a.params.id,n.items.find(function(e){return e.id===t}))})}}))))}))),r.a.createElement(f.b,{to:"/login"},"Logout"))}),Z={createBlog:function(e){return function(){var t=Object(b.a)(E.a.mark(function t(n){var a;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.addNewBlog(e);case 2:a=t.sent,n({type:"ADD_BLOG",data:{nblog:a}});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},setNotification:j},$=Object(g.i)(Object(o.b)(null,Z)(function(e){var t=function(){var t=Object(b.a)(E.a.mark(function t(n){var a;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={title:n.target.title.value,author:n.target.author.value,url:n.target.url.value},t.prev=1,t.next=4,e.createBlog(a);case 4:e.setNotification("new blog ".concat(a.title," added"),10),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0.message);case 10:case"end":return t.stop()}},t,null,[[1,7]])}));return function(e){return t.apply(this,arguments)}}();return r.a.createElement(_.a,{onSubmit:t},r.a.createElement(_.a.Group,null,r.a.createElement(_.a.Label,null,"Title"),r.a.createElement(_.a.Control,{type:"text",name:"title",placeholder:"Enter the Title"}),r.a.createElement(_.a.Label,null," Author"),r.a.createElement(_.a.Control,{type:"text",name:"author",placeholder:"Enter The Author"}),r.a.createElement(_.a.Label,null,"URL"),r.a.createElement(_.a.Control,{type:"text",name:"url",placeholder:"Enter url"}),r.a.createElement(m.a,{variant:"primary",type:"submit"},"Create")))})),ee=function(e){var t=e.user,n=e.logout,a=Object(g.g)();return null!==t?r.a.createElement("p",null,"Welcome!",t.name,r.a.createElement(m.a,{onClick:function(){n(),a.push("/")}},"Sign out")):r.a.createElement("div",null,r.a.createElement("p",null,"You are not logged in."))},te=function(e){var t=e.user,n=e.children,a=Object(u.a)(e,["user","children"]);return r.a.createElement(g.b,Object.assign({},a,{render:function(e){var a=e.location;return null!==t?n:r.a.createElement(g.a,{to:{pathname:"/login",state:{from:a}}})}}))},ne={setNotification:j,logIn:Q,logOut:function(){return window.localStorage.clear("loggedUser"),{type:D.LOGOUT,data:null}}},ae=Object(o.b)(function(e){return{message:e.notification,user:e.user}},ne)(function(e){var t=r.a.createRef();Object(a.useEffect)(function(){try{var e=window.localStorage.getItem("loggedUser");if(e){var t=JSON.parse(e);w.setToken(t.token)}}catch(n){console.log(n.message)}},[]);return r.a.createElement(f.a,null,r.a.createElement("div",{className:"container"},r.a.createElement(P,{message:e.message}),r.a.createElement(s.a,{className:"navbar navbar-expand navbar-dark",bg:"dark",expand:"lg"},r.a.createElement(s.a.Brand,{text:"Blog List Application"},"Blog List Application"),r.a.createElement(s.a.Collapse,{class:"collapse navbar-collapse"},r.a.createElement(i.a,{className:"nav-item"},r.a.createElement("a",{className:"nav-link"},r.a.createElement(f.b,{to:"/"},"Home Page"))),r.a.createElement(i.a,{className:"nav-item"},r.a.createElement("a",{className:"nav-link"},r.a.createElement(f.b,{to:"/blogs"},"Blogs"))),r.a.createElement(i.a,{className:"nav-item"},r.a.createElement("a",{className:"nav-link"},r.a.createElement(f.b,{to:"/users"},"Users"))),r.a.createElement("ul",{className:"nav navbar-nav navbar-right"},r.a.createElement(i.a,{className:"nav-item  ustify-content-end"},r.a.createElement(s.a.Text,null,r.a.createElement("span",{className:"glyphicon glyphicon-log-in"})," ",r.a.createElement(ee,{user:e.user,logout:function(){console.log("from logout");var t=e.user;window.localStorage.clear(),e.logOut(),e.setNotification("".concat(t.name," has logged Out")),setTimeout(function(){e.setNotification(null)},5e3)}})))))),r.a.createElement(g.d,null,r.a.createElement(g.b,{exact:!0,path:"/",render:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Blog List Application"))}}),r.a.createElement(g.b,{exact:!0,path:"/login"},r.a.createElement(V,null)),r.a.createElement(te,{user:e.user,path:"/blogs"},r.a.createElement(J,{buttonLable:"Create Blog",ref:t},r.a.createElement($,null)),r.a.createElement(B,null)),r.a.createElement(g.b,{path:"/blogs"}),r.a.createElement(te,{user:e.user,path:"/"},r.a.createElement(X,null)))))}),re=n(27),le=n(65),ce=Object(re.c)({blogs:k,notification:x,user:H,users:W}),oe=Object(re.d)(ce,Object(re.a)(le.a));oe.subscribe(function(){console.log(oe.getState())}),c.a.render(r.a.createElement(o.a,{store:oe},r.a.createElement(ae,null)),document.getElementById("root"))},47:function(e,t,n){},68:function(e,t,n){e.exports=n(100)},78:function(e,t,n){}},[[68,1,2]]]);
//# sourceMappingURL=main.8aeefdad.chunk.js.map