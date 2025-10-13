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

(function(e){var a=!1;function i(){var t=e.performance||e.webkitPerformance||e.msPerformance||e.mozPerformance;if(t===void 0)return!1;var u=t.timing;return u||!1}function f(t,u){var r=new XMLHttpRequest;return r.withCredentials!==void 0?r.open(t,u,!0):typeof XDomainRequest!="undefined"?(r=new XDomainRequest,r.open(t,u)):r=null,r}function n(){if(a)return!1;try{var t=i();if(t&&_uptime_rum&&_uptime_rum.hasOwnProperty("uuid")){var u={type:"rumdata",data:{rumdata:{timing:t,user:{href:e.location.href,userAgent:e.navigator.userAgent}},uuid:_uptime_rum.uuid}},r=f("POST",_uptime_rum.url);if(!r)return!1;r.onload=function(){},r.send(JSON.stringify(u))}else _uptime_rum&&!_uptime_rum.hasOwnProperty("uuid")&&console.log("You are missing _uptime_rum.uuid property which needs to be global.");return a=!0,!0}catch(m){return!1}}_uptime_rum&&(_uptime_rum.sendReport=n),_uptime_rum&&_uptime_rum.hasOwnProperty("noAutoReport")||(e.addEventListener?e.addEventListener("load",n,!1):e.attachEvent?e.attachEvent("onload",n):e.onload=n)})(window);
//# sourceMappingURL=rum.js.map


}
/*
     FILE ARCHIVED ON 19:31:47 Mar 29, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:33:12 Oct 13, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 3.269
  exclusion.robots: 0.026
  exclusion.robots.policy: 0.013
  esindex: 0.026
  cdx.remote: 94.907
  LoadShardBlock: 1240.091 (3)
  PetaboxLoader3.datanode: 646.7 (5)
  PetaboxLoader3.resolve: 627.252 (3)
  load_resource: 644.871 (2)
*/