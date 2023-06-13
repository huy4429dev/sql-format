"use strict";(self.webpackChunkWebSPA=self.webpackChunkWebSPA||[]).push([[303],{9303:(f,c,e)=>{e.r(c),e.d(c,{AdminModule:()=>m});var l=e(9808),r=e(4893);let d=(()=>{class o{constructor(){}}return o.\u0275fac=function(a){return new(a||o)},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac}),o})();var n=e(8168);function g(o,t){1&o&&(r.TgZ(0,"li",9)(1,"a",11),r._uU(2,"User"),r.qZA()()),2&o&&(r.xp6(1),r.Q6J("routerLink","/admin/user"))}let s=(()=>{class o{constructor(){}ngOnInit(){this.isActiveAdmin=JSON.parse(localStorage.getItem("status_admin"))}logout(){localStorage.clear(),window.location.href="/"}}return o.\u0275fac=function(a){return new(a||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-header"]],inputs:{url:"url"},decls:29,vars:6,consts:[[2,"background-color","#180A34"],[1,"container","navbar","navbar-expand-lg","navbar-light"],[1,"container-fluid"],["href","/",1,"navbar-brand","text-white","fs-5"],["src","https://app.dev.kleene.ai/img/branding/logo-large-2022.svg","width","100","height","25"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarText","aria-controls","navbarText","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarText",1,"collapse","navbar-collapse","justify-content-between"],[1,"navbar-nav","me-auto","mb-2","mb-lg-0","m-0",2,"margin","0 !important"],[1,"nav-item"],["aria-current","page","routerLinkActive","text-active",1,"nav-link","text-white",3,"routerLink"],["routerLinkActive","text-active",1,"nav-link","text-white",3,"routerLink"],["aria-current","page",1,"nav-link","text-white",3,"routerLink"],["class","nav-item",4,"ngIf"],[1,"nav-link","text-white",2,"cursor","pointer",3,"click"]],template:function(a,i){1&a&&(r.TgZ(0,"header",0)(1,"nav",1)(2,"div",2)(3,"a",3),r._UZ(4,"img",4),r.qZA(),r.TgZ(5,"button",5),r._UZ(6,"span",6),r.qZA(),r.TgZ(7,"div",7)(8,"ul",8)(9,"li",9)(10,"a",10),r._uU(11,"Recipe"),r.qZA()(),r.TgZ(12,"li",9)(13,"a",11),r._uU(14,"Template"),r.qZA()(),r.TgZ(15,"li",9)(16,"a",11),r._uU(17,"Bridge"),r.qZA()()(),r.TgZ(18,"ul",8)(19,"li",9)(20,"a",12),r._uU(21,"Home"),r.qZA()(),r.YNc(22,g,3,1,"li",13),r.TgZ(23,"li",9)(24,"a",14),r.NdJ("click",function(){return i.logout()}),r._uU(25,"Logout"),r.qZA()(),r.TgZ(26,"li",9)(27,"a",11),r._uU(28,"Docs"),r.qZA()()()()()()()),2&a&&(r.xp6(10),r.Q6J("routerLink","/admin/recipe"),r.xp6(3),r.Q6J("routerLink","/admin/template"),r.xp6(3),r.Q6J("routerLink","/admin/bridge"),r.xp6(4),r.Q6J("routerLink","/"),r.xp6(2),r.Q6J("ngIf",i.isActiveAdmin),r.xp6(5),r.Q6J("routerLink","/docs"))},dependencies:[l.O5,n.yS,n.Od],styles:["[_ngcontent-%COMP%]:root{--transition-main-menu: .2s;--transition-toggle: .35s;--active-button: #ECF7F7;--success-badge-background: rgba(0, 169, 159, .12);--warning-badge-background: rgba(255, 191, 65, .12);--warning-color-opa-1: rgba(250, 120, 26, .1);--btn-hover-bg-color: #f4f4f4;--btn-hover-bg-light-color: #f8f8f8;--btn-active-bg-color: #E8F7F6;--btn-active-primary-color: rgba(0, 169, 159, .13);--devide-line-color: #e5e5e5;--primary-color: #00AA9F;--primary-hover: #33BBB2;--primary-active: #0AA095;--primary-disable: #B3E5E2;--secondary-hover: #F0FEFE;--secondary-active: #CBEFEB;--primary-color-opa-8: rgba(0, 170, 159, .08);--primary-color-opa-10: #00AA9F1A;--secondary-color: #f5f5f5;--primary-white: #FFFFFF;--secondary-white: #fafafa;--argent-color: #BFBFBF;--primary-black: #000000;--primary-green: #306465;--primary-purple: #6B696C;--primary-dark-gray: #212121;--header-dark-gray: #202020;--header-dark-gray-opa-60: rgba(32, 32, 32, .6);--header-dark-gray-opa-40: rgba(32, 32, 32, .4);--header-dark-gray-opa-50: rgba(32, 32, 32, .5);--header-dark-gray-opa-70: rgba(100, 100, 100, .7);--primary-dark-cyan: #21a9a0;--bg-move-task: #E5F7F5;--secondary-dark-gray: #747474;--primary-brown: #333;--error-color: #e01a00;--danger-color: #E1024F;--danger-hover: #ED0E5B;--danger-active: #D1003F;--danger-disable: rgba(225, 2, 79, .4);--danger-color-opa-10: rgba(225, 2, 79, .1);--danger-color-opa-4: rgba(225, 2, 79, .04);--danger-color-opa-40: rgba(225, 2, 79, .4);--tertiary-hover: #EDF0F2;--tertiary-active: #E6E9EB;--tertiary-disable: #F2F5F7;--warning-color: #FFB441;--active-color: #38dbd0;--button-color: #00aa9f;--disable-button-color: #99D5CF;--bg-hover-move: #E6F7F6;--button-secondary-color: #03a59c;--light-color: #F4F8F9;--placeholder-color: #9fa1a2;--border-color-base: #eaeaea;--border-color-light: #EDEDED;--border-color-green: #30bfb5;--border-color-danger: #FF0000;--radio-color: #009688;--radio-color-10: #00968819;--tab-color: #5c5c5c;--supplier-color: #7977db;--not-available-color: #9a9a9a;--select-option-color: #242424;--search-field-bg-color: #f6f6f6;--light-gray-color: #646464;--light-gray-color-opa-60: rgba(100, 100, 100, .6);--remaining-item-background: #E3E8EC;--toggle-checkbox-background: #DFDFE6;--white-small-circle: #FCFCFD;--delete-button-border: #E9ECF0;--select-box-hover-color: #dadada;--background-audio-call-color: #efefef;--manager-color: #4B7DE0;--border-search-input: #00AA9F;--border-auth-input: #009688;--highlight-search-text: #00AA9F;--background-file-denied: #FFF4F4;--date-pdf-file: #6b696c;--arrow-dropdown: #666666;--background-picture: #D8D8D8;--slider-runnable-track: #D9D9D9;--cropper-outline-color: rgba(239, 243, 244, .6);--white-smoke: #F5F5F5;--sonic-silver: #757575;--light-gray-border: #EEEEEE;--light-gray-border-2: #BCBCBC;--primary-green-opacity-01: #e5f6f5;--grey-button-color: #E0E0E0;--grey-table-header-color: #F9F9F9;--user-ownership: #00A99F;--user-tenancy: #FFBF41;--user-tenancy-badge-color: #FAA41A;--user-tenancies: #FAA41A;--user-property-manager: #4A7CE0;--border-input-text: rgba(0, 0, 0, .6);--dnd-error-background-color: rgba(194, 113, 113, .2);--dnd-success-background-color: rgba(0, 170, 159, .1);--selected-item: #ECF7F7;--unread-color: #E53659;--not-reply-color: #E12F4F;--message-background: #FFFFFF;--label-checkbox:#23262F;--light-white-gray: #F2F5F5;--border-color: #E7E8E8;--not-assigned-background-color: #F7F7F7;--not-assigned-color: #C7C7C7;--background-root-component-color: #fff;--group-option-color: #23262B;--task-selected-color: #EBF8F7;--item-in-task-selected: #D7EFED;--title-task: #0A0D26;--btn-primary-disabled-color: #B0E5E1;--btn-delete-bg-danger: rgba(225, 2, 79, .1) ;--overlap-color: #ECECEC;--divider: rgba(0, 0, 0, .12);--select-focus-outline: rgba(0, 170, 159, .6);--infoticket-border: rgba(100, 100, 100, .4);--control-panel-tag-hover: #00a99f08;--link-hover: #337ab7;--message-able-to-drag: #D8E5E4;--white-opacity-02: rgba(255, 255, 255, .2);--highlight-portfolio: rgba(0, 170, 159, .12);--tooltip-button-color: #EFAE2E;--krinis: #231F20;--table-header-gray: rgba(0,0,0,.6);--item-hover: #E5F3F2;--item-active: #D8E6E5;--file-name: #344054;--file-size: #475467;--unidentified-color: #A7A9AC;--other-color: #EF3F47;--button-shadow: 2px 10px 14px 0 rgba(0, 169, 159, .12);--base-border: 1px solid rgba(0, 0, 0, .12);--root-component-radius: 8px;--base-font-size: 14px;--history-background-color: #F2F5F7;--round-wrapper-color: #F4F6F6;--nav-not-active-color: #767477;--leftWidthFormAppbar1920: 365px;--rightWidthFormAppbar1920: 424px;--leftWidthFormAppbar1440: 284px;--rightWidthFormAppbar1440: 318px;--rightWidthFormAppbar16: 16px;--emergency-text-color: #F2F5F7;--un-highlight-ticket-button: #808181;--gray-scroll-bar: #121212;--background-conversation-checked: #FDFDFE;--background-btn-remove: #f1f1f1;--background-input-hover: #eaedef;--border-warning-invite-message: #FA781A;--background-color-invite-message: #FFF1E8}.esh-header[_ngcontent-%COMP%]{background-color:#1da1f2;height:4rem}.esh-header-back[_ngcontent-%COMP%]{text-decoration:none;text-transform:uppercase}"]}),o})(),b=(()=>{class o{}return o.\u0275fac=function(a){return new(a||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-footer"]],inputs:{url:"url"},decls:6,vars:0,consts:[[1,"bg-light","mt-5","py-3"],[1,"container","d-flex","justify-content-between","align-items-center"],[1,"m-0"]],template:function(a,i){1&a&&(r.TgZ(0,"footer",0)(1,"div",1)(2,"p",2),r._uU(3,"\xa9 Kleene.ai 2023"),r.qZA(),r.TgZ(4,"p",2),r._uU(5,"Powered by Recipes"),r.qZA()()())},styles:["[_ngcontent-%COMP%]:root{--transition-main-menu: .2s;--transition-toggle: .35s;--active-button: #ECF7F7;--success-badge-background: rgba(0, 169, 159, .12);--warning-badge-background: rgba(255, 191, 65, .12);--warning-color-opa-1: rgba(250, 120, 26, .1);--btn-hover-bg-color: #f4f4f4;--btn-hover-bg-light-color: #f8f8f8;--btn-active-bg-color: #E8F7F6;--btn-active-primary-color: rgba(0, 169, 159, .13);--devide-line-color: #e5e5e5;--primary-color: #00AA9F;--primary-hover: #33BBB2;--primary-active: #0AA095;--primary-disable: #B3E5E2;--secondary-hover: #F0FEFE;--secondary-active: #CBEFEB;--primary-color-opa-8: rgba(0, 170, 159, .08);--primary-color-opa-10: #00AA9F1A;--secondary-color: #f5f5f5;--primary-white: #FFFFFF;--secondary-white: #fafafa;--argent-color: #BFBFBF;--primary-black: #000000;--primary-green: #306465;--primary-purple: #6B696C;--primary-dark-gray: #212121;--header-dark-gray: #202020;--header-dark-gray-opa-60: rgba(32, 32, 32, .6);--header-dark-gray-opa-40: rgba(32, 32, 32, .4);--header-dark-gray-opa-50: rgba(32, 32, 32, .5);--header-dark-gray-opa-70: rgba(100, 100, 100, .7);--primary-dark-cyan: #21a9a0;--bg-move-task: #E5F7F5;--secondary-dark-gray: #747474;--primary-brown: #333;--error-color: #e01a00;--danger-color: #E1024F;--danger-hover: #ED0E5B;--danger-active: #D1003F;--danger-disable: rgba(225, 2, 79, .4);--danger-color-opa-10: rgba(225, 2, 79, .1);--danger-color-opa-4: rgba(225, 2, 79, .04);--danger-color-opa-40: rgba(225, 2, 79, .4);--tertiary-hover: #EDF0F2;--tertiary-active: #E6E9EB;--tertiary-disable: #F2F5F7;--warning-color: #FFB441;--active-color: #38dbd0;--button-color: #00aa9f;--disable-button-color: #99D5CF;--bg-hover-move: #E6F7F6;--button-secondary-color: #03a59c;--light-color: #F4F8F9;--placeholder-color: #9fa1a2;--border-color-base: #eaeaea;--border-color-light: #EDEDED;--border-color-green: #30bfb5;--border-color-danger: #FF0000;--radio-color: #009688;--radio-color-10: #00968819;--tab-color: #5c5c5c;--supplier-color: #7977db;--not-available-color: #9a9a9a;--select-option-color: #242424;--search-field-bg-color: #f6f6f6;--light-gray-color: #646464;--light-gray-color-opa-60: rgba(100, 100, 100, .6);--remaining-item-background: #E3E8EC;--toggle-checkbox-background: #DFDFE6;--white-small-circle: #FCFCFD;--delete-button-border: #E9ECF0;--select-box-hover-color: #dadada;--background-audio-call-color: #efefef;--manager-color: #4B7DE0;--border-search-input: #00AA9F;--border-auth-input: #009688;--highlight-search-text: #00AA9F;--background-file-denied: #FFF4F4;--date-pdf-file: #6b696c;--arrow-dropdown: #666666;--background-picture: #D8D8D8;--slider-runnable-track: #D9D9D9;--cropper-outline-color: rgba(239, 243, 244, .6);--white-smoke: #F5F5F5;--sonic-silver: #757575;--light-gray-border: #EEEEEE;--light-gray-border-2: #BCBCBC;--primary-green-opacity-01: #e5f6f5;--grey-button-color: #E0E0E0;--grey-table-header-color: #F9F9F9;--user-ownership: #00A99F;--user-tenancy: #FFBF41;--user-tenancy-badge-color: #FAA41A;--user-tenancies: #FAA41A;--user-property-manager: #4A7CE0;--border-input-text: rgba(0, 0, 0, .6);--dnd-error-background-color: rgba(194, 113, 113, .2);--dnd-success-background-color: rgba(0, 170, 159, .1);--selected-item: #ECF7F7;--unread-color: #E53659;--not-reply-color: #E12F4F;--message-background: #FFFFFF;--label-checkbox:#23262F;--light-white-gray: #F2F5F5;--border-color: #E7E8E8;--not-assigned-background-color: #F7F7F7;--not-assigned-color: #C7C7C7;--background-root-component-color: #fff;--group-option-color: #23262B;--task-selected-color: #EBF8F7;--item-in-task-selected: #D7EFED;--title-task: #0A0D26;--btn-primary-disabled-color: #B0E5E1;--btn-delete-bg-danger: rgba(225, 2, 79, .1) ;--overlap-color: #ECECEC;--divider: rgba(0, 0, 0, .12);--select-focus-outline: rgba(0, 170, 159, .6);--infoticket-border: rgba(100, 100, 100, .4);--control-panel-tag-hover: #00a99f08;--link-hover: #337ab7;--message-able-to-drag: #D8E5E4;--white-opacity-02: rgba(255, 255, 255, .2);--highlight-portfolio: rgba(0, 170, 159, .12);--tooltip-button-color: #EFAE2E;--krinis: #231F20;--table-header-gray: rgba(0,0,0,.6);--item-hover: #E5F3F2;--item-active: #D8E6E5;--file-name: #344054;--file-size: #475467;--unidentified-color: #A7A9AC;--other-color: #EF3F47;--button-shadow: 2px 10px 14px 0 rgba(0, 169, 159, .12);--base-border: 1px solid rgba(0, 0, 0, .12);--root-component-radius: 8px;--base-font-size: 14px;--history-background-color: #F2F5F7;--round-wrapper-color: #F4F6F6;--nav-not-active-color: #767477;--leftWidthFormAppbar1920: 365px;--rightWidthFormAppbar1920: 424px;--leftWidthFormAppbar1440: 284px;--rightWidthFormAppbar1440: 318px;--rightWidthFormAppbar16: 16px;--emergency-text-color: #F2F5F7;--un-highlight-ticket-button: #808181;--gray-scroll-bar: #121212;--background-conversation-checked: #FDFDFE;--background-btn-remove: #f1f1f1;--background-input-hover: #eaedef;--border-warning-invite-message: #FA781A;--background-color-invite-message: #FFF1E8}"]}),o})();const F=[{path:"",component:(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(a){return new(a||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-admin"]],decls:5,vars:0,consts:[[1,"admin-main"],[1,"modal-backdrop",2,"display","none","opacity","0.5"]],template:function(a,i){1&a&&(r._UZ(0,"app-header"),r.TgZ(1,"div",0),r._UZ(2,"router-outlet"),r.qZA(),r._UZ(3,"app-footer")(4,"div",1))},dependencies:[s,b,n.lC],styles:[".admin-main{min-height:calc(100vh - 180px)}"]}),o})(),children:[{path:"dashboard",loadComponent:()=>e.e(936).then(e.bind(e,936)).then(o=>o.DashboardComponent)},{path:"template",loadChildren:()=>Promise.all([e.e(801),e.e(592),e.e(196)]).then(e.bind(e,1196)).then(o=>o.TemplateModule)},{path:"recipe",loadChildren:()=>Promise.all([e.e(801),e.e(293)]).then(e.bind(e,4293)).then(o=>o.RecipeModule)},{path:"bridge",loadChildren:()=>Promise.all([e.e(801),e.e(889)]).then(e.bind(e,7889)).then(o=>o.BridgeModule)},{path:"user",loadChildren:()=>Promise.all([e.e(801),e.e(592),e.e(343)]).then(e.bind(e,4343)).then(o=>o.UserModule),canActivate:[(()=>{class o{constructor(a){this.router=a}canActivate(a,i){return!!this.isAuthenticated()||(this.router.navigate(["/admin"]),!1)}isAuthenticated(){return 1==JSON.parse(localStorage.getItem("status_admin"))}}return o.\u0275fac=function(a){return new(a||o)(r.LFG(n.F0))},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()]}]}];let p=(()=>{class o{}return o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[n.Bz.forChild(F),n.Bz]}),o})();var u=e(8395),h=e(2382);let m=(()=>{class o{}return o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({providers:[d],imports:[l.ez,u.m,p,h.u5]}),o})()}}]);