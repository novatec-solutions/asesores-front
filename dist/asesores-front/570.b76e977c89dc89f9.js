"use strict";(self.webpackChunkasesores_front=self.webpackChunkasesores_front||[]).push([[570],{8570:(K,l,o)=>{o.r(l),o.d(l,{LoginModule:()=>X});var k=o(9808),r=o(3075),x=o(2155),C=o(7423),e=(o(3191),o(5e3)),m=o(508),u=(o(6360),o(5664),o(7144));let p=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({}),i})(),S=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[m.si,m.BQ,u.Q8,p],m.BQ,p]}),i})();var q=o(7531),h=o(8555),D=o(2324),E=o(2340),w=o(520),U=o(7176);let z=(()=>{class i{constructor(n,t){this.http=n,this.aesencryptService=t,this.baseUrl=E.N.url_server}loginUser(n){const a={data:this.aesencryptService.encrypt(JSON.stringify(n))};return this.http.post(this.baseUrl+"Landing/Asesores/Autentica/",a)}}return i.\u0275fac=function(n){return new(n||i)(e.LFG(w.eN),e.LFG(U.v))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var B=o(8966),f=o(7093),V=o(773);function J(i,c){1&i&&(e.TgZ(0,"div",16),e._UZ(1,"mat-spinner",17),e.qZA()),2&i&&(e.xp6(1),e.Q6J("diameter",40)("strokeWidth",10))}const N=[{path:"",component:(()=>{class i{constructor(n,t,a,s){this.router=n,this.fb=t,this.AuthService=a,this.dialog=s,this.loader=!1,this.loginForm=this.fb.group({user:["",r.kI.required],pass:["",r.kI.required]})}ngOnInit(){}onLogin(){if(this.loginForm.valid){const n={data:{usuario:this.loginForm.value.user.toUpperCase(),password:this.loginForm.value.pass,idApp:"AMCO"}};this.loader=!0,this.AuthService.loginUser(n).subscribe(t=>{"OK_SESSION"==t.response.estado?(localStorage.setItem("isLoggedin","true"),localStorage.setItem("username",t.response.usuario.usuario),localStorage.setItem("userStatus",t.response.usuario.estado),localStorage.setItem("userRole",t.response.usuario.role),this.router.navigate(["/dashboard"])):this.dialog.open(D.a,{width:"250px",data:{text:"Usuario o contrase\xf1a incorrectos"}}).afterClosed(),this.loader=!1})}}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(h.F0),e.Y36(r.qu),e.Y36(z),e.Y36(B.uw))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-login"]],decls:22,vars:6,consts:[[1,"login-page"],[1,"content","px20"],["novalidate","",1,"login-form",3,"formGroup","ngSubmit"],[1,"login-form--icon"],["src","assets/images/login-icon.svg","alt","Asesores Appp"],[1,"text-center"],[1,"app-name"],["fxLayout","row"],["fxFlexFill",""],[1,"login-input","w-100"],[1,"login-input--label"],["formControlName","user",1,"login-input--input"],["type","password","formControlName","pass",1,"login-input--input"],[1,"login-form--submit"],["type","submit",3,"disabled"],["class","spinner-container",4,"ngIf"],[1,"spinner-container"],[3,"diameter","strokeWidth"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"form",2),e.NdJ("ngSubmit",function(){return t.onLogin()}),e.TgZ(3,"div",3),e._UZ(4,"img",4),e.qZA(),e.TgZ(5,"div",5),e.TgZ(6,"h2",6),e._uU(7,"Asesores"),e.qZA(),e.qZA(),e.TgZ(8,"div",7),e.TgZ(9,"div",8),e.TgZ(10,"div",9),e.TgZ(11,"label",10),e._uU(12,"Usuario"),e.qZA(),e._UZ(13,"input",11),e.qZA(),e.TgZ(14,"div",9),e.TgZ(15,"label",10),e._uU(16,"Contrase\xf1a"),e.qZA(),e._UZ(17,"input",12),e.qZA(),e.qZA(),e.qZA(),e.TgZ(18,"div",13),e.TgZ(19,"button",14),e._uU(20," Iniciar sesi\xf3n "),e.qZA(),e.qZA(),e.YNc(21,J,2,2,"div",15),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(2),e.Q6J("formGroup",t.loginForm),e.xp6(17),e.Gre("",t.loginForm.invalid?"bg-light-grey":"bg-red"," btn"),e.Q6J("disabled",t.loginForm.invalid),e.xp6(2),e.Q6J("ngIf",t.loader))},directives:[r._Y,r.JL,r.sg,f.xw,f.s9,r.Fj,r.JJ,r.u,k.O5,V.Ou],styles:[".login-page[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;position:relative}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{z-index:1;display:flex;align-items:center;justify-content:center}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .app-name[_ngcontent-%COMP%]{color:#fff;margin-top:0;padding-bottom:10px;font-weight:400;font-size:25px}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{padding:40px;background:#000;max-width:300px}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-input[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;flex-direction:column;margin:11px 0}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-input--label[_ngcontent-%COMP%]{width:100%;color:#fff;margin:3px 0}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-input--input[_ngcontent-%COMP%]{color:#fff;background:#2D2D2D;border:none;font-size:17px;padding:.4rem .2rem;min-width:17rem;border-radius:5px}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form--icon[_ngcontent-%COMP%]{text-align:center}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form--icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:4rem}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form--submit[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:1.5rem 0}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form--submit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:1rem}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .spinner-container[_ngcontent-%COMP%]{margin-bottom:2.5rem}@media screen and (min-width: 481px){.login-page[_ngcontent-%COMP%]{background:url(login-hero.3cb1f55c214bc275.png);background-size:cover;background-position:center center;background-attachment:fixed}}@media screen and (max-width: 480px){.login-page[_ngcontent-%COMP%]{background:#000000}}"]}),i})()}];let j=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[h.Bz.forChild(N)],h.Bz]}),i})();var G=o(3079);let X=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[k.ez,r.u5,x.o9,q.c,S,C.ot,j,r.UX,G.q]]}),i})()}}]);