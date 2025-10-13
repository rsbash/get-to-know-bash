var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(()=>{var t={78:(t,e,r)=>{var n=r(427);t.exports=function(t,e){if(!t)throw new Error("Missing elm");var r={};return(e||[]).forEach((function(e){var o="data-"+n(e),i=t.getAttribute(o);/^(true|false)$/.test(i)&&(i="true"===i),/^\d+$/.test(i)&&(i=parseInt(i,10)),null!==i&&(r[e]=i)})),r}},427:t=>{t.exports=function(t){return(t||"").replace(/([A-Z])/g,(function(t){return"-".concat(t.toLowerCase())}))}},462:t=>{t.exports=function(t){return(t||"").replace(/([A-Z])/g,(function(t){return"_".concat(t.toLowerCase())}))}},54:(t,e,r)=>{function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var a=r(462),c=function(t){var e=t||{};this.validParams=["role","returnTo","theme","token","locale","brandId","authOrigin","showMobileDeeplink","mobileDeeplinkParams"],this.options=o(o({},{action:"signin",authDomain:"",returnTo:window.location.href}),e),this.load()};c.prototype={load:function(){var t=[this.options.authDomain,"/auth/v2/login/",this.options.action,"?",this.getParams()].join("");window.location.href=t},getParams:function(){var t=this,e=[],r=decodeURIComponent(this.options.returnTo).match(/(http:\/\/|https:\/\/)+(.*)(\/admin|\/agent|\/chat|\/connect|\/explore|\/sell|oauth\/)/);return this.validParams.forEach((function(r){t.options.hasOwnProperty(r)&&e.push("".concat(a(r),"=").concat(encodeURIComponent(t.options[r])))}),this),r&&e.push("role=agent"),e.join("&")}},t.exports=c}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}(()=>{function t(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function e(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var o=r(54),i=r(78),a=new function(){if(this.KEYS=["returnTo","role","theme","token","locale","brandId","authOrigin","authDomain","showMobileDeeplink","mobileDeeplinkParams","action"],this.elm=document.currentScript||document.querySelector('[src*="/auth/v2"]'),!this.elm)throw new Error("Could not find script tag for zendesk_auth");if(this.declarativeOptions=i(this.elm,this.KEYS),!this.declarativeOptions.authDomain){var t=this.elm.getAttribute("src")||"";this.declarativeOptions.authDomain=t.replace(/\/auth\/v2.*/,"")}this.open=function(t){var r=t||{},n=e(e({},this.declarativeOptions),r);return new o(n)},this.declarativeOptions.action&&this.open()};window.Zendesk=window.Zendesk||{},window.Zendesk.Auth=function(t){return a.open(t)}})()})();

}
/*
     FILE ARCHIVED ON 15:55:13 May 01, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:33:06 Oct 13, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.865
  exclusion.robots: 0.028
  exclusion.robots.policy: 0.013
  esindex: 0.015
  cdx.remote: 312.097
  LoadShardBlock: 1999.276 (6)
  PetaboxLoader3.datanode: 899.686 (7)
  PetaboxLoader3.resolve: 226.267 (2)
  load_resource: 255.813
*/