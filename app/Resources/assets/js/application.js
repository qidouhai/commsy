;(function($, document, window) {
    "use strict";

    // highligh sections that can be toggled
    $(document).ready(function() {
        $('div.cs-toggle')
            .mouseover(function() {
                $(this).toggleClass('cs-toggle-selected', true);
            })
            .mouseout(function() {
                $(this).toggleClass('cs-toggle-selected', false);
            });
    });

    // NProgress configuration
    NProgress.configure({
        showSpinner: false
    });

    // global AJAX event handler
    $(document).ajaxSend(function() {
        NProgress.start();
    });

    $(document).ajaxStop(function() {
        NProgress.done();
    });

    // global unload event
    $(window).on('beforeunload', function() {
        NProgress.start();
    });

})(jQuery, document, window);