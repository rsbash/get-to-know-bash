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

// Resizes the uptime header/footer iframes on load & window resize & header expansion.
(function () {
  window.addEventListener('message', function (event) {
    // Strip the scheme & port from the origin to leave just the domain
    // Ensure the origin is one of the domains that can host the iframe header/footer
    // and is allowed to postMessage() to us
    var origin = event.origin.split('://', 2)[1] || '';
    origin = origin.split(':')[0] || '';
    if (['localhost', '127.0.0.1', 'dev.uptime.com', 'uptime.com'].indexOf(origin) < 0) {
      return;
    }

    if (event.data.message !== 'uptime-iframe-resized') {
      return;
    }

    // Adjust the height of the IFRAME that sent the message
    var iframe = this.document.querySelector('iframe[src$="' + event.data.path + '"]');
    if (iframe) {
      iframe.style.height = event.data.height + 'px';
    }
  });
})();


}
/*
     FILE ARCHIVED ON 15:55:06 May 01, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:33:03 Oct 13, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.788
  exclusion.robots: 0.027
  exclusion.robots.policy: 0.012
  esindex: 0.014
  cdx.remote: 145.031
  LoadShardBlock: 1003.986 (3)
  PetaboxLoader3.resolve: 629.806 (3)
  PetaboxLoader3.datanode: 603.181 (4)
  load_resource: 353.657
*/