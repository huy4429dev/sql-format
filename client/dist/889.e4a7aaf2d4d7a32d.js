"use strict";(self.webpackChunkWebSPA=self.webpackChunkWebSPA||[]).push([[889],{7889:(G,_,s)=>{s.r(_),s.d(_,{BridgeModule:()=>E});var m=s(9966),u=s(9808),c=s(8505),e=s(4893),A=s(9305);let f=(()=>{class n{constructor(t){this.dataService=t,this.repipeUrl="http://18.168.249.212/api/bridge/"}getAll(t){return this.dataService.get(this.repipeUrl,t).pipe((0,c.b)(i=>i))}store(t){return this.dataService.post(this.repipeUrl+"add",t).pipe((0,c.b)(i=>!0))}edit(t){return this.dataService.putWithId(this.repipeUrl+"update/"+t.id,t).pipe((0,c.b)(i=>!0))}delete(t){return this.dataService.delete(this.repipeUrl+"delete/"+t.recipe_id+"/"+t.template_id)}getRecipe(){return this.dataService.get(this.repipeUrl+"getRecipe").pipe((0,c.b)(t=>t))}getTemplate(t){return this.dataService.get(this.repipeUrl+"getTemplate",t).pipe((0,c.b)(i=>i))}bulkDelete(t){return this.dataService.delete(this.repipeUrl+"delete_multiple",{body:{ids:t}})}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(A.D))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac}),n})();var d=s(8168),b=s(7579),v=s(1135),x=s(2722),C=s(8372),h=s(8746),Z=s(2313),S=s(7596),T=s(5075),k=s(5517),y=s(2267);function I(n,o){1&n&&(e.TgZ(0,"button",27),e._uU(1," Create Bridge "),e.qZA()),2&n&&e.Q6J("routerLink","create")}function L(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",28),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.popupState.bulkDelete=!0)}),e._uU(1," Delete Recipes "),e.qZA()}}function B(n,o){1&n&&(e.TgZ(0,"th",29),e._uU(1,"action"),e.qZA())}function J(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"td",32)(1,"button",33),e.NdJ("click",function(){e.CHM(t);const a=e.oxw().$implicit,r=e.oxw();return e.KtG(r.handleDelete(a))}),e.O4$(),e.TgZ(2,"svg",34),e._UZ(3,"path",35),e.qZA()()()}}function O(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"td",30)(2,"input",14),e.NdJ("change",function(a){const p=e.CHM(t).index,g=e.oxw();return e.KtG(g.checkItem(a,p))}),e.qZA()(),e.TgZ(3,"td",18),e._uU(4),e.qZA(),e.TgZ(5,"td",13),e._uU(6),e.qZA(),e.YNc(7,J,4,0,"td",31),e.qZA()}if(2&n){const t=o.$implicit,i=e.oxw();e.xp6(2),e.Q6J("checked",t.checked),e.xp6(2),e.Oqu(t.recipe_name),e.xp6(2),e.Oqu(t.template_name),e.xp6(1),e.Q6J("ngIf",i.isActiveAdmin)}}function D(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"app-popup-delete",36),e.NdJ("onOk",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.okDelete())})("onClose",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.popupState.delete=!1)}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("isHandling",t.popupState.isHandling)}}function N(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"app-popup-delete",36),e.NdJ("onOk",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.okBulkDelete())})("onClose",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.popupState.bulkDelete=!1)}),e.qZA()}2&n&&e.Q6J("isHandling",!1)}const U=function(n,o,t){return{itemsPerPage:n,currentPage:o,totalItems:t}},F=function(n,o){return{total:n,count:o}};let w=(()=>{class n{constructor(t,i,a,r){this.titleService=t,this.bridgeService=i,this.loadingService=a,this.notifyService=r,this.unsubscribe=new b.x,this.filterInput=new v.X({page:1,page_size:10}),this.isCheckAllItem=!1,this.hasItemDelete=!1,this.config={itemsPerPage:2,currentPage:1,totalItems:0},this.data=[],this.p=1,this.itemHandle=null,this.popupState={isHandling:!1,edit:!1,delete:!1,bulkDelete:!1},this.titleService.setTitle("List Bridge"),this.loadingService.isLoading.next(!0)}ngOnDestroy(){this.unsubscribe.next(null),this.unsubscribe.complete()}ngOnInit(){this.subsribeFilter(),this.isActiveAdmin=1!=JSON.parse(localStorage.getItem("status"))&&2!=JSON.parse(localStorage.getItem("status"))}subsribeFilter(){this.filterInput.pipe((0,x.R)(this.unsubscribe),(0,c.b)(()=>{this.loadingService.isLoading.next(!0)}),(0,C.b)(500)).subscribe(()=>{this.isCheckAllItem=!1,this.hasItemDelete=!1,this.fetchData()})}fetchData(){this.resetPopupState(),this.loadingService.isLoading.next(!0),this.bridgeService.getAll(this.filterInput.value).pipe((0,h.x)(()=>{this.loadingService.isLoading.next(!1)})).subscribe({next:t=>{var i;!t||(this.data=null!==(i=null==t?void 0:t.data)&&void 0!==i?i:[],this.config.totalItems=t.pagination.total_records,this.config.itemsPerPage=t.pagination.page_size)},error:t=>{var i;this.notifyService.pushNotify.next({type:"error",message:null!==(i=null==t?void 0:t.message)&&void 0!==i?i:"error"})}})}setPageSize(t){this.filterInput.next(Object.assign(Object.assign({},this.filterInput.value),{page_size:t}))}pageChanged(t){this.filterInput.next(Object.assign(Object.assign({},this.filterInput.value),{page:t}))}filter(t,i){this.filterInput.next(Object.assign(Object.assign({},this.filterInput.value),{[t]:i.target.value}))}checkItem(t,i){this.data[i].checked=t.target.checked,this.setCheckAllItem(),this.showDeleteBtn()}checkAllItem(t){const i=t.target.checked;i&&(this.isCheckAllItem=!0),this.data.forEach(a=>{a.checked=i}),this.showDeleteBtn()}setCheckAllItem(){this.isCheckAllItem=!!this.data.every(t=>t.checked)}showDeleteBtn(){this.hasItemDelete=!!this.data.some(t=>t.checked)}handleEdit(t){this.itemHandle=t,this.resetPopupState(),this.popupState.edit=!0}handleDelete(t){this.itemHandle=t,this.resetPopupState(),this.popupState.delete=!0}okDelete(){this.loadingService.isLoading.next(!0),this.bridgeService.delete(this.itemHandle).subscribe({next:()=>{this.fetchData()},error:t=>{var i;this.notifyService.pushNotify.next({type:"error",message:null!==(i=null==t?void 0:t.message)&&void 0!==i?i:"error"}),this.loadingService.isLoading.next(!1)}})}okBulkDelete(){this.loadingService.isLoading.next(!0),this.bridgeService.bulkDelete(this.data.filter(t=>t.checked).map(t=>[t.recipe_id,t.template_id])).subscribe({next:()=>{this.fetchData()},error:t=>{var i;this.notifyService.pushNotify.next({type:"error",message:null!==(i=null==t?void 0:t.message)&&void 0!==i?i:"error"}),this.loadingService.isLoading.next(!1)}})}resetPopupState(){for(const t in this.popupState)this.popupState[t]=!1;this.isCheckAllItem=!1,this.hasItemDelete=!1}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(Z.Dx),e.Y36(f),e.Y36(S.b),e.Y36(T.c))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-list"]],decls:40,vars:18,consts:[[1,"container","mt-3"],["aria-label","breadcrumb ",1,"rounded-3","bg-light","nav-category"],[1,"breadcrumb","p-1"],[1,"breadcrumb-item","text-link"],["href","#",1,"text-decoration-none"],["aria-current","page",1,"breadcrumb-item"],[1,"container","mt-4"],[1,"fw-bold"],["class","btn btn-green text-white mb-4",3,"routerLink",4,"ngIf"],["class","btn btn-danger text-white mb-4","style","margin-left: 8px",3,"click",4,"ngIf"],[1,"container","pb-5"],[1,"table-responsive","scroll-bar"],["data-bs-spy","scroll",1,"table","table-striped","table-hover","table-bordered","table-default"],["scope","col","colspan","1"],["type","checkbox",1,"form-check-input",3,"checked","change"],["scope","col","colspan","4",1,"col-title","text-center"],["scope","col","colspan","1",1,"col-title","text-center","name"],["class","col-title text-center","scope","col","colspan","2",4,"ngIf"],["scope","col","colspan","4"],[1,"form-control",3,"keyup"],["scope","col","colspan","1",1,"name"],["scope","col","colspan","2"],[4,"ngFor","ngForOf"],[1,"d-flex","align-items-center",2,"gap","10"],[3,"model","onOk"],[3,"pageChange"],[3,"isHandling","onOk","onClose",4,"ngIf"],[1,"btn","btn-green","text-white","mb-4",3,"routerLink"],[1,"btn","btn-danger","text-white","mb-4",2,"margin-left","8px",3,"click"],["scope","col","colspan","2",1,"col-title","text-center"],["colspan","1"],["scope","col","colspan","2","class","text-center",4,"ngIf"],["scope","col","colspan","2",1,"text-center"],[1,"p-0","btn","btn-link",3,"click"],["color","#2F80ED","xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-trash3"],["d","M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"],[3,"isHandling","onOk","onClose"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3)(4,"a",4),e._uU(5,"Home"),e.qZA()(),e.TgZ(6,"li",5),e._uU(7,"Bridge"),e.qZA()()()(),e.TgZ(8,"div",6)(9,"h2",7),e._uU(10,"Bridge"),e.qZA(),e.YNc(11,I,2,1,"button",8),e.YNc(12,L,2,0,"button",9),e.qZA(),e.TgZ(13,"div",10)(14,"div",11)(15,"table",12)(16,"thead")(17,"tr")(18,"th",13)(19,"input",14),e.NdJ("change",function(r){return i.checkAllItem(r)}),e.qZA()(),e.TgZ(20,"th",15),e._uU(21,"recipe.name"),e.qZA(),e.TgZ(22,"th",16),e._uU(23,"template.name"),e.qZA(),e.YNc(24,B,2,0,"th",17),e.qZA(),e.TgZ(25,"tr"),e._UZ(26,"th",13),e.TgZ(27,"th",18)(28,"input",19),e.NdJ("keyup",function(r){return i.filter("recipe_name",r)}),e.qZA()(),e.TgZ(29,"th",20)(30,"input",19),e.NdJ("keyup",function(r){return i.filter("template_name",r)}),e.qZA()(),e._UZ(31,"th",21),e.qZA()(),e.TgZ(32,"tbody"),e.YNc(33,O,8,4,"tr",22),e.ALo(34,"paginate"),e.qZA()()(),e.TgZ(35,"div",23)(36,"app-menu-pagination",24),e.NdJ("onOk",function(r){return i.setPageSize(r)}),e.qZA(),e.TgZ(37,"pagination-controls",25),e.NdJ("pageChange",function(r){return i.p=r})("pageChange",function(r){return i.pageChanged(r)}),e.qZA()()(),e.YNc(38,D,1,1,"app-popup-delete",26),e.YNc(39,N,1,1,"app-popup-delete",26)),2&t&&(e.xp6(11),e.Q6J("ngIf",i.isActiveAdmin),e.xp6(1),e.Q6J("ngIf",i.isActiveAdmin&&i.hasItemDelete),e.xp6(7),e.Q6J("checked",i.isCheckAllItem),e.xp6(5),e.Q6J("ngIf",i.isActiveAdmin),e.xp6(9),e.Q6J("ngForOf",e.xi3(34,8,i.data,e.kEZ(11,U,i.config.itemsPerPage,i.p,i.config.totalItems))),e.xp6(3),e.Q6J("model",e.WLB(15,F,null==i.config?null:i.config.totalItems,null==i.data?null:i.data.length)),e.xp6(2),e.Q6J("ngIf",i.popupState.delete),e.xp6(1),e.Q6J("ngIf",i.popupState.bulkDelete))},dependencies:[u.sg,u.O5,k.w,y.V,d.rH,m.LS,m._s]}),n})();var l=s(2382);function H(n,o){if(1&n&&(e.TgZ(0,"option",20),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("ngValue",t.recipe_id),e.xp6(1),e.Oqu(t.name)}}function q(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"tbody")(1,"tr")(2,"td")(3,"input",28),e.NdJ("change",function(a){const p=e.CHM(t).$implicit,g=e.oxw(2);return e.KtG(g.onCheckboxChange(p.template_id,a.target.checked))}),e.qZA()(),e.TgZ(4,"td"),e._uU(5),e.qZA()()()}if(2&n){const t=o.$implicit,i=e.oxw(2);e.xp6(3),e.Q6J("checked",i.isTemplateSelected(t.template_id))("value",t.template_id),e.xp6(2),e.Oqu(t.name)}}function M(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",21)(1,"p",9),e._uU(2,"Template"),e.qZA(),e.TgZ(3,"table",22)(4,"thead")(5,"tr",23)(6,"th",24),e._uU(7,"Filter"),e.qZA(),e.TgZ(8,"th",25)(9,"input",26),e.NdJ("keyup",function(a){e.CHM(t);const r=e.oxw();return e.KtG(r.filter("name",a))}),e.qZA()()()(),e.YNc(10,q,6,3,"tbody",27),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(10),e.Q6J("ngForOf",t.dataTemplate)}}const P=[{path:"",component:w},{path:"create",component:(()=>{class n{constructor(t,i,a,r,p,g,z){this.titleService=t,this.fb=i,this.bridgeService=a,this.loadingService=r,this.notifyService=p,this.formBuilder=g,this.router=z,this.filterInput=new v.X({page:1,page_size:10}),this.unsubscribe=new b.x,this.titleService.setTitle("Create Bridge"),this.loadingService.isLoading.next(!0),this.bridgeForm=this.fb.group({data:[]}),this.dataBridge=this.formBuilder.group({bridge:this.formBuilder.array([]),template_ids:this.formBuilder.array([])})}ngOnInit(){this.fetchDataReicepe(),this.fetchDataTemplate(),this.subsribeFilter()}ngOnDestroy(){this.unsubscribe.next(null),this.unsubscribe.complete()}fetchDataReicepe(){this.loadingService.isLoading.next(!0),this.bridgeService.getRecipe().pipe((0,h.x)(()=>{this.loadingService.isLoading.next(!1)})).subscribe({next:t=>{var i;!t||(this.dataRecipe=null!==(i=null==t?void 0:t.data)&&void 0!==i?i:[])},error:t=>{var i;this.notifyService.pushNotify.next({type:"error",message:null!==(i=null==t?void 0:t.message)&&void 0!==i?i:"error"})}})}subsribeFilter(){this.filterInput.pipe((0,x.R)(this.unsubscribe),(0,c.b)(()=>{this.loadingService.isLoading.next(!0)}),(0,C.b)(500)).subscribe(()=>{this.fetchDataTemplate()})}fetchDataTemplate(){this.loadingService.isLoading.next(!0),this.bridgeService.getTemplate(this.filterInput.value).pipe((0,h.x)(()=>{this.loadingService.isLoading.next(!1)})).subscribe({next:t=>{var i;!t||(this.dataTemplate=null!==(i=null==t?void 0:t.data)&&void 0!==i?i:[])},error:t=>{var i;this.notifyService.pushNotify.next({type:"error",message:null!==(i=null==t?void 0:t.message)&&void 0!==i?i:"error"})}})}onOptionsSelected(){console.log()}filter(t,i){this.filterInput.next(Object.assign(Object.assign({},this.filterInput.value),{[t]:i.target.value}))}onCheckboxChange(t,i){const a=this.dataBridge.get("bridge").value.findIndex(r=>r.recipe_id===this.selectedItem);if(i)if(a>-1){const r=this.dataBridge.get("bridge").value[a].template_ids;"string"==typeof r&&(this.dataBridge.get("bridge").value[a].template_ids=[r]),Array.isArray(r)?r.push(t):this.dataBridge.get("bridge").value[a].template_ids=[r,t]}else this.dataBridge.get("bridge").push(this.formBuilder.group({recipe_id:this.selectedItem,template_ids:[[t]]}));else{const r=this.dataBridge.get("bridge").value[a].template_ids,p=r.indexOf(t);Array.isArray(r)&&r.splice(p,1),0===r.length&&this.dataBridge.get("bridge").removeAt(a)}console.log(this.dataBridge.value.bridge)}onSubmit(){if(!this.bridgeForm.valid)return;this.loadingService.isLoading.next(!0);let i={};this.bridgeService.store({data:this.dataBridge.value.bridge}).pipe((0,h.x)(()=>{this.notifyService.pushNotify.next(i)})).subscribe({next:()=>{i={type:"success",message:"create bridge success"},this.bridgeForm.reset(),this.router.navigate(["/admin/bridge/"])},error:a=>{var r;i={type:"error",message:null!==(r=null==a?void 0:a.message)&&void 0!==r?r:"error"},this.loadingService.isLoading.next(!1)}})}isTemplateSelected(t){const i=this.dataBridge.get("bridge").value.findIndex(a=>a.recipe_id===this.selectedItem);if(i>-1){const a=this.dataBridge.get("bridge").value[i].template_ids;return Array.isArray(a)&&a.includes(t)}return!1}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(Z.Dx),e.Y36(l.qu),e.Y36(f),e.Y36(S.b),e.Y36(T.c),e.Y36(l.qu),e.Y36(d.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-create"]],decls:27,vars:4,consts:[[1,"container","mt-3"],["aria-label","breadcrumb",1,"rounded-3","bg-light","nav-category"],[1,"breadcrumb","p-1"],[1,"breadcrumb-item","text-link"],["href","#",1,"text-decoration-none"],["aria-current","page",1,"breadcrumb-item","text-link"],["routerLink","/admin/bridge",1,"text-decoration-none"],["aria-current","page",1,"breadcrumb-item"],[1,"container","mt-4"],[1,"fw-bold"],[1,"btn","btn-outline-secondary","mr-2",3,"routerLink"],[1,"btn","text-white","btn-success-custom",2,"margin-left","6px",3,"click"],[1,"container","mt-4","pb-5"],[1,"mb-4","divider"],[1,"row"],[1,"col-4","pe-5","border-end"],[1,"fw-bold","tex-center"],["placeholder","'select option'",1,"form-select",3,"ngModel","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],["class","col-8 ps-5 text-center",4,"ngIf"],[3,"ngValue"],[1,"col-8","ps-5","text-center"],[1,"mx-auto","table","table-bordered","table-striped","w-50"],[1,"border-0"],[1,"col-1","border-0"],[1,"border"],[1,"form-control",3,"keyup"],[4,"ngFor","ngForOf"],["type","checkbox",1,"form-check-input",3,"checked","value","change"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3)(4,"a",4),e._uU(5,"Home"),e.qZA()(),e.TgZ(6,"li",5)(7,"a",6),e._uU(8,"Bridge"),e.qZA()(),e.TgZ(9,"li",7),e._uU(10,"New"),e.qZA()()()(),e.TgZ(11,"div",8)(12,"h2",9),e._uU(13,"New Bridge"),e.qZA(),e.TgZ(14,"button",10),e._uU(15,"Cancel"),e.qZA(),e.TgZ(16,"button",11),e.NdJ("click",function(){return i.onSubmit()}),e._uU(17,"Save"),e.qZA()(),e.TgZ(18,"div",12),e._UZ(19,"div",13),e.TgZ(20,"div",14)(21,"div",15)(22,"p",16),e._uU(23,"Recipe"),e.qZA(),e.TgZ(24,"select",17),e.NdJ("ngModelChange",function(r){return i.selectedItem=r})("ngModelChange",function(){return i.onOptionsSelected()}),e.YNc(25,H,2,2,"option",18),e.qZA()(),e.YNc(26,M,11,1,"div",19),e.qZA()()),2&t&&(e.xp6(14),e.Q6J("routerLink","/admin/bridge"),e.xp6(10),e.Q6J("ngModel",i.selectedItem),e.xp6(1),e.Q6J("ngForOf",i.dataRecipe),e.xp6(1),e.Q6J("ngIf",i.selectedItem))},dependencies:[u.sg,u.O5,d.rH,d.yS,l.YN,l.Kr,l.EJ,l.JJ,l.On]}),n})(),canActivate:[s(2385).D]}];let R=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(P),d.Bz]}),n})();var j=s(8395);let E=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[f],imports:[u.ez,j.m,R,l.UX,l.u5,m.JX]}),n})()}}]);