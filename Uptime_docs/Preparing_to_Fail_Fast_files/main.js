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

jQuery.noConflict();

jQuery(document).ready(function() {

  // STICKY TOP HEADER

	var stickyNav = jQuery('.sticky-nav');

	if (stickyNav.length) {
	    // on scroll or resize
		jQuery(window).on('scroll resize', function() {
			// var
			var windowWidth = jQuery(window).width();
  		    var docTop = jQuery(window).scrollTop();
    		var stickyNav = jQuery('.sticky-nav');
  		    var stickyNavHeight = stickyNav.outerHeight();
  		    var stickyNavParent = stickyNav.parent();
  		    var stickyNavParentTop = stickyNavParent.offset().top;
  		    var stickyNavTop = stickyNav.offset().top;
  		    var stickyNavBtm = stickyNavTop + stickyNavHeight;
			if (windowWidth >= 480){
				// if sticky nav in view
	   		    if ((stickyNavBtm <= docTop)) {
	   		    	stickyNav.addClass('fixed');
	   		    	stickyNav.not('.fadedIn').hide().fadeIn(300).addClass('fadedIn');
	   		    	stickyNavParent.css('padding-top', stickyNavHeight);
	   			} else if ((stickyNavParentTop >= docTop)) {
	       			stickyNav.removeClass('fixed fadedIn').css('top', '0');
	       			stickyNavParent.css('padding-top', '0');
	   			}
	   		} else {
		   		stickyNav.removeClass('fixed fadedIn').css('top', '0');
	       		stickyNavParent.css('padding-top', '0');
	   		}
		});
	}

  // TABLE OF CONTENTS

  jQuery('.toc li a[href*=\\#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = jQuery(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        jQuery('html,body').animate({scrollTop: targetOffset}, 500);
        return false;
      }
    }
  });

});


}
/*
     FILE ARCHIVED ON 03:31:01 Apr 26, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:38:30 Oct 13, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 3.225
  exclusion.robots: 0.09
  exclusion.robots.policy: 0.015
  esindex: 0.335
  cdx.remote: 142.614
  LoadShardBlock: 579.843 (3)
  PetaboxLoader3.datanode: 468.211 (4)
  load_resource: 544.912
  PetaboxLoader3.resolve: 431.408
*/